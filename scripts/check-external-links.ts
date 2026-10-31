/**
 * Checks external links found in dist/. Not part of the build: run it on
 * demand or on a schedule. A link is reported as broken only on 404 or 410;
 * timeouts, 429 and 5xx are reported as unreachable after limited retries.
 *
 *   node scripts/check-external-links.ts [--strict]
 *
 * With --strict, unreachable links also fail the run.
 */
import { fileURLToPath } from 'node:url';
import { readPages, references } from './lib-html.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const strict = process.argv.includes('--strict');
const TIMEOUT_MS = 12_000;
const RETRIES = 2;
const CONCURRENCY = 6;
/** The site's own canonical URLs are checked offline by check-dist.ts. */
const SITE = new URL(process.env.SITE_URL ?? 'https://0then0.github.io').origin;

type Result = { url: string; status: 'ok' | 'broken' | 'unreachable'; detail: string; pages: string[] };

const pages = await readPages(dist);
const urlPages = new Map<string, Set<string>>();
for (const page of pages) {
  for (const url of references(page.html)) {
    if (!/^https?:\/\//.test(url) || new URL(url).origin === SITE) continue;
    const clean = url.split('#')[0] ?? url;
    if (!urlPages.has(clean)) urlPages.set(clean, new Set());
    urlPages.get(clean)?.add(page.route);
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function probe(url: string): Promise<Omit<Result, 'pages'>> {
  let detail = '';
  for (let attempt = 0; attempt <= RETRIES; attempt++) {
    if (attempt > 0) await sleep(1_500 * attempt);
    for (const method of ['HEAD', 'GET'] as const) {
      try {
        const response = await fetch(url, {
          method,
          redirect: 'follow',
          signal: AbortSignal.timeout(TIMEOUT_MS),
          headers: { 'User-Agent': '0then0-catalog-link-check' },
        });
        await response.body?.cancel();
        if (response.ok) return { url, status: 'ok', detail: String(response.status) };
        if (response.status === 404 || response.status === 410) {
          if (method === 'HEAD') continue; // some servers reject HEAD; confirm with GET
          return { url, status: 'broken', detail: String(response.status) };
        }
        detail = `HTTP ${response.status}`;
        if (response.status === 405 || response.status === 403) continue;
        break; // 429/5xx: retry later
      } catch (error) {
        detail = error instanceof Error ? error.name : String(error);
        break;
      }
    }
  }
  return { url, status: 'unreachable', detail };
}

const queue = [...urlPages.keys()];
const results: Result[] = [];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let url = queue.shift(); url !== undefined; url = queue.shift()) {
      results.push({ ...(await probe(url)), pages: [...(urlPages.get(url) ?? [])] });
    }
  }),
);

const broken = results.filter((r) => r.status === 'broken');
const unreachable = results.filter((r) => r.status === 'unreachable');
console.log(
  `Checked ${results.length} external URLs: ${results.length - broken.length - unreachable.length} ok, ${broken.length} broken, ${unreachable.length} unreachable.`,
);
for (const r of [...broken, ...unreachable]) console.log(`${r.status.toUpperCase()} ${r.detail} ${r.url}\n    on ${r.pages.join(', ')}`);
if (broken.length > 0 || (strict && unreachable.length > 0)) process.exitCode = 1;
