# Version Evolution

[CHG-001](../docs/change-request-CHG-001.md) authorizes local v1.1 implementation. The [specification](../specs/002-group-reservation/spec.md) defines the 1–5 seat range, compatibility, and inventory rules.

Migration 0002 gives legacy reservations a stored quantity of one. The Worker reserves only when D1 has enough inventory and restores the stored quantity on the first successful cancellation. Rolling back the Worker to v1.0 while active group reservations exist requires review because v1.0 restores only one seat.

[Local Lab 2 verification](../evidence/tests/lab-2-v1.1-local.md) records the migration, the browser booking and cancellation, and the concurrency result.
