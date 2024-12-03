import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin(), UnoCSS()],
  server: {
    host: '0.0.0.0',
    port: 3001,
    // proxy: {
    //   "/sse": "http://127.0.0.1:8888/api",
    // },
  },

  build: {
    target: 'esnext',
  },
})
