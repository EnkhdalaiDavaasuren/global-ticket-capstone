import { describe, expect, it } from 'vitest';
import { api, newTestEvent, reservation } from '../helpers/http';
describe('local D1 concurrency', () => {
  it('never sells 2 seats when only 1 is available', async () => {
    const id = await newTestEvent(1);
    const [one, two] = await Promise.all([
      api('/api/reservations', reservation(id)),
      api('/api/reservations', reservation(id)),
    ]);
    expect([one.status, two.status].sort()).toEqual([201, 409]);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(0);
  });
});
