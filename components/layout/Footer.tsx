'use client'

import Link from 'next/link'
import { Trophy, Globe } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { TIMEZONE_LIST } from '@/components/ui/TimezoneSelector'

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

const LINKS = [
  { label: 'Fixtures',  href: '/fixtures' },
  { label: 'Groups',    href: '/groups'   },
  { label: 'Bracket',   href: '/bracket'  },
  { label: 'Teams',     href: '/teams'    },
]

export function Footer() {
  const tz = useAppStore(s => s.preferences.timeZone)
  const tzEntry = TIMEZONE_LIST.find(t => t.value === tz)
  const tzLabel = tzEntry?.label ?? tz

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
              standings, and more.
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
              <span suppressHydrationWarning>
                All times shown in{' '}
                <span className="text-white/60 font-medium">{tzLabel}</span>
              </span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://t.me/crypto_monkeyyy_channel" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg glass glass-hover text-white/40 hover:text-white transition-colors"
                aria-label="Telegram">
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a href="https://github.com/ADN004/WorldCup-2026" target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg glass glass-hover text-white/40 hover:text-white transition-colors"
                aria-label="GitHub">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="/" className="p-2 rounded-lg glass glass-hover text-white/40 hover:text-white transition-colors"
                aria-label="Home">
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
