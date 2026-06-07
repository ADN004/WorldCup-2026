'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'
import type { Match } from '@/types'
import { getTeam } from '@/data/teams'
import { getStadium } from '@/data/stadiums'
import { TeamFlag } from './TeamFlag'
import { LiveBadge } from './LiveBadge'
import { CountdownTimer } from './CountdownTimer'
import { MatchDetailModal } from './MatchDetailModal'
import { cn, formatScore, importanceLabel, importanceColor, isTBD } from '@/lib/utils'
import { formatMatchTime, formatMatchDate, isMatchUpcoming } from '@/lib/timeUtils'

interface MatchCardProps {
  match: Match
  compact?: boolean
  animate?: boolean
  delay?: number
}

export function MatchCard({ match, compact = false, animate = false, delay = 0 }: MatchCardProps) {
  const [showModal, setShowModal] = useState(false)

  const homeTeam  = isTBD(match.homeTeamId) ? null : getTeam(match.homeTeamId)
  const awayTeam  = isTBD(match.awayTeamId) ? null : getTeam(match.awayTeamId)
  const stadium   = getStadium(match.stadiumId)
  const isLive    = match.status === 'LIVE' || match.status === 'HALF_TIME'
  const isDone    = match.status === 'FINISHED'
  const isUpcoming = isMatchUpcoming(match.utcDate)

  const card = (
    <button
      onClick={() => setShowModal(true)}
      className={cn(
        'match-card group relative overflow-hidden w-full text-left cursor-pointer',
        'hover:border-white/15 hover:bg-white/[0.03] transition-colors',
        isLive && 'border-live/30 bg-gradient-live',
        isDone && 'opacity-70',
        compact && 'p-3',
      )}
    >
      {/* Live glow */}
      {isLive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,53,72,0.06) 0%, transparent 70%)' }}
        />
      )}

      {/* Importance ribbon */}
      {(match.importance === 'MUST_WATCH' || match.importance === 'FINAL') && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-gold" />
      )}

      {/* Home team */}
      <div className="flex items-center gap-2 min-w-0">
        {homeTeam ? (
          <>
            <TeamFlag code={homeTeam.code} name={homeTeam.name} size="sm" />
            <span className={cn(
              'font-body font-semibold truncate',
              compact ? 'text-sm' : 'text-base',
            )}>
              {compact ? homeTeam.shortName : homeTeam.name}
            </span>
          </>
        ) : (
          <span className="text-white/30 text-sm font-medium">TBD</span>
        )}
      </div>

      {/* Centre: score / time */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        {isLive ? (
          <>
            <span className="score-display-sm text-white">
              {formatScore(match.score.home, match.score.away)}
            </span>
            <LiveBadge minute={match.minute} isHalfTime={match.status === 'HALF_TIME'} size="sm" />
          </>
        ) : isDone ? (
          <>
            <span className="score-display-sm text-white">
              {formatScore(match.score.home, match.score.away)}
            </span>
            <span className="text-xs text-white/30 font-semibold tracking-wide">FT</span>
          </>
        ) : (
          <>
            <span className={cn(
              'font-stats text-electric-blue leading-none',
              compact ? 'text-xl' : 'text-2xl'
            )}>
              {formatMatchTime(match.utcDate)}
            </span>
            <span className="text-[0.65rem] text-white/30 font-semibold tracking-wide">
              {formatMatchDate(match.utcDate)}
            </span>
          </>
        )}
      </div>

      {/* Away team */}
      <div className="flex items-center justify-end gap-2 min-w-0">
        {awayTeam ? (
          <>
            <span className={cn(
              'font-body font-semibold truncate',
              compact ? 'text-sm' : 'text-base',
            )}>
              {compact ? awayTeam.shortName : awayTeam.name}
            </span>
            <TeamFlag code={awayTeam.code} name={awayTeam.name} size="sm" />
          </>
        ) : (
          <span className="text-white/30 text-sm font-medium">TBD</span>
        )}
      </div>

      {/* Bottom meta row */}
      {!compact && (
        <div className="col-span-3 flex items-center justify-between pt-2 mt-1 border-t border-glass-border">
          <div className="flex items-center gap-1.5 text-[0.7rem] text-white/30">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{stadium?.name ?? '–'}, {stadium?.city ?? ''}</span>
          </div>
          <div className={cn('text-[0.68rem] font-bold tracking-wider', importanceColor(match.importance))}>
            {importanceLabel(match.importance)}
          </div>
        </div>
      )}

      {/* Countdown */}
      {!compact && isUpcoming && !isLive && !isDone && (
        <div className="col-span-3">
          <CountdownTimer
            utcDate={match.utcDate}
            size="sm"
            showDays={false}
            className="py-1"
          />
        </div>
      )}
    </button>
  )

  const wrapped = animate ? (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay }}
    >
      {card}
    </motion.div>
  ) : card

  return (
    <>
      {wrapped}
      <AnimatePresence>
        {showModal && (
          <MatchDetailModal match={match} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
