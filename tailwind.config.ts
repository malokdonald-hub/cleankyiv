import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#059669', hover: '#047857', light: '#ECFDF5' },
        accent: { DEFAULT: '#F59E0B', hover: '#D97706' },
        surface: '#FFFFFF',
        background: '#F9FAFB',
        text: { primary: '#1F2937', secondary: '#6B7280' },
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['var(--font-heading)', '-apple-system', 'sans-serif'],
        body: ['var(--font-body)', '-apple-system', 'sans-serif'],
      },
      borderRadius: { xl: '16px', lg: '12px' },
      boxShadow: {
        card: '0px 4px 12px rgba(0,0,0,0.06)',
        'card-hover': '0px 8px 24px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-cta': 'pulseCTA 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseCTA: {
          '0%': { boxShadow: '0 0 0 0 rgba(245,158,11,0.4)' },
          '70%': { boxShadow: '0 0 0 12px rgba(245,158,11,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(245,158,11,0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
