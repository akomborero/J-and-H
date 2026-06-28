# J&H Consultancy Services — Frontend (Standalone Demo Build)

A **frontend-only** build of the J&H Consultancy Services SaaS platform. There is
no backend in this build — Supabase Auth, database, and storage are all
simulated in-memory so you can run, click through, and demo the entire UI
without any setup, API keys, or network access.

This is intended for: design review, UX walkthroughs, stakeholder demos, and
as a reference implementation before wiring up the real Supabase backend.

## What's simulated vs. real

| Layer | This build | Production build |
|---|---|---|
| UI / components | Real | Same |
| Routing & role guards | Real | Same |
| Auth | In-memory, `localStorage`-persisted session | Supabase Auth |
| Database | In-memory React context, seeded with demo data | Supabase Postgres |
| File uploads | Simulated (fake filenames, no real files) | Supabase Storage |
| Realtime | Not applicable (single-tab state) | Supabase Realtime |

Data you create in this demo (new applications, tickets, invoices) lives only
in memory for the current browser tab and resets on page reload.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## Demo accounts

On the login screen, use the **Demo quick access** buttons, or sign in with
any of these emails (any password works):

| Role | Email |
|---|---|
| Client | `tendai.moyo@example.com` |
| Admin | `farai@jhconsultancy.co.zw` |
| Super Admin | `hilary@jhconsultancy.co.zw` |    

## Scripts



- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production (`dist/`)
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Deploying to Vercel

This repo includes a `vercel.json` with a SPA rewrite rule so client-side
routes resolve correctly. Either:

- Import the repo into Vercel (framework preset: **Vite**), or
- Run `vercel` from this directory.

No environment variables are required for this standalone build.

## Tech stack

React 18 (Vite 5+) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion ·
React Router · React Hook Form + Zod · Recharts · lucide-react

## Project structure

```
src/
  components/      Reusable UI (shadcn-style primitives, layout, dashboard widgets)
  context/         AuthContext, ThemeContext, DataStoreContext (mock backend)
  mock/data/       Seed data and service catalogue (acts as the "database")
  pages/           Route-level pages, grouped by client / admin / super-admin / auth / public
  routes/          Route guards
  types/           Shared TypeScript types mirroring the production Supabase schema
  styles/          Tailwind v4 theme tokens (brand colors, fonts)
```

## Connecting the real backend later

The `DataStoreContext` and `AuthContext` are the only two files that simulate
a backend. To connect Supabase:

1. Replace the bodies of `AuthContext`'s `login`/`logout` with `supabase.auth`
   calls.
2. Replace `DataStoreContext`'s in-memory arrays and mutator functions with
   `supabase-js` queries (the shape of `types/index.ts` already mirrors the
   production schema, so most components won't need changes).
3. Swap the simulated "Upload" buttons in `NewApplicationPage` and
   `ClientInvoicesPage` for real `supabase.storage` uploads.
