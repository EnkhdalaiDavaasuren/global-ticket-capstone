import { describe, expect, it } from 'vitest';
import { api, newTestEvent, reservation } from '../helpers/http';
describe('local D1 concurrency', () => {
  it('allows only one of two 3-seat requests for 5 seats', async () => {
    const id = await newTestEvent(5);
    const [one, two] = await Promise.all([
      api('/api/reservations', reservation(id, 3)),
      api('/api/reservations', reservation(id, 3)),
    ]);
    expect([one.status, two.status].sort()).toEqual([201, 409]);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(2);
  });
});
