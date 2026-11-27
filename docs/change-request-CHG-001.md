# CHG-001 — Group seat reservations (approved)

Problem: v1.0 accepts exactly one seat. Propose 1–5 seat bookings in React and Worker.
Impacted: client/App.tsx, src/validation.ts, src/services/reservations.ts, migrations/0002, unit/UI/API/regression/concurrency/security tests, CI, rollback.
Acceptance: atomic inventory decrement; restore exact purchased count; legacy rows default `seat_count=1`.
Decision: **Approved by the project owner on November 27, 2026** in the assignment conversation. Feature branch: `feature/v1.1-group-reservation`. Production migration requires separate approval.

## Impact analysis for instructor review

| Area | Proposed change | Verification |
| --- | --- | --- |
| React | Add a controlled quantity field defaulting to 1. Send the selected integer with the existing same-origin request. Render the confirmed quantity and refresh inventory after successful reservation or cancellation. | UI test for a 3-seat booking, validation, and a capacity conflict. Preserve title search and the cancellation flow. |
| Worker API | Accept numeric integers from 1 through 5 and return the stored quantity with HTTP 201. Preserve the existing error contract, including HTTP 400 for invalid input and HTTP 409 for insufficient inventory. | Unit and local API tests for boundaries, invalid types and fractions, and insufficient capacity. |
| D1 reservations | Add `seat_count` with `NOT NULL`, `DEFAULT 1`, and a range constraint in a new migration. Apply it locally after approval on the feature branch. | Create a local v1.0 reservation before migrating, then verify its stored quantity is 1 and cancellation restores one seat. |
| Inventory and cancellation | Guard inventory decrement with available capacity and pair it with the reservation insert in an atomic D1 batch. Restore the stored quantity only on the first successful cancellation. | Verify inventory deltas for a group booking, repeated cancellation, and competing bookings whose combined quantity exceeds capacity. |
| Release and rollback | Preserve the `v1.0.0` tag. Review rollback separately because v1.0 cancellation logic restores one seat and can miscount an active v1.1 group reservation. | Review rollback behavior for active group reservations before any production rollout. |

See the [approved v1.1 specification](../specs/002-group-reservation/spec.md).
