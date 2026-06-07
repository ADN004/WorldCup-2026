'use client'

import { useMemo } from 'react'
import Fuse from 'fuse.js'
import { TEAMS } from '@/data/teams'
import { FIXTURES } from '@/data/fixtures'
import { GROUPS } from '@/data/groups'
import type { SearchResult } from '@/types'
import { formatMatchDateTime } from '@/lib/timeUtils'
import { formatStageLabel } from '@/lib/utils'

const TEAM_ENTRIES: SearchResult[] = TEAMS.map(t => ({
  type:     'team',
  id:       t.id,
  title:    t.name,
  subtitle: `Group ${t.group} · FIFA Rank #${t.fifaRanking}`,
  href:     `/teams/${t.id}`,
}))

const GROUP_ENTRIES: SearchResult[] = GROUPS.map(g => ({
  type:     'group',
  id:       g.id,
  title:    `Group ${g.id}`,
  subtitle: g.standings.map(s => s.teamId).join(', '),
  href:     `/groups#group-${g.id}`,
}))

const MATCH_ENTRIES: SearchResult[] = FIXTURES
  .filter(m => m.homeTeamId !== 'TBD' && m.awayTeamId !== 'TBD')
  .map(m => {
    const home = TEAMS.find(t => t.id === m.homeTeamId)
    const away = TEAMS.find(t => t.id === m.awayTeamId)
    return {
      type:     'match' as const,
      id:       m.id,
      title:    `${home?.name ?? 'TBD'} vs ${away?.name ?? 'TBD'}`,
      subtitle: `${formatStageLabel(m.stage)} · ${formatMatchDateTime(m.utcDate)}`,
      href:     `/fixtures?match=${m.id}`,
    }
  })

const ALL_ENTRIES = [...TEAM_ENTRIES, ...GROUP_ENTRIES, ...MATCH_ENTRIES]

const fuse = new Fuse(ALL_ENTRIES, {
  keys:              ['title', 'subtitle'],
  threshold:         0.35,
  includeScore:      true,
  ignoreLocation:    true,
  minMatchCharLength: 2,
})

export function useSearch(query: string): SearchResult[] {
  return useMemo(() => {
    if (!query.trim() || query.length < 2) return []
    return fuse.search(query).slice(0, 10).map(r => r.item)
  }, [query])
}
