# Email Templates Guide

The contact form supports multiple email templates. You can easily switch between them to match your brand style.

## Available Templates

### 1. Modern (Default)
- **Style**: Clean, gradient header, card-based design
- **Colors**: Purple gradient (#667eea → #764ba2)
- **Best for**: Tech companies, startups, modern brands
- **Features**: 
  - Emoji icons
  - Quick action buttons
  - Rounded corners
  - Shadow effects

### 2. Minimal
- **Style**: Black and white, monospace font, bordered
- **Colors**: Black borders, white background
- **Best for**: Design agencies, minimalist brands, portfolios
- **Features**:
  - Courier New font
  - Clean lines
  - Uppercase labels
  - Simple and elegant

### 3. Corporate
- **Style**: Professional, serif font, formal layout
- **Colors**: Black (#1a1a1a) and white
- **Best for**: Law firms, financial services, B2B companies
- **Features**:
  - Georgia serif font
  - Table-based layout
  - Formal typography
  - Professional appearance

### 4. Playful
- **Style**: Colorful, fun, gradient backgrounds
- **Colors**: Multiple gradients (pink, purple, orange)
- **Best for**: Creative agencies, lifestyle brands, entertainment
- **Features**:
  - Comic Sans font
  - Large emojis
  - Vibrant colors
  - Friendly tone

## How to Switch Templates

Open `src/lib/email-template.ts` and change the `ACTIVE_TEMPLATE` constant:

\`\`\`typescript
// Find this section at the top of the file:
// ============================================
// 🎨 CHANGE EMAIL TEMPLATE HERE
// ============================================
const ACTIVE_TEMPLATE: EmailTemplate = 'modern';
// ============================================

// Change to one of these:
const ACTIVE_TEMPLATE: EmailTemplate = 'minimal';
const ACTIVE_TEMPLATE: EmailTemplate = 'corporate';
const ACTIVE_TEMPLATE: EmailTemplate = 'playful';
\`\`\`

That's it! No need to modify any other files.

## Template Structure

All templates are located in `src/lib/email-templates/`:

\`\`\`
src/lib/email-templates/
├── modern.ts      - Modern gradient design
├── minimal.ts     - Minimalist black & white
├── corporate.ts   - Professional formal style
└── playful.ts     - Colorful fun design
\`\`\`

## Creating Custom Templates

To create your own template:

1. Create a new file in `src/lib/email-templates/your-template.ts`
2. Export two functions:
   - `generateHTML(data: ContactFormData): string`
   - `generateText(data: ContactFormData): string`
3. Import it in `src/lib/email-template.ts`
4. Add it to the templates object
5. Update the EmailTemplate type

### Example Template Structure

\`\`\`typescript
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export function generateHTML(data: ContactFormData): string {
  return \`
<!DOCTYPE html>
<html>
  <!-- Your HTML template here -->
</html>
  \`.trim();
}

export function generateText(data: ContactFormData): string {
  return \`
Your plain text template here
  \`.trim();
}
\`\`\`

## Email Best Practices

1. **Always include both HTML and text versions**
   - HTML for visual appeal
   - Text for email clients that don't support HTML

2. **Use inline CSS**
   - Email clients don't support external stylesheets
   - All styles must be inline

3. **Use tables for layout**
   - Email clients have poor CSS support
   - Tables ensure consistent rendering

4. **Test in multiple clients**
   - Gmail, Outlook, Apple Mail, etc.
   - Use services like Litmus or Email on Acid

5. **Keep it responsive**
   - Use max-width for mobile devices
   - Test on different screen sizes

## Template Comparison

| Feature | Modern | Minimal | Corporate | Playful |
|---------|--------|---------|-----------|---------|
| Colors | Purple gradient | Black & white | Black & white | Multi-color |
| Font | Sans-serif | Monospace | Serif | Comic Sans |
| Style | Contemporary | Minimalist | Professional | Fun |
| Emojis | Yes | No | No | Yes |
| Buttons | Rounded | None | Square | Rounded |
| Best for | Tech | Design | Business | Creative |

## Customization Tips

### Changing Colors
Look for color values in the template files:
- `#667eea` - Primary color
- `#764ba2` - Secondary color
- `#f8f9fa` - Background color

### Changing Fonts
Update the `font-family` in the body tag:
- Sans-serif: `-apple-system, BlinkMacSystemFont, 'Segoe UI'`
- Serif: `Georgia, 'Times New Roman', serif`
- Monospace: `'Courier New', monospace`

### Adding Your Logo
Add an image tag in the header section:
\`\`\`html
<img src="https://your-domain.com/logo.png" alt="Logo" style="max-width: 150px;">
\`\`\`

## Support

For questions or issues with email templates, check:
- Email rendering: [Can I Email](https://www.caniemail.com/)
- HTML email guide: [Really Good Emails](https://reallygoodemails.com/)
