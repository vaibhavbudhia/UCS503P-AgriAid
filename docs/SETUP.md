# AgriAid — Setup & Implementation Guide (Phase 2 / Foundation)

This walks through running everything from this week's deliverable
locally, and explains how each piece was built so the team can extend
it in later phases. Assumes you're on a machine with Node 22+ and can
install PostgreSQL (or already have a Postgres you can point at).

## 1. Database

**Install Postgres** if you don't have it:
- macOS: `brew install postgresql@16 && brew services start postgresql@16`
- Ubuntu/Debian: `sudo apt-get install postgresql postgresql-contrib`
- Or use a hosted instance (Supabase, per `docs/PLAN.md`'s tech stack) —
  you just need a connection string.

**Create the database:**
```bash
createdb agriaid
# or, if that user needs a password locally:
psql -c "ALTER USER postgres PASSWORD 'postgres';"
```

**How migrations work** (`code/backend/migrations/`):
Each `NNN_description.sql` file is a plain SQL script — no ORM, no DSL.
`migrate.js` reads them in filename order, and for each one not already
recorded in a `schema_migrations` table, runs it inside a transaction
and records it. That's the whole mechanism — read `migrate.js` top to
bottom, it's ~50 lines. To add a new table later: create
`011_create_whatever.sql`, run `npm run migrate`, done. Never edit an
already-applied migration file — add a new one instead, the same way
you would with any migration tool.

## 2. Backend

```bash
cd code/backend
npm install
cp .env.example .env
# edit .env: set DATABASE_URL to match your Postgres, and change
# JWT_SECRET to something random for anything beyond local dev
npm run migrate
npm start          # boots on :4000 (see .env's PORT)
```

**How the auth flow works:**
- `POST /api/auth/register` — `auth.controller.js` hashes the password
  with `bcryptjs` (10 salt rounds), inserts a row via
  `user.model.js`'s `create()`, signs a JWT with the user's `id` and
  `role`, returns both. Duplicate phone numbers are checked before
  insert and return `409`.
- `POST /api/auth/login` — looks the user up by phone
  (`user.model.js`'s `findByPhone()`, the only place `password_hash`
  ever leaves the model), compares with `bcrypt.compare`, signs and
  returns a JWT the same way. Wrong phone and wrong password both
  return a generic `401` — deliberately vague so login can't be used
  to check which phone numbers are registered.
- `GET /api/auth/profile` — protected by `requireAuth`
  (`auth.middleware.js`), which reads the `Authorization: Bearer
  <token>` header, verifies it with `jsonwebtoken`, and attaches the
  decoded `{ id, role }` to `req.user`. The controller then re-fetches
  the full (safe) user row by that id — so the response always
  reflects the current DB state, not stale claims baked into the
  token.
- `db.js` exports a single `pg` `Pool`; every model calls
  `db.query(sql, params)` — no raw `pg` usage anywhere else, so
  swapping drivers later only touches one file.
- `catchAsync.js` wraps async route handlers so a thrown/rejected
  error reaches Express's error-handling middleware (in `server.js`)
  instead of crashing the process. Any new async controller should be
  wrapped the same way in its route file: `router.post('/x',
  catchAsync(handler))`.

**Run the tests** (needs a real DB — same `DATABASE_URL` as above,
migrations already applied):
```bash
npm run lint     # eslint:recommended, backend/.eslintrc.cjs
npm test         # node's built-in test runner, code/backend/test/
```
`test/auth.test.js` runs against the actual database — it registers a
real (uniquely-phone-numbered) user, exercises every status code the
auth flow can return, and cleans up after itself in an `after()` hook.
It is not mocked; if the DB is down, the tests fail loudly rather than
passing on stubbed data.

## 3. Frontend

```bash
cd code/frontend
npm install
cp .env.example .env   # only needed if your backend isn't on :4000
npm run dev             # boots on :5173, talks to the backend above
```
Open `http://localhost:5173` — it redirects to `/login`. Register a
user, and you'll land on `/dashboard`, which re-fetches your profile
from the backend using the stored token (not just echoing what you
typed) — that's the proof the whole loop is wired correctly.

**How it's structured:**
- `api/client.js` is the only place that calls `fetch`. It reads the
  JWT out of `localStorage`, attaches it as `Authorization: Bearer
  <token>` on every request, and throws on any non-2xx response with
  the server's `error` message — so pages just `try { await
  apiRequest(...) } catch (err) { setError(err.message) }`.
- `Login.jsx` / `Register.jsx` are controlled forms that call
  `apiRequest`, store the returned token with `setToken()`, and
  navigate to `/dashboard` on success.
- `Dashboard.jsx` redirects to `/login` if there's no token, otherwise
  fetches `/auth/profile` on mount.
- `App.jsx` just wires routes; `/` redirects to `/login`. Everything
  past `/dashboard` (bookings, ledger, schemes, etc.) is still the
  original stub — untouched this phase.

**Run the tests** (no backend or DB needed — `fetch` is mocked):
```bash
npm test
```
`Login.test.jsx` and `Register.test.jsx` render the real form with
Testing Library, type into every field, submit it, and assert both the
success path (token stored, correct request body/URL) and the failure
path (server error message rendered, no token stored). `Dashboard.test.jsx`
renders with a token pre-set and confirms the `Authorization` header is
sent and the returned name/phone actually appear on screen. This is
what replaced manually clicking through the app in a browser — it's
automated and will catch a regression the next time someone touches
these files.

## 4. CI

`.github/workflows/ci.yml` has two independent jobs so a change to one
side doesn't block or slow down the other:
- **`backend`** — spins up a real `postgres:16` service container,
  then `npm ci → npm run lint → npm run migrate → npm test`.
- **`frontend`** — `npm ci → npm test → npm run build`.

Both trigger only on changes under their own `code/*/` path (plus the
workflow file itself), so an unrelated commit doesn't burn CI minutes.

## 5. What's still a stub

Everything outside auth: resource listing/booking, the farm ledger,
scheme matching, insurance claims, breakdown reports, labour requests.
Their tables exist (Neha's migrations built the full schema up front
since every later phase depends on it), their routes/controllers exist
and still return `501`, and their frontend pages exist and render
nothing. Each later phase (see the table in `docs/PLAN.md`) fills in
one of these slices the same way this phase filled in auth: real model
functions, a real controller replacing the `501`, a route wrapped in
`catchAsync`, a real page calling `apiRequest`, and tests proving it —
not just code that looks plausible.
