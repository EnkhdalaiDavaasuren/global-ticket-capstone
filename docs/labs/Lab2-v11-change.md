# Lab 2 — Nov 25: CHG-001 v1.1 evolution

With instructor supervision, release verified v1.0 baseline only after approval and documentation. Obtain human approval for CHG-001, then create `feature/v1.1-group-reservation` before editing source. Follow `instructor/v1.1-reference/UPGRADE.md`: add `seat_count` default1 migration on branch, change React limit to5 and server validation to1..5, atomic batch decrement/insert and cancel restore exactly stored seat_count. Run local backward compatibility and UI/unit/API tests. No automatic production writes.
