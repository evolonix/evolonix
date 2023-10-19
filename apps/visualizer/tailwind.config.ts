import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import formsPlugin from '@tailwindcss/forms';
import { join } from 'path';
import { Config } from 'tailwindcss';

export default {
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
        xs: '428px',
      },
      minWidth: ({ theme }) => ({
        xs: theme('screens.xs'),
      }),
    },
  },
  plugins: [formsPlugin],
} satisfies Config;
