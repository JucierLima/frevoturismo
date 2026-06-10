/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Variáveis de escopo global do tema do Jucier
        background: 'hsl(var(--background, 0 0% 98%))',
        foreground: 'hsl(var(--foreground, 0 0% 5%))',
        
        // Objeto unificado com as cores exatas extraídas da logo + retrocompatibilidade
        frevo: {
          red: '#D3121A',
          blue: '#0A51C5',
          yellow: '#FFD400',
          green: '#00A64F',
          dark: '#0A0A0A',
          // Mapeamento seguro para não estourar chamadas legadas
          navy: '#0A51C5',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          muted: '#64748B',
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius, 1rem)',
      }
    },
  },
  plugins: [],
}