# Implementation Plan — 002-group-reservation

- Preserve the `v1.0.0` tag and the first migration. Implement approved CHG-001 on `feature/v1.1-group-reservation`.
- Extend the existing controlled React quantity field and Worker validation to 1–5. Keep the current request, response, and cancellation routes.
- Apply migration 0002 locally and verify a v1.0 row receives a quantity of one. Use prepared SQL and atomic D1 batches for quantity-aware inventory updates.
- Run the unit, UI, and local HTTP suites and exercise the browser against local D1 and KV. Record observed results for review.
- Review rollback for active group bookings. Production migration and deployment require separate approval.
