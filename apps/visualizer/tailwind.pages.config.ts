import { customPlugin } from '@evolonix/tailwind';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import formsPlugin from '@tailwindcss/forms';
import { join } from 'path';
import { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    join(__dirname, 'index.pages.html'),
    join(__dirname, 'pages/**/*!(*.spec).{html,ts,tsx}'),
    join(__dirname, 'src/lib/pages.utils.ts'),
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
