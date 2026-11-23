import type { AppEnv, EventRecord } from '../types';
export interface EventView { id: string; title: string; startsAt: string; remainingSeats: number; }
export const viewEvent = (e: EventRecord): EventView => ({
  id: e.id, title: e.title, startsAt: e.starts_at, remainingSeats: e.remaining_seats,
});
export async function listEvents(env: AppEnv): Promise<EventView[]> {
  const { results } = await env.DB.prepare(
    'SELECT id, title, starts_at, remaining_seats FROM events ORDER BY starts_at ASC, id ASC LIMIT 300'
  ).all<EventRecord>();
  return results.map(viewEvent);
}
export async function getEvent(env: AppEnv, id: string): Promise<EventView | null> {
  const row = await env.DB.prepare(
    'SELECT id, title, starts_at, remaining_seats FROM events WHERE id = ?1'
  ).bind(id).first<EventRecord>();
  return row ? viewEvent(row) : null;
}
export async function createEvent(env: AppEnv, input: {
  title: string; startsAt: string; capacity: number;
}): Promise<EventView> {
  const id = `evt-${crypto.randomUUID()}`;
  await env.DB.prepare('INSERT INTO events (id,title,starts_at,capacity,remaining_seats) VALUES (?1,?2,?3,?4,?4)')
    .bind(id, input.title, input.startsAt, input.capacity).run();
  return { id, title: input.title, startsAt: input.startsAt, remainingSeats: input.capacity };
}
