import { isPast, differenceInSeconds } from 'date-fns'

// Static label map — used when Intl returns "GMT+X" style (Windows/Node small-icu)
const TZ_LABELS: Record<string, string> = {
  'America/New_York':               'ET',
  'America/Chicago':                'CT',
  'America/Denver':                 'MT',
  'America/Los_Angeles':            'PT',
  'America/Toronto':                'ET',
  'America/Vancouver':              'PT',
  'America/Mexico_City':            'CST',
  'America/Bogota':                 'COT',
  'America/Sao_Paulo':              'BRT',
  'America/Argentina/Buenos_Aires': 'ART',
  'UTC':                            'UTC',
  'Europe/London':                  'BST',
  'Europe/Paris':                   'CET',
  'Europe/Bucharest':               'EET',
  'Europe/Istanbul':                'TRT',
  'Europe/Moscow':                  'MSK',
  'Africa/Casablanca':              'WET',
  'Africa/Lagos':                   'WAT',
  'Africa/Cairo':                   'EET',
  'Africa/Johannesburg':            'SAST',
  'Africa/Nairobi':                 'EAT',
  'Asia/Dubai':                     'GST',
  'Asia/Karachi':                   'PKT',
  'Asia/Kolkata':                   'IST',
  'Asia/Dhaka':                     'BST',
  'Asia/Bangkok':                   'ICT',
  'Asia/Singapore':                 'SGT',
  'Asia/Shanghai':                  'CST',
  'Asia/Tokyo':                     'JST',
  'Asia/Seoul':                     'KST',
  'Australia/Sydney':               'AEST',
  'Pacific/Auckland':               'NZST',
}

// ─── Internal: date → YYYY-MM-DD key in any IANA timezone ────────────────────
function dateKey(date: Date, tz: string): string {
  const p = new Intl.DateTimeFormat('en', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(date)
  const y = p.find(x => x.type === 'year')!.value
  const m = p.find(x => x.type === 'month')!.value
  const d = p.find(x => x.type === 'day')!.value
  return `${y}-${m}-${d}`
}

// ─── Timezone abbreviation (e.g. "IST", "EDT", "UTC") ────────────────────────
// Intl on Windows/Node returns "GMT+5:30" style for many zones — fall back to static map.
export function getTzAbbr(tz: string, date: Date = new Date()): string {
  try {
    const p = new Intl.DateTimeFormat('en', {
      timeZone: tz, timeZoneName: 'short',
    }).formatToParts(date)
    const label = p.find(x => x.type === 'timeZoneName')?.value ?? ''
    if (label && !/^GMT[+-]/.test(label)) return label
  } catch { /* fall through */ }
  return TZ_LABELS[tz] ?? tz
}

// ─── Date key helper (used by fixtures page for grouping) ────────────────────
export function getDateKey(utcDate: string | Date, tz = 'Asia/Kolkata'): string {
  return dateKey(typeof utcDate === 'string' ? new Date(utcDate) : utcDate, tz)
}

// ─── Match time: "15:30 IST" ──────────────────────────────────────────────────
export function formatMatchTime(utcDate: string, tz = 'Asia/Kolkata'): string {
  const date = new Date(utcDate)
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(date)
  return `${time} ${getTzAbbr(tz, date)}`
}

// ─── Short date: "11 Jun" ─────────────────────────────────────────────────────
export function formatMatchDateShort(utcDate: string, tz = 'Asia/Kolkata'): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, day: 'numeric', month: 'short',
  }).format(new Date(utcDate))
}

// ─── Full date: "Thu, 11 Jun 2026" ───────────────────────────────────────────
export function formatMatchDate(utcDate: string, tz = 'Asia/Kolkata'): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  }).format(new Date(utcDate))
}

// ─── Compact datetime: "Thu, 11 Jun · 15:30 IST" ────────────────────────────
export function formatMatchDateTime(utcDate: string, tz = 'Asia/Kolkata'): string {
  const date = new Date(utcDate)
  const dt = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'short', day: 'numeric', month: 'short',
    hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(date)
  return `${dt} ${getTzAbbr(tz, date)}`
}

// ─── Full datetime: "Thursday, 11 June 2026 · 15:30 IST" ────────────────────
export function formatFullDateTime(utcDate: string, tz = 'Asia/Kolkata'): string {
  const date = new Date(utcDate)
  const dt = new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'long', day: 'numeric', month: 'long',
    year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
  }).format(date)
  return `${dt} ${getTzAbbr(tz, date)}`
}

// ─── Day label: "Today" | "Tomorrow" | "Thursday, 11 Jun" ───────────────────
export function getMatchDayLabel(utcDate: string, tz = 'Asia/Kolkata'): string {
  const date    = new Date(utcDate)
  const now     = new Date()
  const matchDk = dateKey(date, tz)
  const todayDk = dateKey(now, tz)
  const tmrwDk  = dateKey(new Date(now.getTime() + 86_400_000), tz)
  if (matchDk === todayDk) return 'Today'
  if (matchDk === tmrwDk)  return 'Tomorrow'
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: tz, weekday: 'long', day: 'numeric', month: 'short',
  }).format(date)
}

// ─── "Today" detection (tz-aware) ────────────────────────────────────────────
export function isMatchToday(utcDate: string, tz = 'Asia/Kolkata'): boolean {
  return dateKey(new Date(utcDate), tz) === dateKey(new Date(), tz)
}

// ─── Group UTC dates by calendar day in the given timezone ───────────────────
export function groupByDate(utcDates: string[], tz = 'Asia/Kolkata'): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const d of utcDates) {
    const key = dateKey(new Date(d), tz)
    if (!result[key]) result[key] = []
    result[key].push(d)
  }
  return result
}

// ─── Timezone-agnostic helpers ────────────────────────────────────────────────
export function formatRelativeTime(utcDate: string): string {
  const date = new Date(utcDate)
  if (isPast(date)) return 'Ended'
  const diff = Math.floor((date.getTime() - Date.now()) / 60_000)
  if (diff < 60)  return `in ${diff}m`
  if (diff < 1440) return `in ${Math.floor(diff / 60)}h`
  return `in ${Math.floor(diff / 1440)}d`
}

export function isMatchUpcoming(utcDate: string): boolean {
  return !isPast(new Date(utcDate))
}

export function secondsUntil(utcDate: string): number {
  return Math.max(0, differenceInSeconds(new Date(utcDate), new Date()))
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export interface CountdownParts {
  days:    number
  hours:   number
  minutes: number
  seconds: number
  total:   number
}

export function getCountdown(utcDate: string): CountdownParts {
  const target = new Date(utcDate).getTime()
  const now    = Date.now()
  const total  = Math.max(0, Math.floor((target - now) / 1000))
  return {
    days:    Math.floor(total / 86400),
    hours:   Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    total,
  }
}

export function getTournamentCountdown(): CountdownParts {
  return getCountdown('2026-06-11T21:00:00Z')
}

// Legacy — kept for any remaining callers; prefer getDateKey instead
export function toIST(utcDate: string | Date): Date {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate
  return new Date(date.getTime() + 5.5 * 60 * 60 * 1000)
}
