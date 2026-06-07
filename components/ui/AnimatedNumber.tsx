'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedNumber({
  value, duration = 1000, className, prefix = '', suffix = '', decimals = 0
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0)
  const startRef   = useRef<number>(0)
  const startValRef = useRef<number>(0)
  const rafRef     = useRef<number>(0)

  useEffect(() => {
    const startVal = display
    startRef.current   = performance.now()
    startValRef.current = startVal

    const animate = (now: number) => {
      const elapsed  = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = startValRef.current + (value - startValRef.current) * eased
      setDisplay(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, duration])

  const formatted = display.toFixed(decimals)

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
