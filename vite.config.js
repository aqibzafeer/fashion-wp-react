import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
    },
  },
  
  build: {
    // Enable minification with aggressive settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2 // Multiple passes for better compression
      },
      mangle: true,
      format: {
        comments: false
      }
    },
    
    // Code splitting optimization - reduce unused JS by splitting vendor chunks
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-core': ['react', 'react-dom'],
          'react-router': ['react-router-dom'],
          
          // UI & Animation libraries
          'ui-vendor': ['framer-motion', 'react-icons', 'lucide-react'],
          
          // Toast notifications (lazy load)
          'toastify': ['react-toastify'],
          
          // HTTP client
          'http': ['axios']
        }
      }
    },
    
    // Aggressive chunk size warning
    chunkSizeWarningLimit: 500,
    
    // Remove source maps for production
    sourcemap: false,
    
    // Optimize CSS
    cssMinify: 'lightningcss'
  },
  
  // Pre-bundle only critical dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
    exclude: ['react-toastify'] // Lazy load toast notifications
  }
});
