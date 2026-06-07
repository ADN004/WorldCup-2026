import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV !== 'production'

const nextConfig: NextConfig = {
  images: {
    // In dev, skip server-side proxy to avoid SSL cert errors on corporate networks.
    // Production (Vercel) has proper certs and will optimize normally.
    unoptimized: isDev,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
}

export default nextConfig
