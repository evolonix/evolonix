import { Config } from 'tailwindcss';
import * as Plugin from 'tailwindcss/plugin';

import { Headings } from './base';
import { Button, Grid } from './components';
import { customPresets } from './presets';

export const customPlugin = Plugin.withOptions(
  () =>
    ({ addBase, addComponents, theme }) => {
      addBase(Headings);

      addComponents(Grid(theme));
      addComponents(Button);
    },
  () => ({
    ...customPresets,
  })
) satisfies Partial<Config>;
