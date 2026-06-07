'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, Users, Calendar, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useAppStore, useSearchOpen } from '@/store/useAppStore'
import { useSearch } from '@/hooks/useSearch'
import { cn } from '@/lib/utils'
import type { SearchResult } from '@/types'

const TYPE_ICONS = {
  team:  Users,
  match: Calendar,
  group: BarChart3,
}

const TYPE_LABELS = {
  team:  'Team',
  match: 'Match',
  group: 'Group',
}

export function SearchModal() {
  const open        = useSearchOpen()
  const { setSearchOpen } = useAppStore()
  const [query, setQuery] = useState('')
  const inputRef    = useRef<HTMLInputElement>(null)
  const results     = useSearch(query)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80)
    } else {
      setQuery('')
    }
  }, [open])

  const close = () => setSearchOpen(false)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-navy-950/80 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.35 }}
            className="fixed top-[10vh] inset-x-0 z-[61] w-[calc(100%-24px)] max-w-xl mx-auto"
          >
            <div className="glass-lg rounded-2xl overflow-hidden shadow-glass-lg">
              {/* Search input */}
              <div className="flex items-center gap-3 p-4 border-b border-glass-border">
                <Search className="w-5 h-5 text-white/40 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search teams, matches, groups…"
                  className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-base"
                />
                {query && (
                  <button onClick={() => setQuery('')} className="text-white/30 hover:text-white transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:block text-xs text-white/20 border border-white/10 rounded px-1.5 py-0.5 font-mono">
                  Esc
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {query.length >= 2 && results.length === 0 && (
                  <div className="p-8 text-center text-white/30 text-sm">
                    No results found for &quot;{query}&quot;
                  </div>
                )}

                {results.length > 0 && (
                  <div className="p-2">
                    {results.map(result => (
                      <SearchResultItem
                        key={`${result.type}-${result.id}`}
                        result={result}
                        onSelect={close}
                      />
                    ))}
                  </div>
                )}

                {!query && (
                  <div className="p-6 text-center">
                    <p className="text-sm text-white/30">
                      Search for teams, matches, or groups
                    </p>
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      {['Brazil', 'Argentina', 'Final', 'Group A'].map(term => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1.5 rounded-lg glass text-xs text-white/50 hover:text-white transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SearchResultItem({ result, onSelect }: { result: SearchResult; onSelect: () => void }) {
  const Icon = TYPE_ICONS[result.type]

  return (
    <Link
      href={result.href}
      onClick={onSelect}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
    >
      <div className="w-9 h-9 rounded-xl glass flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white/50" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white truncate">{result.title}</p>
        <p className="text-xs text-white/40 truncate">{result.subtitle}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={cn('badge text-[0.6rem]',
          result.type === 'team'  ? 'badge-gold' :
          result.type === 'match' ? 'badge-blue' :
          'badge-success'
        )}>
          {TYPE_LABELS[result.type]}
        </span>
        <ArrowRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors" />
      </div>
    </Link>
  )
}
