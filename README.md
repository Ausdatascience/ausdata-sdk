# AusData SDK

Official TypeScript SDK for interacting with the AusData platform. Ship email content that matches AusData's design language and submit form data to `app.ausdata.ai` through a typed client.

[![npm version](https://img.shields.io/npm/v/%40ausdata%2Fsdk.svg?label=npm)](https://www.npmjs.com/package/@ausdata/sdk)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](#license)

---

## Features

- **Email templates** – Modern, Minimal, Corporate, and Playful layouts with HTML + plaintext output.
- **Rendering helpers** – `renderEmailHtml` / `renderEmailText` convert structured payloads into ready-to-send markup.
- **Template metadata** – `EmailTemplates.list()` exposes the available presets for CMS/admin integrations.
- **Forms API client** – `Ausdata.forms.submit` authenticates with your AusData API key and calls `/api/v1/forms/submit`.
- **Email API client** – `Ausdata.email.send` triggers server-side delivery through `/api/v1/emails/send`.
- **Business search client** – `Ausdata.business.search` queries `/api/v1/business/search` to look up Australian business data by **name** or **11‑digit ABN**.
- **React UI Component** – Ready-to-use business search interface with accordion layout, multiple themes, and responsive design.

## Installation

```bash
npm install @ausdata/sdk
# or
pnpm add @ausdata/sdk
```

## Configuration

Add your AusData API key (from the AusData dashboard) to environment variables or your secret store:

```bash
AUSDATA_API_KEY=aus_sk_************************
```

## Quick Start

### React UI Component (Recommended - One Line!)

```tsx
import { AusdataUI } from '@ausdata/sdk/react';

export default function BusinessPage() {
  return <AusdataUI apiKey="your-api-key" />;
}
```

**Features:**
- **Accordion Interface** – Search form and display settings are organized in collapsible accordion panels for a cleaner, more organized interface
- **Multiple Themes** – Choose from 7 built-in themes: minimal, brand, light, dark, eye, cyan-blue, and violet-gold
- **Layout Variants** – Display results as table, card, or list views
- **Business Search** – Search by business name or 11-digit ABN with real-time results
- **Responsive Design** – Fully responsive and mobile-friendly
- **Accessibility** – Built with ARIA attributes and keyboard navigation support

### SDK Usage

```ts
import { Ausdata, renderEmailHtml, renderEmailText } from '@ausdata/sdk';

const client = new Ausdata(process.env.AUSDATA_API_KEY!);

// 1. Render email content using AusData templates
const html = renderEmailHtml({
  name: 'Ada',
  email: 'ada@example.com',
  company: 'AusData',
  message: 'Requesting a demo',
}, { template: 'playful' });

const text = renderEmailText({
  name: 'Ada',
  email: 'ada@example.com',
  company: 'AusData',
  message: 'Requesting a demo',
});

// 2. Submit form data through AusData API
const submission = await client.forms.submit({
  formId: 'contact-form',
  data: { name: 'Ada', email: 'ada@example.com', message: 'Requesting a demo' },
});

// 3. Send a notification email via the AusData Email API
const email = await client.email.send({
  to: 'hello@ausdata.org',
  subject: `New contact: ${submission.id}`,
  html,
  text,
});

console.log(submission.id, email.id);

// 4. Search Australian businesses by name
const searchByName = await client.business.search({ q: 'Sydney', limit: 10 });
console.log(searchByName.results);

// 5. Use the high-level BusinessModule for more expressive helpers
import { BusinessModule } from '@ausdata/sdk';
const business = new BusinessModule(client);

// 5.a Look up a single business by ABN (11-digit)
const entity = await business.lookupByAbn('60728711292');
console.log(entity?.name, entity?.abnStatus, entity?.gst, entity?.businessNames);
```

Both helpers automatically send `Authorization: Bearer <api-key>` to `https://app.ausdata.ai/api/v1`. Override `baseUrl` for staging or self-hosted deployments:

```ts
const client = new Ausdata(apiKey, { baseUrl: 'https://staging.ausdata.ai/api/v1' });
```

## API Surface

### Templates
- `renderEmailHtml(data, options)` – returns HTML string.
- `renderEmailText(data, options)` – returns plaintext string.
- `EmailTemplates.list()` – returns the available template identifiers.

### Client
- `new Ausdata(apiKey, options?)` – Create a new SDK instance
  - `apiKey: string` (required) – Your AusData API key
  - `options?: { baseUrl?: string }` (optional) – Custom base URL
- `client.email.send(payload)` – Send an email
- `client.forms.submit(payload)` – Submit form data
- `client.business.search(params)` – Search for businesses
- `AusdataError` – thrown when the API responds with non-2xx status or network errors

### Types

All types from the API contract are exported:

- `ApiErrorCode`, `ApiResponse`
- `SendEmailPayload`, `SendEmailResponseData`
- `SubmitFormPayload`, `SubmitFormResponseData`
- `SearchBusinessParams`, `BusinessEntity`, `SearchBusinessResponseData`
- `AusdataError`

## Error Handling

The SDK throws `AusdataError` instances when API requests fail:

```ts
import { Ausdata, AusdataError } from '@ausdata/sdk';

try {
  await client.email.send({ to: 'test@example.com', subject: 'Test', html: '<p>Test</p>' });
} catch (error) {
  if (error instanceof AusdataError) {
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.details);
  }
}
```

## Repository Layout

```
src/          # SDK source
src/templates # Email template implementations
doc/          # Template & theme references
dist/         # Build artifacts (npm publish output)
```

## Scripts

```bash
npm run lint   # ESLint over src/
npm run build  # tsup -> dist/
npm test       # Run test script
```

## Contributing

1. Fork & clone this repo
2. `npm install`
3. `npm run lint && npm run build`
4. Submit a pull request with context (logs, screenshots, reproduction steps)

Issues & feature requests: open a GitHub issue or email support.

## License

MIT © Ausdata Science

## Support

- **Publisher:** Ausdata Science — hello@ausdata.ai
- **Technical Support:** Ausdata Lab — hello@ausdata.org
