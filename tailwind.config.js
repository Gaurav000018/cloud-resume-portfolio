/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aws: {
          blue: '#1e293b', // Tailwind Slate 800 - dark theme
          navy: '#0f172a', // Tailwind Slate 900 - background
          orange: '#ff9900', // AWS orange accent
          accent: '#3b82f6', // AWS brand blue
        },
        docker: {
          blue: '#0db7ed',
          dark: '#0a3054'
        },
        github: {
          dark: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          text: '#c9d1d9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
