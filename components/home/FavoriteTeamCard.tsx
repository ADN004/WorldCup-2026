'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Star, ChevronDown, ChevronUp, X } from 'lucide-react'
import { TEAMS } from '@/data/teams'
import { getTeamFixtures } from '@/data/fixtures'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { MatchCard } from '@/components/ui/MatchCard'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { useAppStore } from '@/store/useAppStore'
import { isMatchUpcoming } from '@/lib/timeUtils'

export function FavoriteTeamCard() {
  const { preferences, setFavoriteTeam } = useAppStore()
  const [selecting, setSelecting] = useState(false)
  const [search, setSearch] = useState('')

  const favoriteId = preferences.favoriteTeamId
  const team       = favoriteId ? TEAMS.find(t => t.id === favoriteId) : null
  const matches    = team ? getTeamFixtures(team.id) : []
  const nextMatch  = matches.find(m => isMatchUpcoming(m.utcDate) && m.homeTeamId !== 'TBD')
  const filtered   = TEAMS.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.shortName.toLowerCase().includes(search.toLowerCase())
  )

  if (!favoriteId) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-gold" />
          <h3 className="font-heading text-lg font-semibold text-white">My Team</h3>
        </div>
        <p className="text-sm text-white/40 mb-4">Pick your team for a personalised experience.</p>
        <button
          onClick={() => setSelecting(true)}
          className="btn btn-primary w-full"
        >
          Choose My Team
        </button>

        <AnimatePresence>
          {selecting && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search team…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input mb-3"
              />
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto no-scrollbar">
                {filtered.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setFavoriteTeam(t.id); setSelecting(false) }}
                    className="flex items-center gap-2 p-2.5 rounded-xl glass glass-hover text-left"
                  >
                    <TeamFlag code={t.code} name={t.name} size="sm" circle />
                    <span className="text-xs font-semibold text-white/70 truncate">{t.shortName}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (!team) return null

  return (
    <div
      className="glass rounded-2xl p-5 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(${parseInt(team.primaryColor.slice(1,3),16)},${parseInt(team.primaryColor.slice(3,5),16)},${parseInt(team.primaryColor.slice(5,7),16)},0.08) 0%, rgba(255,255,255,0.04) 100%)`,
        borderColor: `${team.primaryColor}22`,
      }}
    >
      {/* Remove button */}
      <button
        onClick={() => setFavoriteTeam(null)}
        className="absolute top-3 right-3 p-1.5 rounded-lg text-white/25 hover:text-white/60 transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Team header */}
      <div className="flex items-center gap-3 mb-4">
        <TeamFlag code={team.code} name={team.name} size="lg" showShadow />
        <div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-gold fill-gold" />
            <span className="text-xs text-gold/80 font-semibold">My Team</span>
          </div>
          <h3 className="font-heading text-xl font-bold text-white">{team.name}</h3>
          <p className="text-xs text-white/40">Group {team.group} · FIFA #{team.fifaRanking}</p>
        </div>
      </div>

      {/* Next match countdown */}
      {nextMatch && (
        <div className="glass rounded-xl p-3 mb-3">
          <p className="text-xs text-white/30 mb-2 font-semibold tracking-wider uppercase">Next Match</p>
          <MatchCard match={nextMatch} compact />
          <CountdownTimer
            utcDate={nextMatch.utcDate}
            label="Kicks off in"
            size="sm"
            className="mt-3"
          />
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Rank',     value: `#${team.fifaRanking}`,    sub: 'FIFA' },
          { label: 'Group',    value: team.group,                 sub: 'Stage' },
          { label: 'Trophies', value: team.bestResult.includes('Winners') ? '🏆' : '–', sub: '' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="glass rounded-xl p-2.5 text-center">
            <p className="font-stats text-lg text-white leading-none">{value}</p>
            <p className="text-[0.6rem] text-white/30 font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      <Link href={`/teams/${team.id}`} className="btn btn-ghost w-full mt-3 text-sm">
        View Full Profile
      </Link>
    </div>
  )
}
