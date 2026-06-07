import type { Match, GroupStanding } from '@/types'

const API_BASE = 'https://api.football-data.org/v4'
const API_KEY  = process.env.NEXT_PUBLIC_FOOTBALL_API_KEY ?? ''

// World Cup 2026 competition code
const WC_2026_ID = 2000

function getHeaders(): Record<string, string> {
  return {
    'X-Auth-Token': API_KEY,
    'Content-Type': 'application/json',
  }
}

// ─── API Response Types ────────────────────────────────────────────────────────

interface ApiTeam {
  id: number
  name: string
  shortName: string
  tla: string
  crest: string
}

interface ApiScore {
  winner: string | null
  duration: string
  fullTime: { home: number | null; away: number | null }
  halfTime: { home: number | null; away: number | null }
}

interface ApiMatch {
  id: number
  utcDate: string
  status: string
  matchday: number
  stage: string
  group: string | null
  homeTeam: ApiTeam
  awayTeam: ApiTeam
  score: ApiScore
  venue: string
  minute?: number
}

interface ApiStanding {
  position: number
  team: ApiTeam
  playedGames: number
  won: number
  draw: number
  lost: number
  points: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  form: string | null
}

interface ApiStandingsResponse {
  standings: {
    type: string
    stage: string
    group: string
    table: ApiStanding[]
  }[]
}

interface ApiMatchesResponse {
  matches: ApiMatch[]
}

// ─── Status mapping ────────────────────────────────────────────────────────────

function mapStatus(apiStatus: string): Match['status'] {
  const map: Record<string, Match['status']> = {
    SCHEDULED:  'SCHEDULED',
    TIMED:      'SCHEDULED',
    IN_PLAY:    'LIVE',
    PAUSED:     'HALF_TIME',
    FINISHED:   'FINISHED',
    SUSPENDED:  'POSTPONED',
    POSTPONED:  'POSTPONED',
    CANCELLED:  'POSTPONED',
  }
  return map[apiStatus] ?? 'SCHEDULED'
}

function mapStage(apiStage: string): Match['stage'] {
  const map: Record<string, Match['stage']> = {
    GROUP_STAGE:     'GROUP',
    ROUND_OF_16:     'ROUND_OF_32',
    LAST_16:         'ROUND_OF_16',
    QUARTER_FINALS:  'QUARTER_FINAL',
    SEMI_FINALS:     'SEMI_FINAL',
    THIRD_PLACE:     'THIRD_PLACE',
    FINAL:           'FINAL',
  }
  return map[apiStage] ?? 'GROUP'
}

// ─── Fetchers ─────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, revalidate = 60): Promise<T | null> {
  if (!API_KEY) return null
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: getHeaders(),
      next: { revalidate },
    })
    if (!res.ok) {
      console.warn(`Football API ${res.status} for ${path}`)
      return null
    }
    return res.json() as Promise<T>
  } catch (err) {
    console.error('Football API error:', err)
    return null
  }
}

export async function fetchLiveMatches(): Promise<Match[] | null> {
  const data = await apiFetch<ApiMatchesResponse>(
    `/competitions/${WC_2026_ID}/matches?status=IN_PLAY`,
    10
  )
  if (!data) return null
  return data.matches.map(mapApiMatch)
}

export async function fetchTodayMatches(): Promise<Match[] | null> {
  const today = new Date().toISOString().split('T')[0]
  const data = await apiFetch<ApiMatchesResponse>(
    `/competitions/${WC_2026_ID}/matches?dateFrom=${today}&dateTo=${today}`,
    30
  )
  if (!data) return null
  return data.matches.map(mapApiMatch)
}

export async function fetchAllMatches(): Promise<Match[] | null> {
  const data = await apiFetch<ApiMatchesResponse>(
    `/competitions/${WC_2026_ID}/matches`,
    300
  )
  if (!data) return null
  return data.matches.map(mapApiMatch)
}

export async function fetchStandings(): Promise<ApiStandingsResponse | null> {
  return apiFetch<ApiStandingsResponse>(
    `/competitions/${WC_2026_ID}/standings`,
    120
  )
}

export async function fetchMatch(id: number): Promise<Match | null> {
  const data = await apiFetch<ApiMatch>(`/matches/${id}`, 10)
  if (!data) return null
  return mapApiMatch(data)
}

function mapApiMatch(m: ApiMatch): Match {
  return {
    id:         String(m.id),
    stage:      mapStage(m.stage),
    group:      (m.group?.replace('GROUP_', '') as Match['group']) ?? undefined,
    matchday:   (m.matchday as 1 | 2 | 3) ?? undefined,
    homeTeamId: m.homeTeam.tla?.toLowerCase() ?? m.homeTeam.name.toLowerCase().replace(/\s+/g, '-'),
    awayTeamId: m.awayTeam.tla?.toLowerCase() ?? m.awayTeam.name.toLowerCase().replace(/\s+/g, '-'),
    stadiumId:  'unknown',
    utcDate:    m.utcDate,
    status:     mapStatus(m.status),
    score: {
      home: m.score.fullTime.home,
      away: m.score.fullTime.away,
      homeHalfTime: m.score.halfTime.home,
      awayHalfTime: m.score.halfTime.away,
    },
    minute:     m.minute,
    importance: 'MEDIUM',
  }
}

export function mapApiStandings(data: ApiStandingsResponse): Record<string, GroupStanding[]> {
  const result: Record<string, GroupStanding[]> = {}
  for (const standing of data.standings) {
    if (standing.type !== 'TOTAL') continue
    const group = standing.group?.replace('GROUP_', '') ?? 'UNKNOWN'
    result[group] = standing.table.map(row => ({
      position:       row.position,
      teamId:         row.team.tla?.toLowerCase() ?? row.team.name.toLowerCase().replace(/\s+/g, '-'),
      played:         row.playedGames,
      won:            row.won,
      drawn:          row.draw,
      lost:           row.lost,
      goalsFor:       row.goalsFor,
      goalsAgainst:   row.goalsAgainst,
      goalDifference: row.goalDifference,
      points:         row.points,
      form:           (row.form?.split(',') ?? []) as ('W' | 'D' | 'L')[],
      qualified:      row.position <= 2,
      eliminated:     false,
    }))
  }
  return result
}
