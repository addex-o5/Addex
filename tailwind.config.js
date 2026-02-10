/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        aurora: {
          dark: '#0a0a0c',
          purple: '#7b2ff7',
          blue: '#2f80f7',
          electric: '#00d2ff',
          pink: '#ff00d2',
          gray: '#1a1a1e',
        }
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(to bottom right, #7b2ff7, #2f80f7, #00d2ff)',
        'aurora-mesh': 'radial-gradient(at 0% 0%, #0a0a0c 0, transparent 50%), radial-gradient(at 50% 0%, #1a1a1e 0, transparent 50%), radial-gradient(at 100% 0%, #7b2ff7 0, transparent 50%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
