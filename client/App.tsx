// client/App.tsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  ApiError, cancelReservation, createReservation,
  getAnnouncement, getEvents,
} from './api';
import type { EventView, ReservationReceipt } from './api';
import { filterEvents } from './search';

const MAX_SEATS = 1; // Frozen v1.0; change to 5 only after approved CHG-001.

type Status = { message: string; error: boolean };

type Action = 'load' | 'reserve' | 'cancel';

function friendlyError(error: unknown, action: Action): string {
  if (error instanceof ApiError) {
    if (error.status === 409) return 'Not enough seats are available.';
    if (error.status === 400) return 'Invalid reservation input.';
    if (error.status === 404) {
      return action === 'reserve'
        ? 'That event no longer exists; refresh the list.'
        : 'Reservation not found or code invalid.';
    }
    if (error.status >= 500) return 'Server error; try again later.';
    return `Request failed (HTTP ${error.status}).`;
  }
  return error instanceof Error ? error.message : 'Network or unexpected error.';
}

export function App() {
  // React state holds UI values, never authoritative D1 inventory.
  const [events, setEvents] = useState<EventView[]>([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [seatCount, setSeatCount] = useState('1');
  const [cancelId, setCancelId] = useState('');
  const [cancelToken, setCancelToken] = useState('');
  const [receipt, setReceipt] = useState<ReservationReceipt | null>(null);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({
    message: 'Loading events...', error: false,
  });

  const visibleEvents = useMemo(
    () => filterEvents(events, search), [events, search]
  );
  const selectedEvent = events.find(event => event.id === selectedId);

  const refreshEvents = useCallback(async () => {
    setLoading(true);
    try {
      const latest = await getEvents(); // real Worker API → D1
      setEvents(latest);
    } finally {
      setLoading(false);
    }
  }, []);

  // The real API is called on page load, not replaced with demo fixtures.
  useEffect(() => {
    void refreshEvents()
      .then(() => setStatus({ message: 'Ready to search.', error: false }))
      .catch(error => setStatus({ message: friendlyError(error, 'load'), error: true }));
    void getAnnouncement()
      .then(setAnnouncement)
      .catch(() => setAnnouncement(null)); // optional KV text
  }, [refreshEvents]);

  async function handleReserve(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    if (!selectedId) {
      setStatus({ message: 'Choose an event first.', error: true });
      return;
    }
    const quantity = Number(seatCount);
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (seatCount.trim() === '' || !Number.isInteger(quantity) ||
        quantity < 1 || quantity > MAX_SEATS || !validEmail) {
      setStatus({
        message: `Enter a valid email and 1–${MAX_SEATS} whole-number seats.`,
        error: true,
      });
      return;
    }

    setBusy(true);
    setStatus({ message: 'Sending reservation...', error: false });
    try {
      const result = await createReservation({
        eventId: selectedId, email: email.trim(), seatCount: quantity,
      });
      // Only the server's successful 201 receipt establishes success.
      setReceipt(result);
      setCancelId(result.reservationId);
      setCancelToken(result.cancelToken); // temporary React state only
      setStatus({ message: 'Reservation confirmed.', error: false });
      try {
        await refreshEvents();
      } catch {
        setStatus({
          message: 'Reservation succeeded, but availability refresh failed.',
          error: true,
        });
      }
    } catch (error) {
      setStatus({ message: friendlyError(error, 'reserve'), error: true });
    } finally {
      setBusy(false);
    }
  }

  async function handleCancel(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const id = cancelId.trim();
    const code = cancelToken.trim();
    if (!id || !code) {
      setStatus({ message: 'Enter ID and private code.', error: true });
      return;
    }
    setBusy(true);
    setStatus({ message: 'Cancelling reservation...', error: false });
    try {
      await cancelReservation(id, code);
      setCancelToken(''); // remove secret after successful use
      setReceipt(null);  // remove the previously revealed secret
      setStatus({
        message: 'Reservation cancelled; refreshing availability...',
        error: false,
      });
      try {
        await refreshEvents();
      } catch {
        setStatus({
          message: 'Cancellation succeeded, but refresh failed.',
          error: true,
        });
      }
    } catch (error) {
      setStatus({ message: friendlyError(error, 'cancel'), error: true });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container">
      <header>
        <h1>Global Event Tickets</h1>
        <p>Find an event, reserve seats, and cancel securely.</p>
        <p aria-label="Announcement">
          {announcement ?? 'Welcome to Global Event Tickets.'}
        </p>
      </header>

      <section aria-labelledby="find-title">
        <h2 id="find-title">Find an event</h2>
        <label htmlFor="event-search">Search events by title</label>
        <input
          id="event-search" type="search" autoComplete="off"
          placeholder="e.g. concert" value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div aria-label="Matching events">
          {loading ? <p>Loading events...</p> :
            visibleEvents.length === 0 ? <p>No matching events.</p> :
            visibleEvents.map(event => (
              <button
                key={event.id} type="button" className="event-button"
                aria-pressed={selectedId === event.id}
                disabled={event.remainingSeats <= 0 || busy}
                onClick={() => setSelectedId(event.id)}
              >
                {event.title} | {event.startsAt} | {event.remainingSeats} seats left
              </button>
            ))}
        </div>
        <p aria-live="polite">
          {selectedEvent ? `Selected: ${selectedEvent.title}` : 'No event selected.'}
        </p>
      </section>

      <section aria-labelledby="reserve-title">
        <h2 id="reserve-title">Reserve seats</h2>
        <form onSubmit={handleReserve}>
          <label htmlFor="email">Email</label>
          <input
            id="email" type="email" autoComplete="email" required
            value={email} onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="seat-count">Number of seats (1–{MAX_SEATS})</label>
          <input
            id="seat-count" type="number" min={1} max={MAX_SEATS}
            step={1} required value={seatCount}
            onChange={e => setSeatCount(e.target.value)}
          />
          <button type="submit" disabled={busy || !selectedEvent}>
            {busy ? 'Working...' : 'Reserve'}
          </button>
        </form>
        {receipt && (
          <p className="private-code" aria-label="Reservation confirmation">
            Reserved {receipt.seatCount} seat(s). ID: {receipt.reservationId}.
            {' '}Your private cancellation code: {receipt.cancelToken}.
            {' '}Keep it safe and redact screenshots.
          </p>
        )}
      </section>

      <section aria-labelledby="cancel-title">
        <h2 id="cancel-title">Cancel a reservation</h2>
        <form onSubmit={handleCancel}>
          <label htmlFor="cancel-id">Reservation ID</label>
          <input
            id="cancel-id" required value={cancelId}
            onChange={e => setCancelId(e.target.value)}
          />
          <label htmlFor="cancel-token">Private cancellation code</label>
          <input
            id="cancel-token" type="password" required autoComplete="off"
            value={cancelToken} onChange={e => setCancelToken(e.target.value)}
          />
          <button type="submit" disabled={busy}>
            {busy ? 'Working...' : 'Cancel reservation'}
          </button>
        </form>
      </section>

      <p className="status" role="status" aria-live="polite"
         data-kind={status.error ? 'error' : 'info'}>
        {status.message}
      </p>
    </main>
  );
}
