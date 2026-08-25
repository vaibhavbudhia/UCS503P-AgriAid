# API Surface (High-Level Draft)

*Owner: Lovish Bansal*

Detailed request/response contracts are a **Week 2** deliverable. This is
the Week 1 endpoint inventory used to validate scope against the entity
list and use cases.

## Auth & Profile
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/profile`
- `PUT /api/profile`

## Community Resource Network
- `POST /api/resources`
- `GET /api/resources?type=&location=&availability=`
- `POST /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id` (accept / reject / reschedule)
- `POST /api/breakdowns`
- `GET /api/breakdowns/nearby`

## Farm Operations & Financial Management
- `POST /api/labour-requests`
- `GET /api/labour-requests/nearby`
- `PATCH /api/labour-requests/:id`
- `POST /api/ledger`
- `GET /api/ledger?crop_cycle=&season=`

## Government Benefits & Claims Assistance
- `GET /api/schemes/eligible`
- `POST /api/scheme-applications`
- `GET /api/scheme-applications/:id`
- `POST /api/claims`
- `POST /api/claims/:id/documents`
- `GET /api/claims/:id`

## Administration
- `GET/POST/PUT /api/admin/schemes`
- `GET /api/admin/listings`
- `DELETE /api/admin/listings/:id`
