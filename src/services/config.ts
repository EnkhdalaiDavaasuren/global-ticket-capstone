import type { AppEnv } from '../types';
export async function getPublicConfig(env: AppEnv): Promise<{
  siteName: string; supportedLocales: string[]; announcement: string | null;
}> {
  const [raw, announcement] = await Promise.all([
    env.APP_KV.get('config'), env.APP_KV.get('announcement'),
  ]);
  let siteName = 'Global Event Tickets';
  let supportedLocales = ['en'];
  if (raw) {
    try {
      const cfg: unknown = JSON.parse(raw);
      if (cfg && typeof cfg === 'object') {
        const obj = cfg as Record<string, unknown>;
        if (typeof obj.siteName === 'string') siteName = obj.siteName;
        if (Array.isArray(obj.supportedLocales) && obj.supportedLocales.every(x => typeof x === 'string')) {
          supportedLocales = obj.supportedLocales;
        }
      }
    } catch { /* Use non-sensitive fallback if invalid config was written. */ }
  }
  return { siteName, supportedLocales, announcement };
}
