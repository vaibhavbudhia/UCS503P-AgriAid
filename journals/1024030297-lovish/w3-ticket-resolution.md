# Week 3 — Ticket Resolution

| Ticket | Description | Status |
|---|---|---|
| AGR-14 | Replace `501` stub with real `POST /api/auth/register` (bcrypt hash, insert into `users`, return JWT) | Done |
| AGR-15 | Replace `501` stub with real `POST /api/auth/login` (verify password, return JWT) | Done |
| AGR-16 | Add protected `GET /api/auth/profile` to prove the token round-trips | Done |
| AGR-17 | Write `user.model.js` with `create` / `findByPhone` / `findById`, never returning `password_hash` | Done |
| AGR-18 | Write integration tests for the whole auth flow against a real DB | Done |

## Notes
Used `bcryptjs` instead of `bcrypt` to avoid the native build step —
one less thing to break in CI. Duplicate phone numbers return `409`,
bad credentials return a generic `401` on both "no such user" and
"wrong password" so login can't be used to enumerate registered
phone numbers.

Tested the full cycle for real, not just by reading the code:
register → real row created, returns a token · duplicate phone → 409 ·
login with correct password → token · login with wrong password → 401 ·
`/api/auth/profile` without a token → 401 · with a valid token → 200
with the real row pulled from Postgres. All six cases are now
`node --test` assertions in `test/auth.test.js`, not just manual curls.
