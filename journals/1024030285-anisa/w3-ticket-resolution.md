# Week 3 — Ticket Resolution

| Ticket | Description | Status |
|---|---|---|
| AGR-25 | Convert `code/frontend` from static stubs to a real Vite + React setup | Done |
| AGR-26 | Build working `Login.jsx` and `Register.jsx` that call the live backend | Done |
| AGR-27 | Build `Dashboard.jsx` that fetches the real profile using the stored token | Done |
| AGR-28 | Wire routing in `App.jsx`, redirect `/` to `/login` | Done |
| AGR-29 | Implement real `api/client.js` (attaches JWT, throws on non-2xx) | Done |
| AGR-32 | Add Vitest + Testing Library, write render/interaction tests for Login, Register, Dashboard | Done |

## Notes
Kept styling to one small `index.css` — no component library yet, just
enough to make the forms usable while the pages are this simple.

Confirmed `npm run dev` boots and `npm run build` compiles cleanly. But
a manual click-through isn't repeatable, so the real verification is
the test suite: `Login.test.jsx` and `Register.test.jsx` render the
actual form, type into it, submit it, and assert the mocked backend
call was shaped correctly and the JWT ends up in storage on success
(and that the server's error message shows up on failure).
`Dashboard.test.jsx` renders with a token already set, confirms it
calls `GET /auth/profile` with the `Authorization` header, and that the
returned name/phone render on screen. All 7 pass with `npm test`
(Vitest + jsdom + Testing Library) — no browser needed, and it catches
a regression the next time someone touches these pages.

Token lives in `localStorage`; logging out clears it and kicks back to
`/login`.
