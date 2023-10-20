import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import formsPlugin from '@tailwindcss/forms';
import { join } from 'path';
import { Config } from 'tailwindcss';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { customPlugin } from '../../libs/tailwind/src';

export default {
  darkMode: 'class',
  content: [
    join(__dirname, 'src/pages/**/*!(*.spec).{html,ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'test-pages': '#00ff00',
      },
    },
  },
  plugins: [formsPlugin, aspectRatioPlugin, customPlugin],
} satisfies Config;
