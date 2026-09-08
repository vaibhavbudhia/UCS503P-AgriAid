# AgriAid — Plan

*One document. This is the only planning file — everything else lives as
actual code (see `code/backend` and `code/frontend`) or weekly logs (see
`journals/`).*

## What we're building
A platform that helps farmers do three things: share/book farm machinery,
track farm income and expenses, and get help with government schemes and
insurance claims. Full reasoning is in [`../project-proposal/`](../project-proposal/).

## Process we're following
**Agile-Incremental Hybrid**, 12 weeks, 6 phases of 2 weeks each:

| Phase | Weeks | What ships |
|---|---|---|
| 1. Requirements & Design | 1–2 | Scope locked, schema drafted, screens planned |
| 2. Foundation | 3–4 | Auth, DB, base API/frontend wiring |
| 3. Community Resource Network | 5–6 | Resource listing, booking, breakdown reports |
| 4. Farm Operations & Financial Mgmt | 7–8 | Labour matching, farm ledger |
| 5. Government Benefits & Claims | 9–10 | Scheme matching, insurance claims |
| 6. Integration | 11–12 | Testing, bug-fixing, deployment |

Each module phase is a working, demoable increment — not just code sitting
unintegrated until the end.

## How the code is organized
```
code/
├── backend/           Express API
│   ├── migrations/      Numbered SQL files + migrate.js runner (real, Phase 2)
│   ├── test/             node --test integration tests (real DB)
│   └── src/
│       ├── routes/      URL → controller mapping, one file per module
│       ├── controllers/ Request handling logic, one file per module
│       ├── models/       DB access per entity (real for users, Phase 2)
│       └── middleware/   Auth/JWT checks, async error wrapper
└── frontend/
    ├── landing.html     Working showcase page (see below)
    └── src/
        ├── pages/        One file per screen (Login/Register/Dashboard real)
        ├── components/    Shared UI pieces
        └── api/            Wrapper for calling the backend
.github/workflows/ci.yml   Spins up Postgres, runs migrations + backend tests
```
Auth, the full DB schema, and base API/frontend wiring are real as of
Phase 2 (Foundation). Everything else still defines the shape (function
names, routes, props) without doing real work yet — later phases fill
each slice in.

## What's actually working right now
- `code/frontend/landing.html` — a real, finished landing page for the
project (open it directly in a browser, no setup needed).
- **Auth + DB (Phase 2 / Foundation, complete):** real Postgres schema
  (10 tables, `code/backend/migrations/`), real `POST /api/auth/register`,
  `POST /api/auth/login`, and a JWT-protected `GET /api/auth/profile`, and
  a working Vite + React `Login` → `Register` → `Dashboard` flow talking to
  the live backend. Backend has 6 integration tests against a real DB;
  frontend has 7 render/interaction tests (Vitest + Testing Library). CI
  runs backend lint + migrate + test, and frontend test + build, on every
  push. See `journals/` week 3 entries for what was verified and how.
- Everything else in `code/` is still scaffolding for phases 3–6.

## Tech stack
Frontend: React + Tailwind (planned) · Backend: Node.js + Express ·
Database: PostgreSQL via Supabase · Hosting: Vercel (frontend) /
Render (backend)

## Running it locally
[`docs/SETUP.md`](SETUP.md) — install Postgres, run migrations, boot
the backend and frontend, run both test suites, and how CI is wired.

## Team & ownership
| Member | Owns |
|---|---|
| Anisa Arora | Frontend |
| Lovish Bansal | Backend |
| Neha Bansal | Database |
| Vaibhav Budhia | DevOps / Integration |

Weekly ticket-level logs: [`../journals/`](../journals/)
