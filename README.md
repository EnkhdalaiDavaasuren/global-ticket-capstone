# Global Event Ticket Reservation System — v1.1

**React + TypeScript (TSX) + CSS · Cloudflare Workers + D1 + KV · GitHub Actions CI/CD · Spec Kit + OpenClaw main-agent project rules + Wiki**

This branch implements [CHG-001](docs/change-request-CHG-001.md) for the SE Capstone. Customers can book 1–5 seats at once. The `v1.0.0` tag preserves the original single-seat baseline.

Local Lab 0 and Session 1 results are recorded in the [verification log](docs/verification-status.md) and [browser acceptance report](docs/browser-test-report.md).

## Quick start (Lab 0)

Requirements: Node 22, npm, Git, Wrangler/Cloudflare account; OpenClaw, Spec Kit and Obsidian are separate classroom tools.

```bash
unzip global-ticket-capstone-starter-v1.zip
cd global-ticket-capstone
npm ci
cp .dev.vars.example .dev.vars
# Edit .dev.vars; set ADMIN_TOKEN to a random secret, e.g. dev-$(openssl rand -hex 16)
# Create Cloudflare resources if you need remote deployment:
# npx wrangler login
# npx wrangler d1 create ticket-db
# npx wrangler kv namespace create APP_KV
# Set the REAL IDs in wrangler.jsonc for remote use; 32 zero placeholders are local-only.
npm run generate-types
npm run typecheck
npm run build
npm run test:unit
npm run test:ui
npm run db:local
npm run seed:local
npm run dev
```

Open **http://127.0.0.1:8787/** and test search → select → reserve **one** seat → copy private cancellation code → cancel → refresh. This calls the **real local Worker and D1**, not test fixtures. `npm run dev` serves the React bundle from `public/assets/app.js`; source is in `client/*.tsx`.

**Separate terminal for API tests** (with local Worker still running):

```bash
# Export exactly the ADMIN_TOKEN used in .dev.vars to THIS shell (do not paste it into Git).
export ADMIN_TOKEN='your-actual-local-value'
export BASE_URL=http://127.0.0.1:8787
npm run test:integration
npm run test:regression
npm run test:concurrency
npm run test:security
```

Never run write-test projects against production. `tests/helpers/http.ts` blocks non-local creation of test events; production smoke has **GET requests only** and requires an explicitly provided HTTPS `BASE_URL`.

## API endpoints (v1.1)

| Method | Path | Expected status / shape |
|---|---|---|
| GET | `/api/health` | 200 `{status:'ok', version:'1.1.0'}` |
| GET | `/api/events` | 200 `{events:[{id,title,startsAt,remainingSeats}]}` |
| GET | `/api/events/:id` | 200 event, 404 unknown |
| GET | `/api/config` | 200 public config and announcement (KV) |
| POST | `/api/reservations` | 201 `{reservationId,cancelToken,seatCount}`, 400 invalid, 404 unknown, 409 insufficient inventory. Request `seatCount` must be an integer from 1 to 5. |
| POST | `/api/reservations/:id/cancel` | 200 cancellation, 404 unknown/bad/reused code |
| POST | `/api/admin/events` | 201 with correct Bearer ADMIN_TOKEN; otherwise 401 |

**No admin credential in browser files.** Cancellation tokens are randomly created once; only SHA-256 hashes are stored. `db.batch()` conditionally decrements inventory by the requested quantity and inserts the reservation atomically. The first successful cancellation restores the stored quantity. D1 remains authoritative. The UI never persists private cancellation codes in browser storage.

## Repository purpose

- `client/`, `public/`: React UI and compiled static assets; **do not hand-edit `public/assets/app.js`**.
- `src/`: Worker HTTP API, authorization, validation, D1 business logic, KV configuration and safe logging.
- `migrations/`: frozen v1.0 schema and the v1.1 seat-count migration. Legacy reservations default to one seat. `seeds/` loads local D1/KV data.
- `instructor/v1.1-reference/`: **inactive** migration and upgrade steps; intentionally outside `migrations/`.
- `tests/`: Vitest projects: unit, UI (jsdom), local HTTP integration/regression/concurrency/security, read-only remote smoke.
- `docs/labs/`: short six-session teaching checkpoints.
- `specs/` + `.specify/`: requirements and engineering principles; `docs/`: human-reviewed templates; `wiki/`: derived knowledge with provenance; `evidence/`: fill with redacted actual output only.
- `.github/workflows/ci-deploy.yml`: local CI on PR/push; protected, dispatch-only production CD.
- `AGENTS.md`, `skills/`: instructions for the existing OpenClaw **main** agent, not a new agent.

## Release safety

Do not copy `instructor/v1.1-reference/0002_seat_count_v11.sql` into active migrations until the approved Lab 2 feature branch. Never use `npm run db:remote`, `npm run db:seed:remote`, `npm run kv:seed:remote`, or `npm run deploy` without human permission. For production, set real Cloudflare IDs and secrets outside Git, record a D1 Time Travel bookmark, configure a **protected `production` GitHub environment**, and use only read-only smoke checks. Do not post screenshots showing private cancellation codes.

## Windows local storage

If local D1 or KV returns an internal error from a deeply nested checkout, use the same short storage path for migration, seed, and development. Run these commands in PowerShell with Node 22 active.

```powershell
$ticketState = Join-Path $env:TEMP 'ticket-lab-20261123'
npm.cmd run db:local -- --persist-to "$ticketState"
npm.cmd run db:seed:local -- --persist-to "$ticketState"
npm.cmd run kv:seed:local -- --persist-to "$ticketState"
npm.cmd run dev -- --persist-to "$ticketState"
```
