'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Trophy, Calendar, Users, GitBranch, BarChart3 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { FIXTURES } from '@/data/fixtures'
import { cn } from '@/lib/utils'

const TOURNAMENT_START = new Date('2026-06-11T19:00:00Z')
const TOURNAMENT_END   = new Date('2026-07-19T19:00:00Z')

function liveMatchCount() {
  return FIXTURES.filter(m => m.status === 'LIVE' || m.status === 'HALF_TIME').length
}

function mobileStatusText(): string {
  const live = liveMatchCount()
  if (live > 0) return `${live} match${live > 1 ? 'es' : ''} LIVE now`
  const now = new Date()
  if (now < TOURNAMENT_START) {
    const days = Math.ceil((TOURNAMENT_START.getTime() - now.getTime()) / 86_400_000)
    return `Tournament starts in ${days} day${days !== 1 ? 's' : ''}`
  }
  if (now > TOURNAMENT_END) return 'Tournament complete · Final Jul 19'
  return 'Tournament underway'
}

const NAV_LINKS = [
  { href: '/',         label: 'Home',     icon: Trophy },
  { href: '/fixtures', label: 'Fixtures', icon: Calendar },
  { href: '/groups',   label: 'Groups',   icon: BarChart3 },
  { href: '/bracket',  label: 'Bracket',  icon: GitBranch },
  { href: '/teams',    label: 'Teams',    icon: Users },
]

export function Navigation() {
  const pathname    = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const { toggleSearch, toggleMobileNav, mobileNavOpen, setMobileNavOpen } = useAppStore()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile nav on route change
  useEffect(() => { setMobileNavOpen(false) }, [pathname, setMobileNavOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'glass border-b border-glass-border backdrop-blur-xl shadow-nav'
            : 'bg-transparent'
        )}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-20 group-hover:opacity-40 transition-opacity" />
                <Trophy className="w-5 h-5 text-gold relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading text-xs font-semibold text-gold/70 tracking-widest uppercase">
                  FIFA
                </span>
                <span className="font-heading text-base font-bold text-white tracking-tight">
                  World Cup <span className="text-gradient-gold">2026</span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200',
                      active
                        ? 'text-white'
                        : 'text-white/50 hover:text-white/80'
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 glass-gold rounded-xl"
                        style={{ borderColor: 'rgba(245,197,24,0.2)' }}
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={toggleSearch}
                className="flex items-center gap-2 px-3 py-2 rounded-xl glass glass-hover cursor-pointer"
                aria-label="Open search"
              >
                <Search className="w-4 h-4 text-white/60" />
                <span className="hidden sm:inline text-sm text-white/40">Search…</span>
                <kbd className="hidden lg:inline text-xs text-white/20 border border-white/10 rounded px-1.5 py-0.5 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Live badge — only when matches are actually live */}
              {liveMatchCount() > 0 && (
                <div className="hidden sm:flex live-indicator animate-pulse-glow">
                  <span className="live-dot" />
                  LIVE
                </div>
              )}

              {/* Mobile menu */}
              <button
                onClick={toggleMobileNav}
                className="md:hidden p-2 rounded-xl glass glass-hover"
                aria-label="Toggle menu"
              >
                {mobileNavOpen ? (
                  <X className="w-5 h-5 text-white/70" />
                ) : (
                  <Menu className="w-5 h-5 text-white/70" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ top: 64 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-navy-950/90 backdrop-blur-2xl"
              onClick={() => setMobileNavOpen(false)}
            />

            {/* Menu */}
            <nav className="relative z-10 p-4 flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label, icon: Icon }, i) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-4 p-4 rounded-2xl transition-all',
                        active
                          ? 'glass-gold bg-gold/5 text-white'
                          : 'glass text-white/60 hover:text-white'
                      )}
                    >
                      <div className={cn(
                        'p-2.5 rounded-xl',
                        active ? 'bg-gold/20' : 'bg-white/5'
                      )}>
                        <Icon className={cn('w-5 h-5', active ? 'text-gold' : 'text-white/60')} />
                      </div>
                      <span className="font-heading text-lg font-semibold tracking-tight">{label}</span>
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              {/* Dynamic tournament status */}
              <div className={cn(
                'mt-4 p-4 rounded-2xl flex items-center gap-3',
                liveMatchCount() > 0 ? 'glass-live' : 'glass border border-glass-border'
              )}>
                <span className={cn(
                  'w-2.5 h-2.5 rounded-full flex-shrink-0',
                  liveMatchCount() > 0 ? 'live-dot' : 'bg-success animate-pulse'
                )} />
                <span className={cn(
                  'font-semibold text-sm',
                  liveMatchCount() > 0 ? 'text-live' : 'text-white/60'
                )}>
                  {mobileStatusText()}
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcut for search */}
      <KeyboardSearchShortcut />
    </>
  )
}

function KeyboardSearchShortcut() {
  const { toggleSearch } = useAppStore()
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleSearch()
      }
      if (e.key === 'Escape') {
        useAppStore.getState().setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggleSearch])
  return null
}
