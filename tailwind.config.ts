import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FFF3C4',
          200: '#FFE066',
          300: '#F5C518',
          400: '#D4A017',
          500: '#B8860B',
          600: '#9A6F09',
          DEFAULT: '#F5C518',
        },
        navy: {
          950: '#020810',
          900: '#040D1A',
          800: '#071428',
          700: '#0C1F3D',
          600: '#0F2952',
          500: '#1A3A6B',
          400: '#2454A3',
          DEFAULT: '#040D1A',
        },
        electric: {
          blue:  '#00C2FF',
          cyan:  '#00F5FF',
          indigo: '#6366F1',
          DEFAULT: '#00C2FF',
        },
        live: {
          DEFAULT: '#FF3548',
          dim: 'rgba(255,53,72,0.2)',
        },
        success: {
          DEFAULT: '#00E676',
          dim: 'rgba(0,230,118,0.15)',
        },
        warning: {
          DEFAULT: '#FFB300',
          dim: 'rgba(255,179,0,0.15)',
        },
        glass: {
          white: 'rgba(255,255,255,0.05)',
          'white-10': 'rgba(255,255,255,0.10)',
          border: 'rgba(255,255,255,0.08)',
          'border-hover': 'rgba(255,255,255,0.18)',
        },
      },
      fontFamily: {
        heading: ['var(--font-clash-display)', 'SF Pro Display', 'system-ui', 'sans-serif'],
        stats:   ['var(--font-bebas-neue)',    'Impact',          'sans-serif'],
        body:    ['var(--font-satoshi)',        'Inter',           'system-ui', 'sans-serif'],
        sans:    ['var(--font-satoshi)',        'Inter',           'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold':       'linear-gradient(135deg, #F5C518, #D4A017)',
        'gradient-gold-v':     'linear-gradient(180deg, #F5C518, #D4A017)',
        'gradient-blue':       'linear-gradient(135deg, #00C2FF, #0080FF)',
        'gradient-dark':       'linear-gradient(180deg, #040D1A 0%, #071428 100%)',
        'gradient-hero':       'radial-gradient(ellipse 120% 60% at 50% -10%, rgba(0,194,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 50% at 80% 30%, rgba(245,197,24,0.12) 0%, transparent 50%), linear-gradient(180deg, #040D1A 0%, #071428 100%)',
        'gradient-glass':      'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'gradient-card':       'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
        'gradient-radial':     'radial-gradient(var(--tw-gradient-stops))',
        'shimmer':             'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        'gold-shimmer':        'linear-gradient(90deg, transparent 0%, rgba(245,197,24,0.15) 50%, transparent 100%)',
        'gradient-live':       'linear-gradient(135deg, rgba(255,53,72,0.12), rgba(255,53,72,0.04))',
      },
      backdropBlur: {
        xs: '4px',
        '3xl': '48px',
        '4xl': '80px',
      },
      boxShadow: {
        'glass':        '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'glass-hover':  '0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.14)',
        'glass-lg':     '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.10)',
        'gold':         '0 0 30px rgba(245,197,24,0.35)',
        'gold-lg':      '0 0 60px rgba(245,197,24,0.45), 0 0 120px rgba(245,197,24,0.2)',
        'gold-inset':   'inset 0 0 30px rgba(245,197,24,0.15)',
        'blue':         '0 0 30px rgba(0,194,255,0.35)',
        'blue-lg':      '0 0 60px rgba(0,194,255,0.45)',
        'live':         '0 0 20px rgba(255,53,72,0.5), 0 0 40px rgba(255,53,72,0.2)',
        'card':         '0 4px 24px rgba(0,0,0,0.3)',
        'card-hover':   '0 12px 48px rgba(0,0,0,0.45)',
        'nav':          '0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-glow':    'pulse-glow 2s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'float':         'float 3s ease-in-out infinite',
        'float-slow':    'float 5s ease-in-out infinite',
        'gradient-x':    'gradient-x 8s ease infinite',
        'fade-in-up':    'fade-in-up 0.5s ease forwards',
        'fade-in':       'fade-in 0.4s ease forwards',
        'scale-in':      'scale-in 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'spin-slow':     'spin 10s linear infinite',
        'live-dot':      'live-dot 1.5s ease-in-out infinite',
        'trophy-glow':   'trophy-glow 3s ease-in-out infinite',
        'slide-left':    'slide-left 0.5s ease forwards',
        'slide-right':   'slide-right 0.5s ease forwards',
        'slide-up':      'slide-up 0.4s ease forwards',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'count-up':      'fade-in-up 0.4s ease forwards',
        'glow-pulse':    'glow-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 10px rgba(255,53,72,0.3)' },
          '50%':      { boxShadow: '0 0 30px rgba(255,53,72,0.7), 0 0 60px rgba(255,53,72,0.25)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'live-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.4', transform: 'scale(0.75)' },
        },
        'trophy-glow': {
          '0%,100%': { filter: 'drop-shadow(0 0 20px rgba(245,197,24,0.5))' },
          '50%':     { filter: 'drop-shadow(0 0 70px rgba(245,197,24,0.9)) drop-shadow(0 0 120px rgba(245,197,24,0.4))' },
        },
        'slide-left': {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'bounce-gentle': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        'glow-pulse': {
          '0%,100%': { opacity: '0.6' },
          '50%':     { opacity: '1' },
        },
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}

export default config
