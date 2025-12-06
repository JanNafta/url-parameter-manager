import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Relative paths for subdirectory deployment
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild'
  }
})
