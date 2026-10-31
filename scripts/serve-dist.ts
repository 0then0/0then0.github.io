/**
 * Minimal static server for dist/ that mimics GitHub Pages: directory
 * index.html, a 301 redirect to the trailing-slash URL, and /404.html with
 * status 404 for unknown paths. Used by end-to-end tests.
 *
 *   node scripts/serve-dist.ts [port]
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.argv[2] ?? 4322);
const types: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

const send = (res: import('node:http').ServerResponse, status: number, file: string) => {
  res.writeHead(status, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  const path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = join(root, path);
  if (!file.startsWith(root)) return send(res, 404, join(root, '404.html'));
  if (existsSync(file) && statSync(file).isDirectory()) {
    if (!url.pathname.endsWith('/')) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` });
      return res.end();
    }
    const index = join(file, 'index.html');
    return existsSync(index) ? send(res, 200, index) : send(res, 404, join(root, '404.html'));
  }
  if (existsSync(file)) return send(res, 200, file);
  return send(res, 404, join(root, '404.html'));
}).listen(port, () => console.log(`Serving dist/ on http://localhost:${port}/`));
