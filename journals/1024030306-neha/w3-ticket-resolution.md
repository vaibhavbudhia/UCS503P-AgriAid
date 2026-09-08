# Week 3 — Ticket Resolution

| Ticket | Description | Status |
|---|---|---|
| AGR-10 | Design full schema for all 10 core entities (users, resources, bookings, ledger_entries, schemes, scheme_applications, insurance_claims, claim_documents, breakdown_reports, labour_requests) | Done |
| AGR-11 | Write numbered SQL migration files, one per table, with FKs/checks/indexes | Done |
| AGR-12 | Write a small migration runner (`migrations/migrate.js`) that tracks applied migrations in `schema_migrations` | Done |
| AGR-13 | Run migrations against a real local Postgres 16 instance and confirm all tables exist | Done |

## Notes
Went with plain numbered `.sql` files plus a ~50-line runner instead of
pulling in a migration framework — the schema is still small and this
keeps every migration readable end to end. Foreign keys point forward
only (e.g. `bookings.resource_id -> resources.id`) so files have to run
in order, which is why they're numbered instead of timestamped.

Kept `scheme_applications` and `claim_documents` as their own tables now,
even though nothing writes to them yet, since Neha's schema is the one
place all four teammates' work depends on — cheaper to get it right once
than to migrate again mid-phase.
