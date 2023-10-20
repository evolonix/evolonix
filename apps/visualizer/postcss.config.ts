import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config';
import tailwindPagesConfig from './tailwind.pages.config';

export default {
  plugins: [
    autoprefixer,
    tailwindcss(tailwindConfig),
    tailwindcss(tailwindPagesConfig),
  ],
};
