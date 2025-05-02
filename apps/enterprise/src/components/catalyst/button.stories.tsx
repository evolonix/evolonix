import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
// import { fn } from "@storybook/test";

import { Button, styles } from './button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: {
      control: 'text',
      description: 'The content of the button.',
    },
    circle: {
      description: 'If true, the button will be circular.',
    },
    className: {
      table: {
        disable: true,
      },
    },
    color: {
      type: 'string',
      control: 'select',
      options: Object.keys(styles.colors),
      description: 'The color of the button.',
      table: {
        defaultValue: {
          summary: 'dark/zinc',
        },
      },
    },
    disabled: {
      description: 'If true, the button will be disabled.',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    circle: false,
    disabled: false,
    color: 'dark/zinc',
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Primary Button/gi)).toBeTruthy();
  },
};
