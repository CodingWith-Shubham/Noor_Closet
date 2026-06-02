import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F2',
        'cream-light': '#FAF3EC',
        champagne: '#F3E5D8',
        'gold-accent': '#C8A97E',
        'text-primary': '#1A1A1A',
        'text-muted': '#6B6B6B',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.3' }],
        'heading-lg': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        'heading-md': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-sm': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
      },
      spacing: {
        section: '6rem',
        'section-sm': '3rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backgroundImage: {
        'gradient-luxury': 'linear-gradient(135deg, #FFF8F2 0%, #FAF3EC 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C8A97E 0%, #E8D4C0 100%)',
      },
      boxShadow: {
        'luxury-sm': '0 4px 20px rgba(26, 26, 26, 0.08)',
        'luxury-md': '0 12px 40px rgba(26, 26, 26, 0.12)',
        'luxury-lg': '0 24px 60px rgba(26, 26, 26, 0.15)',
        'glow': '0 0 40px rgba(200, 169, 126, 0.4)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
