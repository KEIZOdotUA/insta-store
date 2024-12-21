import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  build: {
    minify: 'esbuild',
    target: 'esnext',
  },
  plugins: [react(), eslint(), svgr({ include: '**/*.svg' })],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@context', replacement: path.resolve(__dirname, './src/context') },
      { find: '@features', replacement: path.resolve(__dirname, './src/features') },
      { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
      { find: '@store', replacement: path.resolve(__dirname, './src/store') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@helpers', replacement: path.resolve(__dirname, './src/helpers') },
      { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['./src/index.jsx'],
    },
  },
});
