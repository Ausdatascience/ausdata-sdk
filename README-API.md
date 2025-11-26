# ausdata-api

Centralized API for AusData SaaS products (Forms, Email, etc.).

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Copy env file**
   ```bash
   cp .env.local.example .env.local
   ```
   Required values:
   - Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`
   - Auth: `AUSDATA_MASTER_KEY` (optional)
   - Email: `EMAIL_PROVIDER=gmail` (default), plus Gmail OAuth vars  
     (`GMAIL_USER`, `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REFRESH_TOKEN`, `GMAIL_REDIRECT_URI`, `GMAIL_SENDER_NAME`)
   - CORS whitelist: `CORS_ALLOWED_ORIGINS=https://api-test.ausdata.app,http://localhost:3000`
   - Local testing (optional): `AUSDATA_API_URL`, `AUSDATA_API_KEY`

3. **Run migrations in Supabase SQL Editor**
   - `001_initial_schema.sql`
   - `002_insert_test_api_key.sql`
   - `003_add_scopes_to_api_keys.sql`

4. **Insert an API key**
   ```sql
   INSERT INTO api_keys (client_id, api_key, name, is_active, scopes)
   VALUES ('client-001', 'your-api-key', 'Initial Client', true, ARRAY['forms.submit','emails.send']);
   ```

5. **Start dev server**
   ```bash
   npm run dev
   ```

## API

### POST /api/v1/forms/submit
- Headers: `Authorization: Bearer <api-key>`
- Body:
  ```json
  {
    "formId": "contact-form",
    "data": { "name": "...", "email": "...", "message": "..." }
  }
  ```
- Response: `{ success: true, data: { id: "..." } }`

### POST /api/v1/emails/send
- Headers: `Authorization: Bearer <api-key>`
- Body:
  ```json
  {
    "to": "client@example.com",
    "subject": "Welcome",
    "html": "<p>Hello!</p>",
    "text": "Hello!"
  }
  ```
- Requires `emails.send` scope
- Uses pluggable providers (default Gmail via OAuth2 + Nodemailer)
- Logs stored in `email_logs`

## Error Codes
- `AUTH_001` Unauthorized  
- `AUTH_002` Invalid API key format  
- `AUTH_003` API key not found  
- `AUTH_004` API key inactive  
- `AUTH_005` Missing scope  
- `VAL_001` Validation error  
- `VAL_002` Missing field  
- `DB_001` Database error  
- `SRV_001` Internal error

## Project Layout
```
app/api/v1/forms/submit/route.ts
app/api/v1/emails/send/route.ts
lib/db/supabase.ts
lib/services/forms-service.ts
lib/services/email-service.ts
lib/services/email/providers/*
supabase/migrations/*.sql
examples/submit-form.js
```

## Scripts
```bash
npm run dev
npm run build
npm start
npm run lint
```

## Deployment
Deploy on Vercel; configure all env vars in project settings.

