# Specification — 002-group-reservation

**Status:** Approved for local implementation.

Purpose: v1.1 supports booking 1–5 seats through the existing reservation flow.

## Required acceptance criteria
- React defaults to one seat and submits the selected quantity. The Worker accepts numeric integers 1–5 and returns the booked quantity in its HTTP 201 receipt. Invalid quantities return HTTP 400.
- Insufficient inventory returns HTTP 409 without creating a reservation or changing inventory. Concurrent requests cannot oversell.
- Cancellation restores the stored quantity exactly once. Existing rows represent one seat after migration.
- Specification, API contract, and observed code/test response must agree.
- D1 is authoritative for seat counts and cancellation.
- All deployment operations require independent review and recorded evidence.

## Approved by / date / links
- Project owner, November 27, 2026, in the assignment conversation. See [CHG-001](../../docs/change-request-CHG-001.md).
