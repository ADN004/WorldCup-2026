'use client'

import { useState, useEffect, useRef } from 'react'
import { getCountdown, type CountdownParts } from '@/lib/timeUtils'

export function useCountdown(utcDate: string): CountdownParts {
  const [parts, setParts] = useState<CountdownParts>(() => getCountdown(utcDate))
  const rafRef = useRef<number>(0)

  useEffect(() => {
    let last = 0
    const tick = (ts: number) => {
      if (ts - last >= 1000) {
        last = ts
        setParts(getCountdown(utcDate))
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [utcDate])

  return parts
}

export function useTournamentCountdown(): CountdownParts {
  return useCountdown('2026-06-11T21:00:00Z')
}
