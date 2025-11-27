This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

Copy the environment file and add your AusData API key:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and replace with your actual API key:

```
NEXT_PUBLIC_API_KEY=your-api-key-here
```

### 3. Run Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Integration

This project integrates with the [AusData API](https://api.ausdata.app) for form submissions.

### How It Works

1. **Contact Form**: The homepage (`src/app/page.tsx`) displays a contact form with name, email, and message fields.

2. **API Proxy**: Form submissions are sent to a Next.js API route (`src/app/api/submit-form/route.ts`) which acts as a proxy to avoid CORS issues.

3. **External API**: The proxy forwards requests to `https://api.ausdata.app/api/v1/forms/submit` with proper authentication.

### Architecture

```
User Form → /api/submit-form → https://api.ausdata.app/api/v1/forms/submit
```

**Why use a proxy?**
- Avoids CORS (Cross-Origin Resource Sharing) restrictions in the browser
- Keeps API keys secure on the server side
- Provides better error handling and logging

### API Endpoints

**Local Proxy Endpoint:**
- `POST /api/submit-form`
- Body: `{ data: { name, email, message } }`

**External API Endpoint:**
- `POST https://api.ausdata.app/api/v1/forms/submit`
- Headers: `Authorization: Bearer <api-key>`
- Body: `{ formId: "contact-form", data: { name, email, message } }`

For more details about the AusData API, see [README-API.md](./README-API.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
