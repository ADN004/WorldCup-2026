'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, RefreshCw, Zap } from 'lucide-react'
// Zap used in upcoming-match notice below
import { cn } from '@/lib/utils'
import { formatMatchDate, formatMatchTime } from '@/lib/timeUtils'
import { useTimezone } from '@/store/useAppStore'
import { TeamFlag } from './TeamFlag'
import { LiveBadge } from './LiveBadge'
import { getLineup } from '@/data/lineups'
import type {
  Match, Team, Stadium,
  LiveMatchData, LiveStats, FdorgGoal, FdorgBooking, FdorgSubstitution,
} from '@/types'

// ─── Helpers ─────────────────────────────────────────────────────────────────

type TabId = 'events' | 'stats' | 'lineups'

const FORM_COLORS: Record<string, string> = {
  W: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  D: 'bg-white/10 text-white/50 border border-white/15',
  L: 'bg-red-500/20 text-red-400 border border-red-500/30',
}

function FormBadge({ result }: { result: string }) {
  return (
    <span className={cn('w-5 h-5 rounded-full text-[0.52rem] font-bold flex items-center justify-center flex-shrink-0', FORM_COLORS[result] ?? FORM_COLORS.D)}>
      {result}
    </span>
  )
}

function GoalIcon({ type }: { type: FdorgGoal['type'] }) {
  if (type === 'OWN_GOAL') return <span className="text-[0.7rem]">⚽</span>
  if (type === 'PENALTY')   return <span className="text-[0.7rem]">⚽<span className="text-[0.5rem] text-white/50">P</span></span>
  return <span className="text-[0.7rem]">⚽</span>
}

function CardIcon({ card }: { card: FdorgBooking['card'] }) {
  if (card === 'RED_CARD')         return <span className="w-3 h-4 rounded-[2px] bg-red-500 inline-block" />
  if (card === 'YELLOW_RED_CARD')  return <span className="w-3 h-4 rounded-[2px] bg-gradient-to-b from-yellow-400 to-red-500 inline-block" />
  return <span className="w-3 h-4 rounded-[2px] bg-yellow-400 inline-block" />
}

// ─── Merged timeline event ────────────────────────────────────────────────────
type TimelineEvent =
  | { kind: 'goal'; minute: number; data: FdorgGoal }
  | { kind: 'booking'; minute: number; data: FdorgBooking }
  | { kind: 'sub'; minute: number; data: FdorgSubstitution }

function buildTimeline(live: LiveMatchData): TimelineEvent[] {
  const events: TimelineEvent[] = [
    ...(live.goals         ?? []).map(d => ({ kind: 'goal'    as const, minute: d.minute, data: d })),
    ...(live.bookings      ?? []).map(d => ({ kind: 'booking' as const, minute: d.minute, data: d })),
    ...(live.substitutions ?? []).map(d => ({ kind: 'sub'     as const, minute: d.minute, data: d })),
  ]
  return events.sort((a, b) => a.minute - b.minute)
}

// ─── Score hero ───────────────────────────────────────────────────────────────
function ScoreHero({
  match, homeTeam, awayTeam, stadium, live,
}: {
  match: Match; homeTeam: Team | null; awayTeam: Team | null
  stadium: Stadium | null; live: LiveMatchData | null
}) {
  const tz     = useTimezone()
  const isLive = live?.status === 'IN_PLAY' || live?.status === 'HALF_TIME'
  const isDone = live?.status === 'FINISHED' || match.status === 'FINISHED'

  const homeScore = live?.score.fullTime.home ?? match.score.home
  const awayScore = live?.score.fullTime.away ?? match.score.away
  const htHome    = live?.score.halfTime.home ?? null
  const htAway    = live?.score.halfTime.away ?? null

  const homePrimary = homeTeam?.primaryColor ?? '#ffffff'
  const awayPrimary = awayTeam?.primaryColor ?? '#ffffff'

  return (
    <div
      className="relative overflow-hidden rounded-2xl mb-6"
      style={{
        background: `linear-gradient(135deg, ${homePrimary}18 0%, rgba(8,18,36,0.95) 45%, ${awayPrimary}18 100%)`,
        border: isLive ? '1px solid rgba(255,53,72,0.25)' : '1px solid rgba(255,255,255,0.08)',
        boxShadow: isLive ? '0 0 32px rgba(255,53,72,0.08)' : 'none',
      }}
    >
      {/* Top label */}
      <div className="text-center pt-5 pb-2">
        <p className="text-[0.6rem] font-bold text-white/30 tracking-[0.22em] uppercase">
          {match.stage === 'GROUP'
            ? `Group ${match.group}${match.matchday ? ` · Matchday ${match.matchday}` : ''}`
            : match.stage.replace(/_/g, ' ')}
        </p>
      </div>

      {/* Teams + score row */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 pb-4">
        {/* Home */}
        <div className="flex flex-col items-center gap-2 text-center">
          {homeTeam && <TeamFlag code={homeTeam.code} name={homeTeam.name} size="xl" showShadow />}
          <p className="text-sm font-bold text-white leading-tight line-clamp-1">
            {homeTeam?.shortName ?? 'TBD'}
          </p>
          <p className="text-[0.6rem] text-white/30">#{homeTeam?.fifaRanking}</p>
        </div>

        {/* Centre score */}
        <div className="flex flex-col items-center gap-2 min-w-[120px]">
          {homeScore !== null || awayScore !== null ? (
            <p className="text-5xl md:text-6xl font-stats text-white leading-none tabular-nums">
              {homeScore ?? 0}&nbsp;–&nbsp;{awayScore ?? 0}
            </p>
          ) : (
            <p className="text-2xl font-stats text-electric-blue leading-none">
              {formatMatchTime(match.utcDate, tz)}
            </p>
          )}

          {isLive && (
            <LiveBadge minute={live?.minute ?? undefined} isHalfTime={live?.status === 'HALF_TIME'} size="md" />
          )}
          {isDone && (
            <span className="text-[0.6rem] font-bold text-white/35 tracking-widest uppercase">Full Time</span>
          )}
          {!isLive && !isDone && (
            <span className="text-[0.65rem] text-white/35">{formatMatchDate(match.utcDate, tz)}</span>
          )}

          {(htHome !== null || htAway !== null) && (
            <p className="text-[0.58rem] text-white/28 font-semibold">
              HT: {htHome ?? 0} – {htAway ?? 0}
            </p>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-2 text-center">
          {awayTeam && <TeamFlag code={awayTeam.code} name={awayTeam.name} size="xl" showShadow />}
          <p className="text-sm font-bold text-white leading-tight line-clamp-1">
            {awayTeam?.shortName ?? 'TBD'}
          </p>
          <p className="text-[0.6rem] text-white/30">#{awayTeam?.fifaRanking}</p>
        </div>
      </div>

      {/* Stadium */}
      {stadium && (
        <div className="flex items-center justify-center gap-1.5 pb-4 text-white/28">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <p className="text-[0.62rem] font-medium">{stadium.name}, {stadium.city}</p>
        </div>
      )}

      {/* Live pulse bar */}
      {isLive && (
        <div className="absolute bottom-0 inset-x-0 h-[2px]">
          <div className="h-full bg-live/60 animate-pulse" />
        </div>
      )}
    </div>
  )
}

// ─── Events timeline ──────────────────────────────────────────────────────────
function EventsContent({
  live, homeTeam, awayTeam,
}: {
  live: LiveMatchData | null
  homeTeam: Team | null
  awayTeam: Team | null
}) {
  if (!live) return <EmptyState icon="⏳" message="Match hasn't started yet" sub="Events will appear here once kick-off begins." />

  const timeline = buildTimeline(live)
  if (!timeline.length) return <EmptyState icon="📋" message="No events yet" sub="Goals, cards and substitutions will appear here." />

  return (
    <div className="flex flex-col gap-1.5">
      {timeline.map((ev, i) => {
        const isHome = (name: string) =>
          name.toLowerCase().includes(homeTeam?.name.split(' ')[0].toLowerCase() ?? '___')
          || homeTeam?.name.toLowerCase().includes(name.toLowerCase())

        if (ev.kind === 'goal') {
          const g = ev.data as FdorgGoal
          const home = g.team.name === homeTeam?.name
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl',
                'bg-white/[0.03] border border-white/[0.05]',
                g.type === 'OWN_GOAL' && 'opacity-70'
              )}
            >
              <span className="text-[0.62rem] text-white/35 font-bold tabular-nums w-8 flex-shrink-0">
                {g.minute}{g.injuryTime ? `+${g.injuryTime}` : ''}'
              </span>
              <GoalIcon type={g.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {g.scorer.name}
                  {g.type === 'OWN_GOAL' && <span className="text-white/40 ml-1 text-xs">(OG)</span>}
                  {g.type === 'PENALTY'   && <span className="text-white/40 ml-1 text-xs">(Pen)</span>}
                </p>
                {g.assist && (
                  <p className="text-[0.6rem] text-white/35 truncate">Assist: {g.assist.name}</p>
                )}
              </div>
              <span
                className="text-[0.6rem] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: `${home ? homeTeam?.primaryColor : awayTeam?.primaryColor}25`,
                  color: home ? homeTeam?.primaryColor : awayTeam?.primaryColor,
                }}
              >
                {home ? homeTeam?.code : awayTeam?.code}
              </span>
            </div>
          )
        }

        if (ev.kind === 'booking') {
          const b = ev.data as FdorgBooking
          const home = b.team.name === homeTeam?.name
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[0.62rem] text-white/35 font-bold tabular-nums w-8 flex-shrink-0">
                {b.minute}'
              </span>
              <CardIcon card={b.card} />
              <p className="flex-1 text-sm text-white/70 truncate">{b.player.name}</p>
              <span className="text-[0.6rem] text-white/30 flex-shrink-0">
                {home ? homeTeam?.code : awayTeam?.code}
              </span>
            </div>
          )
        }

        if (ev.kind === 'sub') {
          const s = ev.data as FdorgSubstitution
          const home = s.team.name === homeTeam?.name
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <span className="text-[0.62rem] text-white/35 font-bold tabular-nums w-8 flex-shrink-0">
                {s.minute}'
              </span>
              <span className="text-emerald-400 text-[0.8rem]">⇄</span>
              <div className="flex-1 min-w-0">
                <p className="text-[0.7rem] text-emerald-400 truncate">▲ {s.playerIn.name}</p>
                <p className="text-[0.7rem] text-white/35 truncate">▼ {s.playerOut.name}</p>
              </div>
              <span className="text-[0.6rem] text-white/30 flex-shrink-0">
                {home ? homeTeam?.code : awayTeam?.code}
              </span>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

// ─── Live stats ───────────────────────────────────────────────────────────────
function StatsContent({
  live, homeTeam, awayTeam,
}: {
  live:     LiveMatchData | null
  homeTeam: Team | null
  awayTeam: Team | null
}) {
  if (!live || live.status === 'TIMED' || live.status === 'SCHEDULED') {
    return <EmptyState icon="📊" message="Stats not yet available" sub="Possession, shots, corners and more will appear once kick-off begins." />
  }

  const s: LiveStats | null = live.stats  // from API-Football (null until match discovered live)

  // Fallback counts from events data (always available from football-data.org)
  const goals  = live.goals    ?? []
  const books  = live.bookings ?? []
  const subs   = live.substitutions ?? []

  const homeGoalCount = goals.filter(g => g.team.name === homeTeam?.name && g.type !== 'OWN_GOAL').length
                      + goals.filter(g => g.team.name === awayTeam?.name  && g.type === 'OWN_GOAL').length
  const awayGoalCount = goals.filter(g => g.team.name === awayTeam?.name  && g.type !== 'OWN_GOAL').length
                      + goals.filter(g => g.team.name === homeTeam?.name && g.type === 'OWN_GOAL').length

  const rows: { label: string; home: number; away: number; isPct?: boolean }[] = s ? [
    // Full stats from API-Football
    { label: 'Possession',      home: s.possession.home,    away: s.possession.away,    isPct: true },
    { label: 'Total Shots',     home: s.shots.home,         away: s.shots.away },
    { label: 'Shots on Target', home: s.shotsOnTarget.home, away: s.shotsOnTarget.away },
    { label: 'Corner Kicks',    home: s.corners.home,       away: s.corners.away },
    { label: 'Fouls',           home: s.fouls.home,         away: s.fouls.away },
    { label: 'Offsides',        home: s.offsides.home,      away: s.offsides.away },
    { label: 'GK Saves',        home: s.saves.home,         away: s.saves.away },
    { label: 'Goals',           home: homeGoalCount,        away: awayGoalCount },
  ] : [
    // Fallback: only what we compute from event arrays
    { label: 'Goals',
      home: homeGoalCount,
      away: awayGoalCount },
    { label: 'Yellow Cards',
      home: books.filter(b => b.team.name === homeTeam?.name && b.card === 'YELLOW_CARD').length,
      away: books.filter(b => b.team.name === awayTeam?.name && b.card === 'YELLOW_CARD').length },
    { label: 'Red Cards',
      home: books.filter(b => b.team.name === homeTeam?.name && (b.card === 'RED_CARD' || b.card === 'YELLOW_RED_CARD')).length,
      away: books.filter(b => b.team.name === awayTeam?.name && (b.card === 'RED_CARD' || b.card === 'YELLOW_RED_CARD')).length },
    { label: 'Substitutions',
      home: subs.filter(sub => sub.team.name === homeTeam?.name).length,
      away: subs.filter(sub => sub.team.name === awayTeam?.name).length },
  ]

  return (
    <div className="flex flex-col">
      {/* Team header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5">
          {homeTeam && <TeamFlag code={homeTeam.code} name={homeTeam.name} size="xs" />}
          <span className="text-xs font-bold text-white/55">{homeTeam?.code ?? 'HOM'}</span>
        </div>
        <span className="text-[0.5rem] font-bold text-white/18 tracking-widest uppercase">Stats</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-white/55">{awayTeam?.code ?? 'AWY'}</span>
          {awayTeam && <TeamFlag code={awayTeam.code} name={awayTeam.name} size="xs" />}
        </div>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {rows.map(r => (
          <StatBar
            key={r.label}
            label={r.label}
            homeVal={r.home}
            awayVal={r.away}
            isPct={r.isPct}
            homeColor={homeTeam?.primaryColor}
            awayColor={awayTeam?.primaryColor}
          />
        ))}
      </div>

      {!s && (
        <p className="text-center text-[0.58rem] text-white/20 mt-4">
          Possession · Shots · Corners · Fouls will appear once the match is tracked live
        </p>
      )}
    </div>
  )
}

function StatBar({
  label, homeVal, awayVal, isPct, homeColor, awayColor,
}: {
  label: string; homeVal: number; awayVal: number
  isPct?: boolean; homeColor?: string; awayColor?: string
}) {
  const total   = homeVal + awayVal || 1
  const homePct = isPct ? homeVal : Math.round((homeVal / total) * 100)
  const awayPct = isPct ? awayVal : 100 - homePct

  return (
    <div className="py-2.5 px-1">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-stats text-white tabular-nums">
          {homeVal}{isPct ? '%' : ''}
        </span>
        <span className="text-[0.55rem] text-white/30 font-bold tracking-wider uppercase">{label}</span>
        <span className="text-sm font-stats text-white tabular-nums">
          {awayVal}{isPct ? '%' : ''}
        </span>
      </div>
      <div className="flex h-[3px] rounded-full overflow-hidden bg-white/[0.06]">
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${homePct}%`, background: homeColor ?? '#3b82f6', borderRadius: '9999px 0 0 9999px' }}
        />
        <div
          className="h-full transition-all duration-700"
          style={{ width: `${awayPct}%`, background: awayColor ?? '#f5c518', borderRadius: '0 9999px 9999px 0' }}
        />
      </div>
    </div>
  )
}

// ─── Lineups ──────────────────────────────────────────────────────────────────
function LineupsContent({
  homeTeam, awayTeam, mobileView = false,
}: {
  homeTeam: Team | null
  awayTeam: Team | null
  mobileView?: boolean
}) {
  const [mobileTeam, setMobileTeam] = useState<'home' | 'away'>('home')
  const homeLineup = homeTeam ? getLineup(homeTeam.id) : null
  const awayLineup = awayTeam ? getLineup(awayTeam.id) : null

  if (!homeLineup && !awayLineup) {
    return <EmptyState icon="📋" message="Lineups not available" sub="Starting XI data hasn't been confirmed yet." />
  }

  const ORDER = ['GK', 'DEF', 'MID', 'FWD'] as const
  const POS_LABEL: Record<string, string> = { GK: 'GK', DEF: 'Defenders', MID: 'Midfielders', FWD: 'Forwards' }
  const POS_COLOR: Record<string, string> = {
    GK:  'text-amber-400',
    DEF: 'text-blue-400',
    MID: 'text-emerald-400',
    FWD: 'text-rose-400',
  }

  // ── Mobile: full-width team selector + one team at a time ─────────────────
  if (mobileView) {
    const activeTeam   = mobileTeam === 'home' ? homeTeam   : awayTeam
    const activeLineup = mobileTeam === 'home' ? homeLineup : awayLineup

    return (
      <div>
        {/* Team toggle */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          {(['home', 'away'] as const).map(side => {
            const team   = side === 'home' ? homeTeam   : awayTeam
            const lineup = side === 'home' ? homeLineup : awayLineup
            const active = mobileTeam === side
            return (
              <button
                key={side}
                onClick={() => setMobileTeam(side)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all',
                  active ? 'bg-white/[0.08] text-white' : 'text-white/40 hover:text-white/60'
                )}
              >
                {team && <TeamFlag code={team.code} name={team.name} size="xs" />}
                <span>{team?.shortName ?? (side === 'home' ? 'Home' : 'Away')}</span>
                {lineup && (
                  <span className={cn('text-[0.6rem] font-medium', active ? 'text-white/35' : 'text-white/18')}>
                    {lineup.formation}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Active team — full width, readable sizes */}
        {activeLineup ? (
          <div>
            {ORDER.map(pos => {
              const players = activeLineup.players.filter(p => p.pos === pos)
              if (!players.length) return null
              return (
                <div key={pos} className="mb-4">
                  <p className={cn('text-[0.65rem] font-bold uppercase tracking-wider mb-2', POS_COLOR[pos])}>
                    {POS_LABEL[pos]}
                  </p>
                  <div className="flex flex-col">
                    {players.map(p => (
                      <div key={p.number} className="flex items-center gap-3 py-2 border-b border-white/[0.05]">
                        <span
                          className="text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${activeTeam?.primaryColor}22`, color: activeTeam?.primaryColor }}
                        >
                          {p.number}
                        </span>
                        <span className="text-sm text-white/80 leading-tight">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState icon="📋" message="Lineup not available" sub="Starting XI hasn't been confirmed." />
        )}
      </div>
    )
  }

  // ── Desktop: side-by-side two columns ─────────────────────────────────────
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Home */}
      <div>
        <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/35 mb-3 text-center">
          {homeTeam?.shortName}
          {homeLineup && <span className="ml-1 text-white/20">· {homeLineup.formation}</span>}
        </p>
        {homeLineup && ORDER.map(pos => {
          const players = homeLineup.players.filter(p => p.pos === pos)
          if (!players.length) return null
          return (
            <div key={pos} className="mb-3">
              <p className={cn('text-[0.55rem] font-bold uppercase mb-1.5', POS_COLOR[pos])}>{POS_LABEL[pos]}</p>
              {players.map(p => (
                <div key={p.number} className="flex items-center gap-1.5 py-1 border-b border-white/[0.04]">
                  <span
                    className="text-[0.55rem] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${homeTeam?.primaryColor}25`, color: homeTeam?.primaryColor }}
                  >
                    {p.number}
                  </span>
                  <span className="text-[0.72rem] text-white/75 truncate">{p.name}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Away */}
      <div>
        <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase text-white/35 mb-3 text-center">
          {awayTeam?.shortName}
          {awayLineup && <span className="ml-1 text-white/20">· {awayLineup.formation}</span>}
        </p>
        {awayLineup && ORDER.map(pos => {
          const players = awayLineup.players.filter(p => p.pos === pos)
          if (!players.length) return null
          return (
            <div key={pos} className="mb-3">
              <p className={cn('text-[0.55rem] font-bold uppercase mb-1.5', POS_COLOR[pos])}>{POS_LABEL[pos]}</p>
              {players.map(p => (
                <div key={p.number} className="flex items-center gap-1.5 py-1 border-b border-white/[0.04]">
                  <span
                    className="text-[0.55rem] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: `${awayTeam?.primaryColor}25`, color: awayTeam?.primaryColor }}
                  >
                    {p.number}
                  </span>
                  <span className="text-[0.72rem] text-white/75 truncate">{p.name}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ icon, message, sub }: { icon: string; message: string; sub: string }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-10 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm font-semibold text-white/50">{message}</p>
      <p className="text-xs text-white/25 max-w-[200px] leading-relaxed">{sub}</p>
    </div>
  )
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
interface Props {
  match:    Match
  homeTeam: Team | null
  awayTeam: Team | null
  stadium:  Stadium | null
}

export function LiveMatchView({ match, homeTeam, awayTeam, stadium }: Props) {
  const [live,      setLive]      = useState<LiveMatchData | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('events')
  const [lastPoll,  setLastPoll]  = useState<Date | null>(null)
  const [polling,   setPolling]   = useState(false)

  const isLive      = match.status === 'LIVE' || match.status === 'HALF_TIME'
  const isFinished  = match.status === 'FINISHED'
  const shouldFetch = isLive || isFinished

  const fetchLive = useCallback(async () => {
    setPolling(true)
    try {
      const res  = await fetch(`/api/match/${match.id}`, { cache: 'no-store' })
      if (res.ok) {
        const data: LiveMatchData = await res.json()
        setLive(data)
        setLastPoll(new Date())
      }
    } finally {
      setPolling(false)
    }
  }, [match.id])

  // Initial fetch + polling (only for live/finished)
  useEffect(() => {
    if (!shouldFetch) return
    fetchLive()
    if (!isLive) return
    const interval = setInterval(fetchLive, 30_000)
    return () => clearInterval(interval)
  }, [fetchLive, shouldFetch, isLive])

  const tabs: { id: TabId; label: string }[] = [
    { id: 'events',  label: 'Events'   },
    { id: 'stats',   label: 'Stats'    },
    { id: 'lineups', label: 'Lineups'  },
  ]

  return (
    <div className="page-container py-6">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      {/* Score Hero */}
      <ScoreHero
        match={match}
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        stadium={stadium}
        live={live}
      />

      {/* ── MOBILE layout (< lg) ───────────────────────────────────────────── */}
      <div className="lg:hidden">
        {/* Sticky tab bar */}
        <div className="sticky top-0 z-10 -mx-4 px-4 py-2 mb-4"
          style={{ background: 'rgba(5,14,28,0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] border border-white/[0.06]">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  'flex-1 py-2 rounded-lg text-xs font-bold transition-all',
                  activeTab === t.id
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-white/35 hover:text-white/60'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div className="glass rounded-2xl p-4">
          {activeTab === 'events'  && <EventsContent  live={live} homeTeam={homeTeam} awayTeam={awayTeam} />}
          {activeTab === 'stats'   && <StatsContent   live={live} homeTeam={homeTeam} awayTeam={awayTeam} />}
          {activeTab === 'lineups' && <LineupsContent homeTeam={homeTeam} awayTeam={awayTeam} mobileView />}
        </div>
      </div>

      {/* ── DESKTOP layout (>= lg) ─────────────────────────────────────────── */}
      {/* No tabs — everything visible simultaneously in 3 columns           */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-5">
        {/* Events column */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.05] flex items-center justify-between">
            <h3 className="font-heading text-sm font-bold text-white">Match Events</h3>
            {polling && <RefreshCw className="w-3 h-3 text-white/20 animate-spin" />}
          </div>
          <div className="p-4 flex flex-col min-h-[300px]">
            <EventsContent live={live} homeTeam={homeTeam} awayTeam={awayTeam} />
          </div>
        </div>

        {/* Stats column */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.05]">
            <h3 className="font-heading text-sm font-bold text-white">Live Statistics</h3>
          </div>
          <div className="p-4 flex flex-col min-h-[300px]">
            <StatsContent live={live} homeTeam={homeTeam} awayTeam={awayTeam} />
          </div>
        </div>

        {/* Lineups column */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-white/[0.05]">
            <h3 className="font-heading text-sm font-bold text-white">Starting XI</h3>
          </div>
          <div className="p-4 flex flex-col min-h-[300px]">
            <LineupsContent homeTeam={homeTeam} awayTeam={awayTeam} />
          </div>
        </div>
      </div>

      {/* Poll status */}
      {shouldFetch && lastPoll && (
        <p className="text-center text-[0.58rem] text-white/18 mt-6">
          Last updated {lastPoll.toLocaleTimeString()}
          {isLive && ' · refreshes every 30 s'}
        </p>
      )}

      {/* Upcoming notice */}
      {!shouldFetch && (
        <div
          className="mt-6 glass rounded-xl p-4 flex items-start gap-3"
          style={{ border: '1px solid rgba(0,194,255,0.12)' }}
        >
          <Zap className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-electric-blue mb-1">Going live soon</p>
            <p className="text-xs text-white/35 leading-relaxed">
              Live scores, goal scorers and match events will appear here automatically once kick-off begins. This page refreshes every 30 seconds.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
