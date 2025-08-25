import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [svgr(), dts(), react(), vanillaExtractPlugin()],
});
