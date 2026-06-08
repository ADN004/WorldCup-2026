'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { X, MapPin, Zap, ExternalLink } from 'lucide-react'
import type { Match } from '@/types'
import { getTeam } from '@/data/teams'
import { getStadium } from '@/data/stadiums'
import { TeamFlag } from './TeamFlag'
import { LiveBadge } from './LiveBadge'
import { CountdownTimer } from './CountdownTimer'
import { cn, formatScore, importanceLabel, importanceColor, isTBD, formatStageLabel } from '@/lib/utils'
import { formatMatchTime, formatMatchDate, isMatchUpcoming } from '@/lib/timeUtils'
import { useTimezone } from '@/store/useAppStore'

interface Props {
  match: Match
  onClose: () => void
}

export function MatchDetailModal({ match, onClose }: Props) {
  const tz        = useTimezone()
  const homeTeam  = isTBD(match.homeTeamId) ? null : getTeam(match.homeTeamId)
  const awayTeam  = isTBD(match.awayTeamId) ? null : getTeam(match.awayTeamId)
  const stadium   = getStadium(match.stadiumId)
  const isLive    = match.status === 'LIVE' || match.status === 'HALF_TIME'
  const isDone    = match.status === 'FINISHED'
  const isUpcoming = isMatchUpcoming(match.utcDate)
  const isBig     = match.importance === 'MUST_WATCH' || match.importance === 'FINAL'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const homePrimary = homeTeam?.primaryColor ?? '#1a2540'
  const awayPrimary = awayTeam?.primaryColor ?? '#1a2540'

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: 'rgba(2,7,16,0.88)', backdropFilter: 'blur(10px)' }}
    >
      {/* Card — mobile: bottom sheet · desktop: centered dialog with all-round corners */}
      <motion.div
        className="relative w-full sm:max-w-[440px] rounded-t-[28px] sm:rounded-[28px] overflow-hidden"
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 48, opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#08111e',
          border: '1px solid rgba(255,255,255,0.09)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Gold accent bar — important matches only */}
        {isBig && <div className="h-[2px] bg-gradient-gold" />}

        {/* Scrollable inner — keeps border-radius on outer, scroll on inner */}
        <div style={{ maxHeight: '92dvh', overflowY: 'auto' }}>

          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-0 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/12" />
          </div>

          {/* ── Hero section with team color gradient ──────────────────────── */}
          <div
            className="relative px-5 pt-4 pb-7"
            style={{
              background: `linear-gradient(135deg, ${homePrimary}28 0%, rgba(8,17,30,0) 42%, rgba(8,17,30,0) 58%, ${awayPrimary}28 100%)`,
            }}
          >
            {/* Stage label + close */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[0.62rem] font-bold text-white/30 tracking-[0.22em] uppercase">
                  {match.stage === 'GROUP'
                    ? `Group ${match.group}${match.matchday ? ` · Matchday ${match.matchday}` : ''}`
                    : formatStageLabel(match.stage)}
                </p>
                {isBig && (
                  <p className={cn('text-xs font-bold tracking-wider mt-1', importanceColor(match.importance))}>
                    {importanceLabel(match.importance)}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors flex-shrink-0 mt-0.5"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-white/45" />
              </button>
            </div>

            {/* Teams + score row */}
            <div className="flex items-center gap-3">
              {/* Home */}
              <div className="flex-1 flex flex-col items-center gap-2.5 text-center min-w-0">
                {homeTeam ? (
                  <>
                    <TeamFlag code={homeTeam.code} name={homeTeam.name} size="xl" showShadow />
                    <div className="min-w-0 w-full">
                      <p className="font-heading font-bold text-white text-sm leading-tight truncate px-1">
                        {homeTeam.name}
                      </p>
                      <p className="text-[0.6rem] text-white/28 mt-0.5">FIFA #{homeTeam.fifaRanking}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-white/25 text-base font-bold">TBD</p>
                )}
              </div>

              {/* Centre */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0 px-2 min-w-[100px]">
                {isLive ? (
                  <>
                    <span className="text-4xl font-stats text-white leading-none tabular-nums">
                      {formatScore(match.score.home, match.score.away)}
                    </span>
                    <LiveBadge minute={match.minute} isHalfTime={match.status === 'HALF_TIME'} size="md" />
                  </>
                ) : isDone ? (
                  <>
                    <span className="text-4xl font-stats text-white leading-none tabular-nums">
                      {formatScore(match.score.home, match.score.away)}
                    </span>
                    <span className="text-[0.58rem] font-bold text-white/30 tracking-widest uppercase">Full Time</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-stats text-electric-blue leading-none">
                      {formatMatchTime(match.utcDate, tz)}
                    </span>
                    <span className="text-[0.6rem] text-white/30 text-center leading-tight">
                      {formatMatchDate(match.utcDate, tz)}
                    </span>
                  </>
                )}
                <span className="text-[0.55rem] font-bold text-white/15 tracking-[0.2em] uppercase mt-0.5">vs</span>
              </div>

              {/* Away */}
              <div className="flex-1 flex flex-col items-center gap-2.5 text-center min-w-0">
                {awayTeam ? (
                  <>
                    <TeamFlag code={awayTeam.code} name={awayTeam.name} size="xl" showShadow />
                    <div className="min-w-0 w-full">
                      <p className="font-heading font-bold text-white text-sm leading-tight truncate px-1">
                        {awayTeam.name}
                      </p>
                      <p className="text-[0.6rem] text-white/28 mt-0.5">FIFA #{awayTeam.fifaRanking}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-white/25 text-base font-bold">TBD</p>
                )}
              </div>
            </div>

            {/* Countdown */}
            {isUpcoming && !isLive && (
              <div className="mt-6 flex flex-col items-center gap-2">
                <p className="text-[0.6rem] font-bold text-white/22 tracking-[0.22em] uppercase">Kick-off in</p>
                <CountdownTimer utcDate={match.utcDate} size="sm" showDays />
              </div>
            )}
          </div>

          {/* ── Stadium ──────────────────────────────────────────────────────── */}
          {stadium && (
            <>
              <div className="h-px" style={{ background: 'rgba(255,255,255,0.055)' }} />
              <div className="px-5 py-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.12)' }}>
                    <MapPin className="w-3.5 h-3.5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white leading-tight">{stadium.name}</p>
                    <p className="text-[0.65rem] text-white/32 mt-0.5">{stadium.city}, {stadium.country}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-2xl p-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-base font-stats text-gold">{stadium.capacity.toLocaleString()}</p>
                    <p className="text-[0.62rem] text-white/28 mt-0.5 tracking-wider">CAPACITY</p>
                  </div>
                  <div className="rounded-2xl p-3 text-center"
                    style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-sm font-semibold text-white">{stadium.surface}</p>
                    <p className="text-[0.62rem] text-white/28 mt-0.5 tracking-wider">SURFACE</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Going live notice ─────────────────────────────────────────── */}
          {isUpcoming && (
            <>
              <div className="h-px mx-5" style={{ background: 'rgba(255,255,255,0.055)' }} />
              <div className="px-5 py-4">
                <div className="rounded-2xl p-4 flex items-start gap-3"
                  style={{ background: 'rgba(0,194,255,0.05)', border: '1px solid rgba(0,194,255,0.1)' }}>
                  <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(0,194,255,0.1)' }}>
                    <Zap className="w-3.5 h-3.5 text-electric-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-electric-blue mb-1">Going live soon</p>
                    <p className="text-[0.72rem] text-white/38 leading-relaxed">
                      Once kick-off starts, we'll show live scores, lineups, goal scorers,
                      cards, and real-time match events right here.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Match page CTA ────────────────────────────────────────────── */}
          {(isLive || isDone || isUpcoming) && (
            <>
              <div className="h-px mx-5" style={{ background: 'rgba(255,255,255,0.055)' }} />
              <div className="px-5 py-4">
                <Link
                  href={`/matches/${match.id}`}
                  onClick={onClose}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all',
                    isLive
                      ? 'text-live'
                      : isDone
                      ? 'text-white/70 hover:text-white'
                      : 'text-white/55 hover:text-white'
                  )}
                  style={
                    isLive
                      ? { background: 'rgba(255,53,72,0.12)', border: '1px solid rgba(255,53,72,0.25)' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {isLive ? 'View Live Match' : isDone ? 'View Match Details' : 'Match Page'}
                </Link>
              </div>
            </>
          )}

          {/* Bottom safe area */}
          <div className="h-5 sm:h-3" />
        </div>
      </motion.div>
    </motion.div>
  )
}
