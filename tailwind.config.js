/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme colors from existing palette
        'uwuc-green': '#539f53',
        'jet': '#228b22', // forestgreen
        'cambridge': '#00bfff', // deepskyblue
        'rose-brown': '#ff7f50', // coral
        'cordovan': 'hsl(351, 55%, 53%)',
        'flax': 'hsl(52, 75%, 70%)',

        // Semantic colors that adapt to dark mode
        background: {
          DEFAULT: 'var(--color-background)',
          soft: 'var(--color-background-soft)',
          mute: 'var(--color-background-mute)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          hover: 'var(--color-border-hover)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          heading: 'var(--color-heading)',
        },
      },
    },
  },
  plugins: [],
}
