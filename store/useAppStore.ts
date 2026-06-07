'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserPreferences, FanPoll } from '@/types'

interface AppState {
  preferences: UserPreferences
  fanPoll: FanPoll | null
  searchOpen: boolean
  mobileNavOpen: boolean

  setFavoriteTeam: (teamId: string | null) => void
  setHasVoted: (teamId: string) => void
  setLayout: (layout: UserPreferences['layout']) => void
  setTheme: (theme: UserPreferences['theme']) => void
  setFanPoll: (poll: FanPoll) => void
  setSearchOpen: (open: boolean) => void
  setMobileNavOpen: (open: boolean) => void
  toggleSearch: () => void
  toggleMobileNav: () => void
}

const defaultPreferences: UserPreferences = {
  favoriteTeamId: null,
  theme:          'dark',
  timeZone:       'Asia/Kolkata',
  layout:         'auto',
  hasVoted:       false,
  votedTeamId:    null,
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      preferences:    defaultPreferences,
      fanPoll:        null,
      searchOpen:     false,
      mobileNavOpen:  false,

      setFavoriteTeam: (teamId) =>
        set(s => ({
          preferences: { ...s.preferences, favoriteTeamId: teamId },
        })),

      setHasVoted: (teamId) =>
        set(s => ({
          preferences: { ...s.preferences, hasVoted: true, votedTeamId: teamId },
        })),

      setLayout: (layout) =>
        set(s => ({
          preferences: { ...s.preferences, layout },
        })),

      setTheme: (theme) =>
        set(s => ({
          preferences: { ...s.preferences, theme },
        })),

      setFanPoll: (poll) => set({ fanPoll: poll }),

      setSearchOpen:   (open) => set({ searchOpen: open }),
      setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

      toggleSearch:    () => set(s => ({ searchOpen: !s.searchOpen })),
      toggleMobileNav: () => set(s => ({ mobileNavOpen: !s.mobileNavOpen })),
    }),
    {
      name:    'wc26-app-store',
      partialize: (s) => ({ preferences: s.preferences }),
    }
  )
)

// Convenience selectors
export const useFavoriteTeam = () => useAppStore(s => s.preferences.favoriteTeamId)
export const useHasVoted     = () => useAppStore(s => s.preferences.hasVoted)
export const useVotedTeam    = () => useAppStore(s => s.preferences.votedTeamId)
export const useSearchOpen   = () => useAppStore(s => s.searchOpen)
export const useFanPoll      = () => useAppStore(s => s.fanPoll)
