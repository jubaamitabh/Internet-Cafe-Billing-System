/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dashboard: {
          bg: '#0a0a0b',
          card: '#121214',
          border: '#27272a',
          text: '#ededed',
          muted: '#a1a1aa',
          accent: '#e9f559',
          accentHover: '#c8d34b',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
