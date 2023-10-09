const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'previews/**/*.html'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'preview-blue': '#0d6efd',
        'preview-green': '#198754',
        'preview-red': '#dc3545',
      },
    },
  },
  plugins: [],
};
