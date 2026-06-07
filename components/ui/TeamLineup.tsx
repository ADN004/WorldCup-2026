import { cn } from '@/lib/utils'
import type { TeamLineupData, LineupPlayer, SubstitutePlayer } from '@/types'

// ─── Position colour tokens ─────────────────────────────────────────────────
const POS = {
  GK:  { ring: 'ring-amber-400/50',   label: 'text-amber-400',   chip: 'bg-amber-400/10 border-amber-400/25 text-amber-300'   },
  DEF: { ring: 'ring-blue-400/50',    label: 'text-blue-400',    chip: 'bg-blue-400/10 border-blue-400/25 text-blue-300'    },
  MID: { ring: 'ring-emerald-400/50', label: 'text-emerald-400', chip: 'bg-emerald-400/10 border-emerald-400/25 text-emerald-300'},
  FWD: { ring: 'ring-rose-400/50',    label: 'text-rose-400',    chip: 'bg-rose-400/10 border-rose-400/25 text-rose-300'    },
} as const

const POS_LABEL: Record<string, string> = {
  FWD: 'Forwards', MID: 'Midfielders', DEF: 'Defenders', GK: 'Goalkeeper',
}

interface Props {
  lineup:    TeamLineupData
  teamColor: string
}

// ─── Root component ─────────────────────────────────────────────────────────
export function TeamLineup({ lineup, teamColor }: Props) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <h2 className="font-heading text-xl font-bold text-white">Starting XI</h2>
          <p className="text-[0.7rem] text-white/30 mt-0.5 tracking-wide">Probable lineup · {lineup.formation}</p>
        </div>
        <span
          className="px-3 py-1 rounded-full text-xs font-bold border tracking-wider"
          style={{ background: `${teamColor}18`, borderColor: `${teamColor}35`, color: teamColor }}
        >
          {lineup.formation}
        </span>
      </div>

      {/* ── Mobile  (< sm = < 640 px) ─────────────────────────── */}
      {/* Design: position rows + subs section, no pitch          */}
      <div className="block sm:hidden p-4">
        <MobileRows lineup={lineup} teamColor={teamColor} />
        <SubsSection subs={lineup.subs} teamColor={teamColor} className="mt-5 pt-5 border-t border-white/5" />
      </div>

      {/* ── Tablet  (sm → lg = 640–1024 px) ──────────────────── */}
      {/* Design: centred 2-D pitch, subs compact strip below     */}
      <div className="hidden sm:flex lg:hidden flex-col items-center gap-4 p-5">
        <Pitch
          lineup={lineup}
          teamColor={teamColor}
          dotSize={36}
          fontSize={{ num: 11, name: 7.5 }}
          style={{ maxWidth: 340, width: '100%' }}
        />
        <SubsSection subs={lineup.subs} teamColor={teamColor} className="w-full max-w-[340px]" />
      </div>

      {/* ── Desktop (lg+ = 1024 px+) ──────────────────────────── */}
      {/* Design: pitch + subs (left)  |  roster (right)          */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr]">
        {/* Left column: pitch + subs below */}
        <div className="flex flex-col gap-4 p-6 border-r border-white/5">
          <Pitch
            lineup={lineup}
            teamColor={teamColor}
            dotSize={46}
            fontSize={{ num: 14, name: 8.5 }}
            style={{ width: '100%' }}
          />
          <SubsSection subs={lineup.subs} teamColor={teamColor} />
        </div>

        {/* Right column: player roster grouped by position */}
        <div className="p-6">
          <DesktopRoster lineup={lineup} teamColor={teamColor} />
        </div>
      </div>

      {/* ── Disclaimer — always visible, full width ────────────── */}
      <div className="px-5 py-3 border-t border-white/5">
        <p className="text-[0.62rem] text-white/22 text-center leading-relaxed">
          Probable lineup only — the manager may change formation or selected players before match-day kick-off.
        </p>
      </div>
    </div>
  )
}

// ─── MOBILE: position row cards ─────────────────────────────────────────────
function MobileRows({ lineup, teamColor }: { lineup: TeamLineupData; teamColor: string }) {
  const order = ['FWD', 'MID', 'DEF', 'GK'] as const
  return (
    <div className="flex flex-col gap-5">
      {order.map(pos => {
        const players = lineup.players.filter(p => p.pos === pos)
        if (!players.length) return null
        const cfg = POS[pos]
        return (
          <div key={pos}>
            <p className={cn('text-[0.6rem] font-bold tracking-[0.18em] uppercase mb-2.5', cfg.label)}>
              {POS_LABEL[pos]}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {players.map(p => (
                <div
                  key={p.number}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 border"
                  style={{ background: `${teamColor}12`, borderColor: `${teamColor}28` }}
                >
                  <span
                    className={cn('text-[0.65rem] font-bold tabular-nums w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 border', cfg.chip)}
                  >
                    {p.number}
                  </span>
                  <span className="text-xs font-semibold text-white/85 leading-tight">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ─── SUBSTITUTES section (shared across all 3 views) ────────────────────────
function SubsSection({
  subs,
  teamColor,
  className,
}: {
  subs: SubstitutePlayer[]
  teamColor: string
  className?: string
}) {
  if (!subs.length) return null
  return (
    <div className={cn('', className)}>
      <p className="text-[0.6rem] font-bold tracking-[0.18em] uppercase mb-2.5 text-white/35">
        Substitutes
      </p>
      <div className="flex flex-wrap gap-1.5">
        {subs.map(s => {
          const cfg = POS[s.pos]
          return (
            <div
              key={s.number}
              className="flex items-center gap-1.5 rounded-lg px-2 py-1 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {/* Number */}
              <span className={cn('text-[0.6rem] font-bold tabular-nums w-4 text-center', cfg.label)}>
                {s.number}
              </span>
              {/* Name */}
              <span className="text-[0.7rem] font-medium text-white/60 leading-tight">{s.name}</span>
              {/* Pos badge */}
              <span className={cn('text-[0.5rem] font-bold px-1 py-0.5 rounded border tracking-wide', cfg.chip)}>
                {s.pos}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── PITCH (shared between tablet & desktop) ─────────────────────────────────
interface PitchProps {
  lineup:    TeamLineupData
  teamColor: string
  dotSize:   number
  fontSize:  { num: number; name: number }
  style?:    React.CSSProperties
}

function Pitch({ lineup, teamColor, dotSize, fontSize, style }: PitchProps) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden flex-shrink-0"
      style={{
        aspectRatio: '3 / 4',
        background:  'repeating-linear-gradient(180deg,#1b6035 0px,#1b6035 40px,#1d6a3c 40px,#1d6a3c 80px)',
        border:      '1.5px solid rgba(255,255,255,0.1)',
        ...style,
      }}
    >
      <PitchMarkings />
      {lineup.players.map(p => (
        <PlayerDot key={p.number} player={p} teamColor={teamColor} dotSize={dotSize} fontSize={fontSize} />
      ))}
    </div>
  )
}

// ─── CSS pitch line markings ─────────────────────────────────────────────────
function PitchMarkings() {
  const line = 'rgba(255,255,255,0.22)'
  return (
    <>
      <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: line }} />
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{ width: 4, height: 4, background: line, transform: 'translate(-50%,-50%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 rounded-full"
        style={{ width: '28%', aspectRatio: '1', border: `1px solid ${line}`, transform: 'translate(-50%,-50%)' }}
      />
      {/* Top penalty box */}
      <div
        className="absolute top-0 left-1/2"
        style={{ width: '58%', height: '17%', border: `1px solid ${line}`, borderTop: 'none', transform: 'translateX(-50%)' }}
      />
      {/* Bottom penalty box */}
      <div
        className="absolute bottom-0 left-1/2"
        style={{ width: '58%', height: '17%', border: `1px solid ${line}`, borderBottom: 'none', transform: 'translateX(-50%)' }}
      />
      {/* Top goal box */}
      <div
        className="absolute top-0 left-1/2"
        style={{ width: '30%', height: '7%', border: `1px solid ${line}`, borderTop: 'none', transform: 'translateX(-50%)' }}
      />
      {/* Bottom goal box */}
      <div
        className="absolute bottom-0 left-1/2"
        style={{ width: '30%', height: '7%', border: `1px solid ${line}`, borderBottom: 'none', transform: 'translateX(-50%)' }}
      />
    </>
  )
}

// ─── Player dot (on-pitch circle + name) ─────────────────────────────────────
function PlayerDot({
  player,
  teamColor,
  dotSize,
  fontSize,
}: {
  player:    LineupPlayer
  teamColor: string
  dotSize:   number
  fontSize:  { num: number; name: number }
}) {
  const cfg = POS[player.pos]
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: `${player.x}%`, top: `${player.y}%`, transform: 'translate(-50%,-50%)' }}
    >
      <div
        className={cn('flex items-center justify-center rounded-full ring-2 font-bold text-white shadow-lg shadow-black/40', cfg.ring)}
        style={{
          width:      dotSize,
          height:     dotSize,
          fontSize:   fontSize.num,
          background: `linear-gradient(145deg, ${teamColor}e0 0%, ${teamColor}a0 100%)`,
        }}
      >
        {player.number}
      </div>
      <span
        className="text-white/90 font-semibold text-center leading-tight mt-[3px] max-w-[58px] truncate"
        style={{ fontSize: fontSize.name, textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
      >
        {player.name}
      </span>
    </div>
  )
}

// ─── DESKTOP: roster grouped by position (right column) ──────────────────────
function DesktopRoster({ lineup, teamColor }: { lineup: TeamLineupData; teamColor: string }) {
  const order = ['FWD', 'MID', 'DEF', 'GK'] as const
  return (
    <div className="flex flex-col gap-5 h-full justify-center">
      {order.map(pos => {
        const players = lineup.players.filter(p => p.pos === pos)
        if (!players.length) return null
        const cfg = POS[pos]
        return (
          <div key={pos}>
            <p className={cn('text-[0.6rem] font-bold tracking-[0.2em] uppercase mb-2', cfg.label)}>
              {POS_LABEL[pos]}
            </p>
            <div className="flex flex-col gap-1.5">
              {players.map(p => (
                <div
                  key={p.number}
                  className="flex items-center gap-3 group px-3 py-2 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div
                    className={cn('flex items-center justify-center rounded-full font-bold ring-1 flex-shrink-0 text-white', cfg.ring)}
                    style={{
                      width:      28,
                      height:     28,
                      fontSize:   10,
                      background: `linear-gradient(145deg, ${teamColor}cc 0%, ${teamColor}88 100%)`,
                    }}
                  >
                    {p.number}
                  </div>
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors leading-tight flex-1">
                    {p.name}
                  </span>
                  <span className={cn('text-[0.55rem] font-bold px-1.5 py-0.5 rounded-md border tracking-wide uppercase', cfg.chip)}>
                    {p.pos}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
