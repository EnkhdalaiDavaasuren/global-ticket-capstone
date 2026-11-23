import { defineConfig } from 'vitest/config';
const http = {
  testTimeout: 20_000,
  hookTimeout: 20_000,
  // Vite provides its own BASE_URL inside test projects.
  env: { TICKET_TEST_BASE_URL: process.env.BASE_URL ?? '' },
};
export default defineConfig({
  test: {
    projects: [
      { test: { name: 'unit', include: ['tests/unit/**/*.test.ts'] } },
      { esbuild: { jsx: 'automatic' }, test: { name: 'ui', environment: 'jsdom', include: ['tests/ui/**/*.test.{ts,tsx}'] } },
      { test: { name: 'integration', include: ['tests/integration/api.test.ts'], ...http } },
      { test: { name: 'concurrency', include: ['tests/integration/concurrency.test.ts'], ...http } },
      { test: { name: 'regression', include: ['tests/regression/**/*.test.ts'], ...http } },
      { test: { name: 'security', include: ['tests/security/**/*.test.ts'], ...http } },
      { test: { name: 'smoke', include: ['tests/smoke/**/*.test.ts'], ...http } },
    ],
  },
});
