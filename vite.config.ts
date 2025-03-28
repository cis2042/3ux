import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/3ux/',  // 匹配 GitHub Pages 倉庫名稱
  server: {
    host: '0.0.0.0', // Listen on all network interfaces
    port: 5173,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    // 確保正確處理靜態資源路徑
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: undefined,
        // 確保靜態資源的命名模式
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
