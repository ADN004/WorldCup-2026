'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Check, ChevronDown, X, Search } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { getTzAbbr } from '@/lib/timeUtils'
import { cn } from '@/lib/utils'

// ─── Timezone list ────────────────────────────────────────────────────────────
export const TIMEZONE_LIST = [
  // Host nations
  { value: 'America/New_York',                label: 'ET — New York',                 region: 'Host · USA'     },
  { value: 'America/Chicago',                 label: 'CT — Chicago / Dallas',         region: 'Host · USA'     },
  { value: 'America/Denver',                  label: 'MT — Denver',                   region: 'Host · USA'     },
  { value: 'America/Los_Angeles',             label: 'PT — Los Angeles',              region: 'Host · USA'     },
  { value: 'America/Toronto',                 label: 'ET — Toronto',                  region: 'Host · Canada'  },
  { value: 'America/Vancouver',               label: 'PT — Vancouver',                region: 'Host · Canada'  },
  { value: 'America/Mexico_City',             label: 'CST — Mexico City',             region: 'Host · Mexico'  },
  // South America
  { value: 'America/Bogota',                  label: 'COT — Bogotá / Lima',           region: 'South America'  },
  { value: 'America/Sao_Paulo',               label: 'BRT — São Paulo',               region: 'South America'  },
  { value: 'America/Argentina/Buenos_Aires',  label: 'ART — Buenos Aires',            region: 'South America'  },
  // UTC
  { value: 'UTC',                             label: 'UTC — Universal',               region: 'UTC'            },
  // Europe
  { value: 'Europe/London',                   label: 'BST/GMT — London',              region: 'Europe'         },
  { value: 'Europe/Paris',                    label: 'CET — Paris / Madrid / Berlin', region: 'Europe'         },
  { value: 'Europe/Bucharest',                label: 'EET — Bucharest / Athens',      region: 'Europe'         },
  { value: 'Europe/Istanbul',                 label: 'TRT — Istanbul',                region: 'Europe'         },
  { value: 'Europe/Moscow',                   label: 'MSK — Moscow',                  region: 'Europe'         },
  // Africa
  { value: 'Africa/Casablanca',               label: 'WET — Casablanca',              region: 'Africa'         },
  { value: 'Africa/Lagos',                    label: 'WAT — Lagos / Kinshasa',        region: 'Africa'         },
  { value: 'Africa/Cairo',                    label: 'EET — Cairo',                   region: 'Africa'         },
  { value: 'Africa/Johannesburg',             label: 'SAST — Johannesburg',           region: 'Africa'         },
  { value: 'Africa/Nairobi',                  label: 'EAT — Nairobi',                 region: 'Africa'         },
  // Middle East
  { value: 'Asia/Dubai',                      label: 'GST — Dubai / Riyadh',          region: 'Middle East'    },
  // Asia
  { value: 'Asia/Karachi',                    label: 'PKT — Karachi',                 region: 'Asia'           },
  { value: 'Asia/Kolkata',                    label: 'IST — India',                   region: 'Asia'           },
  { value: 'Asia/Dhaka',                      label: 'BST — Dhaka',                   region: 'Asia'           },
  { value: 'Asia/Bangkok',                    label: 'ICT — Bangkok / Jakarta',       region: 'Asia'           },
  { value: 'Asia/Singapore',                  label: 'SGT — Singapore / KL',          region: 'Asia'           },
  { value: 'Asia/Shanghai',                   label: 'CST — Beijing / Shanghai',      region: 'Asia'           },
  { value: 'Asia/Tokyo',                      label: 'JST — Tokyo',                   region: 'Asia'           },
  { value: 'Asia/Seoul',                      label: 'KST — Seoul',                   region: 'Asia'           },
  // Oceania
  { value: 'Australia/Sydney',                label: 'AEST — Sydney',                 region: 'Oceania'        },
  { value: 'Pacific/Auckland',                label: 'NZST — Auckland',               region: 'Oceania'        },
] as const

type TzEntry = typeof TIMEZONE_LIST[number]

// Group by region preserving insertion order
const REGIONS: string[] = []
const GROUPED: Record<string, TzEntry[]> = {}
for (const t of TIMEZONE_LIST) {
  if (!GROUPED[t.region]) { GROUPED[t.region] = []; REGIONS.push(t.region) }
  GROUPED[t.region].push(t)
}

// ─── Shared modal ─────────────────────────────────────────────────────────────
function TimezoneModal({ onClose }: { onClose: () => void }) {
  const tz          = useAppStore(s => s.preferences.timeZone)
  const setTimeZone = useAppStore(s => s.setTimeZone)
  const [query, setQuery] = useState('')
  const inputRef    = useRef<HTMLInputElement>(null)

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Auto-focus search
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80)
    return () => clearTimeout(t)
  }, [])

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const q = query.trim().toLowerCase()

  const filteredRegions = REGIONS
    .map(region => ({
      region,
      entries: GROUPED[region].filter(t =>
        !q ||
        t.label.toLowerCase().includes(q) ||
        t.region.toLowerCase().includes(q)
      ),
    }))
    .filter(r => r.entries.length > 0)

  const handleSelect = (value: string) => {
    setTimeZone(value)
    onClose()
  }

  const currentEntry = TIMEZONE_LIST.find(t => t.value === tz)

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Sheet */}
      <motion.div
        className="relative z-10 w-full max-w-sm flex flex-col rounded-3xl border border-glass-border shadow-2xl overflow-hidden"
        style={{
          maxHeight: 'min(85dvh, 600px)',
          background: 'linear-gradient(180deg, #0a1628 0%, #050e1c 100%)',
        }}
        initial={{ scale: 0.94, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 24, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-electric-blue/10">
              <Globe className="w-4 h-4 text-electric-blue" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Match Timezone</p>
              <p className="text-xs text-white/35 mt-0.5">
                {currentEntry?.label ?? tz}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-white/50" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search timezone or city…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-electric-blue/40 transition-colors"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mx-4 bg-glass-border flex-shrink-0" />

        {/* Scrollable list — overscroll-contain prevents page scroll leak */}
        <div className="overflow-y-auto overscroll-contain flex-1 pb-2">
          {filteredRegions.length === 0 ? (
            <div className="text-center py-12 text-sm text-white/30">
              No timezone matches "{query}"
            </div>
          ) : (
            filteredRegions.map(({ region, entries }) => (
              <div key={region}>
                <div className="px-4 py-2 text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/25 sticky top-0 bg-[#050e1c]/95 backdrop-blur-sm z-10">
                  {region}
                </div>
                {entries.map(t => (
                  <button
                    key={t.value}
                    onClick={() => handleSelect(t.value)}
                    className={cn(
                      'w-full flex items-center justify-between px-4 py-3 text-sm transition-colors text-left',
                      t.value === tz
                        ? 'bg-gold/10 text-gold'
                        : 'text-white/60 hover:bg-white/5 hover:text-white',
                    )}
                  >
                    <div>
                      <span className="font-semibold">{t.label.split(' — ')[0]}</span>
                      {t.label.includes(' — ') && (
                        <span className="text-white/35 font-normal ml-2 text-xs">
                          {t.label.split(' — ')[1]}
                        </span>
                      )}
                    </div>
                    {t.value === tz && <Check className="w-4 h-4 flex-shrink-0 ml-2" />}
                  </button>
                ))}
              </div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Trigger component ────────────────────────────────────────────────────────
interface Props {
  variant?: 'pill' | 'inline'
}

export function TimezoneSelector({ variant = 'pill' }: Props) {
  const [open, setOpen]  = useState(false)
  const tz               = useAppStore(s => s.preferences.timeZone)
  const currentEntry     = TIMEZONE_LIST.find(t => t.value === tz)
  const abbr             = currentEntry
    ? currentEntry.label.split(' — ')[0].split('/')[0]
    : getTzAbbr(tz)

  return (
    <>
      {variant === 'pill' ? (
        /* Desktop nav pill */
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass glass-hover text-xs font-semibold text-white/60 hover:text-white transition-all cursor-pointer"
          aria-label="Select timezone"
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="hidden sm:inline">{abbr}</span>
          <ChevronDown className="w-3 h-3" />
        </button>
      ) : (
        /* Mobile nav row */
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center gap-3 p-4 rounded-2xl glass border border-glass-border text-left"
        >
          <div className="p-2.5 rounded-xl bg-white/5 flex-shrink-0">
            <Globe className="w-5 h-5 text-white/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white/70">Match Timezone</p>
            <p className="text-xs text-white/35 mt-0.5 truncate">
              {currentEntry?.label ?? abbr}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
        </button>
      )}

      <AnimatePresence>
        {open && <TimezoneModal onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
