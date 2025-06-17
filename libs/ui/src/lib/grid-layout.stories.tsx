import type { Meta, StoryObj } from '@storybook/react';
import clsx from 'clsx';
// import { fn } from "@storybook/test";

import { GridLayout, GridLayoutItem } from './grid-layout';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'GridLayout',
  component: GridLayout,
  subcomponents: { GridLayoutItem },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  args: {
    fullWidth: false,
    disableTopPadding: false,
  },
} satisfies Meta<typeof GridLayout>;

export default meta;

type Story = StoryObj<typeof GridLayout>;

export const Example: Story = {
  args: {},
  render: (args, { globals: { viewport, viewportRotated }, canvasElement, ...context }) => {
    // let xxl = (viewport === 'desktop' && viewportRotated) || viewport === 'reset';
    // let xl = xxl || (viewport === 'desktop' && !viewportRotated) || viewport === 'reset';
    // let lg = xl || (viewport === 'tablet' && viewportRotated) || viewport === 'reset';
    // let md = lg || (viewport === 'tablet' && !viewportRotated) || viewport === 'reset';
    // let sm = md || (viewport === 'phone' && viewportRotated) || viewport === 'reset';
    // let xs = sm || (viewport === 'phone' && !viewportRotated) || viewport === 'reset';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const canvas = canvasElement as any;
    let width = canvas.clientWidth;
    let xxl = width >= 1536;
    let xl = width >= 1280;
    let lg = width >= 1024;
    let md = width >= 768;
    let sm = width >= 640;
    let xs = width >= 0;

    const document = canvas.ownerDocument;
    let resizeTimeout: NodeJS.Timeout;
    document.defaultView.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      width = canvas.clientWidth;
      xxl = width >= 1536;
      xl = width >= 1280;
      lg = width >= 1024;
      md = width >= 768;
      sm = width >= 640;
      xs = width >= 0;

      resizeTimeout = setTimeout(() => {
        context.mount();
      }, 500);
    });

    return (
      <>
        <GridLayout {...args}>
          {lg ? (
            <>
              <GridLayoutItem>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={6}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={6}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={4}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={4}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={4}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={4}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={8}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem lg={8}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
            </>
          ) : null}
          {sm ? (
            <>
              <GridLayoutItem lg={4}>
                <div className="h-10 rounded-lg bg-white" />
              </GridLayoutItem>
              <GridLayoutItem sm={4} lg={3}>
                <div className={clsx('h-10 rounded-lg', xxl ? 'bg-white' : lg ? 'bg-yellow-400' : md ? 'bg-white' : 'bg-yellow-400')} />
              </GridLayoutItem>
              <GridLayoutItem sm={4} lg={3}>
                <div className={clsx('h-10 rounded-lg', xxl ? 'bg-white' : lg ? 'bg-yellow-400' : md ? 'bg-white' : 'bg-yellow-400')} />
              </GridLayoutItem>
              <GridLayoutItem sm={3} lg={3}>
                <div
                  className={clsx(
                    'h-10 rounded-lg',
                    xxl ? 'bg-white' : lg ? 'bg-yellow-400' : md ? 'bg-yellow-400' : sm ? 'bg-red-400' : 'bg-white'
                  )}
                />
              </GridLayoutItem>
              <GridLayoutItem sm={5} lg={3}>
                <div
                  className={clsx(
                    'h-10 rounded-lg',
                    xxl ? 'bg-white' : lg ? 'bg-yellow-400' : md ? 'bg-yellow-400' : sm ? 'bg-red-400' : 'bg-white'
                  )}
                />
              </GridLayoutItem>
              <GridLayoutItem sm={5} lg={2}>
                <div className={clsx('h-10 rounded-lg', xxl ? 'bg-yellow-400' : lg ? 'bg-red-400' : md ? 'bg-yellow-400' : 'bg-red-400')} />
              </GridLayoutItem>
              <GridLayoutItem sm={3} lg={2}>
                <div className={clsx('h-10 rounded-lg', xxl ? 'bg-yellow-400' : lg ? 'bg-red-400' : md ? 'bg-yellow-400' : 'bg-red-400')} />
              </GridLayoutItem>
              <GridLayoutItem sm={2}>
                <div className={clsx('h-10 rounded-lg', xxl ? 'bg-yellow-400' : 'bg-red-400')} />
              </GridLayoutItem>
            </>
          ) : null}
          <GridLayoutItem sm={2}>
            <div className={clsx('h-10 rounded-lg', xxl ? 'bg-yellow-400' : sm ? 'bg-red-400' : 'bg-white')} />
          </GridLayoutItem>
          <GridLayoutItem xs={2}>
            <div className={clsx('h-10 rounded-lg', xxl ? 'bg-yellow-400' : 'bg-red-400')} />
          </GridLayoutItem>
          <GridLayoutItem xs={2}>
            <div className={clsx('h-10 rounded-lg', xxl ? 'bg-yellow-400' : 'bg-red-400')} />
          </GridLayoutItem>
        </GridLayout>

        <footer className="py-4">
          <p className="text-center text-sm text-zinc-500">
            <span>Current breakpoint:</span>{' '}
            <span>{xxl ? 'XX-Large' : xl ? 'X-Large' : lg ? 'Large' : md ? 'Medium' : sm ? 'Small' : xs ? 'X-Small' : ''}</span>{' '}
            <span>{`@ ${width}px`}</span>
          </p>
        </footer>
      </>
    );
  },
  // play: async ({ canvasElement }) => {
  //   const canvas = within(canvasElement);
  //   expect(canvas.getByText(/Primary Button/gi)).toBeTruthy();
  // },
};
