# AusData SDK

Official TypeScript toolkit for interacting with the AusData platform. Ship email content that matches AusData’s design language and submit form data to `api.ausdata.app` through a typed client.

[![npm version](https://img.shields.io/npm/v/%40ausdata%2Fsdk.svg?label=npm)](https://www.npmjs.com/package/@ausdata/sdk)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](#license)

---

## Features

- **Email templates** – Modern, Minimal, Corporate, and Playful layouts with HTML + plaintext output.
- **Rendering helpers** – `renderEmailHtml` / `renderEmailText` convert structured payloads into ready-to-send markup.
- **Template metadata** – `EmailTemplates.list()` exposes the available presets for CMS/admin integrations.
- **Forms API client** – `AusdataClient` authenticates with your AusData API key and calls `/api/v1/forms/submit`.

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

```ts
import { AusdataClient, renderEmailHtml } from '@ausdata/sdk';

// 1. Render email content
const html = renderEmailHtml({
  name: 'Ada',
  email: 'ada@example.com',
  company: 'AusData',
  message: 'Requesting a demo',
}, { template: 'playful' });

// 2. Submit form data through AusData API
const client = new AusdataClient({ apiKey: process.env.AUSDATA_API_KEY! });
const submission = await client.submitForm({
  formId: 'contact-form',
  data: { name: 'Ada', email: 'ada@example.com', message: 'Requesting a demo' },
});

console.log(submission.id);
```

`submitForm` automatically sends `Authorization: Bearer <api-key>` to `https://api.ausdata.app/api/v1/forms/submit`. Override `baseUrl` for staging or self-hosted deployments.

## API Surface

### Templates
- `renderEmailHtml(data, options)` – returns HTML string.
- `renderEmailText(data, options)` – returns plaintext string.
- `EmailTemplates.list()` – returns the available template identifiers.

### Client
- `new AusdataClient({ apiKey, baseUrl? })`
- `client.submitForm({ formId, data })`
- `AusdataApiError` – thrown when the API responds with non-2xx status.

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
# ausdata-api