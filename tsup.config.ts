import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * tsup configuration for @ausdata/sdk
 * 
 * This configuration ensures proper build isolation:
 * - Separate entry points for core SDK, server utilities, and React components
 * - Tree-shaking enabled to minimize bundle size
 * - Code splitting to avoid forcing React on pure Node.js users
 * - Automatic CSS inlining for zero-config usage
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
  
  // Copy CSS file and inline it into injectStyles after build
  onSuccess: async () => {
    try {
      const distDir = join(process.cwd(), 'dist');
      const stylesSource = join(process.cwd(), 'src/react/styles.css');
      const stylesDest = join(distDir, 'styles.css');
      
      // Ensure dist directory exists
      mkdirSync(distDir, { recursive: true });
      
      // Copy CSS file to dist
      copyFileSync(stylesSource, stylesDest);
      console.log('✓ Copied styles.css to dist');
      
      // Inline CSS into react.js and react.cjs for automatic injection
      const cssContent = readFileSync(stylesDest, 'utf-8');
      
      // Escape CSS for JavaScript template string
      const cssEscaped = cssContent
        .replace(/\\/g, '\\\\')
        .replace(/`/g, '\\`')
        .replace(/\${/g, '\\${')
        .replace(/\r\n/g, '\\n')
        .replace(/\n/g, '\\n');
      
      // Process ESM build (react.js)
      const reactJsPath = join(distDir, 'react.js');
      if (existsSync(reactJsPath)) {
        let reactCode = readFileSync(reactJsPath, 'utf-8');
        // Replace the placeholder with actual CSS
        reactCode = reactCode.replace(
          /`\/\* CSS will be injected here during build \*\/`/g,
          `\`${cssEscaped}\``
        );
        // Also try without backticks
        reactCode = reactCode.replace(
          /\/\* CSS will be injected here during build \*\//g,
          cssEscaped
        );
        writeFileSync(reactJsPath, reactCode);
        console.log('✓ Inlined CSS into react.js (ESM)');
      }
      
      // Process CJS build (react.cjs)
      const reactCjsPath = join(distDir, 'react.cjs');
      if (existsSync(reactCjsPath)) {
        let reactCode = readFileSync(reactCjsPath, 'utf-8');
        // Replace the placeholder with actual CSS
        reactCode = reactCode.replace(
          /`\/\* CSS will be injected here during build \*\/`/g,
          `\`${cssEscaped}\``
        );
        // Also try without backticks
        reactCode = reactCode.replace(
          /\/\* CSS will be injected here during build \*\//g,
          cssEscaped
        );
        writeFileSync(reactCjsPath, reactCode);
        console.log('✓ Inlined CSS into react.cjs (CJS)');
      }
    } catch (error) {
      console.error('Failed to process styles:', error);
      // Don't throw - build can continue without CSS inlining
    }
  },
});
