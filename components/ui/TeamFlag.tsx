'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { getFlagUrl } from '@/data/teams'

interface TeamFlagProps {
  code: string
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showShadow?: boolean
  circle?: boolean
}

const SIZES = {
  xs: { px: 20, cls: 'w-5 h-4',   circPx: 24,  circCls: 'w-6 h-6',   img: 40  },
  sm: { px: 28, cls: 'w-7 h-5',   circPx: 32,  circCls: 'w-8 h-8',   img: 40  },
  md: { px: 40, cls: 'w-10 h-7',  circPx: 40,  circCls: 'w-10 h-10', img: 80  },
  lg: { px: 56, cls: 'w-14 h-10', circPx: 56,  circCls: 'w-14 h-14', img: 80  },
  xl: { px: 80, cls: 'w-20 h-14', circPx: 80,  circCls: 'w-20 h-20', img: 160 },
}

export function TeamFlag({ code, name, size = 'md', className, showShadow = false, circle = false }: TeamFlagProps) {
  const { px, cls, circPx, circCls, img } = SIZES[size]

  if (circle) {
    return (
      <div
        className={cn(
          'overflow-hidden rounded-full ring-1 ring-white/15 flex-shrink-0 bg-white/5',
          circCls,
          showShadow && 'shadow-card',
          className,
        )}
      >
        <Image
          src={getFlagUrl(code, img)}
          alt={`${name} flag`}
          width={circPx}
          height={circPx}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-sm flex-shrink-0',
        cls,
        showShadow && 'shadow-card',
        className,
      )}
      style={{ aspectRatio: '4/3' }}
    >
      <Image
        src={getFlagUrl(code, img)}
        alt={`${name} flag`}
        fill
        className="object-cover"
        sizes={`${px}px`}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
    </div>
  )
}

interface FlagWithNameProps {
  code: string
  name: string
  shortName?: string
  flagSize?: TeamFlagProps['size']
  layout?: 'row' | 'col'
  nameSize?: 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const NAME_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

export function FlagWithName({
  code, name, shortName, flagSize = 'sm', layout = 'row', nameSize = 'sm', className
}: FlagWithNameProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2.5 min-w-0',
        layout === 'col' && 'flex-col gap-2',
        className
      )}
    >
      <TeamFlag code={code} name={name} size={flagSize} />
      <span
        className={cn(
          'font-body font-semibold text-white truncate',
          NAME_SIZES[nameSize],
          layout === 'col' && 'text-center'
        )}
      >
        {shortName ?? name}
      </span>
    </div>
  )
}
