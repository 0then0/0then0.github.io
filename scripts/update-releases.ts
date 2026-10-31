/**
 * Refreshes src/data/releases.json from the GitHub REST API.
 *
 *   GITHUB_TOKEN=... node scripts/update-releases.ts
 *
 * A token is optional but raises the rate limit. The previous snapshot is
 * kept unless every repository is fetched and the result validates.
 */
import { fileURLToPath } from 'node:url';
import { snapshotRepositories } from '../src/data/projects.ts';
import { updateSnapshot } from '../src/lib/release-update.ts';

const path = fileURLToPath(new URL('../src/data/releases.json', import.meta.url));

try {
  const { snapshot, changes } = await updateSnapshot({
    repos: snapshotRepositories,
    path,
    token: process.env.GITHUB_TOKEN || undefined,
  });
  console.log(`Checked ${Object.keys(snapshot.repos).length} repositories at ${snapshot.checkedAt}.`);
  console.log(changes.length > 0 ? `Release changes:\n${changes.map((c) => `  ${c}`).join('\n')}` : 'No release changes.');
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.error('The existing snapshot was left unchanged.');
  process.exitCode = 1;
}
