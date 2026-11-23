import { describe, expect, it } from 'vitest';
import { api, newTestEvent, reservation } from '../helpers/http';
describe('local security: admin and cancellation credentials', () => {
  it('rejects missing/wrong administrator token', async () => {
    const input = JSON.stringify({ title: 'Private Event', startsAt: '2027-03-01T09:00:00Z', capacity: 1 });
    expect((await api('/api/admin/events', { method: 'POST', body: input })).status).toBe(401);
    expect((await api('/api/admin/events', {
      method: 'POST', headers: { Authorization: 'Bearer totally-wrong' }, body: input,
    })).status).toBe(401);
  });
  it('wrong or reused cancellation code returns 404 and never restores twice', async () => {
    const id = await newTestEvent(1);
    const booked = await api('/api/reservations', reservation(id));
    expect(booked.status).toBe(201);
    const path = `/api/reservations/${booked.body.reservationId}/cancel`;
    const bad = await api(path, { method: 'POST', body: JSON.stringify({ cancelToken: '0'.repeat(32) }) });
    expect(bad.status).toBe(404);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(0);
    const good = { method: 'POST', body: JSON.stringify({ cancelToken: booked.body.cancelToken }) };
    expect((await api(path, good)).status).toBe(200);
    expect((await api(path, good)).status).toBe(404);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(1);
  });
});
