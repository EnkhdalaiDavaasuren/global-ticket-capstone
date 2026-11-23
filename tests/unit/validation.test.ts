import { describe, expect, it } from 'vitest';
import { validateEmail, validateSeatCount, validateEventInput } from '../../src/validation';
describe('v1.0 pure runtime validation', () => {
  it('accepts a single seat', () => expect(validateSeatCount(1)).toBe(1));
  it.each([0, 2, 3, 5, 6, 2.5, '1', null, undefined, NaN, Infinity])(
    'rejects %s', (value) => expect(() => validateSeatCount(value)).toThrow(RangeError),
  );
  it('validates email and event fields', () => {
    expect(validateEmail(' a@b.co ')).toBe('a@b.co');
    expect(() => validateEmail('not-an-email')).toThrow();
    expect(validateEventInput({ title: 'Talk', startsAt: '2027-03-01T09:00:00Z', capacity: 2 }).capacity).toBe(2);
    expect(() => validateEventInput({ title: '', startsAt: 'bad', capacity: 0 })).toThrow();
  });
});
