import { NextRequest, NextResponse } from 'next/server'
import { FIXTURES } from '@/data/fixtures'

// ── Self-warming endpoint ─────────────────────────────────────────────────────
// Called by an external cron (cron-job.org) every 5 minutes.
//
// What it does:
//   1. Finds any match that kicked off in the last 140 minutes
//   2. Calls /api/match/{id} for each — this triggers all the sub-fetch caches
//      (football-data.org events + API-Football stats) inside the match route
//   3. When football-data.org says FINISHED, the match route stores stats with a
//      24-hr Vercel Data Cache entry → visible to anyone checking tomorrow
//
// Why this guarantees post-match stats:
//   Cron runs at T+85, T+90, T+95 ... T+140. One of those calls will land while
//   the match is FINISHED per football-data.org. That call triggers
//   getApiStats(id, revalidate: 86400) — permanently cached for 24 hr.
//   No visitor needed. No Redis needed.
//
// Budget impact: negligible. The sub-fetches hit Vercel's 10-min cache.
// Real API-Football calls still happen at most once per 10 min.

export async function GET(req: NextRequest) {
  // Basic protection — set WARMUP_SECRET in Vercel env vars
  const secret        = req.nextUrl.searchParams.get('secret')
  const expectedSecret = process.env.WARMUP_SECRET
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now        = Date.now()
  const WINDOW_MS  = 140 * 60 * 1000  // 140 min covers 90 + ET + penalties + buffer

  // Matches that kicked off in the last 140 minutes
  const activeMatches = FIXTURES.filter(f => {
    const elapsed = now - new Date(f.utcDate).getTime()
    return elapsed >= 0 && elapsed <= WINDOW_MS
  })

  if (!activeMatches.length) {
    return NextResponse.json({ message: 'No active matches right now', warmed: [] })
  }

  // Call our own match API for each active match.
  // The sub-fetches inside the route handler use Vercel Data Cache (next: { revalidate }),
  // so 1000 warmup calls = same real API usage as 1 call within any 10-min window.
  const origin  = req.nextUrl.origin
  const results = await Promise.all(
    activeMatches.map(async (f) => {
      try {
        const res = await fetch(`${origin}/api/match/${f.id}`, {
          cache: 'no-store',  // outer call is not cached; inner sub-fetches ARE
        })
        const data = await res.json()
        return {
          id:     f.id,
          status: data.status ?? 'unknown',
          warmed: res.ok,
        }
      } catch {
        return { id: f.id, status: 'error', warmed: false }
      }
    })
  )

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    warmed:    results,
  })
}
