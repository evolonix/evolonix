import { Preview } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import '../src/styles.css';

const preview: Preview = {
  decorators: [
    // withThemeByDataAttribute<ReactRenderer>({
    //   themes: {
    //     light: 'light',
    //     dark: 'dark',
    //   },
    //   defaultTheme: 'light',
    //   attributeName: 'data-theme',
    // }),
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        phone: {
          name: 'Phone (portrait: xs, landscape: sm)',
          styles: {
            width: '390px',
            height: '640px',
          },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (portrait: md, landscape: lg)',
          styles: {
            width: '768px',
            height: '1024px',
          },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (portrait: xl: landscape: xxl)',
          styles: {
            width: '1280px',
            height: '1536px',
          },
          type: 'desktop',
        },
      },
    },
  },
};

export default preview;
