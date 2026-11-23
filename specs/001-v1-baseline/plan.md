# Implementation Plan — 001-v1-baseline

1. Review the [constitution](../../.specify/memory/constitution.md) and [baseline spec](spec.md) with the reviewer. Use the observed contract in the [browser report](../../docs/browser-test-report.md) during that review.
2. Build the existing React client and typecheck the Worker, client, and tests independently. Apply migration 0001 and seed D1 and KV locally. Check health, events, configuration, and static assets.
3. Verify case-insensitive title search, selection, one-seat booking, receipt, and cancellation in Chrome. Query D1 before and after both mutations and verify rejected cancellation attempts preserve inventory.
4. Run the unit, UI, integration, regression, concurrency, and security suites. Record outcomes and redacted evidence in the [verification log](../../docs/verification-status.md).
5. After human review, create the Git baseline and tag. Release and rollback follow the separate production process.
