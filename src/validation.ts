// v1.0 baseline deliberately supports ONE seat per reservation.
// Expand to integers 1..5 in the approved Lab 2 feature branch only.
export const MAX_SEATS = 1;
export function validateSeatCount(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value !== 1) {
    throw new RangeError('seatCount must be exactly 1 in v1.0');
  }
  return value;
}
export function validateEmail(value: unknown): string {
  if (typeof value !== 'string' || value.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    throw new RangeError('Invalid email address');
  }
  return value.trim();
}
export function validateEventInput(value: unknown): { title: string; startsAt: string; capacity: number } {
  if (!value || typeof value !== 'object') throw new RangeError('Invalid event');
  const v = value as Record<string, unknown>;
  if (typeof v.title !== 'string' || !v.title.trim() || v.title.length > 200 ||
      typeof v.startsAt !== 'string' || !Number.isFinite(Date.parse(v.startsAt)) ||
      typeof v.capacity !== 'number' || !Number.isInteger(v.capacity) ||
      v.capacity < 1 || v.capacity > 100_000) {
    throw new RangeError('Invalid event fields');
  }
  return { title: v.title.trim(), startsAt: v.startsAt, capacity: v.capacity };
}
