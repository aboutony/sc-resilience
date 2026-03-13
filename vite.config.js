import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
    hmr: {
      overlay: false,
      timeout: 500,
    },
  },
});
