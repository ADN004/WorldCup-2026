import { format, formatDistanceToNow, isPast, isToday, isTomorrow, differenceInSeconds } from 'date-fns'

// IST is UTC+5:30
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000

export function toIST(utcDate: string | Date): Date {
  const date = typeof utcDate === 'string' ? new Date(utcDate) : utcDate
  return new Date(date.getTime() + IST_OFFSET_MS)
}

export function formatMatchTime(utcDate: string): string {
  const ist = toIST(utcDate)
  return format(ist, 'HH:mm') + ' IST'
}

export function formatMatchDate(utcDate: string): string {
  const ist = toIST(utcDate)
  return format(ist, 'EEE, dd MMM yyyy')
}

export function formatMatchDateShort(utcDate: string): string {
  const ist = toIST(utcDate)
  return format(ist, 'dd MMM')
}

export function formatMatchDateTime(utcDate: string): string {
  const ist = toIST(utcDate)
  return format(ist, 'EEE, dd MMM · HH:mm') + ' IST'
}

export function formatFullDateTime(utcDate: string): string {
  const ist = toIST(utcDate)
  return format(ist, 'EEEE, dd MMMM yyyy · HH:mm') + ' IST'
}

export function formatRelativeTime(utcDate: string): string {
  const date = new Date(utcDate)
  if (isPast(date)) return 'Ended'
  return formatDistanceToNow(date, { addSuffix: true })
}

export function getMatchDayLabel(utcDate: string): string {
  const date = new Date(utcDate)
  if (isToday(date)) return 'Today'
  if (isTomorrow(date)) return 'Tomorrow'
  const ist = toIST(utcDate)
  return format(ist, 'EEEE, dd MMM')
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

  const days    = Math.floor(total / 86400)
  const hours   = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60

  return { days, hours, minutes, seconds, total }
}

export function getTournamentCountdown(): CountdownParts {
  return getCountdown('2026-06-11T21:00:00Z')
}

export function groupByDate(utcDates: string[]): Record<string, string[]> {
  const result: Record<string, string[]> = {}
  for (const d of utcDates) {
    const key = format(toIST(d), 'yyyy-MM-dd')
    if (!result[key]) result[key] = []
    result[key].push(d)
  }
  return result
}

export function isMatchToday(utcDate: string): boolean {
  return isToday(new Date(utcDate))
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
