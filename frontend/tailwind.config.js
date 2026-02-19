/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#d2dae5',
          300: '#acbbce',
          400: '#8096b3',
          500: '#60779b',
          600: '#4c5f81',
          700: '#3f4d69',
          800: '#374158',
          900: '#31394b',
        },
        accent: {
          50: '#fef7ee',
          100: '#fdecd3',
          200: '#fbd5a5',
          300: '#f8b66d',
          400: '#f58d35',
          500: '#f2710f',
          600: '#e35605',
          700: '#bc3f07',
          800: '#95320d',
          900: '#782b0e',
        }
      },
      fontFamily: {
        display: ['Crimson Text', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}