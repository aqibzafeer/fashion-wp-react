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
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true
      }
    },
    
    // Code splitting optimization
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'react-toastify', 'react-icons'],
          'utils': ['axios']
        }
      }
    },
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable source maps for debugging (disable in production)
    sourcemap: false
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
});
