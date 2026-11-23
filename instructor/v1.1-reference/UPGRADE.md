# Lab 2: v1.0 → v1.1 (NOT active at baseline)

1. Confirm a verified v1.0 local browser journey and a frozen baseline commit/tag.
2. Obtain human approval for `docs/change-request-CHG-001.md`.
3. Create `git switch -c feature/v1.1-group-reservation` before changing source or migration files.
4. Copy `0002_seat_count_v11.sql` from this directory into `migrations/`.
5. Set `MAX_SEATS = 5` in `client/App.tsx` and update `src/validation.ts` to accept integers 1–5.
6. Change reservation INSERT to store `seat_count`, and cancellation inventory restore to use the stored `seat_count` (rather than a literal 1). Preserve `db.batch()` and `changes()` conditions.
7. Add v1.1 UI, unit, integration, concurrency, and regression cases; verify legacy rows receive `seat_count=1`.
8. Run only LOCAL D1 migration and reservation/cancellation tests until the supervised release gate.
9. Human review + PR + CI, then approval-gated production migration/deployment and read-only smoke.

**This folder is instructional reference, not automatically executed code.** Do not deploy the v1.0 Worker on a database after v1.1 schema/content changes without a compatibility review.
