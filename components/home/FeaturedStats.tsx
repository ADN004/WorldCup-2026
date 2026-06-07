'use client'

import { motion } from 'framer-motion'
import { Users, MapPin, Calendar, Globe } from 'lucide-react'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

const STATS = [
  { icon: Users,    value: 48,   suffix: '',   label: 'Teams',           sub: 'from 6 confederations' },
  { icon: Calendar, value: 104,  suffix: '',   label: 'Matches',         sub: 'over 39 days' },
  { icon: MapPin,   value: 16,   suffix: '',   label: 'Host Cities',     sub: 'across 3 countries' },
  { icon: Globe,    value: 5,    suffix: 'B+', label: 'Viewers',         sub: 'expected worldwide' },
]

export function FeaturedStats() {
  return (
    <section className="py-8">
      <p className="section-label text-center mb-2">By The Numbers</p>
      <h2 className="section-title text-center mb-8">World Cup 2026</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map(({ icon: Icon, value, suffix, label, sub }, i) => (
          <motion.div
            key={label}
            className="glass rounded-2xl p-5 text-center glass-hover cursor-default"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-xl bg-gold/10 border border-gold/15">
                <Icon className="w-5 h-5 text-gold" />
              </div>
            </div>
            <div className="font-stats text-4xl md:text-5xl text-white leading-none mb-1">
              <AnimatedNumber value={value} duration={1500} suffix={suffix} />
            </div>
            <p className="text-sm font-semibold text-white/70">{label}</p>
            <p className="text-xs text-white/30 mt-0.5">{sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
