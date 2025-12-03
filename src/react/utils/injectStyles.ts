/**
 * Style injection utility for @ausdata/sdk/react
 * 
 * Automatically injects CSS styles into the document head.
 * This ensures styles are available without requiring manual imports.
 */

// CSS will be injected at runtime
// The CSS string is generated during build time
let stylesInjected = false;

// CSS content - this will be replaced during build
const CSS_CONTENT = `/* CSS will be injected here during build */`;

/**
 * Inject styles into the document head
 * This is called automatically when the component mounts
 */
export function injectStyles(): void {
  if (typeof document === 'undefined' || stylesInjected) {
    return;
  }

  // Check if styles already exist
  const existingStyle = document.getElementById('ausdata-sdk-styles');
  if (existingStyle) {
    stylesInjected = true;
    return;
  }

  // Create style element
  const style = document.createElement('style');
  style.id = 'ausdata-sdk-styles';
  style.textContent = getStylesContent();
  document.head.appendChild(style);
  stylesInjected = true;
}

/**
 * Get CSS styles as string
 * This reads from the CSS file at runtime (for development)
 * or uses the inlined version (for production)
 */
function getStylesContent(): string {
  // In production, CSS_CONTENT will be replaced with actual CSS
  // For now, we'll try to load it dynamically or use a placeholder
  if (CSS_CONTENT.includes('will be injected')) {
    // Development mode - try to load from external source
    // In production builds, this will be replaced with actual CSS
    return '';
  }
  return CSS_CONTENT;
}
