// Do not log request bodies, auth headers, email addresses, or cancellation codes.
export function logRequest(method: string, pathname: string, status: number, ms: number): void {
  console.info(JSON.stringify({ kind: 'http', method, route: pathname, status,
    durationMs: Math.round(ms), timestamp: new Date().toISOString() }));
}
