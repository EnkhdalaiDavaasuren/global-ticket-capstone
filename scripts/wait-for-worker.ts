const base = process.env.BASE_URL ?? 'http://127.0.0.1:8787';
if (!base.startsWith('http://127.0.0.1:') && !base.startsWith('http://localhost:')) {
  throw new Error('Only local Worker is allowed in CI readiness check');
}
let ready = false;
for (let n = 0; n < 50; n++) {
  try {
    const r = await fetch(`${base}/api/health`);
    if (r.ok) { ready = true; break; }
  } catch { /* Worker may be starting */ }
  await new Promise(resolve => setTimeout(resolve, 300));
}
if (!ready) { console.error('Local Worker readiness failed'); process.exitCode = 1; }
else { console.info('Local Worker HTTP health check reached 200'); }
export {};

