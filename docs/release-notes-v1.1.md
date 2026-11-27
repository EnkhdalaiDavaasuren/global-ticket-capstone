# v1.1 Release Notes

- Status: Local implementation on `feature/v1.1-group-reservation`. Production release pending.
- Customers can reserve 1–5 seats in one booking. D1 updates inventory atomically and restores the stored quantity once on cancellation.
- Migration 0002 gives existing reservations a quantity of one while preserving their status and cancellation credentials.
- [Local verification](../evidence/tests/lab-2-v1.1-local.md) records 27 passing automated tests and the Chrome booking and cancellation walkthrough.
- The [rollback plan](rollback-plan.md) must account for active group bookings before production release.
