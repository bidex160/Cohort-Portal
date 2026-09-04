# THIE CMD Cohort Portal — Engineer Handover

Production source for the public Tertiary Health Information Exchange (THIE) onboarding portal for Chief Medical Directors. The portal presents the programme, records hospital interest, offers briefing slots, opens Google Calendar and WhatsApp confirmation, provides programme documents, and accepts signed MOU uploads.

Current public reference: https://thie-cmd-cohort-portal.primeddiagnostics.chatgpt.site

## What is included

- Responsive CMD-facing landing and onboarding journey
- Hospital/cohort enrolment form
- Server-side enrolment API with validation
- Google Calendar event generation
- WhatsApp booking confirmation to `+234 805 205 8628`
- Downloadable participation MOU, executive pack and hospital storybook
- Optional signed-MOU PDF upload, limited to 10 MB
- SQL schema and initial migration
- Cloudflare-compatible production worker build

## Technology

- React 19, Next.js 16-compatible routing and Vinext/Vite
- TypeScript
- Cloudflare Workers runtime
- Cloudflare D1 via Drizzle ORM for enrolments and upload metadata
- Cloudflare R2 for uploaded MOU files
- Tailwind CSS and local component primitives

Node.js `22.13.0` or newer is required.

## Main files

- `app/page.tsx` — complete user journey, form, booking and external actions
- `app/globals.css`, `app/proof.css`, `app/booking-actions.css` — visual system and responsive styles
- `app/api/enrolments/route.ts` — creates a hospital enrolment
- `app/api/mou/route.ts` — validates and stores uploaded MOU PDFs
- `db/schema.ts` — application data model
- `drizzle/0000_opposite_songbird.sql` — initial database migration
- `public/resources/` — downloadable programme documents
- `.openai/hosting.json` — current Cloudflare binding declarations

## Local setup

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm run build
npm test
```

The local development configuration simulates the declared `DB` and `BUCKET` bindings. Do not commit `.env` files, credentials, production database files or uploaded hospital documents.

## Deployment option A — Cloudflare

This is the shortest route because the backend already targets Cloudflare Workers.

1. Create a D1 database and an R2 bucket.
2. Bind them to the Worker as `DB` and `BUCKET`.
3. Apply `drizzle/0000_opposite_songbird.sql` to D1.
4. Run `npm ci` and `npm run build`.
5. Deploy the generated Worker and public assets using the organisation's Cloudflare pipeline.
6. Attach the final domain and enforce HTTPS.

The built Worker entry point is `dist/server/index.js`.

## Deployment option B — Conventional VPS or another cloud

The frontend and user journey are portable. The two API routes currently depend on Cloudflare services and must be adapted:

1. Replace `getDb()`/D1 with PostgreSQL or MySQL and run an equivalent migration.
2. Replace `env.BUCKET.put(...)` with S3, Cloudflare R2's S3 API, MinIO or another private object store.
3. Store database and storage credentials only in the server's secret manager or environment.
4. Preserve the existing API response shapes so the frontend needs no changes.
5. Serve through HTTPS behind a reverse proxy and configure backups, logs and monitoring.

Do not expose uploaded MOU objects publicly. Provide access only through an authenticated administrative workflow or time-limited signed URLs.

## Data model

`enrolments` stores the CMD/hospital contact, selected cohort and wave, named implementation leads, actions, status and creation time.

`mou_uploads` stores only file metadata and the private object key. The PDF itself belongs in private object storage.

## External actions

- Calendar: generated client-side as a Google Calendar event after a briefing slot is selected.
- WhatsApp: generated client-side and addressed to `2348052058628`, including the selected time, hospital and contact details.
- Documents: served from `public/resources/`.

If the programme contact changes, update the WhatsApp destination in `app/page.tsx`. If real-time slot availability is required, replace the current predefined slots with a calendar scheduling API and server-side conflict checks.

## Production requirements before launch on the organisation's server

- Confirm final domain and programme contact details.
- Configure production database and private object storage.
- Apply the database migration.
- Add rate limiting and bot protection to both POST endpoints.
- Add an authorised admin view or secure export process for enrolments and MOU files.
- Configure database and object-storage backups and retention rules.
- Configure error monitoring and uptime checks.
- Perform mobile, desktop, form, Calendar, WhatsApp, document-download and MOU-upload tests.
- Publish a privacy notice and define patient/hospital contact-data retention.

## Security notes

- Never place credentials in this repository or frontend code.
- Keep MOU files private and encrypt storage at rest.
- Restrict staff access using least privilege and log every document access.
- Retain the server-side file-type and size checks; add malware scanning in production.
- Review Nigerian data-protection requirements with the programme's legal/privacy lead before collecting production data.

## Handover acceptance test

The deployment is ready when a CMD can open the portal on mobile, submit valid hospital details, receive a reference, select a briefing time, open Calendar or WhatsApp with the correct information, download all three documents, upload a PDF MOU, and the authorised team can verify both the database record and private stored file.
