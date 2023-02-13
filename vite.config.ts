import path from 'path'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dts: path.resolve(pathSrc, 'components.d.ts')
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/api/, '')
      },
      '/yiyan': {
        target: 'https://v1.hitokoto.cn?encode=joson&max_length=20',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/yiyan/, '')
      },
      '/qiniu': {
        target: 'https://upload-z2.qiniup.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/\/qiniu/, '')
      }
    }
  }
})
