import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize build settings for Firebase hosting
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Group React dependencies in one chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Group styling dependencies in another chunk
          'style-vendor': ['styled-components', 'framer-motion']
        },
        // Create chunks with more descriptive names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Improve browser caching with content hash
    assetsInlineLimit: 4096, // 4kb - smaller assets will be inlined
    sourcemap: false, // Disable sourcemaps in production for better performance
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Create an alias for the src directory
    },
  },
  // Optimize serving of media files like audio
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'styled-components', 'framer-motion']
  }
})
