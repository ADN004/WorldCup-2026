import Link from 'next/link'
import { Trophy, Globe, ExternalLink } from 'lucide-react'

const LINKS = [
  { label: 'Fixtures',  href: '/fixtures' },
  { label: 'Groups',    href: '/groups'   },
  { label: 'Bracket',   href: '/bracket'  },
  { label: 'Teams',     href: '/teams'    },
]

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-glass-border">
      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,197,24,0.3), transparent)' }}
      />

      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gold/10 border border-gold/20">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <div>
                <div className="text-xs text-white/40 font-semibold tracking-widest uppercase">FIFA</div>
                <div className="font-heading text-base font-bold text-white">
                  World Cup <span className="text-gradient-gold">2026</span>
                </div>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              The ultimate fan hub for FIFA World Cup 2026. Live scores, fixtures,
              standings, and more — all in IST.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/30">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Hosted by USA · Canada · Mexico
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/30">Navigate</h3>
            <div className="grid grid-cols-2 gap-2">
              {LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-white/50 hover:text-gold transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/30">Tournament</h3>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <span>June 11 – July 19, 2026</span>
              <span>16 Host Cities · 3 Countries</span>
              <span>48 Teams · 104 Matches · 39 days</span>
              <span>All times shown in IST (UTC+5:30)</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg glass glass-hover text-white/40 hover:text-white">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg glass glass-hover text-white/40 hover:text-white">
                <ExternalLink className="w-4 h-4" />
              </a>
              <a href="/" className="p-2 rounded-lg glass glass-hover text-white/40 hover:text-white">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="divider my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <span>© 2026 WC26 Fan Hub. Not an official FIFA product.</span>
          <span>
            Data from{' '}
            <a href="https://www.football-data.org" target="_blank" rel="noopener noreferrer"
              className="text-white/40 hover:text-gold transition-colors">
              football-data.org
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
