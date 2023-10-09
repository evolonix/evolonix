const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'index.html'),
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        '2xs': '320px',
        xs: '475px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
