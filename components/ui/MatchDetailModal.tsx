'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, MapPin, Zap } from 'lucide-react'
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

  return (
    /* Backdrop */
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: 'rgba(3,9,18,0.85)', backdropFilter: 'blur(6px)' }}
    >
      {/* Sheet */}
      <motion.div
        className="relative w-full sm:max-w-md"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(180deg,#0a1628 0%,#050e1c 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '24px 24px 0 0',
          maxHeight: '92dvh',
          overflowY: 'auto',
        }}
      >
        {/* Gold accent top bar for big matches */}
        {isBig && <div className="h-0.5 bg-gradient-gold rounded-t-3xl" />}

        {/* Drag handle (mobile only) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-9 h-1 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <div>
            <p className="text-[0.65rem] font-bold text-white/35 tracking-[0.2em] uppercase">
              {formatStageLabel(match.stage)}{match.group ? ` · Group ${match.group}` : ''}
            </p>
            {isBig && (
              <p className={cn('text-xs font-bold tracking-wider mt-0.5', importanceColor(match.importance))}>
                {importanceLabel(match.importance)}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* Teams + Score/Time */}
        <div className="px-5 pt-4 pb-6">
          <div className="flex items-center justify-between gap-2">
            {/* Home team */}
            <div className="flex-1 flex flex-col items-center gap-3 text-center min-w-0">
              {homeTeam ? (
                <>
                  <TeamFlag code={homeTeam.code} name={homeTeam.name} size="xl" showShadow />
                  <div className="min-w-0 w-full">
                    <p className="font-heading font-bold text-white text-sm sm:text-base leading-tight truncate px-1">
                      {homeTeam.name}
                    </p>
                    <p className="text-[0.65rem] text-white/30 mt-0.5">FIFA #{homeTeam.fifaRanking}</p>
                  </div>
                </>
              ) : (
                <p className="text-white/25 text-base font-bold">TBD</p>
              )}
            </div>

            {/* Centre: score or kick-off time */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 px-1">
              {isLive ? (
                <>
                  <span className="text-3xl sm:text-4xl font-stats text-white">
                    {formatScore(match.score.home, match.score.away)}
                  </span>
                  <LiveBadge minute={match.minute} isHalfTime={match.status === 'HALF_TIME'} size="md" />
                </>
              ) : isDone ? (
                <>
                  <span className="text-3xl sm:text-4xl font-stats text-white">
                    {formatScore(match.score.home, match.score.away)}
                  </span>
                  <span className="text-[0.65rem] font-bold text-white/35 tracking-widest">FULL TIME</span>
                </>
              ) : (
                <>
                  <span className="text-2xl sm:text-3xl font-stats text-electric-blue leading-none">
                    {formatMatchTime(match.utcDate, tz)}
                  </span>
                  <span className="text-[0.65rem] text-white/35 text-center">
                    {formatMatchDate(match.utcDate, tz)}
                  </span>
                </>
              )}

              <div className="text-[0.6rem] font-bold text-white/20 tracking-widest uppercase mt-1">VS</div>
            </div>

            {/* Away team */}
            <div className="flex-1 flex flex-col items-center gap-3 text-center min-w-0">
              {awayTeam ? (
                <>
                  <TeamFlag code={awayTeam.code} name={awayTeam.name} size="xl" showShadow />
                  <div className="min-w-0 w-full">
                    <p className="font-heading font-bold text-white text-sm sm:text-base leading-tight truncate px-1">
                      {awayTeam.name}
                    </p>
                    <p className="text-[0.65rem] text-white/30 mt-0.5">FIFA #{awayTeam.fifaRanking}</p>
                  </div>
                </>
              ) : (
                <p className="text-white/25 text-base font-bold">TBD</p>
              )}
            </div>
          </div>

          {/* Countdown for upcoming matches */}
          {isUpcoming && !isLive && (
            <div className="mt-7 flex flex-col items-center gap-2">
              <p className="text-[0.65rem] font-bold text-white/25 tracking-[0.2em] uppercase">
                Kick-off in
              </p>
              <CountdownTimer utcDate={match.utcDate} size="sm" showDays />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mx-5" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Stadium */}
        {stadium && (
          <div className="px-5 py-5 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white leading-tight">{stadium.name}</p>
                <p className="text-xs text-white/35 mt-0.5">{stadium.city}, {stadium.country}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-base font-stats text-gold">{stadium.capacity.toLocaleString()}</p>
                <p className="text-[0.65rem] text-white/30 mt-0.5 tracking-wide">CAPACITY</p>
              </div>
              <div
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-sm font-semibold text-white">{stadium.surface}</p>
                <p className="text-[0.65rem] text-white/30 mt-0.5 tracking-wide">SURFACE</p>
              </div>
            </div>
          </div>
        )}

        {/* Coming live teaser — only for upcoming matches */}
        {isUpcoming && (
          <>
            <div className="h-px mx-5" style={{ background: 'rgba(255,255,255,0.06)' }} />
            <div className="px-5 py-5">
              <div
                className="rounded-2xl p-4 flex items-start gap-3"
                style={{ background: 'rgba(0,194,255,0.05)', border: '1px solid rgba(0,194,255,0.12)' }}
              >
                <div className="p-1.5 rounded-lg flex-shrink-0" style={{ background: 'rgba(0,194,255,0.1)' }}>
                  <Zap className="w-3.5 h-3.5 text-electric-blue" />
                </div>
                <div>
                  <p className="text-xs font-bold text-electric-blue mb-1">Going live soon</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    Once kick-off starts, we'll show live scores, lineups, goal scorers,
                    cards, and real-time match events right here.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Bottom safe area */}
        <div className="h-4 sm:h-2" />
      </motion.div>
    </motion.div>
  )
}
