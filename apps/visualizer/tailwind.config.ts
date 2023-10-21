import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import formsPlugin from '@tailwindcss/forms';
import { join } from 'path';
import { Config } from 'tailwindcss';

export default {
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.spec).{ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      minWidth: ({ theme }) => ({
        xs: theme('screens.xs'),
      }),
      colors: {
        'test-app': '#ff0000',
      },
    },
  },
  plugins: [formsPlugin],
} satisfies Config;
