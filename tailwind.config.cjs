/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        width: 'width',
        height: 'height',
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
