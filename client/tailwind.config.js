/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myntra: {
          pink: '#ff3f6c',
          pinkDark: '#f43361',
          pinkLight: '#fff1f4',
          orange: '#ff527b',
          dark: '#282c3f',
          muted: '#535766',
          lightMuted: '#94969f',
          border: '#eaeaec',
          bg: '#f5f5f6',
          green: '#03a685',
          gold: '#d99e00'
        }
      },
      fontFamily: {
        sans: ['Assistant', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'myntra': '0 2px 16px 0 rgba(0,0,0,.08)',
        'header': '0 4px 12px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 2px 8px 0 rgba(0, 0, 0, 0.06)',
        'dropdown': '0 8px 24px 0 rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}
