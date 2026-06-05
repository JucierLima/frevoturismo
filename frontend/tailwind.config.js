/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        frevo: {
          red: '#C0392B',
          orange: '#E67E22',
          yellow: '#F1C40F',
          dark: '#1a1a2e',
          card: '#16213e',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}