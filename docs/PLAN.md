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
│   └── src/
│       ├── routes/      URL → controller mapping, one file per module
│       ├── controllers/ Request handling logic, one file per module
│       ├── models/       Data shape for each entity (DB access comes in Phase 2)
│       └── middleware/   Auth/JWT checks
└── frontend/
    ├── landing.html     Working showcase page (see below)
    └── src/
        ├── pages/        One file per screen
        ├── components/    Shared UI pieces
        └── api/            Wrapper for calling the backend
```
Right now these files are **stubs** — they define the shape (function
names, routes, props) but don't yet do real work. Each phase fills in one
slice of this structure with working logic.

## What's actually working right now
- `code/frontend/landing.html` — finished landing page, open directly in a browser
- **Auth end-to-end** — register, login, and a JWT-protected profile route,
  backed by a real PostgreSQL database (13 tables, 5 migrations)
- **Real frontend** — Vite + React, working Login/Register/Dashboard pages
  that call the live backend and render real data
- CI runs migrations + tests against a real Postgres service container

Still stubbed (`501`, not yet built): resource booking, breakdown reports,
labour matching, farm ledger, schemes, claims, admin. Those come in
Phases 3–5.

## Tech stack
Frontend: React + Tailwind (planned) · Backend: Node.js + Express ·
Database: PostgreSQL via Supabase · Hosting: Vercel (frontend) /
Render (backend)

## Team & ownership
| Member | Owns |
|---|---|
| Anisa Arora | Frontend |
| Lovish Bansal | Backend |
| Neha Bansal | Database |
| Vaibhav Budhia | DevOps / Integration |

Weekly ticket-level logs: [`../journals/`](../journals/)
