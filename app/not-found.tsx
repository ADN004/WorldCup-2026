import Link from 'next/link'
import { Trophy, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center page-container py-20">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-5 rounded-3xl glass-gold">
            <Trophy className="w-12 h-12 text-gold animate-trophy-glow" />
          </div>
        </div>
        <h1 className="font-heading text-7xl font-bold text-gradient-gold mb-2">404</h1>
        <h2 className="font-heading text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-white/40 text-sm mb-8">
          The page you're looking for doesn't exist or has been moved.
          Head back to the main hub.
        </p>
        <Link href="/" className="btn btn-primary gap-2 mx-auto">
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
