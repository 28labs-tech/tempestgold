import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['debug', 'extend'],
  },
  resolve: {
    alias: {
      debug: 'debug/src/browser.js',
    },
  },
  server: {
    watch: {
      ignored: ['!**/node_modules/@milkdown/**'],
    },
  },
})
