/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        'seaGreen': {
          50: '#edfffd',
          100: '#c0fffd',
          200: '#81fffc',
          300: '#3bfffc',
          400: '#03fef3',
          500: '#00e2d8',
          600: '#00b6b2',
          700: '#00908f',
          800: '#007172',
          900: '#045b5c',
          950: '#00373a',
      },
      }
    },
  },
  plugins: [],
}
