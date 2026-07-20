/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1C1F26',
        asphalt: '#4A4F58',
        offwhite: '#F7F6F2',
        amber: '#FFB020',
        teal: '#0F5C5C',
        'teal-light': '#1a8a8a',
        plate: {
          yellow: '#F5D22A',
          black: '#111111',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 4px 24px -4px rgba(28,31,38,0.10)',
        'card-hover': '0 20px 48px -8px rgba(28,31,38,0.22)',
        'amber-glow': '0 0 32px 0 rgba(255,176,32,0.25)',
        'nav': '0 2px 24px 0 rgba(28,31,38,0.12)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1C1F26 0%, #0F2A2A 50%, #1C1F26 100%)',
        'card-gradient': 'linear-gradient(to top, rgba(28,31,38,0.85) 0%, rgba(28,31,38,0.2) 60%, transparent 100%)',
        'amber-gradient': 'linear-gradient(135deg, #FFB020 0%, #FF8C00 100%)',
      },
      animation: {
        'float-slow': 'floatBlob 14s ease-in-out infinite',
        'float-mid': 'floatBlob 10s ease-in-out infinite reverse',
        'fade-up': 'fadeInUp 0.7s ease forwards',
        'pulse-glow': 'pulseGlow 2.4s infinite',
        'shimmer': 'shimmer 2s infinite',
        'slide-down': 'slideDown 0.4s ease forwards',
      },
      keyframes: {
        floatBlob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(30px,-40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px,20px) scale(0.95)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,176,32,0.45)' },
          '50%': { boxShadow: '0 0 0 14px rgba(255,176,32,0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}