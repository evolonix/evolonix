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
    join(__dirname, 'src/**/pages/**/*!(*.stories|*.spec).{html,ts,tsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin, aspectRatioPlugin, customPlugin],
} satisfies Config;
