# Theme Configuration Guide

The contact form supports customizable themes through JSON configuration files.

## How It Works

Themes are defined in `src/config/theme.json` and applied via the `useTheme` hook.

## Theme Structure

```json
{
  "contactForm": {
    "background": { "light": "bg-white", "dark": "dark:bg-zinc-900" },
    "title": { "light": "text-zinc-900", "dark": "dark:text-zinc-50" },
    "subtitle": { "light": "text-zinc-600", "dark": "dark:text-zinc-400" },
    "label": { "light": "text-zinc-700", "dark": "dark:text-zinc-300" },
    "labelOptional": { "light": "text-zinc-400", "dark": "text-zinc-400" },
    "input": {
      "border": { "light": "border-zinc-300", "dark": "dark:border-zinc-700" },
      "background": { "light": "bg-white", "dark": "dark:bg-zinc-800" },
      "text": { "light": "text-zinc-900", "dark": "dark:text-zinc-100" },
      "focus": "focus:ring-blue-500"
    },
    "button": {
      "background": "bg-blue-600",
      "hover": "hover:bg-blue-700",
      "disabled": "disabled:bg-zinc-400",
      "text": "text-white"
    },
    "success": {
      "background": { "light": "bg-green-50", "dark": "dark:bg-green-900/20" },
      "border": { "light": "border-green-200", "dark": "dark:border-green-800" },
      "text": { "light": "text-green-800", "dark": "dark:text-green-200" }
    },
    "error": {
      "background": { "light": "bg-red-50", "dark": "dark:bg-red-900/20" },
      "border": { "light": "border-red-200", "dark": "dark:border-red-800" },
      "text": { "light": "text-red-800", "dark": "dark:text-red-200" }
    }
  }
}
```

## Available Themes

### Default Theme (Blue)
- File: `src/config/theme.json`
- Primary color: Blue
- Neutral colors: Zinc
- Best for: Professional, corporate websites

### Purple Theme
- File: `src/config/theme-purple.json`
- Primary color: Purple
- Neutral colors: Purple shades
- Best for: Creative, artistic brands

### Cyan Theme
- File: `src/config/theme-cyan.json`
- Primary color: Cyan
- Neutral colors: Cyan shades
- Best for: Tech, modern applications

### Pink Theme
- File: `src/config/theme-pink.json`
- Primary color: Pink
- Neutral colors: Pink shades
- Best for: Fashion, lifestyle brands

### Pure White Theme
- File: `src/config/theme-white.json`
- Primary color: Gray/Black
- Background: Pure white (light and dark mode)
- Best for: Minimalist, clean designs

### Pure Black Theme
- File: `src/config/theme-black.json`
- Primary color: White/Gray
- Background: Pure black (light and dark mode)
- Best for: Dark, elegant designs

## Switching Themes

To switch themes, update the import in `src/hooks/useTheme.ts`:

```typescript
// Default theme (Blue)
import themeConfig from '@/config/theme.json';

// Purple theme
import themeConfig from '@/config/theme-purple.json';

// Cyan theme
import themeConfig from '@/config/theme-cyan.json';

// Pink theme
import themeConfig from '@/config/theme-pink.json';

// Pure White theme
import themeConfig from '@/config/theme-white.json';

// Pure Black theme
import themeConfig from '@/config/theme-black.json';
```

## Creating Custom Themes

1. Copy `src/config/theme.json` to a new file (e.g., `theme-green.json`)
2. Modify the color classes using Tailwind CSS utilities
3. Update the import in `src/hooks/useTheme.ts`

### Supported Tailwind Colors

You can use any Tailwind color:
- `slate`, `gray`, `zinc`, `neutral`, `stone`
- `red`, `orange`, `amber`, `yellow`, `lime`, `green`
- `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`
- `violet`, `purple`, `fuchsia`, `pink`, `rose`

### Example: Green Theme

```json
{
  "contactForm": {
    "background": { "light": "bg-green-50", "dark": "dark:bg-green-950" },
    "button": {
      "background": "bg-green-600",
      "hover": "hover:bg-green-700",
      "disabled": "disabled:bg-green-300",
      "text": "text-white"
    }
  }
}
```

## Tips

- Always provide both `light` and `dark` variants for better user experience
- Use consistent color families for a cohesive look
- Test your theme in both light and dark modes
- Keep accessibility in mind (sufficient contrast ratios)
