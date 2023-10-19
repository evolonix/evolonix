import { Config } from 'tailwindcss';
import * as colors from 'tailwindcss/colors';

export const customPresets = {
  content: [],
  theme: {
    // grid
    screens: {
      // xs: '320px', // margin: 16px, columns: 4, gutter: 16px, body: scaling, column width: scaling
      // sm: '428px', // margin: 16px, columns: 8, gutter: 16px, body: scaling, column width: scaling
      // md: '600px', // margin: 16px, columns: 12, gutter: 16px, body: scaling, column width: scaling
      // lg: '905px', // margin: scaling, columns: 12, gutter: 24px, body: 840px (w-grid-lg), column width: 48px
      // xl: '1240px', // margin: 200px (m-grid-xl), columns: 12, gutter: 24px, body: scaling, column width: scaling
      // '2xl': '1528px', // margin: scaling, columns: 12, gutter: 24px, body: 1128px (w-grid-2xl), column width: 72px
      xs: '428px',
    },
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      neutral: {
        50: '#FBFBFB',
        100: '#F4F6F7',
        200: '#E2E8EB',
        300: '#C9D3D8',
        400: '#A3B5BD',
        500: '#768E9A',
        600: '#5B737F',
        700: '#4E606C',
        800: '#44515A',
        900: '#3D464D',
        950: '#353C42',
      },
      blue: {
        50: '#F3FBFF',
        100: '#EDF9FF',
        200: '#D6F0FF',
        300: '#B5E7FF',
        400: '#83D9FF',
        500: '#48C2FF',
        600: '#1EA1FF',
        700: '#0682FF',
        800: '#0062E3',
        900: '#0854C5',
        950: '#0D4A9B',
      },
      purple: {
        50: '#F9F5FF',
        100: '#F1E6FF',
        200: '#E7D4FF',
        300: '#D3B1FF',
        400: '#BF8DFF',
        500: '#AB69FF',
        600: '#9746FF',
        700: '#8322FF',
        800: '#6800EE',
        900: '#5200BB',
        950: '#3C0088',
      },
      green: {
        50: '#F9FFFB',
        100: '#F0FDF4',
        200: '#DDFBE8',
        300: '#BDF5D3',
        400: '#8AEBB0',
        500: '#4FD985',
        600: '#28BF65',
        700: '#1B9E4F',
        800: '#1A8244',
        900: '#196237',
        950: '#16512F',
      },
      yellow: {
        50: '#FFFEF0',
        100: '#FFFDE7',
        200: '#FFFBC1',
        300: '#FFF286',
        400: '#FFE341',
        500: '#FFCF0D',
        600: '#F0B400',
        700: '#D18B00',
        800: '#A66202',
        900: '#894C0A',
        950: '#743E0F',
      },
      red: {
        50: '#FFF8F9',
        100: '#FFF0F2',
        200: '#FFE2E6',
        300: '#FFC9D3',
        400: '#FF9DAF',
        500: '#FF6685',
        600: '#FF3160',
        700: '#F00E4C',
        800: '#DE0546',
        900: '#AA073D',
        950: '#910A3A',
      },
    },
    boxShadow: {
      none: '0 0 0 rgba(0, 0, 0, 0)',
      sm: '0 1px 2px rgba(53, 60, 66, 0.08)',
      md: '0 1px 2px rgba(53, 60, 66, 0.24)',
      lg: '0 4px 6px -1px rgba(53, 60, 66, 0.1), 0 2px 4px -2px rgba(53, 60, 66, 0.05)',
      xl: '0 10px 15px -3px rgba(53, 60, 66, 0.1), 0 4px 6px rgba(53, 60, 66, 0.05)',
      '2xl':
        '0 20px 25px -5px rgba(53, 60, 66, 0.1), 0 10px 10px rgba(53, 60, 66, 0.04)',
    },
    extend: {
      margin: {
        'grid-xl': '12.5rem', // 200px
      },
      width: {
        'grid-lg': '840px', // body - margin x2: 905px - 16px - 16px
        'grid-2xl': '1128px', // body - xl margin x2: 1240px - 200px - 200px
      },
      keyframes: {
        unicorn: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(-10deg)' },
          '90%': { transform: 'rotate(45deg)' },
        },
      },
      animation: {
        // Used to animate the unicorn on the skills-platform app's mappings-details page
        // cubic-bezier is a back-out easing function
        unicorn: 'unicorn 325ms cubic-bezier(0.33, 1.53, 0.69, 0.99) 5',
      },
    },
  },
  plugins: [],
} satisfies Config;
