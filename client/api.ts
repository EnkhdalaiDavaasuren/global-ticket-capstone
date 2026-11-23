// client/api.ts
export interface EventView {
  id: string;
  title: string;
  startsAt: string;
  remainingSeats: number;
}

export interface ReservationInput {
  eventId: string;
  email: string;
  seatCount: number;
}

export interface ReservationReceipt {
  reservationId: string;
  seatCount: number;
  cancelToken: string; // shown once; only a hash is stored server-side
}

export class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  let body: unknown;
  try { body = await response.json(); }
  catch { body = undefined; }

  if (!response.ok) {
    const obj = body && typeof body === 'object'
      ? body as Record<string, unknown> : null;
    const message = typeof obj?.error === 'string'
      ? obj.error : `HTTP ${response.status}`;
    throw new ApiError(response.status, message);
  }
  return body as T; // Follow with runtime/contract checks.
}

export async function getEvents(): Promise<EventView[]> {
  const body = await request<unknown>('/api/events');
  if (!body || typeof body !== 'object' ||
      !('events' in body) || !Array.isArray(body.events) ||
      !body.events.every((item: unknown) => {
        if (!item || typeof item !== 'object') return false;
        const event = item as Record<string, unknown>;
        return typeof event.id === 'string' &&
          typeof event.title === 'string' &&
          typeof event.startsAt === 'string' &&
          typeof event.remainingSeats === 'number' &&
          Number.isFinite(event.remainingSeats);
      })) {
    throw new Error('Unexpected /api/events response; check the approved contract.');
  }
  return body.events as EventView[];
}

// Optional KV-backed text. Adapt the shape to the real /api/config route.
export async function getAnnouncement(): Promise<string | null> {
  const body = await request<unknown>('/api/config');
  if (!body || typeof body !== 'object') return null;
  const value = (body as Record<string, unknown>).announcement;
  return typeof value === 'string' ? value : null;
}

export async function createReservation(
  input: ReservationInput
): Promise<ReservationReceipt> {
  const receipt = await request<unknown>('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(input),
  });
  if (!receipt || typeof receipt !== 'object') {
    throw new Error('Unexpected reservation response.');
  }
  const r = receipt as Record<string, unknown>;
  // The server has already created the reservation (HTTP 201). Throw only if the
  // customer could not cancel it: the ID and the code are the essential fields.
  if (typeof r.reservationId !== 'string' || typeof r.cancelToken !== 'string') {
    throw new Error('Reservation created, but the receipt is unreadable. Contact support.');
  }
  // The approved contract returns seatCount in v1.0 (always 1) and in v1.1.
  // If it is missing, show the requested quantity rather than discarding the
  // receipt; the API integration tests must still assert the field is present.
  const seatCount = Number.isInteger(r.seatCount)
    ? (r.seatCount as number) : input.seatCount;
  return { reservationId: r.reservationId, cancelToken: r.cancelToken, seatCount };
}

export async function cancelReservation(
  id: string, cancelToken: string
): Promise<void> {
  await request<unknown>(
    `/api/reservations/${encodeURIComponent(id)}/cancel`,
    {
      method: 'POST',
      body: JSON.stringify({ cancelToken }),
    }
  );
}
