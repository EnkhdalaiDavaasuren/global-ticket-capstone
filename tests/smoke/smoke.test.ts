import { describe, expect, it } from 'vitest';
// The ONLY production test layer: read-only GET requests, NO mutations.
const BASE_URL = process.env.TICKET_TEST_BASE_URL;
if (!BASE_URL || !/^https:\/\//.test(BASE_URL) ||
    /localhost|127\.0\.0\.1/.test(BASE_URL)) {
  throw new Error('Production smoke requires an explicit HTTPS BASE_URL (never localhost)');
}
describe('read-only deployed full-stack smoke', () => {
  it.each(['/api/health', '/api/events', '/api/config', '/', '/styles.css', '/assets/app.js'])(
    'GET %s', async (path) => {
      const response = await fetch(`${BASE_URL}${path}`, { method: 'GET' });
      expect(response.status).toBe(200);
      expect((await response.text()).length).toBeGreaterThan(0);
    },
  );
});
