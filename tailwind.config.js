
@type {import('tailwindcss').Config} 
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
Abre frontend/src/index.css e substitui tudo por:
css@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

body {
  font-family: 'Nunito', sans-serif;
  background-color: #1a1a2e;
  color: #f0f0f0;
  margin: 0;
}