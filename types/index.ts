// ─────────────────────────────────────────────────────────────────────────────
// Core domain types for FIFA World Cup 2026
// ─────────────────────────────────────────────────────────────────────────────

export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L'

export type MatchStage =
  | 'GROUP'
  | 'ROUND_OF_32'
  | 'ROUND_OF_16'
  | 'QUARTER_FINAL'
  | 'SEMI_FINAL'
  | 'THIRD_PLACE'
  | 'FINAL'

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'HALF_TIME' | 'FINISHED' | 'POSTPONED'

export type MatchImportance = 'LOW' | 'MEDIUM' | 'HIGH' | 'MUST_WATCH' | 'FINAL'

export interface Team {
  id: string
  name: string
  shortName: string
  code: string          // ISO 3166-1 alpha-2 for flagcdn.com
  group: GroupId
  fifaRanking: number
  flagEmoji: string
  primaryColor: string
  secondaryColor: string
  coach: string
  continent: string
  worldCupAppearances: number
  bestResult: string
  founded: number
  homeStadium: string
  fanBase: number       // approx fan-poll percentage seed
}

export interface Stadium {
  id: string
  name: string
  city: string
  country: string
  capacity: number
  lat: number
  lng: number
  timezone: string
  surface: string
}

export interface MatchScore {
  home: number | null
  away: number | null
  homePenalty?: number | null
  awayPenalty?: number | null
  homeHalfTime?: number | null
  awayHalfTime?: number | null
}

export interface MatchEvent {
  minute: number
  type: 'GOAL' | 'OWN_GOAL' | 'PENALTY' | 'YELLOW_CARD' | 'RED_CARD' | 'SUBSTITUTION' | 'VAR'
  teamId: string
  playerName: string
  assistName?: string
  description?: string
}

export interface MatchStats {
  possession: { home: number; away: number }
  shots: { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  corners: { home: number; away: number }
  fouls: { home: number; away: number }
  yellowCards: { home: number; away: number }
  redCards: { home: number; away: number }
  offsides: { home: number; away: number }
  passes: { home: number; away: number }
  passAccuracy: { home: number; away: number }
}

export interface Match {
  id: string
  stage: MatchStage
  group?: GroupId
  matchday?: 1 | 2 | 3
  homeTeamId: string
  awayTeamId: string
  stadiumId: string
  utcDate: string       // ISO 8601 UTC timestamp
  status: MatchStatus
  score: MatchScore
  minute?: number       // match minute if LIVE
  events?: MatchEvent[]
  stats?: MatchStats
  importance: MatchImportance
  broadcastInfo?: string
  refereeCountry?: string
}

export interface GroupStanding {
  position: number
  teamId: string
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: ('W' | 'D' | 'L')[]
  qualified: boolean    // top 2 + eligible 3rd place
  eliminated: boolean
}

export interface Group {
  id: GroupId
  name: string
  standings: GroupStanding[]
}

export interface BracketSlot {
  id: string
  round: MatchStage
  position: number
  matchId?: string
  homeTeamId?: string
  awayTeamId?: string
  homeScore?: number | null
  awayScore?: number | null
  winnerId?: string
}

export interface TournamentStage {
  stage: MatchStage
  label: string
  shortLabel: string
  matches: string[]     // match IDs
  completed: boolean
  current: boolean
}

export interface FanPollEntry {
  teamId: string
  votes: number
}

export interface FanPoll {
  totalVotes: number
  entries: FanPollEntry[]
  lastUpdated: string
}

export interface UserPreferences {
  favoriteTeamId: string | null
  theme: 'dark' | 'light'
  timeZone: string
  layout: 'mobile' | 'tablet' | 'desktop' | 'auto'
  hasVoted: boolean
  votedTeamId: string | null
}

export interface SearchResult {
  type: 'team' | 'match' | 'group'
  id: string
  title: string
  subtitle: string
  href: string
}

export interface LineupPlayer {
  name:   string
  number: number
  pos:    'GK' | 'DEF' | 'MID' | 'FWD'
  x:      number   // 0–100 % from left edge of pitch
  y:      number   // 0–100 % from top (0 = attacking end, 100 = GK end)
}

export interface SubstitutePlayer {
  name:   string
  number: number
  pos:    'GK' | 'DEF' | 'MID' | 'FWD'
}

export interface TeamLineupData {
  formation: string           // e.g. '4-3-3'
  players:   LineupPlayer[]   // 11 starters
  subs:      SubstitutePlayer[]
}

export type Position = 'GK' | 'DEF' | 'MID' | 'FWD'

// ─── Live match data (from football-data.org API proxy) ─────────────────────

export interface FdorgTeamRef {
  id:   number
  name: string
}

export interface FdorgGoal {
  minute:     number
  injuryTime: number | null
  type:       'REGULAR' | 'OWN_GOAL' | 'PENALTY'
  team:       FdorgTeamRef
  scorer:     FdorgTeamRef
  assist:     FdorgTeamRef | null
}

export interface FdorgBooking {
  minute: number
  team:   FdorgTeamRef
  player: FdorgTeamRef
  card:   'YELLOW_CARD' | 'RED_CARD' | 'YELLOW_RED_CARD'
}

export interface FdorgSubstitution {
  minute:    number
  team:      FdorgTeamRef
  playerOut: FdorgTeamRef
  playerIn:  FdorgTeamRef
}

export interface LiveStats {
  possession:    { home: number; away: number }
  shots:         { home: number; away: number }
  shotsOnTarget: { home: number; away: number }
  corners:       { home: number; away: number }
  fouls:         { home: number; away: number }
  offsides:      { home: number; away: number }
  saves:         { home: number; away: number }
}

export interface LiveMatchData {
  fdorgId:       number
  status:        string
  minute:        number | null
  venue:         string | null
  score: {
    fullTime: { home: number | null; away: number | null }
    halfTime: { home: number | null; away: number | null }
  }
  goals:         FdorgGoal[]
  bookings:      FdorgBooking[]
  substitutions: FdorgSubstitution[]
  stats:         LiveStats | null
}

export interface Player {
  name: string
  pos: Position
  club: string
}

export interface TeamWithDetails extends Team {
  matches: Match[]
  standing?: GroupStanding
  nextMatch?: Match
  lastMatch?: Match
}
