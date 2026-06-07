import type { Metadata } from 'next'
import { HeroSection }       from '@/components/home/HeroSection'
import { TodayMatches }      from '@/components/home/TodayMatches'
import { GroupHighlights }   from '@/components/home/GroupHighlights'
import { FeaturedStats }     from '@/components/home/FeaturedStats'
import { FanPoll }           from '@/components/home/FanPoll'
import { FavoriteTeamCard }  from '@/components/home/FavoriteTeamCard'
import { TournamentProgress } from '@/components/home/TournamentProgress'

export const metadata: Metadata = {
  title: 'FIFA World Cup 2026 – The Premium Fan Hub',
  description: 'Live scores, fixtures, group standings, knockout bracket and fan polls for FIFA World Cup 2026. All times in IST.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <div className="page-container">
        {/* Two-column layout for fixtures + favorite team */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2">
            <TodayMatches />
          </div>
          <div className="lg:col-span-1">
            <div className="pt-8">
              <FavoriteTeamCard />
            </div>
          </div>
        </div>

        <FeaturedStats />
        <TournamentProgress />
        <GroupHighlights />
        <FanPoll />
      </div>
    </>
  )
}
