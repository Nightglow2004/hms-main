/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      },
      colors: {
        primary: {
          50: '#FFFBEB',  // amber-50
          100: '#FEF3C7', // amber-100
          200: '#FDE68A', // amber-200
          300: '#FCD34D', // amber-300
          400: '#FBBF24', // amber-400
          500: '#F59E0B', // amber-500 (main primary)
          600: '#D97706',  // amber-600
          700: '#B45309',  // amber-700
          800: '#92400E',  // amber-800
          900: '#78350F'   // amber-900
        },
        // Optional secondary palette
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12'
        }
      }
    },
  },
  plugins: [],
}