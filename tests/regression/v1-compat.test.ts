import { describe, expect, it } from 'vitest';
import { api, newTestEvent, reservation } from '../helpers/http';
describe('v1.0 contract regression', () => {
  it('keeps seatCount=1 in v1.0 receipt and preserves GET event shape', async () => {
    const id = await newTestEvent(2);
    const result = await api('/api/reservations', reservation(id, 1));
    expect(result.status).toBe(201);
    expect(result.body).toHaveProperty('reservationId');
    expect(result.body).toHaveProperty('cancelToken');
    expect(result.body.seatCount).toBe(1);
    const event = await api(`/api/events/${id}`);
    expect(event.body).toMatchObject({ id, remainingSeats: 1 });
    expect(typeof event.body.title).toBe('string');
    expect(typeof event.body.startsAt).toBe('string');
  });
});
