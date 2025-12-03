import { defineConfig } from 'tsup';

/**
 * tsup configuration for @ausdata/sdk
 * 
 * This configuration ensures proper build isolation:
 * - Separate entry points for core SDK, server utilities, and React components
 * - Tree-shaking enabled to minimize bundle size
 * - Code splitting to avoid forcing React on pure Node.js users
 */
export default defineConfig({
  // Separate entry points for isolation
  entry: {
    index: 'src/index.ts',      // Core SDK (no React)
    server: 'src/server.ts',    // Server utilities (no React)
    react: 'src/react.ts',      // React components (requires React)
  },
  
  // Output formats
  format: ['esm', 'cjs'],
  
  // Generate type definitions
  dts: true,
  
  // Enable tree-shaking
  treeshake: true,
  
  // Code splitting for better isolation
  splitting: true,
  
  // Source maps for debugging
  sourcemap: true,
  
  // Clean dist before build
  clean: true,
  
  // External dependencies (won't be bundled)
  external: ['react', 'react-dom'],
  
  // Target environment
  target: 'es2020',
  
  // Minification (optional, can be enabled for production)
  minify: false,
});

