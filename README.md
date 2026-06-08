<div align="center">

# FIFA World Cup 2026 — Fan Hub

**A production-grade football fan hub. 48 teams · 104 matches · 16 cities · live scores.**

[![Live](https://img.shields.io/badge/Live-world--cup--2026--lime.vercel.app-brightgreen?style=flat-square)](https://world-cup-2026-lime.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

**June 11 – July 19, 2026 · USA · Canada · Mexico**

</div>

---

## What This Is

A fully static-data-first fan hub that becomes fully live during the World Cup. Every page works before the tournament starts. Once matches begin, live scores, goal scorers, cards, substitutions, and match statistics stream in automatically.

Built entirely on free-tier APIs — zero paid services required at any scale.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, countdown to tournament, today's matches, fan poll, group highlights |
| `/fixtures` | All 104 fixtures — filter by date, group, stage, or status |
| `/groups` | All 12 group standings tables with live points and form |
| `/bracket` | Full knockout bracket — SVG connector lines, FIFA World Cup trophy |
| `/teams` | All 48 teams grid with flags and FIFA rankings |
| `/teams/[slug]` | Individual team profile — squad, fixtures, group standing, stats |
| `/matches/[id]` | **Live match page** — separate desktop and mobile designs |

---

## Live Match Page

The centrepiece feature. Each match at `/matches/[id]` has two genuinely different layouts designed from scratch for each screen size.

### Desktop (≥ 1024px)

Three persistent columns, always visible simultaneously:

```
┌──────────────────────────────────────────────────────────────────┐
│                    Score Hero (full width)                        │
│         Teams · Score · LIVE badge · Stadium · Pulse bar         │
└──────────────────────────────────────────────────────────────────┘
┌────────────────┐  ┌────────────────┐  ┌────────────────────────┐
│ Match Events   │  │ Live Statistics│  │ Starting XI            │
│                │  │                │  │                        │
│ 23' ⚽ Scorer  │  │ 61% Possession │  │ Home team | Away team  │
│ 34' 🟨 Player  │  │ Shots · Corners│  │ GK / DEF / MID / FWD  │
│ 67' ⚽ Scorer  │  │ Fouls · Saves  │  │ (side-by-side grid)   │
└────────────────┘  └────────────────┘  └────────────────────────┘
```

### Mobile (< 1024px)

Sticky tab bar + one section at a time. Lineups tab has an internal Home/Away team selector showing one team full-width with readable font sizes instead of a cramped side-by-side grid.

### Match States

- **Scheduled** — kick-off time, countdown, lineups visible, events/stats show empty states centered in cards
- **Live** — red glowing border, pulsing live bar, real-time score, events timeline, possession bars
- **Finished** — full score, full event log, final statistics cached for 24 hours

---

## Data Architecture

Two APIs working in parallel, each handling what it does best:

### football-data.org (Free — 10 req/min)
Handles everything essential:
- Live score, match status, minute
- Goal scorers + assists
- Yellow/red cards
- Substitutions
- Venue info

### API-Football / api-sports.io (Free — 100 req/day)
Handles the richer stats:
- Ball possession %
- Total shots + shots on target
- Corner kicks, fouls, offsides, GK saves

### Why 100 req/day is enough for the entire tournament

Free tier stats refresh every **15 minutes** via Vercel's shared Data Cache. The math is designed around the absolute worst case — every match on a given day starting at a completely different time, with zero cache sharing between them.

```
Worst-case formula: N_matches × (duration ÷ 15 min) × 2 calls/window

Group stage (max 6 matches/day, 90 min each — no ET in group stage)
  6 × (90 ÷ 15) × 2 = 6 × 6 × 2 = 72 / 100 ✅

Knockout stage (max 4 matches/day, 135 min with full ET + penalties)
  4 × (135 ÷ 15) × 2 = 4 × 9 × 2 = 72 / 100 ✅

Mathematical minimum required: 11.4 min — 15 min gives a 28-call safety margin.
Quota resets at midnight UTC — fresh slate every day.
```

Score and events (football-data.org) refresh every 30 seconds with no budget concern — different API, different quota.

### Serverless-safe caching

All API calls use `next: { revalidate }` — Vercel's **shared Data Cache** at the edge. This is not in-memory: it is shared across every serverless function instance. 10,000 concurrent visitors trigger the same number of real API calls as 1 visitor within any cache window.

### Post-match stats guarantee

A `/api/warmup` endpoint is called by an external cron (cron-job.org, free) every 5 minutes. It detects any match that kicked off in the last 140 minutes and warms all sub-caches. When football-data.org reports `FINISHED`, the route stores stats with a **24-hour cache** — visible to anyone checking results the next day, with zero additional API calls.

```
Cron fires every 5 min → hits /api/warmup
Warmup finds active match → calls /api/match/{id}
football-data.org says FINISHED → stats cached with revalidate: 86400
Next-day visitor → Vercel serves from 24-hr cache → 0 real API calls
```

---

## Setup

### 1. Install and run locally

```bash
git clone https://github.com/your-username/worldcup-2026
cd worldcup-2026
npm install
cp .env.example .env.local
# fill in .env.local (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 2. Environment variables

```env
# ── football-data.org — live score, events (free: 10 req/min)
# Sign up: https://www.football-data.org/
NEXT_PUBLIC_FOOTBALL_API_KEY=your_key_here

# ── API-Football — possession, shots, corners (free: 100 req/day)
# Sign up: https://api-sports.io/
# Server-side only — no NEXT_PUBLIC_ prefix intentional
API_FOOTBALL_KEY=your_key_here

# ── Firebase — fan poll real-time sync
# Create project: https://console.firebase.google.com/
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# ── Warmup cron secret — protects /api/warmup from public abuse
WARMUP_SECRET=your_random_secret_here
```

All APIs are optional for local development. Without them the app runs on static data.

---

## Deployment

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

Or connect the GitHub repo on the Vercel dashboard — it auto-detects Next.js.

Add all environment variables in **Vercel → Project → Settings → Environment Variables**, then redeploy.

### Cron job setup (post-match stats guarantee)

Sign up free at [cron-job.org](https://cron-job.org) and create one job:

| Setting | Value |
|---|---|
| URL | `https://your-site.vercel.app/api/warmup?secret=YOUR_WARMUP_SECRET` |
| Schedule | Every 5 minutes |
| Method | GET |
| Save responses | Enabled (for debugging during matches) |

This is the only piece of external infrastructure. It costs nothing.

---

## Features

### Match Experience
- **Dual-source live data** — score/events from football-data.org, stats from API-Football, merged in a single `/api/match/[id]` response
- **Graceful degradation** — if API-Football quota runs out mid-match, the stats panel falls back to event-computed stats (goals, cards, subs counted from the events array)
- **Real status detection** — route uses football-data.org's actual match status (`IN_PLAY`, `EXTRA_TIME`, `PENALTY`, `FINISHED`) not the static FIXTURES field, so ET and penalty shootouts are handled correctly
- **30-second score refresh** — client polls every 30s; only live and finished matches poll at all
- **Match detail modal** — slide-up drawer from any fixture card, with CTA to full match page

### Tournament Data
- All 104 fixtures with correct kick-off times, stadiums, and match importance labels
- 48 complete Starting XI lineups with formations, jersey numbers, and positions
- 16 host stadiums with capacity, city, and surface
- 12 group standings computed live from fixture results
- Full knockout bracket with SVG connector lines

### Design
- **FIFA World Cup Trophy** in bracket centre — `mix-blend-mode: screen` blends naturally on dark background without requiring a transparent PNG
- Glassmorphism design system — custom CSS variables, backdrop blur, gold accents
- Team colors used throughout — score heroes, lineup jersey pills, stat bars all use each team's primary color
- Dark navy base (`#050e1c`) with gold (`#F5C518`) and electric blue (`#00C2FF`) accents

### UI/UX
- **Global search** — `⌘K` / `Ctrl+K`, Fuse.js fuzzy search across all teams and fixtures
- **Timezone selector** — all kick-off times displayed in user's selected timezone
- **Fan poll** — vote for any of 48 teams, real-time results via Firebase Firestore, localStorage fallback
- **Countdown timers** — SSR-safe, days/hours/min/sec to next match or tournament
- **Favorite team card** — personalized next match + countdown based on selected team
- Keyboard navigation — Escape closes all modals

### Performance
- Fully static-generated pages (SSG) at build time
- Zero layout shift — skeleton loaders for dynamic content
- Vercel Edge Network caching for all API responses
- No client-side API key exposure — `API_FOOTBALL_KEY` is server-only

---

## Tech Stack

| Tool | Purpose |
|---|---|
| **Next.js 15** | App Router, SSG, server components, route handlers |
| **React 19** | UI |
| **TypeScript 5** | Full type safety across data, API, components |
| **Tailwind CSS 3.4** | Styling + design tokens |
| **Framer Motion 12** | Animations, slide-up modals, page transitions |
| **Zustand 5** | Global state — preferences, fan poll, timezone, UI |
| **Firebase 11** | Fan poll — Firestore real-time sync |
| **Fuse.js 7** | Client-side fuzzy search |
| **Lucide React** | Icons |
| **football-data.org** | Live scores, goals, cards, substitutions |
| **api-sports.io** | Possession, shots, corners, fouls, saves |
| **cron-job.org** | External cron — warms post-match stat cache |
| **Vercel** | Hosting, Edge Network, Data Cache, serverless functions |

---

## Project Structure

```
app/
  page.tsx                      Home page
  fixtures/page.tsx             All 104 fixtures with filters
  groups/page.tsx               12 group standings
  bracket/page.tsx              Knockout bracket + WC Trophy
  teams/page.tsx                48 teams grid
  teams/[slug]/page.tsx         Team profile (SSG)
  matches/[id]/page.tsx         Live match page — serves LiveMatchView
  api/
    match/[id]/route.ts         Dual-source API proxy (fdorg + api-football)
    warmup/route.ts             Cache warmer — called by external cron

components/
  home/
    HeroSection.tsx             Hero, deterministic star particles
    TodayMatches.tsx            Today's matches carousel
    FanPoll.tsx                 48-team poll + Firebase
    FavoriteTeamCard.tsx        My Team card + next match countdown
    FeaturedStats.tsx           Animated counters (48 / 104 / 16 / 5B+)
    GroupHighlights.tsx         Group stage summary cards
    TournamentProgress.tsx      Stage progress tracker
  layout/
    Navigation.tsx              Fixed header, mobile drawer, live badge
    Footer.tsx                  Links, tournament facts
  ui/
    LiveMatchView.tsx           Full live match page (mobile tabs + desktop 3-col)
    MatchCard.tsx               Fixture card → opens modal
    MatchDetailModal.tsx        Slide-up drawer with live CTA
    TeamFlag.tsx                Flag (rectangular or circle-crop)
    CountdownTimer.tsx          SSR-safe countdown
    LiveBadge.tsx               LIVE / HT animated badge
  search/
    SearchModal.tsx             Full-screen ⌘K search

data/
  teams.ts                      48 teams — name, code, colors, rankings
  fixtures.ts                   104 matches — dates, stadiums, status
  lineups.ts                    48 Starting XI lineups with formations
  groups.ts                     12 groups + standings logic
  stadiums.ts                   16 venues — capacity, location, surface

lib/
  api.ts                        football-data.org client + fallback
  firebase.ts                   Firestore poll + localStorage fallback
  timeUtils.ts                  UTC → timezone, countdown helpers
  utils.ts                      cn(), formatters, importance labels

types/
  index.ts                      All domain types — Match, Team, Stadium,
                                LiveMatchData, LiveStats, FdorgGoal, etc.
```

---

## API Budget Reference

| Endpoint | Provider | Limit | Revalidate | Real calls / match |
|---|---|---|---|---|
| `/competitions/WC/matches` | football-data.org | 10 req/min | 5 min | ~1 |
| `/matches/{id}` | football-data.org | 10 req/min | 30 s (live) | ~180 |
| `/fixtures?live=all` | API-Football | 100 req/day shared | 6 min | ~23 |
| `/fixtures/statistics` | API-Football | 100 req/day shared | 6 min | ~23 |

football-data.org: 10 req/min limit is per-account. With Vercel Data Cache, 10,000 visitors = 2 real req/min. Well within limit at any traffic level.

API-Football: worst-case two matches both going to ET + penalties on the same day = 96/100 calls. Resets at midnight UTC.

---

## Scripts

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

---

## Custom Fonts

Pre-installed in `public/fonts/` — no action needed.

| Font | Usage |
|---|---|
| Clash Display | Headings, team names, section titles |
| Bebas Neue | Score numbers, stats figures |
| Satoshi | Body text, UI copy |

---

<div align="center">

Built for the beautiful game.

</div>
