import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base is '/' because this repo is served at the root of athletique.github.io
// If you attach a custom domain, this stays as '/'
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
});
