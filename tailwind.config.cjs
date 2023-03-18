/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        layout: 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      animation: {
        fadeIn: 'fadeIn 0.75s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
