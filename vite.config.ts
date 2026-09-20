import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

const baseUrl = process.env.VITE_BASE_URL || '/boost-front-project/';

export default defineConfig({
  plugins: [react(), svgr()],
  base: baseUrl,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
