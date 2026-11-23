export const BASE_URL = process.env.TICKET_TEST_BASE_URL || 'http://127.0.0.1:8787';
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? '';
export async function api(path: string, init: RequestInit = {}) {
  const method = (init.method ?? 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD' &&
      !BASE_URL.startsWith('http://127.0.0.1:') && !BASE_URL.startsWith('http://localhost:')) {
    throw new Error('HTTP write test blocked: BASE_URL is not localhost');
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init, headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
  });
  const responseText = await res.text();
  let body: any = null;
  if (responseText) { try { body = JSON.parse(responseText); } catch { body = responseText; } }
  return { status: res.status, body };
}
export const adminHeaders = () => ({ Authorization: `Bearer ${ADMIN_TOKEN}` });
export async function newTestEvent(capacity = 3): Promise<string> {
  if (!ADMIN_TOKEN) throw new Error('ADMIN_TOKEN must be provided for local write tests');
  if (!BASE_URL.startsWith('http://127.0.0.1:') && !BASE_URL.startsWith('http://localhost:')) {
    throw new Error('Write tests must run against localhost ONLY');
  }
  const result = await api('/api/admin/events', { method: 'POST', headers: adminHeaders(), body: JSON.stringify({
    title: `Course Test ${crypto.randomUUID()}`, startsAt: '2027-03-01T09:00:00Z', capacity,
  }) });
  if (result.status !== 201) throw new Error(`Test event creation failed: HTTP ${result.status}`);
  return result.body.id as string;
}
export const reservation = (eventId: string, seatCount = 1) => ({
  method: 'POST', body: JSON.stringify({ eventId, email: 'test.student@example.invalid', seatCount }),
});
