import type { Metadata } from 'next'
import { notFound }       from 'next/navigation'
import Link               from 'next/link'
import { ArrowLeft, Star, Shield, Calendar, TrendingUp } from 'lucide-react'
import { TEAMS, getTeam } from '@/data/teams'
import { getGroup }       from '@/data/groups'
import { getTeamFixtures } from '@/data/fixtures'
import { getSquad }        from '@/data/squads'
import { TeamFlag }        from '@/components/ui/TeamFlag'
import { MatchCard }       from '@/components/ui/MatchCard'
import { TeamSquad }       from '@/components/ui/TeamSquad'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return TEAMS.map(t => ({ slug: t.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const team = getTeam(slug)
  if (!team) return { title: 'Team not found' }
  return {
    title: `${team.name} – FIFA World Cup 2026`,
    description: `${team.name} World Cup 2026 profile. Group ${team.group}, FIFA Rank #${team.fifaRanking}. Fixtures, standings and more.`,
  }
}

export default async function TeamPage({ params }: Props) {
  const { slug } = await params
  const team = getTeam(slug)
  if (!team) notFound()

  const group    = getGroup(team.group)
  const standing = group?.standings.find(s => s.teamId === team.id)
  const matches  = getTeamFixtures(team.id)
  const squad    = getSquad(team.id)

  return (
    <div className="page-container py-8">
      {/* Back */}
      <Link
        href="/teams"
        className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        All Teams
      </Link>

      {/* Hero */}
      <div
        className="glass rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${team.primaryColor}18 0%, rgba(255,255,255,0.04) 60%), rgba(255,255,255,0.04)`,
          borderColor: `${team.primaryColor}25`,
        }}
      >
        {/* Background flag watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5 overflow-hidden pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w320/${team.code.toLowerCase()}.png`}
            alt=""
            className="w-full h-full object-cover scale-110"
          />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <TeamFlag code={team.code} name={team.name} size="xl" showShadow />

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold border"
                style={{
                  background: `${team.primaryColor}20`,
                  borderColor: `${team.primaryColor}40`,
                  color: team.primaryColor === '#FFFFFF' ? '#ccc' : team.primaryColor,
                }}
              >
                Group {team.group}
              </span>
              <span className="badge badge-gold">FIFA #{team.fifaRanking}</span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-1">
              {team.name}
            </h1>
            <p className="text-sm text-white/40">{team.continent} · Est. {team.founded}</p>
          </div>
        </div>

        {/* Key stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 relative z-10">
          {[
            { label: 'Best Result',   value: team.bestResult,               icon: Star },
            { label: 'WC Apps',       value: `${team.worldCupAppearances}×`,icon: TrendingUp },
            { label: 'Home Stadium',  value: team.homeStadium,              icon: Shield },
            { label: 'Coach',         value: team.coach,                    icon: Calendar },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-white/30" />
                <span className="text-xs text-white/30 font-semibold uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-sm font-semibold text-white leading-tight">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Group standing */}
      {standing && (
        <div className="glass rounded-2xl p-5 mb-8">
          <h2 className="font-heading text-lg font-bold text-white mb-4">
            Group {team.group} Standing
          </h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 text-center">
            {[
              { label: 'Position', value: `${standing.position}${['st','nd','rd','th'][Math.min(standing.position - 1, 3)]}` },
              { label: 'Played',   value: standing.played },
              { label: 'Won',      value: standing.won },
              { label: 'Drawn',    value: standing.drawn },
              { label: 'Lost',     value: standing.lost },
              { label: 'GF',       value: standing.goalsFor },
              { label: 'GA',       value: standing.goalsAgainst },
              { label: 'Points',   value: standing.points },
            ].map(({ label, value }) => (
              <div key={label} className="glass rounded-xl p-2">
                <p className="font-stats text-2xl text-white leading-none">{value}</p>
                <p className="text-[0.6rem] text-white/30 font-semibold mt-0.5 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Squad */}
      {squad.length > 0 && (
        <div className="mb-8">
          <TeamSquad players={squad} />
        </div>
      )}

      {/* Fixtures */}
      <div>
        <h2 className="font-heading text-xl font-bold text-white mb-4">
          Fixtures & Results
        </h2>
        {matches.length === 0 ? (
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-white/30 text-sm">No fixtures found.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {matches.map((match, i) => (
              <MatchCard key={match.id} match={match} animate delay={i * 0.04} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
