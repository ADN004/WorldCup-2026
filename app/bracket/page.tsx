'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutList, Maximize2, RotateCcw } from 'lucide-react'
import { getFixturesByStage } from '@/data/fixtures'
import { getTeam } from '@/data/teams'
import { MatchDetailModal } from '@/components/ui/MatchDetailModal'
import { TeamFlag } from '@/components/ui/TeamFlag'
import { cn, isTBD } from '@/lib/utils'
import { formatMatchTime, formatMatchDateShort } from '@/lib/timeUtils'
import { useTimezone } from '@/store/useAppStore'
import type { Match } from '@/types'

// ─── Layout constants ────────────────────────────────────────────────────────
const CW = 148   // card width
const CH = 76    // card height (approx: 20px header + 28px × 2 team rows)
const H  = 704   // total bracket height — 8 slots × 88px
const CX = 20    // connector SVG width
const CEN = 248  // center column width

// ─── Position math ───────────────────────────────────────────────────────────
const yc = (n: number) => Array.from({ length: n }, (_, i) => (i + 0.5) * (H / n))
const R32Y = yc(8)   // [44,132,220,308,396,484,572,660]
const R16Y = yc(4)   // [88,264,440,616]
const QFY  = yc(2)   // [176,528]
const SFY  = yc(1)   // [352]

// ─── World Cup Trophy ────────────────────────────────────────────────────────
function WCTrophy() {
  return (
    <div className="relative flex justify-center">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ width: 160, height: 160, background: 'rgba(245,197,24,0.13)', filter: 'blur(40px)' }}
      />

      {/* Trophy card */}
      <div
        className="relative flex flex-col items-center rounded-2xl overflow-hidden border border-gold/25"
        style={{
          width: 190,
          background: 'linear-gradient(170deg, rgba(245,197,24,0.09) 0%, rgba(6,14,30,0.97) 55%)',
          boxShadow: '0 0 0 1px rgba(245,197,24,0.06), 0 12px 48px rgba(245,197,24,0.16), inset 0 1px 0 rgba(245,197,24,0.12)',
        }}
      >
        {/* Image — mix-blend-mode:screen dissolves the dark photo background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wc-trophy.jpg"
          alt="FIFA World Cup Trophy"
          style={{
            display: 'block',
            width: '100%',
            height: 120,
            objectFit: 'cover',
            objectPosition: 'center 30%',
            mixBlendMode: 'screen',
            filter: 'brightness(1.1) contrast(1.06) saturate(1.1)',
          }}
        />

        {/* Divider */}
        <div className="w-full h-px" style={{ background: 'rgba(245,197,24,0.18)' }} />

        {/* Text block */}
        <div className="w-full px-5 py-3 text-center">
          <p
            className="font-heading font-bold tracking-[0.25em] uppercase"
            style={{ color: '#F5C518', fontSize: '0.82rem', letterSpacing: '0.22em' }}
          >
            World Cup
          </p>
          <p className="text-white/28 font-semibold tracking-widest mt-0.5" style={{ fontSize: '0.54rem' }}>
            FIFA 2026
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Bracket match card ───────────────────────────────────────────────────────
function BracketCard({ match, flip = false, onClick }: {
  match: Match
  flip?: boolean
  onClick: () => void
}) {
  const tz   = useTimezone()
  const home = isTBD(match.homeTeamId) ? null : getTeam(match.homeTeamId)
  const away = isTBD(match.awayTeamId) ? null : getTeam(match.awayTeamId)
  const isLive = match.status === 'LIVE' || match.status === 'HALF_TIME'
  const isDone = match.status === 'FINISHED'
  const homeWon = isDone && match.score.home !== null && match.score.away !== null && match.score.home > match.score.away!
  const awayWon = isDone && match.score.home !== null && match.score.away !== null && match.score.away! > match.score.home!

  return (
    <button
      onClick={onClick}
      style={{ width: CW, minHeight: CH, ...(flip ? { transform: 'scaleX(-1)' } : {}) }}
      className={cn(
        'flex flex-col rounded-xl overflow-hidden border text-left transition-all cursor-pointer flex-shrink-0',
        'bg-[rgba(8,18,36,0.92)] backdrop-blur-sm',
        isLive
          ? 'border-live/40 shadow-[0_0_10px_rgba(255,53,72,0.18)]'
          : match.importance === 'FINAL'
          ? 'border-gold/30 shadow-[0_0_14px_rgba(245,197,24,0.16)]'
          : 'border-white/[0.07] hover:border-white/[0.16] hover:bg-[rgba(14,28,52,0.95)]',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-[3px] bg-white/[0.03] border-b border-white/[0.045]">
        <span className="text-[0.52rem] text-white/22 font-semibold">{formatMatchDateShort(match.utcDate, tz)}</span>
        <span className="text-[0.52rem] text-electric-blue/55 font-semibold">{formatMatchTime(match.utcDate, tz)}</span>
      </div>
      {/* Home */}
      <div className={cn('flex items-center justify-between gap-1.5 px-2 py-[6px] border-b border-white/[0.04]', homeWon && 'bg-success/5')}>
        <div className="flex items-center gap-1.5 min-w-0">
          {home
            ? <><TeamFlag code={home.code} name={home.name} size="xs" /><span className="text-[0.67rem] font-semibold text-white truncate">{home.shortName}</span></>
            : <span className="text-[0.67rem] text-white/18 font-medium">TBD</span>}
        </div>
        <span className={cn('text-sm font-stats tabular-nums flex-shrink-0', homeWon ? 'text-white' : 'text-white/28')}>
          {match.score.home ?? '–'}
        </span>
      </div>
      {/* Away */}
      <div className={cn('flex items-center justify-between gap-1.5 px-2 py-[6px]', awayWon && 'bg-success/5')}>
        <div className="flex items-center gap-1.5 min-w-0">
          {away
            ? <><TeamFlag code={away.code} name={away.name} size="xs" /><span className="text-[0.67rem] font-semibold text-white truncate">{away.shortName}</span></>
            : <span className="text-[0.67rem] text-white/18 font-medium">TBD</span>}
        </div>
        <span className={cn('text-sm font-stats tabular-nums flex-shrink-0', awayWon ? 'text-white' : 'text-white/28')}>
          {match.score.away ?? '–'}
        </span>
      </div>
    </button>
  )
}

// ─── Connector SVG (bracket elbows) ──────────────────────────────────────────
// Draws lines that branch two "source" y-positions into one "target" y-position.
// When the parent has scaleX(-1) applied, the arm automatically flips direction.
function ConnSVG({ pairs, nexts }: { pairs: [number, number][]; nexts: number[] }) {
  const arm = CX * 0.55
  const stroke = 'rgba(255,255,255,0.12)'
  return (
    <svg width={CX} height={H} className="flex-shrink-0" style={{ overflow: 'visible' }}>
      {pairs.map(([y1, y2], i) => {
        const ym = nexts[i]
        return (
          <g key={i}>
            <line x1={0}   y1={y1} x2={arm} y2={y1} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
            <line x1={arm} y1={y1} x2={arm} y2={y2} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
            <line x1={0}   y1={y2} x2={arm} y2={y2} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
            <line x1={arm} y1={ym} x2={CX}  y2={ym} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
          </g>
        )
      })}
    </svg>
  )
}

// ─── Column of match cards (absolutely positioned) ────────────────────────────
function BCol({ matches, cy, flip, onClick }: {
  matches: Match[]
  cy: number[]
  flip?: boolean
  onClick: (m: Match) => void
}) {
  return (
    <div className="relative flex-shrink-0" style={{ width: CW, height: H }}>
      {matches.map((m, i) => (
        <div key={m.id} className="absolute" style={{ top: cy[i] - CH / 2, left: 0 }}>
          <BracketCard match={m} flip={flip} onClick={() => onClick(m)} />
        </div>
      ))}
    </div>
  )
}

// ─── One half of the bracket ──────────────────────────────────────────────────
// dir='left'  → R32 on far left, SF near center, connectors point rightward
// dir='right' → wraps in scaleX(-1) so R32 is far right, SF near center
//               BracketCard.flip=true counter-flips card content back to normal
function BracketHalf({ r32, r16, qf, sf, dir, onClick }: {
  r32: Match[]
  r16: Match[]
  qf:  Match[]
  sf?: Match
  dir: 'left' | 'right'
  onClick: (m: Match) => void
}) {
  const flip = dir === 'right'
  const r32p: [number,number][] = [[R32Y[0],R32Y[1]], [R32Y[2],R32Y[3]], [R32Y[4],R32Y[5]], [R32Y[6],R32Y[7]]]
  const r16p: [number,number][] = [[R16Y[0],R16Y[1]], [R16Y[2],R16Y[3]]]
  const qfp:  [number,number][] = [[QFY[0], QFY[1]]]

  const inner = (
    <div className="flex items-start" style={{ height: H }}>
      <BCol matches={r32}      cy={R32Y} flip={flip} onClick={onClick} />
      <ConnSVG pairs={r32p}    nexts={R16Y} />
      <BCol matches={r16}      cy={R16Y} flip={flip} onClick={onClick} />
      <ConnSVG pairs={r16p}    nexts={QFY} />
      <BCol matches={qf}       cy={QFY}  flip={flip} onClick={onClick} />
      <ConnSVG pairs={qfp}     nexts={SFY} />
      {sf && <BCol matches={[sf]} cy={SFY} flip={flip} onClick={onClick} />}
    </div>
  )

  return flip ? <div style={{ transform: 'scaleX(-1)' }}>{inner}</div> : inner
}

// ─── Center column: Trophy + Final ───────────────────────────────────────────
function CenterCol({ finalMatch, onClick }: { finalMatch?: Match; onClick: (m: Match) => void }) {
  const finalY = SFY[0]  // 352 — vertical center
  const stroke = 'rgba(255,255,255,0.12)'
  const leftX  = (CEN - CW) / 2        // left edge of Final card in center col
  const rightX = (CEN + CW) / 2        // right edge

  return (
    <div className="relative flex-shrink-0" style={{ width: CEN, height: H }}>
      {/* SF → Final connector lines */}
      <svg className="absolute inset-0 pointer-events-none" width={CEN} height={H} style={{ overflow: 'visible' }}>
        <line x1={0}    y1={finalY} x2={leftX - 1}  y2={finalY} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
        <line x1={CEN}  y1={finalY} x2={rightX + 1} y2={finalY} stroke={stroke} strokeWidth={1.5} strokeLinecap="round" />
      </svg>

      {/* Trophy */}
      <div className="absolute left-0 right-0 flex justify-center" style={{ top: H * 0.04 }}>
        <WCTrophy />
      </div>

      {/* "THE FINAL" label above the card */}
      <div className="absolute left-0 right-0 text-center" style={{ top: finalY - CH / 2 - 44 }}>
        <p className="text-[0.62rem] font-bold text-gold/65 tracking-[0.25em] uppercase">The Final</p>
        <p className="text-[0.52rem] text-white/22 font-semibold tracking-wide mt-0.5">19 Jul · MetLife Stadium</p>
      </div>

      {/* Final match card */}
      {finalMatch && (
        <div className="absolute" style={{ top: finalY - CH / 2, left: leftX }}>
          <BracketCard match={finalMatch} onClick={() => onClick(finalMatch)} />
        </div>
      )}
    </div>
  )
}

// ─── Round header labels ──────────────────────────────────────────────────────
function BracketHeaders() {
  return (
    <div className="flex items-center mb-2 pb-2 border-b border-white/[0.04]">
      {/* Left side: R32 → SF */}
      {(['Round of 32', 'Round of 16', 'Quarters', 'Semis'] as const).map((label, i) => (
        <div key={label} style={{ width: i < 3 ? CW + CX : CW, flexShrink: 0 }} className="text-center">
          <span className={cn(
            'text-[0.55rem] font-bold tracking-widest uppercase',
            i === 3 ? 'text-white/38' : 'text-white/22'
          )}>{label}</span>
        </div>
      ))}
      {/* Center */}
      <div style={{ width: CEN, flexShrink: 0 }} className="text-center">
        <span className="text-[0.55rem] font-bold tracking-widest uppercase text-gold/55">The Final</span>
      </div>
      {/* Right side: SF → R32 */}
      {(['Semis', 'Quarters', 'Round of 16', 'Round of 32'] as const).map((label, i) => (
        <div key={label} style={{ width: i === 0 ? CW : CW + CX, flexShrink: 0 }} className="text-center">
          <span className={cn(
            'text-[0.55rem] font-bold tracking-widest uppercase',
            i === 0 ? 'text-white/38' : 'text-white/22'
          )}>{label}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Mobile match card (full-width list) ──────────────────────────────────────
function MobileCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const tz   = useTimezone()
  const home = isTBD(match.homeTeamId) ? null : getTeam(match.homeTeamId)
  const away = isTBD(match.awayTeamId) ? null : getTeam(match.awayTeamId)
  const isLive = match.status === 'LIVE' || match.status === 'HALF_TIME'
  const isDone = match.status === 'FINISHED'
  const homeWon = isDone && match.score.home !== null && match.score.away !== null && match.score.home > match.score.away!
  const awayWon = isDone && match.score.home !== null && match.score.away !== null && match.score.away! > match.score.home!

  return (
    <button
      onClick={onClick}
      className={cn(
        'glass rounded-xl overflow-hidden border w-full text-left cursor-pointer transition-all',
        isLive ? 'border-live/30 glass-live' : 'border-glass-border hover:border-glass-border-hover',
        isDone && 'opacity-70',
      )}
    >
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.025] border-b border-glass-border/50">
        <span className="text-[0.6rem] text-white/25 font-semibold">{formatMatchDateShort(match.utcDate, tz)}</span>
        <span className="text-[0.6rem] text-electric-blue/60 font-semibold">{formatMatchTime(match.utcDate, tz)}</span>
      </div>
      <div className={cn('flex items-center justify-between gap-2 px-3 py-2.5 border-b border-glass-border/30', homeWon && 'bg-success/5')}>
        <div className="flex items-center gap-2 min-w-0">
          {home
            ? <><TeamFlag code={home.code} name={home.name} size="xs" /><span className="text-sm font-semibold text-white truncate">{home.shortName}</span></>
            : <span className="text-sm text-white/25">TBD</span>}
        </div>
        <span className={cn('text-base font-stats tabular-nums flex-shrink-0', homeWon ? 'text-white' : 'text-white/40')}>
          {match.score.home ?? '–'}
        </span>
      </div>
      <div className={cn('flex items-center justify-between gap-2 px-3 py-2.5', awayWon && 'bg-success/5')}>
        <div className="flex items-center gap-2 min-w-0">
          {away
            ? <><TeamFlag code={away.code} name={away.name} size="xs" /><span className="text-sm font-semibold text-white truncate">{away.shortName}</span></>
            : <span className="text-sm text-white/25">TBD</span>}
        </div>
        <span className={cn('text-base font-stats tabular-nums flex-shrink-0', awayWon ? 'text-white' : 'text-white/40')}>
          {match.score.away ?? '–'}
        </span>
      </div>
    </button>
  )
}

// ─── Round config ─────────────────────────────────────────────────────────────
const ROUNDS = [
  { stage: 'ROUND_OF_32',   label: 'Round of 32',   short: 'R32'   },
  { stage: 'ROUND_OF_16',   label: 'Round of 16',   short: 'R16'   },
  { stage: 'QUARTER_FINAL', label: 'Quarter Finals', short: 'QF'    },
  { stage: 'SEMI_FINAL',    label: 'Semi Finals',    short: 'SF'    },
  { stage: 'FINAL',         label: 'The Final',      short: 'Final' },
] as const

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BracketPage() {
  const [selected,    setSelected]    = useState<Match | null>(null)
  const [viewMode,    setViewMode]    = useState<'list' | 'bracket'>('list')
  const [activeRound, setActiveRound] = useState<string>('ROUND_OF_32')

  const r32   = getFixturesByStage('ROUND_OF_32')
  const r16   = getFixturesByStage('ROUND_OF_16')
  const qf    = getFixturesByStage('QUARTER_FINAL')
  const sf    = getFixturesByStage('SEMI_FINAL')
  const final = getFixturesByStage('FINAL')

  const leftR32  = r32.slice(0, 8)
  const rightR32 = r32.slice(8, 16)
  const leftR16  = r16.slice(0, 4)
  const rightR16 = r16.slice(4, 8)
  const leftQF   = qf.slice(0, 2)
  const rightQF  = qf.slice(2, 4)

  return (
    <div className="page-container py-8">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="section-label mb-1">Knockout Stage</p>
          <h1 className="section-title">Tournament Bracket</h1>
          <p className="text-sm text-white/40 mt-1">48 teams · Round of 32 → World Champions</p>
        </div>

        {/* List / Bracket toggle — hidden at xl+ (always bracket on big screens) */}
        <div className="xl:hidden glass rounded-xl p-1 border border-glass-border flex gap-1">
          {(['list', 'bracket'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                viewMode === mode
                  ? mode === 'bracket' ? 'bg-gold/10 text-gold' : 'bg-white/8 text-white'
                  : 'text-white/35 hover:text-white/60'
              )}
            >
              {mode === 'list'
                ? <LayoutList className="w-3.5 h-3.5" />
                : <Maximize2 className="w-3.5 h-3.5" />}
              {mode === 'list' ? 'List' : 'Full Bracket'}
            </button>
          ))}
        </div>
      </div>

      {/* ── BRACKET VIEW ───────────────────────────────────────────────── */}
      <div className={cn(viewMode === 'list' ? 'hidden xl:block' : 'block')}>

        {/* Mobile rotate/scroll hint */}
        {viewMode === 'bracket' && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:hidden mb-3 glass rounded-xl p-3 flex items-center gap-3"
          >
            <RotateCcw className="w-4 h-4 text-electric-blue flex-shrink-0" />
            <p className="text-xs text-white/45 leading-relaxed">
              Scroll sideways to see all rounds, or rotate your device to landscape for the full view.
            </p>
          </motion.div>
        )}

        {/* Horizontally scrollable bracket */}
        <div className="overflow-x-auto pb-6 -mx-4 px-4">
          <div className="inline-flex flex-col">
            <BracketHeaders />
            <div className="flex items-start">
              <BracketHalf
                r32={leftR32}  r16={leftR16}  qf={leftQF}
                sf={sf[0]} dir="left" onClick={setSelected}
              />
              <CenterCol finalMatch={final[0]} onClick={setSelected} />
              <BracketHalf
                r32={rightR32} r16={rightR16} qf={rightQF}
                sf={sf[1]} dir="right" onClick={setSelected}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── LIST VIEW (mobile default) ──────────────────────────────────── */}
      <div className={cn(viewMode === 'bracket' ? 'hidden' : 'block xl:hidden')}>
        {/* Round tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-5">
          {ROUNDS.map(r => (
            <button
              key={r.stage}
              onClick={() => setActiveRound(r.stage)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                activeRound === r.stage
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : 'border-glass-border text-white/40 hover:text-white glass'
              )}
            >
              {r.short}
            </button>
          ))}
        </div>

        {/* Matches for active round */}
        {ROUNDS.filter(r => r.stage === activeRound).map(round => {
          const matches = getFixturesByStage(round.stage)
          return (
            <div key={round.stage}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-white">{round.label}</h2>
                <span className="badge badge-blue">{matches.length} match{matches.length !== 1 ? 'es' : ''}</span>
              </div>
              <div className="flex flex-col gap-3">
                {matches.map((match, mi) => (
                  <motion.div
                    key={match.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: mi * 0.04 }}
                  >
                    <MobileCard match={match} onClick={() => setSelected(match)} />
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Match detail modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <MatchDetailModal match={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      {/* ── Info footer ─────────────────────────────────────────────────── */}
      <div className="mt-8 glass rounded-xl p-4 flex items-start sm:items-center gap-3">
        <div className="p-2 rounded-lg bg-gold/10 flex-shrink-0">
          <span className="text-gold text-sm">ℹ</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Bracket updates as the tournament progresses</p>
          <p className="text-xs text-white/40 mt-0.5">
            Winners advance automatically. Knockout stage begins 28 Jun · Final on 19 Jul at MetLife Stadium.
          </p>
        </div>
      </div>
    </div>
  )
}
