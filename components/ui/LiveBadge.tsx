import { cn } from '@/lib/utils'

interface LiveBadgeProps {
  minute?: number
  isHalfTime?: boolean
  className?: string
  size?: 'sm' | 'md'
}

export function LiveBadge({ minute, isHalfTime, className, size = 'md' }: LiveBadgeProps) {
  return (
    <div
      className={cn(
        'live-indicator',
        size === 'sm' && 'text-[0.6rem] px-2 py-0.5',
        className
      )}
    >
      <span className="live-dot" />
      {isHalfTime ? 'HT' : minute ? `${minute}'` : 'LIVE'}
    </div>
  )
}

export function LivePulse({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex h-2.5 w-2.5', className)}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-60" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-live" />
    </div>
  )
}
