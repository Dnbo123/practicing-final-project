import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  //Setting up proxy requests from /api/exchangerate to the actual API
  server: {
    proxy: {
      '/api': {
        target: 'https://v6.exchangerate-api.com/v6',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})