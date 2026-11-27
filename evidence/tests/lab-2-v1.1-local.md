# Lab 2 local verification

November 27, 2026 (Asia/Chita) · `global-ticket-capstone` · `feature/v1.1-group-reservation` · [CHG-001](../../docs/change-request-CHG-001.md)

Environment was Windows, Node 22.23.5, Wrangler 4.166.0, and an isolated local D1 and KV instance.

| Command or check | Observed result |
| --- | --- |
| `npm run typecheck` and `npm run build` | Worker, client, and test TypeScript checks passed. esbuild generated the React bundle. |
| `npm run test:unit -- --configLoader runner` | 15 passed. |
| `npm run test:ui -- --configLoader runner` | 5 passed. |
| `npm run db:local -- --persist-to <isolated-dir>` | Migrations 0001 and 0002 both completed. Before applying them, the v1.0 schema was loaded with `wrangler d1 execute --local` and a synthetic active reservation was inserted. After migration 0002, D1 reported `seat_count = 1` and `status = active` for that row. |
| `npm run kv:seed:local` and `wrangler dev --port 8787` with the isolated storage path | KV seed succeeded. Worker health reported v1.1.0. Local GET requests to the page, CSS, bundle, health, events, and config each returned HTTP 200. |
| Legacy cancellation through the local Worker | HTTP 200. The event went from one available seat to two. |
| `npm run test:integration -- --configLoader runner` | 3 passed. A three-seat reservation changed inventory from 5 to 2. Cancellation restored it to 5. A repeat returned HTTP 404 and inventory stayed at 5. |
| `npm run test:regression -- --configLoader runner` | 1 passed. Single-seat receipts and event response fields remain compatible. |
| `npm run test:concurrency -- --configLoader runner` | 1 passed. Two concurrent requests for three seats against five available returned HTTP 201 and 409, leaving two seats. |
| `npm run test:security -- --configLoader runner` | 2 passed. |
| Headless Chrome against the local Worker | Searched by title, selected the event, booked three seats (HTTP 201), and cancelled through React (HTTP 200). D1 inventory went 5 → 2 → 5. |

The Vitest runner config loader worked around Windows filesystem access errors. Tests used local services. Production deployment and smoke evidence are pending.
