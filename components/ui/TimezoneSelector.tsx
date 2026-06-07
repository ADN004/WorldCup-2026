'use client'

import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { getTzAbbr } from '@/lib/timeUtils'
import { cn } from '@/lib/utils'

// ─── Timezone list ────────────────────────────────────────────────────────────
export const TIMEZONE_LIST = [
  // Host nations
  { value: 'America/New_York',                label: 'ET — New York',                region: 'Host · USA'     },
  { value: 'America/Chicago',                 label: 'CT — Chicago / Dallas',        region: 'Host · USA'     },
  { value: 'America/Denver',                  label: 'MT — Denver',                  region: 'Host · USA'     },
  { value: 'America/Los_Angeles',             label: 'PT — Los Angeles',             region: 'Host · USA'     },
  { value: 'America/Toronto',                 label: 'ET — Toronto',                 region: 'Host · Canada'  },
  { value: 'America/Vancouver',               label: 'PT — Vancouver',               region: 'Host · Canada'  },
  { value: 'America/Mexico_City',             label: 'CST — Mexico City',            region: 'Host · Mexico'  },
  // South America
  { value: 'America/Bogota',                  label: 'COT — Bogotá / Lima',          region: 'South America'  },
  { value: 'America/Sao_Paulo',               label: 'BRT — São Paulo',              region: 'South America'  },
  { value: 'America/Argentina/Buenos_Aires',  label: 'ART — Buenos Aires',           region: 'South America'  },
  // UTC
  { value: 'UTC',                             label: 'UTC',                          region: 'UTC'            },
  // Europe
  { value: 'Europe/London',                   label: 'BST/GMT — London',             region: 'Europe'         },
  { value: 'Europe/Paris',                    label: 'CET — Paris / Madrid / Berlin',region: 'Europe'         },
  { value: 'Europe/Bucharest',                label: 'EET — Bucharest / Athens',     region: 'Europe'         },
  { value: 'Europe/Istanbul',                 label: 'TRT — Istanbul',               region: 'Europe'         },
  { value: 'Europe/Moscow',                   label: 'MSK — Moscow',                 region: 'Europe'         },
  // Africa
  { value: 'Africa/Casablanca',               label: 'WET — Casablanca',             region: 'Africa'         },
  { value: 'Africa/Lagos',                    label: 'WAT — Lagos / Kinshasa',       region: 'Africa'         },
  { value: 'Africa/Cairo',                    label: 'EET — Cairo',                  region: 'Africa'         },
  { value: 'Africa/Johannesburg',             label: 'SAST — Johannesburg',          region: 'Africa'         },
  { value: 'Africa/Nairobi',                  label: 'EAT — Nairobi',               region: 'Africa'         },
  // Middle East
  { value: 'Asia/Dubai',                      label: 'GST — Dubai / Riyadh',         region: 'Middle East'    },
  // Asia
  { value: 'Asia/Karachi',                    label: 'PKT — Karachi',                region: 'Asia'           },
  { value: 'Asia/Kolkata',                    label: 'IST — India',                  region: 'Asia'           },
  { value: 'Asia/Dhaka',                      label: 'BST — Dhaka',                  region: 'Asia'           },
  { value: 'Asia/Bangkok',                    label: 'ICT — Bangkok / Jakarta',      region: 'Asia'           },
  { value: 'Asia/Singapore',                  label: 'SGT — Singapore / KL',         region: 'Asia'           },
  { value: 'Asia/Shanghai',                   label: 'CST — Beijing / Shanghai',     region: 'Asia'           },
  { value: 'Asia/Tokyo',                      label: 'JST — Tokyo',                  region: 'Asia'           },
  { value: 'Asia/Seoul',                      label: 'KST — Seoul',                  region: 'Asia'           },
  // Oceania
  { value: 'Australia/Sydney',                label: 'AEST — Sydney',                region: 'Oceania'        },
  { value: 'Pacific/Auckland',                label: 'NZST — Auckland',              region: 'Oceania'        },
] as const

type TzEntry = typeof TIMEZONE_LIST[number]

// Group by region preserving insertion order
const REGIONS: string[] = []
const GROUPED: Record<string, TzEntry[]> = {}
for (const tz of TIMEZONE_LIST) {
  if (!GROUPED[tz.region]) { GROUPED[tz.region] = []; REGIONS.push(tz.region) }
  GROUPED[tz.region].push(tz)
}

// ─── Component ────────────────────────────────────────────────────────────────
interface Props {
  /** pill = compact floating dropdown (desktop nav).  inline = full-width accordion (mobile nav). */
  variant?: 'pill' | 'inline'
}

export function TimezoneSelector({ variant = 'pill' }: Props) {
  const [open, setOpen]   = useState(false)
  const wrapRef           = useRef<HTMLDivElement>(null)
  const tz                = useAppStore(s => s.preferences.timeZone)
  const setTimeZone       = useAppStore(s => s.setTimeZone)
  // Use the label prefix ("IST", "ET", "UTC") — more reliable than Intl on Windows
  const currentEntry      = TIMEZONE_LIST.find(t => t.value === tz)
  const abbr              = currentEntry
    ? currentEntry.label.split(' — ')[0].split('/')[0]
    : getTzAbbr(tz)

  // Close on outside click (pill mode only)
  useEffect(() => {
    if (!open || variant !== 'pill') return
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, variant])

  // ── Option list (shared between both variants) ───────────────────────────
  const OptionList = (
    <div className={cn(
      'overflow-y-auto no-scrollbar',
      variant === 'pill' ? 'max-h-[min(60vh,380px)]' : 'max-h-64',
    )}>
      {REGIONS.map(region => (
        <div key={region}>
          {/* Region header */}
          <div className="px-3 py-1 text-[0.58rem] font-bold tracking-widest uppercase text-white/25 bg-white/[0.025] border-b border-white/[0.04] sticky top-0">
            {region}
          </div>
          {GROUPED[region].map(t => (
            <button
              key={t.value}
              onClick={() => { setTimeZone(t.value); setOpen(false) }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 text-sm transition-colors text-left',
                t.value === tz
                  ? 'bg-gold/8 text-gold'
                  : 'text-white/55 hover:bg-white/5 hover:text-white',
              )}
            >
              <span className="font-medium leading-snug">{t.label}</span>
              {t.value === tz && <Check className="w-3.5 h-3.5 flex-shrink-0 ml-2" />}
            </button>
          ))}
        </div>
      ))}
    </div>
  )

  // ── Pill variant ─────────────────────────────────────────────────────────
  if (variant === 'pill') {
    return (
      <div className="relative" ref={wrapRef}>
        <button
          onClick={() => setOpen(v => !v)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass glass-hover text-xs font-semibold text-white/60 hover:text-white transition-all cursor-pointer"
          aria-label="Select timezone"
          aria-expanded={open}
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">{abbr}</span>
          <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', open && 'rotate-180')} />
        </button>

        {open && (
          <div className="absolute right-0 top-full mt-1.5 z-[62] w-72 glass-lg rounded-2xl border border-glass-border shadow-glass-lg overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-glass-border">
              <Globe className="w-3.5 h-3.5 text-white/40" />
              <span className="text-xs font-semibold text-white/50 tracking-wide">Match time timezone</span>
            </div>
            {OptionList}
          </div>
        )}
      </div>
    )
  }

  // ── Inline variant (mobile nav) ───────────────────────────────────────────
  return (
    <div ref={wrapRef} className="glass rounded-2xl border border-glass-border overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
        aria-expanded={open}
      >
        <div className="p-2 rounded-xl bg-white/5 flex-shrink-0">
          <Globe className="w-4 h-4 text-white/50" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white/70">Match Timezone</p>
          <p className="text-xs text-white/35 mt-0.5 truncate">
            {TIMEZONE_LIST.find(t => t.value === tz)?.label ?? abbr}
          </p>
        </div>
        <ChevronDown className={cn('w-4 h-4 text-white/30 flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="border-t border-glass-border">
          {OptionList}
        </div>
      )}
    </div>
  )
}
