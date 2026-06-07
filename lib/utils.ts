import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MatchImportance, MatchStage, MatchStatus } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatStageLabel(stage: MatchStage): string {
  const labels: Record<MatchStage, string> = {
    GROUP:          'Group Stage',
    ROUND_OF_32:    'Round of 32',
    ROUND_OF_16:    'Round of 16',
    QUARTER_FINAL:  'Quarter Final',
    SEMI_FINAL:     'Semi Final',
    THIRD_PLACE:    'Third Place',
    FINAL:          'Final',
  }
  return labels[stage] ?? stage
}

export function formatStageLabelShort(stage: MatchStage): string {
  const labels: Record<MatchStage, string> = {
    GROUP:          'Group',
    ROUND_OF_32:    'R32',
    ROUND_OF_16:    'R16',
    QUARTER_FINAL:  'QF',
    SEMI_FINAL:     'SF',
    THIRD_PLACE:    '3rd',
    FINAL:          'Final',
  }
  return labels[stage] ?? stage
}

export function importanceLabel(imp: MatchImportance): string {
  const labels: Record<MatchImportance, string> = {
    LOW:        'Regular',
    MEDIUM:     'Notable',
    HIGH:       'Key Match',
    MUST_WATCH: 'Must Watch',
    FINAL:      'THE FINAL',
  }
  return labels[imp]
}

export function importanceColor(imp: MatchImportance): string {
  const colors: Record<MatchImportance, string> = {
    LOW:        'text-white/30',
    MEDIUM:     'text-electric-blue/80',
    HIGH:       'text-gold/80',
    MUST_WATCH: 'text-gold',
    FINAL:      'text-gold',
  }
  return colors[imp]
}

export function statusColor(status: MatchStatus): string {
  switch (status) {
    case 'LIVE':
    case 'HALF_TIME':
      return 'text-live'
    case 'FINISHED':
      return 'text-white/50'
    case 'SCHEDULED':
      return 'text-electric-blue'
    default:
      return 'text-white/40'
  }
}

export function statusLabel(status: MatchStatus, minute?: number): string {
  switch (status) {
    case 'LIVE':      return minute ? `${minute}'` : 'LIVE'
    case 'HALF_TIME': return 'HT'
    case 'FINISHED':  return 'FT'
    case 'SCHEDULED': return 'Upcoming'
    case 'POSTPONED': return 'Postponed'
    default:          return status
  }
}

export function formatScore(home: number | null, away: number | null): string {
  if (home === null || away === null) return '- : -'
  return `${home} : ${away}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getFormColor(result: 'W' | 'D' | 'L'): string {
  const map = { W: 'bg-success', D: 'bg-warning', L: 'bg-live' }
  return map[result]
}

export function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function roundToDecimal(num: number, places: number): number {
  const factor = Math.pow(10, places)
  return Math.round(num * factor) / factor
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${roundToDecimal(n / 1_000_000, 1)}M`
  if (n >= 1_000)     return `${roundToDecimal(n / 1_000, 1)}K`
  return n.toString()
}

export function getPositionSuffix(pos: number): string {
  if (pos === 1) return '1st'
  if (pos === 2) return '2nd'
  if (pos === 3) return '3rd'
  return `${pos}th`
}

export function isTBD(teamId: string): boolean {
  return teamId === 'TBD' || !teamId
}
