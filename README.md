# FIFA World Cup 2026 — Fan Hub

A production-grade World Cup fan hub built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Firebase.

**Tournament:** June 11 – July 19, 2026 · 48 Teams · 104 Matches · 39 days · 16 Host Cities across USA, Canada & Mexico

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.example .env.local

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Fonts

Custom fonts are already installed in `public/fonts/` — no action needed. They load automatically via `app/layout.tsx`.

| Font | Files |
| --- | --- |
| Clash Display | `ClashDisplay-Variable.woff2`, `ClashDisplay-Bold.woff2` |
| Bebas Neue | `BebasNeue-Regular.woff2` |
| Satoshi | `Satoshi-Variable.woff2` |

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values you need.

### Football Data API (Live Scores — Optional)

Sign up free at [football-data.org](https://www.football-data.org/) (free tier: 10 req/min).

```env
NEXT_PUBLIC_FOOTBALL_API_KEY=your_key_here
```

Without this key the app runs entirely on static fixture data — all pages work normally.

### Firebase (Fan Poll — Optional)

Create a project at [console.firebase.google.com](https://console.firebase.google.com/), enable Firestore, then add:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Without Firebase, the fan poll uses seeded deterministic data and votes are stored in `localStorage`.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

Or connect the GitHub repo to the Vercel dashboard — it auto-detects Next.js.

Set the environment variables above in **Vercel Project Settings → Environment Variables**.

---

## Features

| Feature | Notes |
| --- | --- |
| Home page — Hero, countdown, live matches | Deterministic star particles, hydration-safe |
| All 104 fixtures with filters | Date, group, stage, status |
| 12 group standings tables | Computed live from fixture data |
| Symmetric tournament bracket | SVG connector lines, WC Trophy SVG, mobile toggle |
| 48 team profile pages | SSG, FIFA ranking, fixtures, stats |
| Fan poll | All 48 teams sorted by fan base, search, Firebase real-time |
| Favorite team card | Personalized next match + countdown |
| Match detail modal | Slide-up drawer, stadium info, countdown, Escape/backdrop close |
| Circle country flags | Crop-to-circle with `object-cover`, used in poll + team selector |
| Global search | Fuse.js fuzzy search across teams + fixtures |
| Live badge in nav | Only appears when a match has `status: LIVE` |
| IST timezone display | All times converted from UTC to IST (UTC+5:30) |
| Countdown timers | Days / hours / min / sec, SSR-safe |
| Glassmorphism design system | Tailwind + custom CSS variables |
| Mobile-first responsive | Full bracket view available via toggle on mobile |
| Dark theme | Navy-950 base, gold accents |
| SEO + OpenGraph | Per-page metadata |
| Keyboard navigation | ⌘K / Ctrl+K opens search, Escape closes modals |

---

## Tech Stack

| Tool | Version | Purpose |
| --- | --- | --- |
| Next.js | latest (15.x) | Framework — App Router, SSG, Turbopack |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Styling + design tokens |
| Framer Motion | 12 | Animations + page transitions |
| Zustand | 5 | Global state (preferences, poll, UI) |
| Firebase | 11 | Fan poll — Firestore real-time |
| Fuse.js | 7 | Client-side fuzzy search |
| Lucide React | latest | Icons |

---

## Project Structure

```text
public/
  fonts/                      ← Clash Display, Bebas Neue, Satoshi (installed)

app/
  page.tsx                    ← Home page
  fixtures/page.tsx           ← Match centre with filters
  groups/page.tsx             ← All 12 group standings
  bracket/page.tsx            ← Knockout bracket — SVG connectors + trophy
  teams/page.tsx              ← All 48 teams grid
  teams/[slug]/page.tsx       ← Individual team profile (SSG)
  layout.tsx                  ← Root layout, font loading, providers
  globals.css                 ← Design system — tokens, glass, animations

components/
  home/
    HeroSection.tsx           ← Hero banner with deterministic star particles
    TodayMatches.tsx          ← Today's fixtures carousel
    FanPoll.tsx               ← 48-team fan poll, search, Firebase
    FavoriteTeamCard.tsx      ← My Team card with next match + countdown
    FeaturedStats.tsx         ← 48 · 104 · 16 · 5B+ animated counters
    GroupHighlights.tsx       ← Group stage summary cards
    TournamentProgress.tsx    ← Stage progress tracker
  layout/
    Navigation.tsx            ← Fixed header, mobile drawer, conditional live badge
    Footer.tsx                ← Links, tournament facts, social icons
  ui/
    MatchCard.tsx             ← Match card (clickable → opens modal)
    MatchDetailModal.tsx      ← Slide-up drawer — stadium info + countdown
    TeamFlag.tsx              ← Flag image (rectangular or circle-crop mode)
    CountdownTimer.tsx        ← SSR-safe countdown
    LiveBadge.tsx             ← LIVE / HT animated badge
    GlassCard.tsx             ← Glass panel + Section wrapper
    AnimatedNumber.tsx        ← Count-up animation
    Skeleton.tsx              ← Loading placeholders
  search/
    SearchModal.tsx           ← Full-screen Fuse.js search
  providers/
    QueryProvider.tsx         ← TanStack Query wrapper

data/
  teams.ts                   ← All 48 teams — name, code, group, ranking, colors
  fixtures.ts                ← All 104 matches — dates, stadiums, status
  groups.ts                  ← 12-group structure + standings logic
  stadiums.ts                ← 16 host venues with capacity + surface

lib/
  api.ts                     ← Football Data API client + static fallback
  firebase.ts                ← Firestore poll + localStorage fallback
  timeUtils.ts               ← UTC → IST conversion, countdown helpers
  utils.ts                   ← cn(), formatters, importance labels

store/
  useAppStore.ts             ← Zustand — preferences, fan poll, UI state

types/
  index.ts                   ← Match, Team, Stadium, FanPoll interfaces
```

---

## Scripts

```bash
npm run dev         # Development server (Turbopack)
npm run build       # Production build
npm run start       # Production server
npm run lint        # ESLint
npm run type-check  # TypeScript (tsc --noEmit)
```
