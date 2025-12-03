/**
 * Configuration utilities for @ausdata/sdk/react
 * 
 * Provides helper functions for common configuration tasks
 */

/**
 * Get API key from environment variables
 * Supports multiple framework conventions:
 * - Next.js: NEXT_PUBLIC_AUSDATA_API_KEY (replaced at build time)
 * - Vite: VITE_AUSDATA_API_KEY (via import.meta.env)
 * - Generic: PUBLIC_AUSDATA_API_KEY or AUSDATA_API_KEY
 */
export function getApiKey(): string | undefined {
  // Try Next.js environment variables first
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processEnv = typeof globalThis !== 'undefined' 
    ? ((globalThis as any).process?.env || (globalThis as any).__NEXT_DATA__?.env)
    : undefined;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalProcess = typeof globalThis !== 'undefined' 
    ? ((globalThis as any).process)
    : undefined;
  
  if (globalProcess?.env?.NEXT_PUBLIC_AUSDATA_API_KEY) {
    return globalProcess.env.NEXT_PUBLIC_AUSDATA_API_KEY;
  }
  
  if (processEnv?.NEXT_PUBLIC_AUSDATA_API_KEY) {
    return processEnv.NEXT_PUBLIC_AUSDATA_API_KEY;
  }
  
  // Try Vite environment variables
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (globalThis as any).import?.meta;
    if (meta?.env?.VITE_AUSDATA_API_KEY) {
      return meta.env.VITE_AUSDATA_API_KEY;
    }
  } catch {
    // import.meta might not be available
  }
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (typeof (globalThis as any).import !== 'undefined') {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const viteEnv = (globalThis as any).import.meta?.env;
      if (viteEnv?.VITE_AUSDATA_API_KEY) {
        return viteEnv.VITE_AUSDATA_API_KEY;
      }
    } catch {
      // Not available
    }
  }
  
  // Try other common patterns from window
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowEnv = (window as any).__ENV__ || (window as any).process?.env;
    if (windowEnv) {
      return (
        windowEnv.NEXT_PUBLIC_AUSDATA_API_KEY ||
        windowEnv.VITE_AUSDATA_API_KEY ||
        windowEnv.PUBLIC_AUSDATA_API_KEY
      );
    }
  }
  
  // Server-side: read from process.env directly (Node.js)
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeEnv = (globalThis as any).process?.env;
    if (nodeEnv) {
      return (
        nodeEnv.AUSDATA_API_KEY ||
        nodeEnv.NEXT_PUBLIC_AUSDATA_API_KEY ||
        nodeEnv.VITE_AUSDATA_API_KEY
      );
    }
  }
  
  return undefined;
}

/**
 * Get base URL from environment variables or return default
 */
export function getBaseUrl(): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processEnv = typeof globalThis !== 'undefined' 
    ? ((globalThis as any).process?.env || (globalThis as any).__NEXT_DATA__?.env)
    : undefined;
  
  if (processEnv?.NEXT_PUBLIC_AUSDATA_BASE_URL) {
    return processEnv.NEXT_PUBLIC_AUSDATA_BASE_URL;
  }
  
  // Try Vite environment variables
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (globalThis as any).import?.meta;
    if (meta?.env?.VITE_AUSDATA_BASE_URL) {
      return meta.env.VITE_AUSDATA_BASE_URL;
    }
  } catch {
    // Not available
  }
  
  // Try other common patterns
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const windowEnv = (window as any).__ENV__ || (window as any).process?.env;
    if (windowEnv) {
      const url = windowEnv.NEXT_PUBLIC_AUSDATA_BASE_URL ||
                  windowEnv.VITE_AUSDATA_BASE_URL ||
                  windowEnv.PUBLIC_AUSDATA_BASE_URL;
      if (url) return url;
    }
  }
  
  // Server-side: read from process.env directly
  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodeEnv = (globalThis as any).process?.env;
    if (nodeEnv) {
      const url = nodeEnv.AUSDATA_BASE_URL ||
                  nodeEnv.NEXT_PUBLIC_AUSDATA_BASE_URL ||
                  nodeEnv.VITE_AUSDATA_BASE_URL;
      if (url) return url;
    }
  }
  
  return '/api';
}

/**
 * 自动检测运行环境并返回合适的 baseUrl
 */
export function getDefaultBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).__NEXT_DATA__) {
      return '/api';
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (globalThis as any).import !== 'undefined') {
      return '/api';
    }
  }
  
  return '/api';
}

