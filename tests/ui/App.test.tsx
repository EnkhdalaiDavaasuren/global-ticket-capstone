import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../../client/App';
import { ApiError, cancelReservation, createReservation, getAnnouncement, getEvents } from '../../client/api';
import type { EventView } from '../../client/api';
import { filterEvents } from '../../client/search';

vi.mock('../../client/api', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../client/api')>()),
  getEvents: vi.fn(), getAnnouncement: vi.fn(), createReservation: vi.fn(), cancelReservation: vi.fn(),
}));
const fixtures: EventView[] = [
  { id: 'evt-1', title: 'Concert', startsAt: '2027-03-01', remainingSeats: 10 },
  { id: 'evt-2', title: 'Workshop', startsAt: '2027-03-02', remainingSeats: 5 },
];
beforeEach(() => {
  vi.mocked(getEvents).mockResolvedValue(fixtures);
  vi.mocked(getAnnouncement).mockResolvedValue(null);
});
afterEach(() => { cleanup(); vi.resetAllMocks(); });

describe('v1.0 React browser', () => {
  it('does case-insensitive search and selects event', async () => {
    expect(filterEvents(fixtures, ' CON ')[0].id).toBe('evt-1');
    const u = userEvent.setup(); render(<App />);
    await screen.findByRole('button', { name: /Concert/ });
    await u.type(screen.getByRole('searchbox'), 'con');
    expect(screen.queryByRole('button', { name: /Workshop/ })).toBeNull();
    await u.click(screen.getByRole('button', { name: /Concert/ }));
    expect(screen.getByText('Selected: Concert')).toBeTruthy();
  });
  it('renders injected title as escaped text (not image)', async () => {
    vi.mocked(getEvents).mockResolvedValue([{ ...fixtures[0], title: '<img src=x onerror=alert(1)>' }]);
    const { container } = render(<App />);
    await screen.findByRole('button', { name: /<img src=x/ });
    expect(container.querySelector('img')).toBeNull();
  });
  it('reserves one seat and cancels with the private code', async () => {
    const u = userEvent.setup();
    vi.mocked(createReservation).mockResolvedValue({ reservationId: 'r-1', cancelToken: 'private', seatCount: 1 });
    vi.mocked(cancelReservation).mockResolvedValue(undefined);
    render(<App />);
    await u.click(await screen.findByRole('button', { name: /Concert/ }));
    await u.type(screen.getByLabelText('Email'), 'student@example.com');
    await u.click(screen.getByRole('button', { name: /^Reserve$/ }));
    await waitFor(() => expect(createReservation).toHaveBeenCalledWith({
      eventId: 'evt-1', email: 'student@example.com', seatCount: 1,
    }));
    expect(await screen.findByLabelText('Reservation confirmation')).toBeTruthy();
    await u.click(screen.getByRole('button', { name: /^Cancel reservation$/ }));
    await waitFor(() => expect(cancelReservation).toHaveBeenCalledWith('r-1', 'private'));
    await waitFor(() => expect(screen.queryByLabelText('Reservation confirmation')).toBeNull());
    expect(vi.mocked(getEvents).mock.calls.length).toBeGreaterThanOrEqual(3);
  });
  it('rejects quantity 3 at v1.0 boundary', async () => {
    const u = userEvent.setup(); render(<App />);
    await u.click(await screen.findByRole('button', { name: /Concert/ }));
    await u.type(screen.getByLabelText('Email'), 'student@example.com');
    await u.clear(screen.getByLabelText(/Number of seats/));
    await u.type(screen.getByLabelText(/Number of seats/), '3');
    // Browser-native min/max constraints may prevent submit before the handler runs.
    expect((screen.getByLabelText(/Number of seats/) as HTMLInputElement).validity.rangeOverflow).toBe(true);
    expect(createReservation).not.toHaveBeenCalled();
  });
  it('shows 409 without inventing a successful booking', async () => {
    const u = userEvent.setup(); vi.mocked(createReservation).mockRejectedValue(new ApiError(409, 'Sold out'));
    render(<App />);
    await u.click(await screen.findByRole('button', { name: /Concert/ }));
    await u.type(screen.getByLabelText('Email'), 'student@example.com');
    await u.click(screen.getByRole('button', { name: /^Reserve$/ }));
    expect(await screen.findByText('Not enough seats are available.')).toBeTruthy();
    expect(screen.queryByLabelText('Reservation confirmation')).toBeNull();
  });
});
