# Specification — 001-v1-baseline

**Status:** DRAFT; human approval and real test evidence are not implied.

Purpose: Define the one-seat reservation baseline for instructor review.

## Required acceptance criteria
- Specification, API contract, and observed code/test response must agree.
- Customers can list events, search by title, and select an available event.
- A valid reservation books exactly one seat and returns a reservation ID and private cancellation code. Invalid input returns HTTP 400, an unknown event returns 404, and sold-out inventory returns 409.
- Cancelling with the valid code restores one seat. An incorrect or already-used code returns 404 and leaves inventory unchanged.
- D1 is authoritative for seat counts and cancellation.
- KV supplies public configuration and announcements. Event creation requires the admin credential.
- All deployment operations require independent review and recorded evidence.

See the [v1.0 endpoint table](../../README.md#api-endpoints-v10) for the proposed contract and the [browser report](../../docs/browser-test-report.md) for observed behavior.

## Approved by / date / links
- Pending
