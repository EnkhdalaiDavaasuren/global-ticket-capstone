# Rollback + data preservation plan (complete before release)

1. Confirm migration ordering. Keep migration 0002 in place during code rollback unless a reviewed data recovery plan calls for restoring D1. The v1.0 Worker restores one seat per cancellation, so rolling back to it while active group bookings exist can undercount restored inventory. Review active group bookings and use a compatible Worker or an approved recovery plan.
2. Record D1 Time Travel bookmark before remote changes; preserve any newer orders before restoring.
3. Keep release commit/version and asset rollback method documented.
4. Obtain explicit human approval before any remote rollback/restore or destructive step.
5. Retest production read-only assets/API after corrective deploy. Never imply a D1 restore is risk-free.
