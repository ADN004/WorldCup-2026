'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useCountdown } from '@/hooks/useCountdown'
import { cn } from '@/lib/utils'

interface CountdownTimerProps {
  utcDate: string
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showDays?: boolean
}

const SIZE_MAP = {
  sm: { digit: 'text-2xl', label: 'text-xs', gap: 'gap-2' },
  md: { digit: 'text-4xl', label: 'text-xs', gap: 'gap-3' },
  lg: { digit: 'text-6xl', label: 'text-sm', gap: 'gap-4' },
  xl: { digit: 'text-7xl', label: 'text-sm', gap: 'gap-5' },
}

export function CountdownTimer({
  utcDate, label, size = 'md', className, showDays = true
}: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const { days, hours, minutes, seconds, total } = useCountdown(utcDate)
  const { digit, label: labelCls, gap } = SIZE_MAP[size]

  // Render nothing on server to avoid hydration mismatch from live countdown values
  if (!mounted) return null
  if (total <= 0) return null

  const units = showDays
    ? [
        { value: days,    label: 'DAYS' },
        { value: hours,   label: 'HRS' },
        { value: minutes, label: 'MIN' },
        { value: seconds, label: 'SEC' },
      ]
    : [
        { value: hours,   label: 'HRS' },
        { value: minutes, label: 'MIN' },
        { value: seconds, label: 'SEC' },
      ]

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {label && (
        <p className="section-label text-white/40">{label}</p>
      )}
      <div className={cn('flex items-start', gap)}>
        {units.map(({ value, label: unitLabel }, i) => (
          <div key={unitLabel} className="flex items-start">
            <div className="flex flex-col items-center gap-1">
              <div className="relative">
                <div
                  className="glass rounded-xl px-3 py-2 min-w-[4rem] text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn('font-stats block text-white leading-none', digit)}
                  >
                    {String(value).padStart(2, '0')}
                  </motion.span>
                </div>
              </div>
              <span className={cn('font-body font-semibold text-white/30 tracking-widest', labelCls)}>
                {unitLabel}
              </span>
            </div>
            {i < units.length - 1 && (
              <span className={cn('font-stats text-white/30 mt-2 px-0.5 leading-none', digit)}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
