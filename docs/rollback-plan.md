# Rollback + data preservation plan (complete before release)

1. Confirm migration ordering and compatibility of previous code with the post-migration schema.
2. Record D1 Time Travel bookmark before remote changes; preserve any newer orders before restoring.
3. Keep release commit/version and asset rollback method documented.
4. Obtain explicit human approval before any remote rollback/restore or destructive step.
5. Retest production read-only assets/API after corrective deploy. Never imply a D1 restore is risk-free.
