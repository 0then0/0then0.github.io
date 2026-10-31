import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

export interface Page {
  /** Route path such as /projects/spacemosaic/ or /404.html */
  route: string;
  file: string;
  html: string;
}

export async function readPages(distDir: string): Promise<Page[]> {
  const files: string[] = [];
  const walk = async (dir: string) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else if (entry.name.endsWith('.html')) files.push(full);
    }
  };
  await walk(distDir);
  return Promise.all(
    files.map(async (file) => {
      const rel = `/${relative(distDir, file).split('\\').join('/')}`;
      const route = rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel;
      return { route, file, html: await readFile(file, 'utf8') };
    }),
  );
}

const decode = (s: string) => s.replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

/** All URLs referenced by href, src and srcset attributes. */
export function references(html: string): string[] {
  const urls: string[] = [];
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) urls.push(decode(m[1] ?? ''));
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) {
    for (const part of (m[1] ?? '').split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (url) urls.push(decode(url));
    }
  }
  return urls;
}

export function ids(html: string): Set<string> {
  return new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1] ?? ''));
}
