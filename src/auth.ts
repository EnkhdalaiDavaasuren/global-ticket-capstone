import type { AppEnv } from './types';
const toHex = (bytes: Uint8Array): string =>
  [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
export function isAdmin(request: Request, env: AppEnv): boolean {
  const expected = env.ADMIN_TOKEN;
  if (!expected) return false;
  const header = request.headers.get('Authorization') ?? '';
  const supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  const a = new TextEncoder().encode(supplied);
  const b = new TextEncoder().encode(expected);
  if (a.byteLength !== b.byteLength) return false;
  return crypto.subtle.timingSafeEqual(a, b);
}
export function newCancelToken(): string {
  return toHex(crypto.getRandomValues(new Uint8Array(16))); // 128 random bits
}
export async function hashCancelToken(code: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
  return toHex(new Uint8Array(digest));
}
