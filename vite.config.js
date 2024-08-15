import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import path from 'path';

export default defineConfig({
  build: {
    minify: 'esbuild',
    target: "esnext"
  },
  plugins: [react(), eslint()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '@components', replacement: path.resolve(__dirname, './src/components') },
      { find: '@contexts', replacement: path.resolve(__dirname, './src/contexts') },
      { find: '@services', replacement: path.resolve(__dirname, './src/services') },
      { find: '@helpers', replacement: path.resolve(__dirname, './src/helpers') },
    ],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.js"],
    coverage: {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: ['./src/index.jsx' ],
    },
  },
});
