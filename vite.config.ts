import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // Эта настройка позволяет использовать свойство fill="currentColor" в SVG,
        // чтобы иконки наследовали цвет текста (color) из Chakra UI
        replaceAttrValues: { '#000000': 'currentColor' },
      },
    }),
  ],
})
