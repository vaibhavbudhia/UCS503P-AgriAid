# Week 3 — Ticket Resolution

| Ticket | Description | Status |
|---|---|---|
| AGR-19 | Wire `db.js` to a real `pg` connection pool off `DATABASE_URL` | Done |
| AGR-20 | Implement `auth.middleware.js` to actually verify JWTs and attach `req.user` | Done |
| AGR-21 | Add `.env.example` for backend and frontend | Done |
| AGR-22 | Add `catchAsync` wrapper + Express error handler so failed queries return JSON, not a crash | Done |
| AGR-23 | Write `.github/workflows/ci.yml`: spins up Postgres as a service, runs migrations, runs tests | Done |
| AGR-24 | Add root `.gitignore` (`node_modules/`, `.env`, build output) | Done |
| AGR-30 | Add ESLint to the backend and a `lint` step in CI | Done |
| AGR-31 | Add a separate frontend CI job (install, test, build) | Done |

## Notes
CI only triggers on changes under `code/backend/**` for now — no point
running the backend pipeline on frontend-only commits, and there's
nothing to test on the frontend side yet beyond `vite build` succeeding
locally, which I confirmed by hand rather than wiring into CI this week.

Verified `requireAuth` end to end: a request with no `Authorization`
header, a malformed one, and an expired/invalid token all come back
`401`; a valid token attaches `{ id, role }` to `req.user` and the
request proceeds. This is exercised by Lovish's test suite, not just a
manual check.

CI now has two jobs: `backend` (install → lint → migrate → test against
a real Postgres service container) and `frontend` (install → test →
build). Split them so a frontend-only change doesn't spin up Postgres
for nothing, and vice versa. Lint is `eslint:recommended` with one rule
relaxed (`no-unused-vars` on function args) — deliberately minimal for
now rather than importing a house style nobody's agreed on yet.
