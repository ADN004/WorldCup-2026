'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'gold' | 'blue' | 'live' | 'elevated'
  hover?: boolean
  animate?: boolean
  delay?: number
  onClick?: () => void
}

const VARIANTS = {
  default:  'glass',
  gold:     'glass glass-gold',
  blue:     'glass glass-blue',
  live:     'glass glass-live',
  elevated: 'glass-lg',
}

export function GlassCard({
  children,
  className,
  variant = 'default',
  hover = false,
  animate = false,
  delay = 0,
  onClick,
}: GlassCardProps) {
  const base = cn(
    VARIANTS[variant],
    hover && 'glass-hover cursor-pointer',
    onClick && 'cursor-pointer',
    className
  )

  if (animate) {
    return (
      <motion.div
        className={base}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] }}
        whileHover={hover ? { y: -2 } : undefined}
        onClick={onClick}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={base} onClick={onClick}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: ReactNode
  className?: string
  title?: string
  subtitle?: string
  action?: ReactNode
}

export function Section({ children, className, title, subtitle, action }: SectionProps) {
  return (
    <section className={cn('py-8', className)}>
      {(title || action) && (
        <div className="flex items-end justify-between mb-6 gap-4">
          <div>
            {subtitle && <p className="section-label mb-1">{subtitle}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
