# Browser acceptance report — v1.0

- Date: November 23, 2026 (Asia/Chita)
- Project and branch: `global-ticket-capstone`, `main`
- Source at test time: initial working tree with no commit
- Environment: headless Chrome 157.0.8103.80, local Wrangler 4.166.0 on Node 22.23.5, seeded local D1 and KV
- Local URL: http://127.0.0.1:8787/
- Specification: [001-v1-baseline](../specs/001-v1-baseline/spec.md), awaiting human approval

## Observed API contract

| Request | Observed response |
| --- | --- |
| `GET /api/events` | 200, an `events` array with `id`, `title`, `startsAt`, and `remainingSeats` |
| `GET /api/config` | 200, including the seeded KV announcement |
| `POST /api/reservations` | 201, with `reservationId`, `seatCount: 1`, and `cancelToken` |
| `POST /api/reservations/:id/cancel` | 200 with `status: "cancelled"` for the valid code, 404 for an incorrect or spent code |

## Browser and inventory results

| Check | Observed result |
| --- | --- |
| Load application | HTML, CSS, JS, events, and config each returned 200 |
| Search and select | Mixed-case search with surrounding spaces showed only the concert. Selecting it showed its title |
| Reserve one seat | The browser displayed confirmation and populated both receipt fields after HTTP 201 |
| Cancel | HTTP 200, confirmation removed, and the rendered inventory returned to 100 |
| Unknown search | The app displayed “No matching events.” |
| Reserve without selection | Reserve button was disabled |
| Empty or malformed email | Chrome marked the empty field invalid and the malformed value a type mismatch. Submitting the malformed value sent no reservation request |
| Incorrect code | HTTP 404, inventory stayed at 99 |
| Reuse the valid code | HTTP 404, inventory stayed at 100 |

For `evt-demo-001`, a read-only SQLite query against the local D1 backing database returned **100 before booking → 99 after booking → 100 after cancellation**. Chrome DevTools Protocol supplied the response statuses during the run.

[Redacted browser screenshot](../evidence/baseline/browser-v1-local.png) shows the restored inventory after the repeated cancellation check. The form fields were cleared before capture. Keyboard-only and simulated offline checks remain open. Chrome also requested an optional favicon and received 404.

Reviewer and approval date are pending.
