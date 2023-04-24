/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        default: '#609966',
        rgb1: 'rgba(0,0,0,0.1)'
      },
      borderWidth: {
        1: '1px'
      },
      boxShadow: {
        xl: '0px 0px 30px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
}
