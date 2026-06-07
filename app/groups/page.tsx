'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { GROUPS } from '@/data/groups'
import { TEAMS, getTeam } from '@/data/teams'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { cn, getFormColor } from '@/lib/utils'
import type { GroupStanding } from '@/types'

const COLS = [
  { key: 'position', label: '#',   short: '#',    cls: 'w-6 text-center' },
  { key: 'team',     label: 'Team', short: 'Team', cls: 'flex-1 min-w-0' },
  { key: 'played',   label: 'P',   short: 'P',    cls: 'w-7 text-center' },
  { key: 'won',      label: 'W',   short: 'W',    cls: 'w-7 text-center hidden xs:table-cell' },
  { key: 'drawn',    label: 'D',   short: 'D',    cls: 'w-7 text-center hidden xs:table-cell' },
  { key: 'lost',     label: 'L',   short: 'L',    cls: 'w-7 text-center hidden xs:table-cell' },
  { key: 'goalsFor', label: 'GF',  short: 'GF',   cls: 'w-8 text-center hidden sm:table-cell' },
  { key: 'goalsAgainst',label:'GA',short: 'GA',   cls: 'w-8 text-center hidden sm:table-cell' },
  { key: 'goalDifference',label:'GD',short:'GD',  cls: 'w-8 text-center hidden md:table-cell' },
  { key: 'points',   label: 'Pts', short: 'Pts',  cls: 'w-10 text-center font-bold' },
]

function StandingsTable({ standings }: { standings: GroupStanding[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-glass-border">
            {COLS.map(c => (
              <th key={c.key} className={cn('py-2 px-1 text-white/30 text-xs font-semibold uppercase tracking-wide first:pl-3 last:pr-3', c.cls)}>
                {c.short}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {standings.map((row, i) => {
            const team = getTeam(row.teamId)
            if (!team) return null
            const isQ = i < 2
            const is3rd = i === 2

            return (
              <motion.tr
                key={row.teamId}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  'border-b border-glass-border/50 transition-colors hover:bg-white/2',
                  isQ && 'border-l-2 border-l-success/60',
                  is3rd && 'border-l-2 border-l-warning/50',
                )}
              >
                {/* Position */}
                <td className="py-2.5 pl-3 w-6 text-center">
                  <span className={cn(
                    'text-xs font-bold',
                    isQ  ? 'text-success' :
                    is3rd ? 'text-warning' :
                    'text-white/30'
                  )}>
                    {row.position}
                  </span>
                </td>
                {/* Team */}
                <td className="py-2.5 px-1">
                  <div className="flex items-center gap-2">
                    <TeamFlag code={team.code} name={team.name} size="xs" />
                    <span className="text-sm font-semibold text-white truncate hidden xs:inline">{team.name}</span>
                    <span className="text-sm font-semibold text-white xs:hidden">{team.shortName}</span>
                  </div>
                </td>
                {/* Stats */}
                {['played','won','drawn','lost'].map((k, ki) => (
                  <td key={k} className={cn('py-2.5 px-1 text-center tabular-nums text-white/60', ki>0 && 'hidden xs:table-cell')}>
                    {row[k as keyof GroupStanding] as number}
                  </td>
                ))}
                <td className="py-2.5 px-1 text-center tabular-nums text-white/60 hidden sm:table-cell">{row.goalsFor}</td>
                <td className="py-2.5 px-1 text-center tabular-nums text-white/60 hidden sm:table-cell">{row.goalsAgainst}</td>
                <td className="py-2.5 px-1 text-center tabular-nums text-white/60 hidden md:table-cell">
                  {row.goalDifference >= 0 ? `+${row.goalDifference}` : row.goalDifference}
                </td>
                {/* Points */}
                <td className="py-2.5 pr-3 text-center">
                  <span className={cn(
                    'font-stats text-xl',
                    isQ ? 'text-gold' : 'text-white/80'
                  )}>
                    {row.points}
                  </span>
                </td>
              </motion.tr>
            )
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-4 px-3 py-2.5 text-[0.65rem] text-white/25 border-t border-glass-border/30">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          <span>Qualified (Top 2)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-warning/50" />
          <span>Possible 3rd</span>
        </div>
      </div>
    </div>
  )
}

export default function GroupsPage() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  return (
    <div className="page-container py-8">
      <div className="mb-8">
        <p className="section-label mb-1">Group Stage</p>
        <h1 className="section-title">Group Standings</h1>
        <p className="text-sm text-white/40 mt-1">
          12 groups · Top 2 + 8 best 3rd-place teams advance to Round of 32
        </p>
      </div>

      {/* Quick jump */}
      <div className="flex flex-wrap gap-2 mb-8">
        {GROUPS.map(g => (
          <a
            key={g.id}
            href={`#group-${g.id}`}
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all border',
              activeGroup === g.id
                ? 'border-gold/50 bg-gold/10 text-gold'
                : 'border-glass-border text-white/40 glass hover:text-white'
            )}
          >
            {g.id}
          </a>
        ))}
      </div>

      {/* Group grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GROUPS.map((group, gi) => (
          <motion.div
            key={group.id}
            id={`group-${group.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (gi % 2) * 0.1 }}
            className="glass rounded-2xl overflow-hidden"
          >
            {/* Group header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border glass-gold">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/20 flex items-center justify-center">
                  <span className="font-stats text-gold text-lg">{group.id}</span>
                </div>
                <div>
                  <h2 className="font-heading text-base font-bold text-white">Group {group.id}</h2>
                  <p className="text-xs text-white/30">
                    {group.standings.map(s => getTeam(s.teamId)?.shortName).join(' · ')}
                  </p>
                </div>
              </div>
            </div>

            <StandingsTable standings={group.standings} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
