import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { SearchModal } from '@/components/search/SearchModal'

export const metadata: Metadata = {
  title: {
    default: 'FIFA World Cup 2026 – Live Scores, Fixtures & Standings',
    template: '%s | FIFA World Cup 2026',
  },
  description:
    'Official fan hub for FIFA World Cup 2026. Live scores, fixtures, group standings, knockout bracket, team info, and fan polls. Hosted by USA, Canada & Mexico.',
  keywords: [
    'FIFA World Cup 2026', 'World Cup fixtures', 'live scores', 'group standings',
    'knockout bracket', 'World Cup teams', 'World Cup schedule IST',
  ],
  authors: [{ name: 'WC26 Fan Hub' }],
  openGraph: {
    type:        'website',
    locale:      'en_US',
    title:       'FIFA World Cup 2026 – Live Scores, Fixtures & Standings',
    description: 'Premium fan hub for FIFA World Cup 2026. Live scores, fixtures, standings, bracket and more.',
    siteName:    'WC26',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'FIFA World Cup 2026',
    description: 'Premium fan hub – live scores, fixtures, standings, bracket.',
    images:      ['/og-image.png'],
  },
  robots: {
    index:  true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#040D1A',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-primary font-body antialiased">
        <QueryProvider>
          {/* Background ambient layers */}
          <div className="fixed inset-0 -z-10 pointer-events-none">
            {/* Deep base */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030912] via-navy-900 to-navy-800" />
            {/* Ambient top glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-30"
              style={{ background: 'radial-gradient(ellipse, rgba(0,194,255,0.15) 0%, transparent 70%)' }}
            />
            {/* Ambient gold accent */}
            <div
              className="absolute top-[20%] right-0 w-[600px] h-[600px] rounded-full opacity-10"
              style={{ background: 'radial-gradient(ellipse, rgba(245,197,24,0.25) 0%, transparent 70%)' }}
            />
            {/* Bottom glow */}
            <div
              className="absolute bottom-0 left-1/4 w-[800px] h-[400px] rounded-full opacity-15"
              style={{ background: 'radial-gradient(ellipse, rgba(0,194,255,0.12) 0%, transparent 70%)' }}
            />
            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          <Navigation />

          <main className="min-h-screen pt-16">
            {children}
          </main>

          <Footer />
          <SearchModal />
        </QueryProvider>
      </body>
    </html>
  )
}
