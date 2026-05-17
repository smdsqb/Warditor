/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['var(--font-bebas)'],
        dm: ['var(--font-dm)'],
        mono: ['var(--font-mono)'],
      },
      colors: {
        accent: '#ff3b2f',
        off: '#f7f6f3',
        border: '#e0ddd7',
        muted: '#888888',
      },
    },
  },
  plugins: [],
}
