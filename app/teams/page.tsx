'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { TEAMS } from '@/data/teams'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { cn } from '@/lib/utils'

const CONTINENTS = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC']
const GROUPS     = ['All', 'A','B','C','D','E','F','G','H','I','J','K','L']

export default function TeamsPage() {
  const [search,    setSearch]    = useState('')
  const [continent, setContinent] = useState('All')
  const [group,     setGroup]     = useState('All')

  const filtered = TEAMS.filter(t => {
    const q = search.toLowerCase()
    const matchSearch = !q || t.name.toLowerCase().includes(q) || t.shortName.toLowerCase().includes(q)
    const matchCont   = continent === 'All' || t.continent === continent
    const matchGroup  = group === 'All' || t.group === group
    return matchSearch && matchCont && matchGroup
  })

  return (
    <div className="page-container py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="section-label mb-1">FIFA World Cup 2026</p>
        <h1 className="section-title">All 48 Teams</h1>
      </div>

      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          <input
            type="text"
            placeholder="Search teams…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-9"
          />
        </div>
      </div>

      {/* Continent filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CONTINENTS.map(c => (
          <button
            key={c}
            onClick={() => setContinent(c)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
              continent === c
                ? 'border-gold/40 bg-gold/10 text-gold'
                : 'border-glass-border text-white/40 hover:text-white glass'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Group filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {GROUPS.map(g => (
          <button
            key={g}
            onClick={() => setGroup(g)}
            className={cn(
              'w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold border transition-all',
              group === g
                ? 'border-electric-blue/40 bg-electric-blue/10 text-electric-blue'
                : 'border-glass-border text-white/30 hover:text-white glass'
            )}
          >
            {g}
          </button>
        ))}
      </div>

      <p className="text-xs text-white/30 mb-4">{filtered.length} teams</p>

      {/* Team grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filtered.map((team, i) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.3, delay: (i % 12) * 0.03 }}
          >
            <Link
              href={`/teams/${team.id}`}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl glass glass-hover group cursor-pointer"
            >
              <div className="relative">
                <TeamFlag code={team.code} name={team.name} size="lg" showShadow />
                <div
                  className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold border border-navy-800 text-white"
                  style={{ background: team.primaryColor }}
                >
                  {team.group}
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-white truncate max-w-full group-hover:text-gold transition-colors">
                  {team.shortName}
                </p>
                <p className="text-[0.6rem] text-white/30 mt-0.5">#{team.fifaRanking}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center mt-4">
          <p className="text-white/30 text-sm">No teams found matching your filters.</p>
        </div>
      )}
    </div>
  )
}
