## AusData SDK

`@ausdata/sdk` encapsulates AusData's email template layer. It exposes TypeScript helpers for generating consistent HTML and plaintext content and provides a demo project that mirrors production usage.

### Capabilities

- Template presets: **Modern**, **Minimal**, **Corporate**, **Playful** (see `src/templates`).
- Rendering utilities: `renderEmailHtml` / `renderEmailText` accept structured payloads and output ready-to-send markup.
- Template metadata: `EmailTemplates.list()` enumerates the available presets for selection UIs or admin tools.
- Reference implementation: `examples/next-app` shows how to plug the SDK into a form submission flow.

### Install & Build

```bash
npm install
npm run build
```

Build artifacts land in `dist/` (CJS, ESM, and `.d.ts`). Only that folder needs to be published to npm.

### Usage

```ts
import {
  renderEmailHtml,
  renderEmailText,
  EmailTemplates,
} from '@ausdata/sdk';

const html = renderEmailHtml(
  {
    name: 'Ada',
    email: 'ada@example.com',
    company: 'AusData',
    message: 'Requesting a product demo',
  },
  { template: 'playful' }
);

const text = renderEmailText({
  name: 'Ada',
  email: 'ada@example.com',
  message: 'Requesting a product demo',
});

console.log(EmailTemplates.list());
```

### Repository Layout

```
src/                # SDK source files
examples/next-app   # Next.js demo consuming the SDK
doc/                # Template and theme guidance
```

### Demo Workflow

```bash
cd examples/next-app
npm install
npm run dev
```

Link the root SDK via `npm link` or a workspace to validate template edits inside the demo UI.

### Release Checklist

```bash
npm run clean
npm run build
npm publish --access public
```

Before publishing, bump the version, verify a clean git state, and run lint/tests as required.
