/**
 * Style injection utility for @ausdata/sdk/react
 * 
 * Automatically injects CSS styles into the document head.
 * Supports both development (dynamic import) and production (inlined CSS).
 * 
 * @example
 * ```tsx
 * import { injectStyles } from '@ausdata/sdk/react';
 * 
 * function MyComponent() {
 *   useEffect(() => {
 *     injectStyles();
 *   }, []);
 *   return <div>...</div>;
 * }
 * ```
 */

let stylesInjected = false;
let styleElement: HTMLStyleElement | null = null;

// CSS content - will be replaced during build with actual CSS
const CSS_CONTENT = `/* CSS will be injected here during build */`;

/**
 * Inject styles into the document head
 * Automatically handles both development and production modes
 * 
 * @param force - Force re-injection even if styles already exist
 */
export async function injectStyles(force = false): Promise<void> {
  if (typeof document === 'undefined') {
    return;
  }

  // Check if styles already exist
  const existingStyle = document.getElementById('ausdata-sdk-styles');
  if (existingStyle && !force) {
    stylesInjected = true;
    return;
  }

  // Remove existing style if forcing
  if (existingStyle && force) {
    existingStyle.remove();
    stylesInjected = false;
  }

  let cssContent = getStylesContent();

  // If no inlined CSS (development mode), try to load from external file
  if (!cssContent || cssContent.includes('will be injected')) {
    // Try multiple strategies to load CSS in development
    cssContent = await tryLoadStyles();
  }

  if (!cssContent || cssContent.trim() === '') {
    // Silently fail - user can import styles manually if needed
    return;
  }

  // Create and inject style element
  styleElement = document.createElement('style');
  styleElement.id = 'ausdata-sdk-styles';
  styleElement.textContent = cssContent;
  document.head.appendChild(styleElement);
  stylesInjected = true;
}

/**
 * Try to load styles from various sources (development mode)
 */
async function tryLoadStyles(): Promise<string> {
  // Strategy 1: Try to fetch from node_modules (if available)
  try {
    const response = await fetch('/node_modules/@ausdata/sdk/dist/styles.css');
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // Ignore
  }

  // Strategy 2: Try relative path (for local development)
  try {
    const response = await fetch('/dist/styles.css');
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // Ignore
  }

  // Strategy 3: Try from SDK package path
  try {
    // In Next.js, we can try to load from public or static assets
    const response = await fetch('/_next/static/chunks/styles.css');
    if (response.ok) {
      return await response.text();
    }
  } catch {
    // Ignore
  }

  return '';
}

/**
 * Get CSS styles as string
 */
function getStylesContent(): string {
  if (CSS_CONTENT.includes('will be injected')) {
    return '';
  }
  return CSS_CONTENT;
}

/**
 * Check if styles are already injected
 */
export function hasStylesInjected(): boolean {
  if (typeof document === 'undefined') {
    return false;
  }
  return !!document.getElementById('ausdata-sdk-styles') || stylesInjected;
}

/**
 * Remove injected styles (useful for testing or cleanup)
 */
export function removeStyles(): void {
  if (styleElement && styleElement.parentNode) {
    styleElement.parentNode.removeChild(styleElement);
    styleElement = null;
    stylesInjected = false;
  }
}
