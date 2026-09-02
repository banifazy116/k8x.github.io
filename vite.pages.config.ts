import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: path.resolve(process.cwd(), 'pages-src'),
  base: './',
  plugins: [react()],
  publicDir: path.resolve(process.cwd(), 'public'),
  css: { postcss: { plugins: [tailwindcss()] } },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd()),
    },
  },
  build: {
    outDir: path.resolve(process.cwd(), 'pages-dist'),
    emptyOutDir: true,
  },
});
