import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import spritesmith from 'vite-plugin-spritesmith'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ command }) => ({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    svgLoader({
      svgo: false,
    }),
    spritesmith({
      watch: command == 'serve',
      src: {
        cwd: './src/assets/sprites',
        glob: '*.png',
      },
      target: {
        image: './src/assets/images/color-sprites.png',
        css: [
          [
            './src/assets/styles/sprite-icons.css',
            {
              format: 'css',
            },
          ],
        ],
      },
      apiOptions: {
        cssImageRef: '@/assets/images/color-sprites.png',
      },
    }),
    spritesmith({
      watch: command == 'serve',
      src: {
        cwd: './src/assets/sprites/gray',
        glob: '*.png',
      },
      target: {
        image: './src/assets/images/gray-sprites.png',
        css: [
          [
            './src/assets/styles/gray-sprites.json',
            {
              format: 'json_texture',
            },
          ],
        ],
      },
    }),
  ],
}))
