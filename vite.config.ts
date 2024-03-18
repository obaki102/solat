import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'], // <== you can customize this
      manifest: {
        // manifest options here
      },
      workbox: {
        // workbox options here
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
