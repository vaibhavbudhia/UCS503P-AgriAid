# AgriAid — Digital Community Resource & Farm Management System

**Course project for UCS503P**, Thapar Institute of Engineering and
Technology.

AgriAid helps farmers with the non-agronomic side of farming: finding
and booking shared machinery, tracking farm income/expenses, and
getting help navigating government schemes and insurance claims.

## Team

| Name | Roll No. |
|---|---|
| Anisa Arora | 1024030285 |
| Lovish Bansal | 1024030297 |
| Neha Bansal | 1024030306 |
| Vaibhav Budhia | 1024030307 |

## Start here
[`docs/PLAN.md`](docs/PLAN.md) — the one planning document. Covers the
problem, our process (6 phases over 12 weeks), how the codebase is
organized, and who owns what.

## What's working right now
- **`code/frontend/landing.html`** — a finished landing page. Open it
  directly in a browser, no setup needed.
- **`code/backend`** — an Express server that boots and responds, but
  every route is a stub returning `501 Not Implemented` — the shape is
  there, the logic isn't yet.
- **`code/frontend/src`** — page/component files exist for every screen
  (login, dashboard, booking, ledger, schemes, claims...) but render
  nothing yet. They mark where each phase's work will go.

## Weekly progress
Per-person logs in [`journals/`](journals/), one folder per member.

## Repository Structure
```
project-proposal/    Formal proposal (LaTeX + PDF)
docs/
  PLAN.md              The single planning doc
journals/              Per-person weekly logs
code/
  backend/              Express API (routes/controllers/models scaffolded, stubbed)
  frontend/
    landing.html          Finished, working landing page
    src/                    React page/component scaffolding (stubbed)
```

