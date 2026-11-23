import { isAdmin, hashCancelToken, newCancelToken } from './auth';
import { logRequest } from './logging';
import { validateEmail, validateSeatCount, validateEventInput } from './validation';
import { listEvents, getEvent, createEvent } from './services/events';
import { getPublicConfig } from './services/config';
import { reserveOne, cancelOne } from './services/reservations';
import type { AppEnv } from './types';

const json = (payload: unknown, status = 200): Response => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff' },
});
const fail = (message: string, status: number): Response => json({ error: message }, status);
const object = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new RangeError('Expected JSON object');
  return value as Record<string, unknown>;
};
async function readBody(req: Request): Promise<Record<string, unknown>> {
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) throw new RangeError('Expected application/json');
  const size = Number(req.headers.get('content-length') ?? '0');
  if (size > 8192) throw new RangeError('Request body too large');
  try { return object(await req.json()); }
  catch { throw new RangeError('Invalid JSON object'); }
}
function respondMethod(): Response { return fail('Method not allowed', 405); }

async function route(request: Request, env: AppEnv): Promise<Response> {
  const { pathname } = new URL(request.url);
  const method = request.method.toUpperCase();
  if (pathname === '/api/health') return method === 'GET' ? json({ status: 'ok', version: '1.0.0' }) : respondMethod();
  if (pathname === '/api/events') {
    return method === 'GET' ? json({ events: await listEvents(env) }) : respondMethod();
  }
  if (pathname === '/api/config') {
    return method === 'GET' ? json(await getPublicConfig(env)) : respondMethod();
  }
  const detail = /^\/api\/events\/([^/]+)$/.exec(pathname);
  if (detail) {
    if (method !== 'GET') return respondMethod();
    const event = await getEvent(env, decodeURIComponent(detail[1]));
    return event ? json(event) : fail('Event not found', 404);
  }
  if (pathname === '/api/admin/events') {
    if (method !== 'POST') return respondMethod();
    if (!isAdmin(request, env)) return fail('Unauthorized', 401);
    const input = validateEventInput(await readBody(request));
    return json(await createEvent(env, input), 201);
  }
  if (pathname === '/api/reservations') {
    if (method !== 'POST') return respondMethod();
    const body = await readBody(request);
    if (typeof body.eventId !== 'string' || !body.eventId || body.eventId.length > 200) {
      throw new RangeError('Invalid eventId');
    }
    const email = validateEmail(body.email);
    const seatCount = validateSeatCount(body.seatCount);
    const cancelToken = newCancelToken();
    const id = `res-${crypto.randomUUID()}`;
    const outcome = await reserveOne(env, {
      id, eventId: body.eventId, email, cancelTokenHash: await hashCancelToken(cancelToken),
    });
    if (outcome === 'not_found') return fail('Event not found', 404);
    if (outcome === 'sold_out') return fail('Not enough seats available', 409);
    return json({ reservationId: id, cancelToken, seatCount }, 201);
  }
  const cancel = /^\/api\/reservations\/([^/]+)\/cancel$/.exec(pathname);
  if (cancel) {
    if (method !== 'POST') return respondMethod();
    const body = await readBody(request);
    const code = body.cancelToken;
    if (typeof code !== 'string' || !/^[a-f0-9]{32}$/.test(code)) return fail('Reservation not found', 404);
    const ok = await cancelOne(env, decodeURIComponent(cancel[1]), await hashCancelToken(code));
    return ok ? json({ status: 'cancelled' }) : fail('Reservation not found', 404);
  }
  return fail('Route not found', 404);
}

export default {
  async fetch(request: Request, env: AppEnv): Promise<Response> {
    const started = Date.now();
    const pathname = new URL(request.url).pathname;
    let response: Response;
    try {
      response = await route(request, env);
    } catch (error) {
      if (error instanceof RangeError || error instanceof SyntaxError) {
        response = fail(error.message, 400);
      } else {
        // Never emit raw exceptions or request body data to a customer or log.
        console.error(JSON.stringify({ kind: 'internal_error', route: pathname, timestamp: new Date().toISOString() }));
        response = fail('Internal server error', 500);
      }
    }
    logRequest(request.method, pathname, response.status, Date.now() - started);
    return response;
  },
} satisfies ExportedHandler<AppEnv>;
