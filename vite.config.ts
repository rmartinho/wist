import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import spritesmith from 'vite-plugin-spritesmith';

export default defineConfig(({ command }) => ({
  base: '/wist/',
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
    spritesmith({
      watch: command == 'serve',
      src: {
        cwd: './src/assets/sprites',
        glob: 'color-*.png',
      },
      target: {
        image: './src/assets/color-sprites.png',
        css: [
          [
            './src/assets/color-sprites.css',
            {
              format: 'css',
            },
          ],
        ],
      },
      apiOptions: {
        cssImageRef: './color-sprites.png',
      },
    }),
    spritesmith({
      watch: command == 'serve',
      src: {
        cwd: './src/assets/sprites',
        glob: 'gray-*.png',
      },
      target: {
        image: './src/assets/gray-sprites.png',
        css: [
          [
            './src/assets/gray-sprites.css',
            {
              format: 'css',
            },
          ],
        ],
      },
      apiOptions: {
        cssImageRef: './gray-sprites.png',
      },
    }),
  ],
}))
