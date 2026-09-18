/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        team: {
          primary: 'var(--color-team-primary, #E53935)',
          secondary: 'var(--color-team-secondary, #FFD54F)',
        },
      },
      fontFamily: {
        kids: ['var(--font-kids, cursive)', 'sans-serif'],
        impact: ['var(--font-impact, sans-serif)', 'impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}