import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, ViteDevServer } from 'vite';

const multiPageAppIndexRouting = () => ({
  name: 'configure-server',
  configureServer(server: ViteDevServer) {
    return () => {
      server.middlewares.use(async (req, _, next) => {
        if (server.config.build.rollupOptions.input) {
          const inputs = Object.keys(
            server.config.build.rollupOptions.input,
          ).filter((key) => key !== 'main');
          for (const appName of inputs) {
            if (req.originalUrl?.startsWith(`/${appName}`)) {
              req.url = `/index.${appName}.html`;
              break;
            }
          }
        }
        next();
      });
    };
  },
});

export default defineConfig({
  cacheDir: '../../node_modules/.vite/visualizer',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), multiPageAppIndexRouting()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },

  appType: 'mpa',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pages: resolve(__dirname, 'index.pages.html'),
      },
    },
  },
});
