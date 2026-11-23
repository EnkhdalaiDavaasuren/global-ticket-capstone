import { describe, expect, it } from 'vitest';
import { api, newTestEvent, reservation } from '../helpers/http';
describe('v1.0 Worker + local D1/KV integration', () => {
  it('reads events, detail, and KV configuration', async () => {
    const listed = await api('/api/events');
    expect(listed.status).toBe(200);
    expect(Array.isArray(listed.body.events)).toBe(true);
    const cfg = await api('/api/config');
    expect(cfg.status).toBe(200);
    expect(typeof cfg.body.announcement).toBe('string');
    const id = await newTestEvent();
    const detail = await api(`/api/events/${id}`);
    expect(detail.status).toBe(200);
    expect(detail.body.remainingSeats).toBe(3);
    expect((await api('/api/events/unknown')).status).toBe(404);
  });
  it('reserves and cancels exactly one seat with real local D1', async () => {
    const id = await newTestEvent(2);
    const reserve = await api('/api/reservations', reservation(id));
    expect(reserve.status).toBe(201);
    expect(reserve.body.seatCount).toBe(1);
    expect(reserve.body.cancelToken).toMatch(/^[0-9a-f]{32}$/);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(1);
    const cancel = await api(`/api/reservations/${reserve.body.reservationId}/cancel`, {
      method: 'POST', body: JSON.stringify({ cancelToken: reserve.body.cancelToken }),
    });
    expect(cancel.status).toBe(200);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(2);
  });
  it('enforces invalid input, unknown events and sold-out response', async () => {
    const id = await newTestEvent(1);
    expect((await api('/api/reservations', reservation(id, 3))).status).toBe(400);
    expect((await api('/api/reservations', reservation('nonexistent'))).status).toBe(404);
    expect((await api('/api/reservations', reservation(id))).status).toBe(201);
    expect((await api('/api/reservations', reservation(id))).status).toBe(409);
    expect((await api(`/api/events/${id}`)).body.remainingSeats).toBe(0);
  });
});
