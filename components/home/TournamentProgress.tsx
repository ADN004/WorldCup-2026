'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Trophy, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const STAGES = [
  { id: 'group',   label: 'Group Stage',   short: 'Groups',  matches: 72,  current: false, done: false },
  { id: 'r32',     label: 'Round of 32',   short: 'R32',     matches: 16,  current: false, done: false },
  { id: 'r16',     label: 'Round of 16',   short: 'R16',     matches: 8,   current: false, done: false },
  { id: 'qf',      label: 'Quarter Finals',short: 'QF',      matches: 4,   current: false, done: false },
  { id: 'sf',      label: 'Semi Finals',   short: 'SF',      matches: 2,   current: false, done: false },
  { id: 'final',   label: 'The Final',     short: 'Final',   matches: 1,   current: false, done: false },
]

export function TournamentProgress() {
  return (
    <section className="py-8">
      <div className="flex items-end justify-between mb-6">
        <div>
          <p className="section-label mb-1">Roadmap</p>
          <h2 className="section-title">Tournament Progress</h2>
        </div>
        <div className="flex items-center gap-1.5 badge badge-blue">
          <Zap className="w-3 h-3" />
          Starting June 11
        </div>
      </div>

      {/* Desktop: horizontal stepper */}
      <div className="hidden sm:block glass rounded-2xl p-6">
        <div className="flex items-center gap-0">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex items-center flex-1">
              <motion.div
                className="flex flex-col items-center gap-2 flex-1"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {/* Icon */}
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all',
                  stage.done
                    ? 'bg-success/20 border border-success/30'
                    : stage.current
                    ? 'bg-gold/20 border border-gold/40 shadow-gold'
                    : 'bg-white/4 border border-white/8'
                )}>
                  {stage.id === 'final' ? (
                    <Trophy className={cn('w-5 h-5', stage.current ? 'text-gold' : 'text-white/20')} />
                  ) : stage.done ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <Circle className={cn('w-5 h-5', stage.current ? 'text-gold' : 'text-white/20')} />
                  )}
                </div>

                {/* Label */}
                <div className="text-center">
                  <p className={cn(
                    'text-xs font-bold truncate',
                    stage.done ? 'text-success' :
                    stage.current ? 'text-gold' :
                    'text-white/30'
                  )}>
                    {stage.short}
                  </p>
                  <p className="text-[0.6rem] text-white/20 tabular-nums">{stage.matches}m</p>
                </div>
              </motion.div>

              {/* Connector */}
              {i < STAGES.length - 1 && (
                <div className={cn(
                  'h-0.5 flex-1 max-w-8 mx-1 rounded-full',
                  stage.done ? 'bg-success/40' : 'bg-white/8'
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-glass-border flex items-center justify-between text-xs text-white/30">
          <span>June 11, 2026</span>
          <span>104 matches total across all stages</span>
          <span>July 19, 2026</span>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="sm:hidden flex flex-col gap-2">
        {STAGES.map((stage, i) => (
          <motion.div
            key={stage.id}
            className={cn(
              'flex items-center gap-4 p-4 rounded-xl glass',
              stage.current && 'glass-gold'
            )}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
              stage.done    ? 'bg-success/20'     :
              stage.current ? 'bg-gold/20'        :
              'bg-white/5'
            )}>
              {stage.id === 'final' ? (
                <Trophy className={cn('w-4 h-4', stage.current ? 'text-gold' : 'text-white/20')} />
              ) : stage.done ? (
                <CheckCircle2 className="w-4 h-4 text-success" />
              ) : (
                <Circle className={cn('w-4 h-4', stage.current ? 'text-gold' : 'text-white/20')} />
              )}
            </div>
            <div className="flex-1">
              <p className={cn(
                'text-sm font-semibold',
                stage.done ? 'text-success' : stage.current ? 'text-gold' : 'text-white/40'
              )}>
                {stage.label}
              </p>
              <p className="text-xs text-white/25">{stage.matches} matches</p>
            </div>
            {stage.current && <span className="badge badge-gold">Current</span>}
            {stage.done    && <span className="badge badge-success">Done</span>}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
