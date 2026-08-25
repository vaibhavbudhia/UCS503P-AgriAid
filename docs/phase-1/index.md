# Phase 1 — Requirements & Design (Week 1–2)

## Goal
Define **what** AgriAid needs to do (Week 1) and translate that into concrete
design artifacts — schema, wireframes, API contracts, repo scaffolding
(Week 2) — so that Phase 2 (Foundation: Auth + DB + CI/CD) can begin
immediately in Week 3 with zero requirements spillover.

## Deliverables

| Artifact | Owner | File |
|---|---|---|
| Problem statement, scope, success metrics | All (joint) | [`requirements.md`](requirements.md) |
| Use cases (Farmer / Provider / Admin) | All (joint) | [`requirements.md`](requirements.md) |
| ER diagram / entity list | Neha Bansal | [`database-schema.md`](database-schema.md) |
| API surface (high-level endpoint list) | Lovish Bansal | [`api-surface.md`](api-surface.md) |
| User flow outline (per role) | Anisa Arora | [`user-flows.md`](user-flows.md) |
| Feasibility & risk register | Vaibhav Budhia | [`risk-register.md`](risk-register.md) |

## Weekly Breakdown

**Week 1 — Requirements**
- Finalize problem statement, higher-order goal, scope (in/out), success metrics
- Write use cases and functional requirements for all three modules
- Draft entity list, API surface, user-flow outline, risk register (first pass)

**Week 2 — Design**
- Finalize PostgreSQL schema + relationships (3NF)
- Wireframes/mockups for core screens
- Detailed API contracts (routes, request/response shapes)
- Repo setup, environment config, CI/CD skeleton
- Consolidate into the SRS deliverable

## Checkpoint
End-of-Phase-1 team sync to confirm the entity list, API surface, and use
cases are mutually consistent, then lock the requirements baseline before
Phase 2 begins.

See weekly logs: [`journals/week-01.md`](../../journals/week-01.md),
[`journals/week-02.md`](../../journals/week-02.md).
