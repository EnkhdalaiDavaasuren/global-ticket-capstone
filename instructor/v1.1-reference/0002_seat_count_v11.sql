-- INACTIVE REFERENCE. Only copy to migrations/ after CHG-001 approval and feature branch.
ALTER TABLE reservations
ADD COLUMN seat_count INTEGER NOT NULL DEFAULT 1
CHECK (seat_count BETWEEN 1 AND 5);
