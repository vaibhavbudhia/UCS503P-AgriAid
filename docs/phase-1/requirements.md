# Requirements

*Owner: All team members (joint)*

## 1. Problem Statement

Indian farmers face operational, not agronomic, difficulties:

- **Inaccessible machinery & services** — expensive machinery (tractors,
  harvesters, rotavators) and local service providers are hard to access
  on demand during critical seasonal windows.
- **Inefficient resource sharing** — resource sharing and transport
  pooling to mandis is arranged informally, leading to high individual
  costs and idle equipment capacity.
- **Fragmented expense tracking** — farm income, labour costs, and
  operational expenses are rarely recorded in a structured digital
  format.
- **Opaque government benefits & claims** — eligibility rules and
  required documentation are complex, leading to missed financial aid.
- **Lack of centralized records** — profiles, listings, labour requests,
  financial records, and scheme applications exist in disconnected or
  paper formats.

## 2. Higher-Order Goal

Improve operational efficiency, financial transparency, and accessibility
of government welfare for Indian farmers by digitizing non-agronomic
operational workflows around the farming ecosystem. AgriAid is an
information organizer and matching facilitator — decision-making remains
entirely with the farmer.

## 3. Scope

### In Scope
- Community Resource Network (discovery, booking, transport pooling,
  breakdown/repair network)
- Farm Operations & Financial Management (labour matching, farm ledger)
- Government Benefits & Claims Assistance (scheme eligibility matching,
  insurance claim document organization)
- Role-based access: Farmer, Resource Provider, Administrator

### Out of Scope
- Full-scale e-commerce agricultural marketplace
- Direct replacement of government procurement systems or mandis
- Actual approval, adjudication, or payout of scheme applications/claims
- Complete banking, loan, or payment gateway infrastructure
- Advanced AI-based crop disease diagnosis or crop recommendation

## 4. Success Metrics

| Metric | Target |
|---|---|
| Search/matching query response time | < 2s for 95% of requests |
| Booking conflict prevention | 100% detection of overlapping windows |
| Ledger calculation accuracy | Correct seasonal net-outcome summation |
| First-time usability | Task completion without prior training |
| System availability | ≥ 95% uptime during evaluation window |
| Authorization security | Zero unauthorized access to admin/financial data |

## 5. Use Cases

### Farmer
- Register/authenticate and maintain a profile (land size, region, crop type)
- Search for nearby machinery/services by type, location, availability
- Submit individual or group booking requests
- Report equipment breakdowns and locate nearby mechanics
- Create/respond to short-term labour requests
- Record expenses and revenue in the farm ledger
- View eligible government schemes and application checklists
- Create and track insurance claim records with document uploads

### Resource Provider
- List resources with availability windows and usage charges
- Accept, reject, or reschedule booking requests
- Maintain service history and reputation
- (May also act as a Farmer — dual role support)

### Administrator
- Manage scheme eligibility rules
- Maintain reference data (crop types, regions, scheme catalogues)
- Monitor platform activity and manage invalid listings
