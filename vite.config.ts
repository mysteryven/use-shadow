import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      outputDir: resolve(__dirname, 'dist')
    }),
    react()
  ],
  esbuild: {
    jsxInject: `import React from 'react'`
  },
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
    minify: false
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
})
