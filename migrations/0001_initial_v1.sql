-- FROZEN v1.0 schema. Never modify after application to production.
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  remaining_seats INTEGER NOT NULL CHECK (remaining_seats >= 0 AND remaining_seats <= capacity)
);
CREATE TABLE IF NOT EXISTS reservations (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL REFERENCES events(id),
  email TEXT NOT NULL,
  cancel_token_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_reservations_event ON reservations(event_id);
