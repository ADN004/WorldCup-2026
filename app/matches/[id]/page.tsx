import type { Metadata } from 'next'
import { notFound }        from 'next/navigation'
import { FIXTURES }        from '@/data/fixtures'
import { getTeam, TEAMS }  from '@/data/teams'
import { getStadium }      from '@/data/stadiums'
import { isTBD }           from '@/lib/utils'
import { LiveMatchView }   from '@/components/ui/LiveMatchView'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return FIXTURES.map(f => ({ id: f.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const match   = FIXTURES.find(f => f.id === id)
  if (!match) return { title: 'Match not found' }

  const home = isTBD(match.homeTeamId) ? null : getTeam(match.homeTeamId)
  const away = isTBD(match.awayTeamId) ? null : getTeam(match.awayTeamId)
  const title = home && away
    ? `${home.name} vs ${away.name} – FIFA World Cup 2026`
    : 'Match – FIFA World Cup 2026'

  return {
    title,
    description: `Live score, goal scorers, lineups and match events for ${title}.`,
  }
}

export default async function MatchPage({ params }: Props) {
  const { id } = await params
  const match  = FIXTURES.find(f => f.id === id)
  if (!match) notFound()

  const homeTeam = isTBD(match.homeTeamId) ? null : getTeam(match.homeTeamId)
  const awayTeam = isTBD(match.awayTeamId) ? null : getTeam(match.awayTeamId)
  const stadium  = getStadium(match.stadiumId)

  return (
    <LiveMatchView
      match={match}
      homeTeam={homeTeam ?? null}
      awayTeam={awayTeam ?? null}
      stadium={stadium ?? null}
    />
  )
}
