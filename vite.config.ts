import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deploying under a sub-path (GitHub Pages project sites, for example) only needs
// VITE_BASE set at build time: `VITE_BASE=/mileage-master/ npm run build`.
const base = process.env.VITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'index.html'),
        finder: resolve(__dirname, 'oil-finder/index.html'),
      },
    },
  },
})
