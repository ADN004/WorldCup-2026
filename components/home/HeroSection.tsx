'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Trophy, Play, Calendar, ChevronDown } from 'lucide-react'
import { CountdownTimer } from '@/components/ui/CountdownTimer'

const TOURNAMENT_START = '2026-06-11T21:00:00Z'

// Deterministic star positions — no Math.random() to avoid SSR/client hydration mismatch
const STARS = Array.from({ length: 20 }, (_, i) => ({
  width:    1 + (i * 0.7) % 3,
  height:   1 + (i * 1.1) % 3,
  top:      `${(i * 4.7) % 100}%`,
  left:     `${(i * 5.3) % 100}%`,
  isGold:   i % 3 === 0,
  duration: 2 + (i * 0.6) % 4,
  delay:    (i * 0.9) % 4,
}))

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        {/* Stadium lighting effect */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 120% 80% at 50% -10%, rgba(0,194,255,0.12) 0%, transparent 55%),
              radial-gradient(ellipse 80% 60% at 80% 20%,  rgba(245,197,24,0.08) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 20% 60%,  rgba(0,194,255,0.06) 0%, transparent 50%),
              linear-gradient(180deg, #030912 0%, #040D1A 40%, #071428 100%)
            `,
          }}
        />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {STARS.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width:      star.width,
                height:     star.height,
                top:        star.top,
                left:       star.left,
                background: star.isGold ? 'rgba(245,197,24,0.6)' : 'rgba(255,255,255,0.25)',
                animation:  `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="page-container text-center z-10 py-20">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="section-label text-gold/70 tracking-[0.3em]">FIFA WORLD CUP</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
        </motion.div>

        {/* Trophy */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(ellipse, rgba(245,197,24,0.25) 0%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(2)',
              }}
            />
            <Trophy
              className="w-20 h-20 md:w-28 md:h-28 text-gold relative z-10 animate-trophy-glow"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="font-heading font-bold leading-none tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white">
              WORLD
            </span>
            <span
              className="block text-6xl sm:text-7xl md:text-9xl lg:text-[10rem] text-gradient-gold"
              style={{ WebkitTextStroke: '1px transparent' }}
            >
              CUP
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white/90">
              2026
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg text-white/50 max-w-md mx-auto"
        >
          USA · Canada · Mexico &nbsp;|&nbsp; 48 Teams · 104 Matches
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-2"
        >
          <p className="text-xs font-semibold tracking-[0.25em] text-white/30 uppercase">
            Tournament Begins In
          </p>
          <CountdownTimer utcDate={TOURNAMENT_START} size="lg" showDays />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/fixtures" className="btn btn-primary px-8 py-3 text-base">
            <Calendar className="w-4 h-4" />
            View Fixtures
          </Link>
          <Link href="/bracket" className="btn btn-ghost px-8 py-3 text-base">
            <Play className="w-4 h-4" />
            Explore Bracket
          </Link>
        </motion.div>

        {/* Host cities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-wrap justify-center gap-2"
        >
          {['New York', 'Los Angeles', 'Dallas', 'Houston', 'Mexico City', 'Toronto', 'Seattle', 'Vancouver'].map(city => (
            <span
              key={city}
              className="px-3 py-1.5 rounded-full text-xs text-white/30 font-medium"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {city}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/20 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/20 animate-bounce-gentle" />
      </motion.div>
    </section>
  )
}
