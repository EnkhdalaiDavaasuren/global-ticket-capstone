import type { AppEnv } from '../types';

// IMPORTANT: v1.0 reservations table has no `seat_count` column.
// The conditional UPDATE and conditional INSERT run together in an atomic D1 batch.
export async function reserveOne(env: AppEnv, input: {
  id: string; eventId: string; email: string; cancelTokenHash: string;
}): Promise<'created' | 'sold_out' | 'not_found'> {
  const [update, insert] = await env.DB.batch([
    env.DB.prepare(`UPDATE events SET remaining_seats = remaining_seats - 1
      WHERE id = ?1 AND remaining_seats >= 1`).bind(input.eventId),
    env.DB.prepare(`INSERT INTO reservations (id, event_id, email, cancel_token_hash, status)
      SELECT ?1, ?2, ?3, ?4, 'active' WHERE changes() = 1`)
      .bind(input.id, input.eventId, input.email, input.cancelTokenHash),
  ]);
  if (update.meta.changes === 0) {
    const exists = await env.DB.prepare('SELECT 1 FROM events WHERE id = ?1')
      .bind(input.eventId).first();
    return exists ? 'sold_out' : 'not_found';
  }
  if (insert.meta.changes !== 1) throw new Error('Atomic reservation mismatch');
  return 'created';
}

export async function cancelOne(env: AppEnv, id: string, hash: string): Promise<boolean> {
  const [update, restore] = await env.DB.batch([
    env.DB.prepare(`UPDATE reservations SET status = 'cancelled'
      WHERE id = ?1 AND cancel_token_hash = ?2 AND status = 'active'`).bind(id, hash),
    env.DB.prepare(`UPDATE events SET remaining_seats = remaining_seats + 1
      WHERE id = (SELECT event_id FROM reservations WHERE id = ?1) AND changes() = 1`).bind(id),
  ]);
  if (update.meta.changes === 0) return false;
  if (restore.meta.changes !== 1) throw new Error('Atomic cancellation mismatch');
  return true;
}
