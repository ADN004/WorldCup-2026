import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('skeleton', className)} />
}

export function MatchCardSkeleton() {
  return (
    <div className="match-card opacity-60">
      <div className="flex items-center gap-2">
        <Skeleton className="w-7 h-5" />
        <Skeleton className="w-20 h-4" />
      </div>
      <div className="text-center flex flex-col gap-1">
        <Skeleton className="w-16 h-8 mx-auto" />
        <Skeleton className="w-12 h-3 mx-auto" />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Skeleton className="w-20 h-4" />
        <Skeleton className="w-7 h-5" />
      </div>
    </div>
  )
}

export function StandingsRowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 opacity-60">
      <Skeleton className="w-6 h-4" />
      <Skeleton className="w-7 h-5" />
      <Skeleton className="w-24 h-4" />
      <div className="ml-auto flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="w-5 h-4" />
        ))}
      </div>
    </div>
  )
}

export function TeamCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-5 opacity-60">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-9 rounded-sm" />
        <div className="flex flex-col gap-1.5 flex-1">
          <Skeleton className="w-2/3 h-5" />
          <Skeleton className="w-1/3 h-3" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-xl" />
        ))}
      </div>
    </div>
  )
}
