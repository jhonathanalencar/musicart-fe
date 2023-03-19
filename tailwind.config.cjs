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
        slideDown: 'slideDown 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideDown: {
          from: { opacity: 0, transform: 'translateY(-25%)' },
          to: { opacity: 1, transform: 'none' },
        },
      },
    },
  },
  plugins: [],
};
