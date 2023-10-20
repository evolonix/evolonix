// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Grid = (theme: any) => ({
  '.grid-apollo': {
    // screens.xs
    marginLeft: '1rem',
    marginRight: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',

    // screens.xs
    '@media (min-width: 480px)': {
      gridTemplateColumns: 'repeat(8, 1fr)',
    },
    // screens.sm
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(12, 1fr)',
    },
    // screens.md
    '@media (min-width: 768px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme('width.grid-md'),
      gridGap: '1.5rem',
    },
    // screens.lg
    '@media (min-width: 1024px)': {
      marginLeft: theme('margin.grid-lg'),
      marginRight: theme('margin.grid-lg'),
      width: 'auto',
    },
    // screens.xl
    '@media (min-width: 1280px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme('width.grid-xl'),
    },
    // screens.2xl
    '@media (min-width: 1536px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme('width.grid-2xl'),
    },
  },
});
