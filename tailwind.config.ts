import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Palette
        'trusted-blue': {
          DEFAULT: '#3D5AFE', // Original
          50: '#E8EAF6',
          100: '#C5CAE9',
          200: '#9FA8DA',
          300: '#7986CB',
          400: '#5C6BC0',
          500: '#3D5AFE', // Base
          600: '#304FFE', // Darker for hover
          700: '#283593', // Deep Royal
          800: '#1A237E', // Midnight
          900: '#0D1240', // Almost Black
        },
        'action-orange': {
          DEFAULT: '#F57C00', // Original
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FF9800',
          600: '#FB8C00',
          700: '#F57C00', // Base
          800: '#EF6C00',
          900: '#E65100', // Deep Amber
        },
        'light-gray': '#F5F7FA', // Slightly cooler gray
        'dark-text': '#1A1C23', // Softer black
        'body-text': '#4A5568', // Slate gray
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #E8EAF6 0deg, #F5F7FA 180deg, #E8EAF6 360deg)',
      },
    },
  },
  plugins: [],
}
export default config
