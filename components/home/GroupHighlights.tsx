'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GROUPS } from '@/data/groups'
import { TEAMS } from '@/data/teams'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { Section } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

const FEATURED_GROUPS = ['A', 'G', 'K', 'L'] // most interesting groups

export function GroupHighlights() {
  const groups = GROUPS.filter(g => FEATURED_GROUPS.includes(g.id))

  return (
    <Section
      title="Group Stage"
      subtitle="Tournament Groups"
      action={
        <Link href="/groups" className="btn btn-ghost text-sm gap-1.5">
          All Groups <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {groups.map((group, gi) => {
          const teams = group.standings
            .map(s => TEAMS.find(t => t.id === s.teamId))
            .filter(Boolean) as typeof TEAMS

          return (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: gi * 0.08 }}
            >
              <Link href={`/groups#group-${group.id}`}>
                <div className="glass glass-hover rounded-2xl p-5 cursor-pointer h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="section-label mb-0.5">Group</p>
                      <h3 className="font-heading text-2xl font-bold text-white">{group.id}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl glass-gold flex items-center justify-center">
                      <span className="font-stats text-gold text-xl">{group.id}</span>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="flex flex-col gap-2">
                    {teams.map((team, ti) => (
                      <div key={team.id} className="flex items-center gap-3">
                        <span className={cn(
                          'w-5 text-xs font-bold tabular-nums text-center',
                          ti === 0 ? 'text-gold' :
                          ti === 1 ? 'text-white/60' :
                          'text-white/25'
                        )}>
                          {ti + 1}
                        </span>
                        <TeamFlag code={team.code} name={team.name} size="xs" />
                        <span className="text-sm font-medium text-white/80 flex-1 truncate">
                          {team.name}
                        </span>
                        <span className="text-xs text-white/30 font-semibold">
                          #{team.fifaRanking}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Strength indicator */}
                  <div className="mt-4 pt-3 border-t border-glass-border flex items-center justify-between">
                    <span className="text-xs text-white/30">Avg. FIFA Rank</span>
                    <span className="font-stats text-gold text-lg">
                      #{Math.round(teams.reduce((a, t) => a + t.fifaRanking, 0) / teams.length)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
