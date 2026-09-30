/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#FDF2F2',
          100: '#FDE8E8',
          200: '#FBD0D0',
          300: '#F8A8A8',
          400: '#F37575',
          500: '#E03131',
          600: '#C8102E', // Crimson accent
          700: '#990011', // Deep crimson
          800: '#800020', // Primary maroon
          900: '#5C0012',
          950: '#3D000B',
        },
        navy: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B', // Dark charcoal text
          900: '#0F172A', // Deep navy text
          950: '#020617',
        },
        blush: {
          50: '#FFF5F5',
          100: '#FFE8E8',
          200: '#FFD6D6',
          300: '#FFB3B3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(128, 0, 32, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.05), 0 4px 10px -2px rgba(128, 0, 32, 0.04)',
        'elevated': '0 20px 40px -15px rgba(128, 0, 32, 0.15)',
        'glow': '0 0 25px rgba(200, 16, 46, 0.25)',
      }
    },
  },
  plugins: [],
}
