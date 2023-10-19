// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Grid = (theme: any) => ({
  '.grid-apollo': {
    // screens.xs
    marginLeft: '1rem',
    marginRight: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridGap: '1rem',

    // screens.sm
    '@media (min-width: 428px)': {
      gridTemplateColumns: 'repeat(8, 1fr)',
    },
    // screens.md
    '@media (min-width: 600px)': {
      gridTemplateColumns: 'repeat(12, 1fr)',
    },
    // screens.lg
    '@media (min-width: 905px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme('width.grid-lg'),
      gridGap: '1.5rem',
    },
    // screens.xl
    '@media (min-width: 1240px)': {
      marginLeft: theme('margin.grid-xl'),
      marginRight: theme('margin.grid-xl'),
      width: 'auto',
    },
    // screens.2xl
    '@media (min-width: 1528px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: theme('width.grid-2xl'),
    },
  },
});
