import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 80,
    host: '0.0.0.0'
  },
  publicDir: resolve(__dirname, './page/public'),
})