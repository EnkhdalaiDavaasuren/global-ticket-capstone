# Architecture — v1.0

The Worker serves `public/index.html`, CSS, and the generated `public/assets/app.js`. The React entry point in `client/main.tsx` mounts `App.tsx`, which calls the typed API client in `client/api.ts`. The client sends same-origin requests to `/api/*`; the Worker routes and validates those requests in `src/index.ts`.

D1 holds event capacity and reservations. Conditional mutations in an atomic D1 batch protect the one-seat inventory during concurrent requests and repeated cancellations. KV supplies public configuration and announcements. The UI reloads event inventory after a mutation. Cancellation codes are temporary in React state, and D1 stores only their hashes.

[Browser acceptance](browser-test-report.md) exercised the full request path. [Local verification](verification-status.md) records the automated coverage. Production delivery requires its own reviewed evidence.
