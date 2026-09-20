import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  //base: '/boost-front-project/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
