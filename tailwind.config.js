/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: { 50: '#f6f7f9', 100: '#eceef2', 800: '#1c2333', 900: '#0f141f' },
        accent: { DEFAULT: '#3b82f6', soft: '#dbeafe' },
      },
      boxShadow: { card: '0 10px 30px -12px rgba(15, 20, 31, 0.35)' },
    },
  },
  plugins: [],
}
