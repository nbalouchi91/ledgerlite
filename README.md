# LedgerLite

An invoicing dashboard for freelancers and small businesses to track invoices and what clients owe.

## Features

- Show revenue and overdue-invoice cards on a dashboard (sample figures for now)
- List every invoice with a colour-coded status (draft, sent, paid, overdue)
- Show each client's invoice count and outstanding total
- Add a new invoice through a validated form, with loading and error states

## Tech stack

- **Next.js (App Router):** file-based pages for `/dashboard`, `/invoices` and `/clients`
- **TypeScript (strict):** catches type errors while writing code
- **Tailwind CSS:** mobile-first styling
- **Zod:** validates data coming from the client and data coming back from the server
- **API route handlers:** `GET /api/invoices` returns the invoices; `POST /api/invoices` validates and creates one

## Getting started

You need Node.js 20 or later.

```bash
git clone https://github.com/nbalouchi91/ledgerlite.git
cd ledgerlite
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build` (production build) and `npm run lint` (ESLint).

## How the API works

`POST /api/invoices` passes every request through four checks:

1. The body must be valid JSON.
2. The fields must match the Zod schema (client, amount, dates).
3. The client must exist.
4. Only then does the server create the `id` and the `draft` status, store the invoice and return `201`.

Failures return `400` with `{ "error": "..." }`. The client never chooses an invoice's `id` or `status`.

Invoices are kept in memory, so they reset when the server restarts. Sample data lives in `src/lib/sampleData.ts`.

## Project structure

```
src/
  app/
    api/invoices/route.ts   GET and POST handlers
    dashboard/              dashboard page
    invoices/               invoices page
    clients/                clients page
  components/               InvoicesView, NewInvoiceForm, StatCard, StatusBadge
  lib/
    schemas.ts              Zod schemas (source of the types)
    invoiceUtils.ts         totals and filtering helpers
    sampleData.ts           sample clients and invoices
  types/                    shared TypeScript types
```

## What I learned

- **Types vs runtime validation.** TypeScript types disappear at runtime, so Zod checks real data: requests on the server, responses on the client.
- **Money as integer cents.** Floating-point numbers are unreliable for money, so amounts are stored in cents and formatted for display.
- **Time zones.** A date like `2026-01-01` is parsed as UTC, so formatting it in local time can show the previous day. Dates are formatted with `timeZone: 'UTC'`.
- **The server owns `id` and `status`.** A client that could choose them could mark its own invoice as paid.
- **React effects.** Strict Mode runs effects twice in development, so fetches use an `AbortController` for cleanup.

## Next steps

- Calculate the dashboard figures from the invoice data instead of using sample values
- Fetch data with TanStack Query
- Add tests
- Replace the in-memory store with a database
