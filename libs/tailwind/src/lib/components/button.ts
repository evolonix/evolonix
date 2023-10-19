export const Button = {
  '.btn-primary-purple, .btn-primary-blue, .btn-destructive, .btn-secondary-outline, .btn-secondary-filled, .btn-tertiary-purple, .btn-tertiary-blue':
    {
      '@apply inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-lg border border-transparent px-4 text-xs font-semibold focus:ring-2 focus:ring-offset-1 focus:ring-offset-white focus-visible:outline-none disabled:border disabled:border-dashed':
        '',

      '&.btn-small': {
        '@apply h-6 px-2': '',
      },

      '&.btn-icon': {
        '@apply px-2 text-base': '',

        '&.btn-small': {
          '@apply px-1': '',
        },
      },
    },

  '.btn-primary-blue': {
    '@apply bg-blue-800 text-white hover:bg-blue-900 focus:ring-blue-800 active:bg-blue-950 disabled:border-blue-300 disabled:bg-blue-50 disabled:text-blue-800':
      '',
  },

  '.btn-primary-purple': {
    '@apply bg-purple-800 text-white hover:bg-purple-900 focus:ring-purple-800 active:bg-purple-950 disabled:border-purple-300 disabled:bg-purple-50 disabled:text-purple-800':
      '',
  },

  '.btn-destructive': {
    '@apply bg-red-800 text-white hover:bg-red-900 focus:ring-red-800 active:bg-red-950 disabled:border-red-300 disabled:bg-red-50 disabled:text-red-800':
      '',

    '&.btn-icon': {
      '@apply bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-900 focus:text-red-900 active:bg-red-200 active:text-red-950 disabled:bg-red-50':
        '',
    },
  },

  '.btn-secondary-outline': {
    '@apply border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 hover:text-neutral-900 focus:bg-neutral-50 focus:text-neutral-900 focus:ring-neutral-900 focus:ring-offset-neutral-300 active:bg-neutral-100 active:text-neutral-950 disabled:border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-600':
      '',
  },

  '.btn-secondary-filled': {
    '@apply bg-neutral-100 text-neutral-800 hover:bg-neutral-200 hover:text-neutral-900 focus:bg-neutral-100 focus:ring-neutral-900 focus:ring-offset-neutral-300 active:bg-neutral-300 active:text-neutral-950 disabled:border-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-600':
      '',
  },

  '.btn-tertiary-purple': {
    '@apply text-purple-800 focus:bg-purple-50 focus:text-purple-900 focus:ring-purple-800 focus:ring-offset-0 enabled:hover:bg-purple-50 enabled:active:bg-purple-100 enabled:active:text-purple-900 disabled:text-purple-500':
      '',
  },

  '.btn-tertiary-blue': {
    '@apply text-blue-800 focus:bg-blue-50 focus:text-blue-900 focus:ring-blue-800 focus:ring-offset-0 enabled:hover:bg-blue-50 enabled:active:bg-blue-200 enabled:active:text-blue-900 disabled:text-blue-500':
      '',
  },
};
