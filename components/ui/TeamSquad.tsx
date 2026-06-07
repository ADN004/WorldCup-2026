'use client'

import { useState } from 'react'
import type { Player } from '@/types'
import { cn } from '@/lib/utils'

type Filter = 'ALL' | 'GK' | 'DEF' | 'MID' | 'FWD'

const POS: Record<Exclude<Filter, 'ALL'>, { color: string; bg: string; border: string }> = {
  GK:  { color: 'text-amber-400',   bg: 'bg-amber-400/10',   border: 'border-amber-400/30'  },
  DEF: { color: 'text-blue-400',    bg: 'bg-blue-400/10',    border: 'border-blue-400/25'   },
  MID: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/25'},
  FWD: { color: 'text-rose-400',    bg: 'bg-rose-400/10',    border: 'border-rose-400/25'   },
}

const ORDER: Record<string, number> = { GK: 0, DEF: 1, MID: 2, FWD: 3 }

interface Props { players: Player[] }

export function TeamSquad({ players }: Props) {
  const [filter, setFilter] = useState<Filter>('ALL')

  const counts = {
    GK:  players.filter(p => p.pos === 'GK').length,
    DEF: players.filter(p => p.pos === 'DEF').length,
    MID: players.filter(p => p.pos === 'MID').length,
    FWD: players.filter(p => p.pos === 'FWD').length,
  }

  const filtered = filter === 'ALL'
    ? [...players].sort((a, b) => ORDER[a.pos] - ORDER[b.pos])
    : players.filter(p => p.pos === filter)

  const tabs: { value: Filter; label: string; count: number }[] = [
    { value: 'ALL', label: 'All players', count: players.length },
    { value: 'GK',  label: 'Goalkeepers', count: counts.GK      },
    { value: 'DEF', label: 'Defenders',   count: counts.DEF     },
    { value: 'MID', label: 'Midfielders', count: counts.MID     },
    { value: 'FWD', label: 'Forwards',    count: counts.FWD     },
  ]

  // Group by position when showing all
  const groups: { pos: Exclude<Filter, 'ALL'>; label: string; items: Player[] }[] = filter === 'ALL'
    ? ([
        { pos: 'GK',  label: 'Goalkeepers' },
        { pos: 'DEF', label: 'Defenders'   },
        { pos: 'MID', label: 'Midfielders' },
        { pos: 'FWD', label: 'Forwards'    },
      ] as const).map(g => ({ ...g, items: filtered.filter(p => p.pos === g.pos) }))
    : []

  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-heading text-xl font-bold text-white">Squad</h2>
        <span className="text-xs text-white/30 font-semibold">{players.length} players</span>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {tabs.map(tab => {
          const active = filter === tab.value
          const cfg = tab.value !== 'ALL' ? POS[tab.value] : null
          return (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150',
                active
                  ? tab.value === 'ALL'
                    ? 'bg-white/15 text-white'
                    : cn('text-white', cfg?.bg, cfg?.border, 'border')
                  : 'text-white/35 hover:text-white/60 hover:bg-white/5'
              )}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.value}</span>
              <span className={cn('text-[0.6rem] font-bold tabular-nums', active ? 'opacity-70' : 'opacity-40')}>
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Players */}
      {filter === 'ALL' ? (
        <div className="flex flex-col gap-5">
          {groups.map(group => group.items.length > 0 && (
            <div key={group.pos}>
              <p className={cn(
                'text-[0.6rem] font-bold tracking-[0.18em] uppercase mb-2.5',
                POS[group.pos].color
              )}>
                {group.label}
              </p>
              <PlayerGrid players={group.items} activePos={group.pos} />
            </div>
          ))}
        </div>
      ) : (
        <PlayerGrid players={filtered} activePos={filter as Exclude<Filter, 'ALL'>} />
      )}
    </div>
  )
}

function PlayerGrid({ players, activePos }: { players: Player[]; activePos: Exclude<Filter, 'ALL'> }) {
  const cfg = POS[activePos]
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {players.map((p, i) => (
        <div
          key={`${p.name}-${i}`}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl glass border border-glass-border hover:border-white/15 transition-colors group"
        >
          <span className={cn(
            'text-[0.55rem] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 border tracking-wide',
            cfg.color, cfg.bg, cfg.border
          )}>
            {activePos}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-white/90 truncate leading-tight group-hover:text-white transition-colors">
              {p.name}
            </p>
            {p.club && (
              <p className="text-[0.6rem] text-white/30 truncate mt-0.5">{p.club}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
