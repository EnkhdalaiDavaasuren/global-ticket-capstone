# CHG-001 — Group seat reservations (DRAFT — not approved)

Problem: v1.0 accepts exactly one seat. Propose 1–5 seat bookings in React and Worker.
Impacted: client/App.tsx, src/validation.ts, src/services/reservations.ts, migrations/0002, unit/UI/API/regression/concurrency/security tests, CI, rollback.
Acceptance: atomic inventory decrement; restore exact purchased count; legacy rows default `seat_count=1`.
Decision: **PENDING HUMAN APPROVAL**. Feature branch: not yet created. Production migration: NOT authorized.
