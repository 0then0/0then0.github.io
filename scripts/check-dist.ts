/**
 * Offline checks of the built site in dist/: routes, internal links and
 * anchors, referenced assets, and per-page metadata. No network access.
 */
import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { productsWithDetail } from '../src/data/projects.ts';
import { LOCALES, localePath, splitLocalePath } from '../src/i18n/locales.ts';
import { ids, readPages, references } from './lib-html.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const errors: string[] = [];
const fail = (message: string) => errors.push(message);

const pages = await readPages(dist);
const byRoute = new Map(pages.map((p) => [p.route, p]));

const neutralRoutes = ['/', '/projects/', '/about/', ...productsWithDetail.map((p) => `/projects/${p.slug}/`)];
const requiredRoutes = ['/404.html', ...LOCALES.flatMap((l) => neutralRoutes.map((r) => localePath(l.code, r)))];
for (const route of requiredRoutes) if (!byRoute.has(route)) fail(`missing route ${route}`);
for (const file of ['robots.txt', 'sitemap-index.xml', 'favicon.svg', 'og-default.png']) {
  if (!existsSync(`${dist}${file}`)) fail(`missing ${file}`);
}

function resolveTarget(pathname: string): string | null {
  const local = `${dist}${decodeURIComponent(pathname).replace(/^\//, '')}`;
  if (pathname.endsWith('/')) return existsSync(`${local}index.html`) ? pathname : null;
  if (existsSync(local) && statSync(local).isFile()) return pathname;
  return null;
}

for (const page of pages) {
  const { html, route } = page;
  const h1 = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1 !== 1) fail(`${route}: expected one <h1>, found ${h1}`);
  if (!/<title>[^<]{5,}<\/title>/.test(html)) fail(`${route}: missing <title>`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) fail(`${route}: missing or short meta description`);
  const expectedLang = route === '/404.html' ? 'en' : splitLocalePath(route).lang;
  if (!html.includes(`<html lang="${expectedLang}"`)) fail(`${route}: expected <html lang="${expectedLang}">`);
  const alternates = html.match(/<link rel="alternate" hreflang=/g)?.length ?? 0;
  if (route !== '/404.html' && alternates !== LOCALES.length + 1)
    fail(`${route}: expected ${LOCALES.length + 1} hreflang links, found ${alternates}`);
  if (route !== '/404.html' && !/<link rel="canonical" href="https?:\/\/[^"]+"/.test(html)) fail(`${route}: missing canonical`);
  if (route === '/404.html' && !/name="robots" content="noindex"/.test(html)) fail('404 page must be noindex');
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const body = match[1] ?? '';
    if (body.includes('<')) fail(`${route}: unescaped "<" in JSON-LD`);
    try {
      JSON.parse(body);
    } catch {
      fail(`${route}: invalid JSON-LD`);
    }
  }
  if (html.includes('api.github.com')) fail(`${route}: references the GitHub API at runtime`);
  if (/<img(?![^>]*\salt=)[^>]*>/.test(html)) fail(`${route}: <img> without alt`);
  if (/<img(?![^>]*\swidth=)[^>]*>/.test(html)) fail(`${route}: <img> without width/height`);

  const pageIds = ids(html);
  for (const url of references(html)) {
    if (url === '' || /^(mailto:|data:)/.test(url)) continue;
    if (/^https?:\/\//.test(url)) continue; // external: see check-external-links.ts
    const [pathPart = '', hash] = url.split('#');
    const base = new URL(route, 'http://local');
    const target = new URL(pathPart || route, base);
    const resolved = resolveTarget(target.pathname);
    if (!resolved) {
      fail(`${route}: broken internal link ${url}`);
      continue;
    }
    if (hash) {
      const targetPage = byRoute.get(resolved);
      const targetIds = targetPage ? (targetPage === page ? pageIds : ids(targetPage.html)) : null;
      if (targetIds && !targetIds.has(hash)) fail(`${route}: missing anchor #${hash} in ${resolved}`);
    }
  }
}

const sitemap = await readFile(`${dist}sitemap-0.xml`, 'utf8').catch(() => '');
for (const l of LOCALES)
  for (const p of productsWithDetail)
    if (!sitemap.includes(`${localePath(l.code, `/projects/${p.slug}/`)}</loc>`)) fail(`sitemap misses ${l.code} ${p.slug}`);
if (!sitemap.includes('hreflang="pt-BR"')) fail('sitemap has no hreflang alternates');
if (sitemap.includes('404')) fail('sitemap must not list the 404 page');

if (errors.length > 0) {
  console.error(`dist check failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`dist check passed: ${pages.length} pages, routes, links, anchors, assets and metadata.`);
}
