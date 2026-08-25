# Feasibility & Risk Register (Draft)

*Owner: Vaibhav Budhia*

## Feasibility Summary
- **Technical:** Free-tier stack (React, Node/Express, PostgreSQL/Supabase,
  Vercel/Render) covers all required functionality.
- **Legal:** No government scraping; public scheme information only; no
  legal adjudication performed by the system.
- **Resource:** Everything required is freely available (open-source +
  free-tier hosting).
- **Team:** Suitable for a 4-member undergraduate team across a 12-week,
  6-phase academic schedule.

## Risk Register

| ID | Risk | Category | L | I | Mitigation |
|---|---|---|---|---|---|
| R1 | Scheme eligibility rules become outdated | Data | 4 | 4 | Admin-editable DB tables, not hardcoded logic |
| R2 | Resource availability drifts from real-world status | Operational | 3 | 3 | Provider confirmation prompts; auto-expire stale listings |
| R3 | Inaccurate location calculation degrades match quality | Technical | 3 | 4 | Validate coordinates on entry; geodistance library; manual pin fallback |
| R4 | Group bookings create scheduling conflicts | Technical | 3 | 3 | Server-side atomic booking transactions; clear conflict UI |
| R5 | Labour-matching logic becomes overly complex | Technical | 2 | 3 | Simple rule-based matching first; defer complex heuristics |
| R6 | Sensitive claim documents exposed via weak access control | Security | 2 | 5 | Strict RBAC + JWT on endpoints; signed expiring URLs |
| R7 | Low digital literacy reduces adoption | UX | 3 | 4 | Minimal-text, icon-driven UI; early user testing |
| R8 | Synthetic demo data weakens demonstration value | Operational | 2 | 2 | Curate realistic seed datasets early |
| R9 | Team schedule slips due to academic overlap | Schedule | 3 | 3 | Weekly milestone check-ins; buffer week before deadline |
| R10 | Scope creep beyond core 6 components | Schedule | 3 | 3 | Enforce scope boundary; defer new ideas to future work |

*(L = Likelihood 1–5, I = Impact 1–5)*
