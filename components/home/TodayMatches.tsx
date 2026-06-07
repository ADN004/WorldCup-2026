'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { MatchCard } from '@/components/ui/MatchCard'
import { Section } from '@/components/ui/GlassCard'
import { getUpcomingFixtures, getLiveFixtures } from '@/data/fixtures'

export function TodayMatches() {
  const liveMatches     = getLiveFixtures()
  const upcomingMatches = getUpcomingFixtures(6)

  const matches  = liveMatches.length > 0 ? liveMatches : upcomingMatches
  const hasLive  = liveMatches.length > 0
  const title    = hasLive ? 'Live Now' : 'Upcoming Matches'
  const subtitle = hasLive ? '⚽ In Progress' : 'Next Matches'

  if (matches.length === 0) return null

  return (
    <Section
      title={title}
      subtitle={subtitle}
      action={
        <Link href="/fixtures" className="btn btn-ghost text-sm gap-1.5">
          All Fixtures <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      }
    >
      <div className="flex flex-col gap-3">
        {matches.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <MatchCard match={match} />
          </motion.div>
        ))}
      </div>

      {/* Next match date info */}
      {!hasLive && upcomingMatches.length > 0 && (
        <div className="mt-4 glass rounded-xl p-4 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-electric-blue/10">
            <Calendar className="w-4 h-4 text-electric-blue" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Tournament starts June 11, 2026</p>
            <p className="text-xs text-white/40">Group stage opening at MetLife Stadium, New Jersey</p>
          </div>
        </div>
      )}
    </Section>
  )
}
