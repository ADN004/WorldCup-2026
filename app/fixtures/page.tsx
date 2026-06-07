'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Filter, Clock, MapPin, Zap } from 'lucide-react'
import { FIXTURES } from '@/data/fixtures'
import { TEAMS } from '@/data/teams'
import { MatchCard } from '@/components/ui/MatchCard'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { cn } from '@/lib/utils'
import { getMatchDayLabel, getDateKey } from '@/lib/timeUtils'
import { useAppStore } from '@/store/useAppStore'
import type { MatchStage, MatchStatus } from '@/types'

const STAGE_FILTERS: { label: string; value: MatchStage | 'ALL' }[] = [
  { label: 'All',        value: 'ALL' },
  { label: 'Group',      value: 'GROUP' },
  { label: 'Round of 32',value: 'ROUND_OF_32' },
  { label: 'Round of 16',value: 'ROUND_OF_16' },
  { label: 'Quarter Final',value: 'QUARTER_FINAL' },
  { label: 'Semi Final', value: 'SEMI_FINAL' },
  { label: 'Final',      value: 'FINAL' },
]

const STATUS_FILTERS: { label: string; value: MatchStatus | 'ALL' }[] = [
  { label: 'All',      value: 'ALL' },
  { label: 'Live',     value: 'LIVE' },
  { label: 'Upcoming', value: 'SCHEDULED' },
  { label: 'Finished', value: 'FINISHED' },
]

export default function FixturesPage() {
  const [stageFilter,  setStageFilter]  = useState<MatchStage | 'ALL'>('ALL')
  const [statusFilter, setStatusFilter] = useState<MatchStatus | 'ALL'>('ALL')
  const [groupFilter,  setGroupFilter]  = useState<string>('ALL')
  const [teamFilter,   setTeamFilter]   = useState<string>('ALL')
  const [showFilters,  setShowFilters]  = useState(false)
  const tz = useAppStore(s => s.preferences.timeZone)

  const filtered = useMemo(() => {
    return FIXTURES.filter(m => {
      if (stageFilter  !== 'ALL' && m.stage  !== stageFilter)  return false
      if (statusFilter !== 'ALL' && m.status !== statusFilter) return false
      if (groupFilter  !== 'ALL' && m.group  !== groupFilter)  return false
      if (teamFilter   !== 'ALL' && m.homeTeamId !== teamFilter && m.awayTeamId !== teamFilter) return false
      return true
    })
  }, [stageFilter, statusFilter, groupFilter, teamFilter])

  // Group by selected timezone date
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>()
    for (const m of filtered) {
      const key = getDateKey(m.utcDate, tz)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(m)
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered, tz])

  const liveCount = FIXTURES.filter(m => m.status === 'LIVE' || m.status === 'HALF_TIME').length

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-1">Match Center</p>
        <div className="flex items-start justify-between gap-4">
          <h1 className="section-title">Fixtures</h1>
          <div className="flex items-center gap-2 flex-shrink-0">
            {liveCount > 0 && (
              <div className="live-indicator">
                <span className="live-dot" />
                {liveCount} Live
              </div>
            )}
            <button
              onClick={() => setShowFilters(v => !v)}
              className={cn('btn btn-ghost text-sm gap-1.5', showFilters && 'glass-gold')}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-5 mb-6 space-y-4"
        >
          {/* Stage */}
          <div>
            <p className="section-label mb-2">Stage</p>
            <div className="flex flex-wrap gap-2">
              {STAGE_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setStageFilter(f.value as MatchStage | 'ALL')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                    stageFilter === f.value
                      ? 'border-gold/40 bg-gold/10 text-gold'
                      : 'border-glass-border text-white/50 hover:text-white'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <p className="section-label mb-2">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map(f => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value as MatchStatus | 'ALL')}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                    statusFilter === f.value
                      ? 'border-electric-blue/40 bg-electric-blue/10 text-electric-blue'
                      : 'border-glass-border text-white/50 hover:text-white'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Group filter */}
          <div>
            <p className="section-label mb-2">Group</p>
            <div className="flex flex-wrap gap-2">
              {['ALL', 'A','B','C','D','E','F','G','H','I','J','K','L'].map(g => (
                <button
                  key={g}
                  onClick={() => setGroupFilter(g)}
                  className={cn(
                    'w-9 h-9 rounded-xl text-xs font-bold transition-all border',
                    groupFilter === g
                      ? 'border-gold/40 bg-gold/10 text-gold'
                      : 'border-glass-border text-white/40 hover:text-white'
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Team filter */}
          <div>
            <p className="section-label mb-2">Team</p>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto no-scrollbar">
              <button
                onClick={() => setTeamFilter('ALL')}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                  teamFilter === 'ALL'
                    ? 'border-gold/40 bg-gold/10 text-gold'
                    : 'border-glass-border text-white/50 hover:text-white'
                )}
              >
                All Teams
              </button>
              {TEAMS.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTeamFilter(t.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                    teamFilter === t.id
                      ? 'border-gold/40 bg-gold/10 text-white'
                      : 'border-glass-border text-white/50 hover:text-white'
                  )}
                >
                  <TeamFlag code={t.code} name={t.name} size="xs" />
                  {t.shortName}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setStageFilter('ALL'); setStatusFilter('ALL'); setGroupFilter('ALL'); setTeamFilter('ALL') }}
            className="text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            Clear all filters
          </button>
        </motion.div>
      )}

      {/* Match count */}
      <div className="flex items-center gap-2 mb-6 text-sm text-white/40">
        <Calendar className="w-4 h-4" />
        <span>{filtered.length} matches</span>
        {filtered.length !== FIXTURES.length && (
          <span>(filtered from {FIXTURES.length})</span>
        )}
      </div>

      {/* Grouped matches */}
      {grouped.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-white/40 text-sm">No matches found for the selected filters.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {grouped.map(([dk, matches]) => {
            const dayLabel = getMatchDayLabel(matches[0].utcDate, tz)
            const isToday  = dayLabel === 'Today'

            return (
              <div key={dk}>
                {/* Day header */}
                <div className="flex items-center gap-3 mb-3 sticky top-16 z-10 py-2">
                  <div className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-semibold border backdrop-blur-xl',
                    isToday
                      ? 'bg-gold/10 border-gold/30 text-gold'
                      : 'bg-navy-800/80 border-glass-border text-white/60'
                  )}>
                    {dayLabel}
                  </div>
                  <div className="text-xs text-white/25">{matches.length} matches</div>
                  <div className="flex-1 h-px bg-glass-border" />
                </div>

                {/* Match list */}
                <div className="flex flex-col gap-3">
                  {matches.map((match, mi) => (
                    <MatchCard
                      key={match.id}
                      match={match}
                      animate
                      delay={mi * 0.04}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
