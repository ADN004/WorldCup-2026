import { NextRequest, NextResponse } from 'next/server'
import { FIXTURES } from '@/data/fixtures'
import type { LiveStats } from '@/types'

const FDORG_BASE     = 'https://api.football-data.org/v4'
const FDORG_KEY      = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY!
const APISPORTS_BASE = 'https://v3.football.api-sports.io'
const APISPORTS_KEY  = process.env.API_FOOTBALL_KEY!

// football-data.org live statuses
const FDORG_LIVE_STATUSES = new Set([
  'IN_PLAY', 'HALF_TIME', 'PAUSED', 'EXTRA_TIME', 'PENALTY',
])

interface ApiFixture {
  fixture: { id: number; date: string }
  league:  { id: number }
}

async function getLiveApiFixtures(): Promise<ApiFixture[]> {
  try {
    const res = await fetch(`${APISPORTS_BASE}/fixtures?live=all`, {
      headers: { 'x-apisports-key': APISPORTS_KEY },
      next: { revalidate: 900 },  // 15 min — fits 6 group-stage or 4 knockout matches regardless of scheduling
    })
    if (!res.ok) return []
    return (await res.json()).response ?? []
  } catch {
    return []
  }
}

// revalidate: 900 while live (15 min), 86400 when finished (24 hr, frozen data)
async function getApiStats(fixtureId: number, revalidate: number): Promise<LiveStats | null> {
  try {
    const res = await fetch(`${APISPORTS_BASE}/fixtures/statistics?fixture=${fixtureId}`, {
      headers: { 'x-apisports-key': APISPORTS_KEY },
      next: { revalidate },
    })
    if (!res.ok) return null
    const teams: { statistics: { type: string; value: unknown }[] }[] =
      (await res.json()).response ?? []
    if (teams.length < 2) return null

    const pick = (arr: { type: string; value: unknown }[], key: string): number => {
      const v = arr.find(s => s.type === key)?.value
      if (v === null || v === undefined) return 0
      if (typeof v === 'string') return parseInt(v) || 0
      return Number(v) || 0
    }
    const [h, a] = teams.map(t => t.statistics)
    return {
      possession:    { home: pick(h, 'Ball Possession'),   away: pick(a, 'Ball Possession') },
      shots:         { home: pick(h, 'Total Shots'),       away: pick(a, 'Total Shots') },
      shotsOnTarget: { home: pick(h, 'Shots on Goal'),     away: pick(a, 'Shots on Goal') },
      corners:       { home: pick(h, 'Corner Kicks'),      away: pick(a, 'Corner Kicks') },
      fouls:         { home: pick(h, 'Fouls'),             away: pick(a, 'Fouls') },
      offsides:      { home: pick(h, 'Offsides'),          away: pick(a, 'Offsides') },
      saves:         { home: pick(h, 'Goalkeeper Saves'),  away: pick(a, 'Goalkeeper Saves') },
    }
  } catch {
    return null
  }
}

interface FdorgFixture { id: number; utcDate: string }

async function getFdorgFixtures(): Promise<FdorgFixture[]> {
  try {
    const res = await fetch(`${FDORG_BASE}/competitions/WC/matches`, {
      headers: { 'X-Auth-Token': FDORG_KEY },
      next: { revalidate: 300 },
    })
    if (!res.ok) return []
    return (await res.json()).matches ?? []
  } catch {
    return []
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const fixture = FIXTURES.find(f => f.id === id)
  if (!fixture) return NextResponse.json({ error: 'Match not found' }, { status: 404 })

  const matchStartMs  = new Date(fixture.utcDate).getTime()
  const elapsedMs     = Date.now() - matchStartMs
  // 140 min covers 90 min + full ET (30 min) + penalties + stoppage time
  const mightBeActive = elapsedMs >= -5 * 60_000 && elapsedMs <= 140 * 60_000
  const isDefinitelyOver = elapsedMs > 140 * 60_000

  // Scheduled match not yet started — skip all API calls
  if (elapsedMs < -5 * 60_000) {
    return NextResponse.json({
      fdorgId: null, status: 'SCHEDULED', minute: null, venue: null,
      score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } },
      goals: [], bookings: [], substitutions: [], stats: null,
    })
  }

  // ── Step 1: football-data.org (real score, events, real status) ───────────
  // We trust football-data.org for the TRUE match state — including when ET
  // starts, when penalties happen, and the exact moment FT is blown.
  let fdorgDetail: Record<string, unknown> = {}
  try {
    const allFdorg   = await getFdorgFixtures()
    const fdorgMatch = allFdorg.find(m => m.utcDate === fixture.utcDate)
    if (fdorgMatch) {
      // Active window: fresh every 30 s. Definite FT: cache 1 hr.
      const revalidate = mightBeActive ? 30 : 3_600
      const res = await fetch(`${FDORG_BASE}/matches/${fdorgMatch.id}`, {
        headers: { 'X-Auth-Token': FDORG_KEY },
        next: { revalidate },
      })
      if (res.ok) fdorgDetail = await res.json()
    }
  } catch { /* return events from static data */ }

  // Use football-data.org's actual status — not our static FIXTURES field.
  // This correctly detects EXTRA_TIME, PENALTY, and the real FINISHED moment.
  const realStatus   = (fdorgDetail as any)?.status ?? fixture.status
  const reallyLive   = FDORG_LIVE_STATUSES.has(realStatus)
  const reallyFinished = realStatus === 'FINISHED' || isDefinitelyOver

  // ── Step 2: API-Football stats (live + finished) ──────────────────────────
  // Budget math: worst case = N matches all at separate times, no window overlap
  //   Formula: N × (duration ÷ 15 min) × 2 calls/window
  //   Group stage (6 matches, 90 min max — no ET in groups): 6 × 6 × 2 = 72 / 100 ✅
  //   Knockout    (4 matches, 135 min with ET+pens):         4 × 9 × 2 = 72 / 100 ✅
  //   Resets at 00:00 UTC every day.
  //
  // Post-match guarantee: /api/warmup (called by external cron every 5 min)
  // ensures this runs right at/after FT while live=all cache is still warm.
  // Once stats are fetched with revalidate: 86400 they stay in Vercel's Data
  // Cache for 24 hr — visible to anyone who checks tomorrow, no API call needed.
  let stats: LiveStats | null = null
  if (reallyLive || reallyFinished) {
    try {
      const liveFixtures = await getLiveApiFixtures()
      const ourTime = new Date(fixture.utcDate).getTime()
      const match = liveFixtures.find(
        f => f.league.id === 1 &&
             Math.abs(new Date(f.fixture.date).getTime() - ourTime) < 120_000
      )
      if (match) {
        // Live → 6-min refresh.  Finished → 24-hr permanent cache.
        stats = await getApiStats(match.fixture.id, reallyLive ? 900 : 86_400)
      }
    } catch { /* stats null → UI falls back to event-computed stats */ }
  }

  const d = fdorgDetail as any
  return NextResponse.json({
    fdorgId:       d?.id        ?? null,
    status:        realStatus,
    minute:        d?.minute    ?? null,
    venue:         d?.venue     ?? null,
    score: {
      fullTime: { home: d?.score?.fullTime?.home ?? null, away: d?.score?.fullTime?.away ?? null },
      halfTime: { home: d?.score?.halfTime?.home ?? null, away: d?.score?.halfTime?.away ?? null },
    },
    goals:         d?.goals         ?? [],
    bookings:      d?.bookings      ?? [],
    substitutions: d?.substitutions ?? [],
    stats,
  })
}
