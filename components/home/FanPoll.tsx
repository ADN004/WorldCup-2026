'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, CheckCircle2, TrendingUp, Search, X } from 'lucide-react'
import { TEAMS } from '@/data/teams'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { Section } from '@/components/ui/GlassCard'
import { useAppStore } from '@/store/useAppStore'
import { castVote, setLocalVote, getLocalVote, clearLocalVote, subscribeToPoll } from '@/lib/firebase'
import { cn, formatNumber } from '@/lib/utils'
import type { FanPoll as FanPollType } from '@/types'

// Teams sorted by fan base desc — most popular appear first in the voting grid
const TEAMS_BY_FANBASE = [...TEAMS].sort((a, b) => b.fanBase - a.fanBase)

const EMPTY_POLL: FanPollType = {
  totalVotes:  0,
  lastUpdated: new Date().toISOString(),
  entries:     [],
}

export function FanPoll() {
  const { preferences, setHasVoted, clearVote, setFanPoll } = useAppStore()
  const [poll, setPoll]               = useState<FanPollType>(EMPTY_POLL)
  const [loaded, setLoaded]           = useState(false)
  const [voting, setVoting]           = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [showAll, setShowAll]         = useState(false)
  const [search, setSearch]           = useState('')

  const hasVoted    = preferences.hasVoted
  const votedTeamId = preferences.votedTeamId

  useEffect(() => {
    const { hasVoted: lv, teamId } = getLocalVote()
    if (lv && teamId && !hasVoted) setHasVoted(teamId)

    const unsubscribe = subscribeToPoll(data => {
      const entries = (data.entries ?? []).sort((a, b) => b.votes - a.votes)
      const live: FanPollType = {
        totalVotes:  entries.reduce((sum, e) => sum + e.votes, 0),
        lastUpdated: data.lastUpdated,
        entries,
      }
      setPoll(live)
      setFanPoll(live)
      setLoaded(true)
    })
    return unsubscribe
  }, [])

  const filteredTeams = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return TEAMS_BY_FANBASE
    return TEAMS_BY_FANBASE.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.shortName.toLowerCase().includes(q) ||
      t.group.toLowerCase().includes(q)
    )
  }, [search])

  const topEntries = useMemo(() => {
    const voteMap = new Map((poll.entries ?? []).map(e => [e.teamId, e.votes]))
    return TEAMS
      .map(t => ({ teamId: t.id, votes: voteMap.get(t.id) ?? 0 }))
      .sort((a, b) => b.votes - a.votes)
      .slice(0, showAll ? 20 : 10)
  }, [poll.entries, showAll])

  const totalVotes = poll.totalVotes

  const handleVote = async () => {
    if (!selectedTeam || voting || hasVoted) return
    setVoting(true)
    try {
      const ok = await castVote(selectedTeam)
      if (ok) {
        setLocalVote(selectedTeam)
        setHasVoted(selectedTeam)
      } else {
        setLocalVote(selectedTeam)
        setHasVoted(selectedTeam)
        setPoll(prev => {
          const exists = prev.entries.some(e => e.teamId === selectedTeam)
          const entries = exists
            ? prev.entries.map(e => e.teamId === selectedTeam ? { ...e, votes: e.votes + 1 } : e)
            : [...prev.entries, { teamId: selectedTeam, votes: 1 }]
          return { ...prev, totalVotes: prev.totalVotes + 1, entries }
        })
      }
    } finally {
      setVoting(false)
    }
  }

  return (
    <Section title="Fan Poll" subtitle="Which Team Are You Supporting?">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* ── Voting panel ─────────────────────────────────────── */}
        <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-electric-blue flex-shrink-0" />
              <span className="text-sm font-semibold text-white/70">
                {totalVotes > 0 ? `${formatNumber(totalVotes)} votes cast` : 'Be the first to vote!'}
              </span>
            </div>
            {hasVoted && (
              <div className="flex items-center gap-1.5 badge badge-success">
                <CheckCircle2 className="w-3 h-3" />
                Voted
              </div>
            )}
          </div>

          {hasVoted ? (
            <div className="text-center py-6">
              <div className="flex justify-center mb-3">
                {(() => {
                  const t = TEAMS.find(t => t.id === votedTeamId)
                  return t ? <TeamFlag code={t.code} name={t.name} size="lg" circle /> : null
                })()}
              </div>
              <p className="text-sm text-white/60">
                You voted for{' '}
                <span className="text-gold font-semibold">
                  {TEAMS.find(t => t.id === votedTeamId)?.name ?? 'your team'}
                </span>
              </p>
              <p className="text-xs text-white/30 mt-1">Results are shown on the right →</p>
              <button
                onClick={() => { clearLocalVote(); clearVote() }}
                className="mt-4 text-xs text-white/30 hover:text-white/60 underline underline-offset-2 transition-colors"
              >
                Change my vote
              </button>
            </div>
          ) : (
            <>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search team…"
                  className="w-full pl-8 pr-8 py-2 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-electric-blue/50 transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Team grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1 no-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredTeams.length === 0 ? (
                    <motion.p
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="col-span-full text-center text-xs text-white/30 py-6"
                    >
                      No teams match "{search}"
                    </motion.p>
                  ) : (
                    filteredTeams.map(team => (
                      <motion.button
                        key={team.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setSelectedTeam(team.id)}
                        className={cn(
                          'flex items-center gap-2 p-2.5 rounded-xl border transition-all text-left w-full',
                          selectedTeam === team.id
                            ? 'border-gold/60 bg-gold/10 text-white shadow-[0_0_12px_rgba(245,197,24,0.15)]'
                            : 'border-glass-border bg-glass-white text-white/60 hover:border-glass-border-hover hover:text-white hover:bg-white/5'
                        )}
                      >
                        <TeamFlag code={team.code} name={team.name} size="sm" circle />
                        <span className="text-xs font-semibold truncate leading-tight">
                          {team.shortName}
                        </span>
                      </motion.button>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Selected team preview */}
              <AnimatePresence>
                {selectedTeam && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gold/8 border border-gold/20"
                  >
                    {(() => {
                      const t = TEAMS.find(t => t.id === selectedTeam)!
                      return (
                        <>
                          <TeamFlag code={t.code} name={t.name} size="sm" circle />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                            <p className="text-xs text-white/40">Group {t.group}</p>
                          </div>
                          <button
                            onClick={() => setSelectedTeam(null)}
                            className="text-white/30 hover:text-white/60 flex-shrink-0"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vote button */}
              <button
                onClick={handleVote}
                disabled={!selectedTeam || voting}
                className={cn(
                  'btn w-full',
                  selectedTeam && !voting
                    ? 'btn-primary'
                    : 'btn-ghost opacity-40 cursor-not-allowed'
                )}
              >
                {voting ? 'Casting vote…' : selectedTeam ? `Vote for ${TEAMS.find(t => t.id === selectedTeam)?.shortName}` : 'Select a team first'}
              </button>
            </>
          )}
        </div>

        {/* ── Results panel ────────────────────────────────────── */}
        <div className="glass rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gold" />
            <span className="text-sm font-semibold text-white/70">Fan Favorites</span>
          </div>

          {!loaded ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-3">
              <p className="text-sm text-white/30">Loading results…</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {topEntries.map((entry, i) => {
                const team    = TEAMS.find(t => t.id === entry.teamId)
                const pct     = totalVotes > 0 ? (entry.votes / totalVotes) * 100 : 0
                const isVoted = entry.teamId === votedTeamId
                if (!team) return null

                return (
                  <motion.div
                    key={entry.teamId}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-2.5"
                  >
                    <span className={cn(
                      'w-5 text-xs font-bold tabular-nums text-center flex-shrink-0',
                      i === 0 ? 'text-gold' : i === 1 ? 'text-white/50' : i === 2 ? 'text-warning/70' : 'text-white/20'
                    )}>
                      {i + 1}
                    </span>

                    <TeamFlag code={team.code} name={team.name} size="xs" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn(
                          'text-xs font-semibold truncate',
                          isVoted ? 'text-gold' : 'text-white/80'
                        )}>
                          {team.shortName}
                          {isVoted && <span className="ml-1">✓</span>}
                        </span>
                        <span className="text-xs font-stats text-white/40 tabular-nums flex-shrink-0 ml-2">
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(pct, 100)}%` }}
                          transition={{ duration: 0.8, delay: i * 0.03, ease: 'easeOut' }}
                          style={{
                            background: i === 0
                              ? 'linear-gradient(90deg,#F5C518,#D4A017)'
                              : isVoted
                              ? 'linear-gradient(90deg,#00C2FF,#0070FF)'
                              : 'linear-gradient(90deg,rgba(255,255,255,0.25),rgba(255,255,255,0.1))',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {loaded && (
            <button
              onClick={() => setShowAll(v => !v)}
              className="mt-auto text-xs text-white/30 hover:text-white/60 transition-colors text-center pt-1"
            >
              {showAll ? 'Show top 10' : 'Show top 20'}
            </button>
          )}
        </div>

      </div>
    </Section>
  )
}
