# 0then0 project catalog

Source of <https://0then0.github.io/>, a catalog of open-source software by
[0then0](https://github.com/0then0). It helps a visitor go from a task to a
project, see what the project looks like, and download or start using it.

The site is static: Astro generates HTML at build time from hand-written
project data and a committed snapshot of GitHub release metadata. Visitors'
browsers never call the GitHub API.

## Requirements

- Node.js 24 (see `.nvmrc`; Astro 7 requires 22.23.4 or later)
- npm (the lockfile is `package-lock.json`)

## Local development

```sh
npm ci
npm run dev          # http://localhost:4321
```

Build and serve the production output the way GitHub Pages does
(directory indexes, trailing-slash redirects, `404.html`):

```sh
npm run build
npm run serve:dist   # http://localhost:4322
```

## Checks

| Command               | What it checks                                                                                                                                                                                           |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`        | Biome: formatting, lint rules and import order for TypeScript, JavaScript, JSON, CSS and Astro frontmatter                                                                                               |
| `npm run typecheck`   | TypeScript 7 strict check of data, logic, scripts and tests                                                                                                                                              |
| `npm test`            | Download selection on synthetic releases, snapshot update safety, catalog data against the snapshot, filter logic                                                                                        |
| `npm run build`       | Production build                                                                                                                                                                                         |
| `npm run check:dist`  | Routes, internal links and anchors, referenced assets, titles, descriptions, canonical URLs, sitemap                                                                                                     |
| `npm run test:e2e`    | Playwright on desktop and mobile: direct routes, 404, axe accessibility in light and dark mode, keyboard focus, 200% text, reduced motion, filters, OS picker, home hero startup, no-JavaScript fallback |
| `npm run check:links` | External links; not part of the build (see below)                                                                                                                                                        |
| `npm run verify`      | Everything except external links                                                                                                                                                                         |

Before the first end-to-end run, install the browser: `npx playwright install chromium`.

`npm run format` applies Biome's safe fixes. Biome reads `.astro` files in its
stable mode, which covers the frontmatter only; its full Astro support is still
experimental and is not enabled. `noUnusedImports` and `noUnusedVariables` are
off for `.astro` because frontmatter imports are used in the template, which
Biome does not see in this mode. `noDescendingSpecificity` is off for CSS
because the component rules are scoped by class and the rule reports unrelated
selectors. The release snapshot and the npm lockfile are not formatted.

`astro check` is not used: `@astrojs/check` supports TypeScript 5 and 6 only,
and this project uses TypeScript 7. Logic lives in `.ts` modules that `tsc`
checks; `.astro` files are kept thin and are exercised by the build and the
end-to-end tests.

## How the project is organized

```
src/data/projects.ts      Editorial data: tasks, categories, platforms, screenshots,
                          limitations, first-run steps and download rules
src/data/releases.json    Release snapshot (generated, committed)
src/lib/types.ts          Data model and labels
src/lib/downloads.ts      Turns download rules + snapshot into download buttons
src/lib/release-*.ts      Snapshot schema and the safe updater
src/pages/                Home, catalog, product pages, about, 404, robots.txt
src/components/           Cards, download section, terminal examples, hero glyph field
src/scripts/              Client-side code: filters, OS picker, the WebGL glyph field
src/assets/icons/         Project icons, copied unchanged from each project
src/assets/screenshots/   Screenshots (optimized at build time)
scripts/                  Snapshot update, dist checks, link checker, static server
tests/, e2e/              Vitest unit tests and Playwright tests
```

## Home page hero

The home page hero has a quiet background: a slowly rotating cloud of faint
monospace glyphs ([AsciiField.astro](src/components/AsciiField.astro),
[ascii-field.ts](src/scripts/ascii-field.ts)). The cloud is stretched to the
hero block and fills its whole width and height, including the area under the
text. It is drawn with WebGL2 point sprites from a glyph atlas; motion comes
from simplex noise in the vertex shader, so it never visibly loops.

- Glyphs use the page's ink color at low opacity so text on top stays
  readable: dark on paper in light mode, light in dark mode. There is no bloom
  and no highlight effect.
- The glyph count follows the hero area (800 to 2,400), 30% fewer on
  devices with four or fewer CPU cores. Rendering stops while the hero is
  scrolled out of view.
- The pointer nudges the rotation slightly, with inertia; this is off on touch
  screens and with reduced motion. With reduced motion the field stands still
  and only flickers slowly.
- Without WebGL2 one still frame is drawn with canvas 2D. Without JavaScript
  the hero is plain text. The canvas is hidden from assistive technology.

## Languages

The interface is available in English, Russian, Spanish, German, French,
Japanese and Brazilian Portuguese. English pages live at the root
(`/projects/`), the others under a prefix: `/ru/`, `/es/`, `/de/`, `/fr/`,
`/ja/`, `/pt-br/`. Indexable pages link their translations with `hreflang`, and the sitemap
lists them as alternates. Error pages are available at `/404.html` and each
language's prefixed `/404/` route. GitHub Pages still serves one `404.html`
for missing URLs: it contains all seven translations and selects the URL
prefix's language in the browser without redirecting or changing the 404 status.
Without JavaScript, it shows English with links to the translated error pages.
Error pages have `noindex` and are excluded from the sitemap.

- `src/i18n/messages/<lang>.ts`: interface strings. `en.ts` defines the
  shape; TypeScript rejects a locale with a missing key.
- `src/i18n/projects/<lang>.ts`: catalog texts of each project (task,
  environment, tagline, button labels, fork and download notes).
- Product page bodies are translated in each project's `detail` block:
  descriptions, scenarios, limitations, platform notes, first-run and
  installation steps, captions and screenshot alt text. Commands, recorded
  output, file names, download rules and evidence levels stay in the source
  entry. Terminal examples retain `lang="en"`.
- `tests/i18n.test.ts` fails when a locale misses a project, a download
  format label, a placeholder used by the English text, a product-description field, or a plural form the
  language needs.
- `e2e/i18n.spec.ts` opens the main pages in every language on desktop and
  mobile and checks `lang`, accessibility, clipped text and 200% text size.

## Adding or changing a project

See [CONTRIBUTING.md](CONTRIBUTING.md#adding-a-project). In short: add an
entry to `src/data/projects.ts`, run `npm run releases:update`, add a
`detail` block only for projects that deserve their own page, and run
`npm run verify`.

## Release metadata

`src/data/releases.json` holds, for every listed repository, the latest
published stable release and its assets, the time of the check and the data
source. Builds read only this file.

```sh
GITHUB_TOKEN=$(gh auth token) npm run releases:update
```

The token is optional and only raises the API rate limit. The updater:

- uses one request per repository, at most four in parallel, with a timeout
  and two retries for network errors and 5xx responses (no retries for 404 or
  rate limiting);
- ignores drafts, prereleases and SemVer prerelease tags such as `v1.0.0-rc.1`;
- validates the complete result with a schema before writing;
- refuses to write if any repository fails or if a previously published stable
  release disappears;
- replaces the file atomically, so a failure always leaves the last good
  snapshot in place.

The [Update release snapshot](.github/workflows/update-releases.yml) workflow
runs weekly and on demand. When a release changed, it runs the data tests,
pushes the branch `automation/release-snapshot` and opens a pull request for
review. It never merges. Opening the pull request requires the repository
setting _Allow GitHub Actions to create and approve pull requests_; without
it, the workflow pushes the branch and asks you to open the pull request
manually. Pull requests opened with `GITHUB_TOKEN` do not trigger CI; close
and reopen the pull request or run CI manually before merging.

## Recommended downloads

A download button appears only when all of these hold:

1. The project has a published, non-draft, non-prerelease release in the snapshot.
2. A download rule in `projects.ts` names the exact asset (with `{version}`
   substituted) and marks it `recommended`.
3. The rule's signing state is installable as is: publisher-signed,
   release-signed, ad-hoc signed, unsigned desktop software, or a package
   format where signing does not apply.
4. The asset name does not mark a test or developer build (`TEST-ONLY`,
   `NOT-INSTALLABLE`, `REQUIRES-SIGNING`, `NOT-FOR-DEVICE`, `simulator`,
   `debug`, unsigned `.apk`, `.ipa`).
5. Android packages are release- or publisher-signed. iOS builds are never
   offered as downloads.
6. The file format belongs to the rule's operating system.

Rules that fail checks 3 to 6 are shown as "not available as a regular
install" with their status and a link to the release page and source code.
Tests fail if a rule marked `recommended` gets demoted, if a rule no longer
matches an asset, or if a declared checksum file is missing.

The page preselects the visitor's operating system from the user agent but
always shows the choice. Architecture is never guessed; every button lists it.
Checksum files are described as integrity checks, not as signatures.

Binaries are never copied into this repository: buttons link to the
projects' GitHub Releases.

## Screenshots

Use real screenshots of a released or locally built version, with no personal
data, tokens, private paths, QR pairing codes or user documents. Put the file
in `src/assets/screenshots/`, reference it from the project's `media` entry
with a descriptive `alt` text and a caption that says where the image comes
from, and keep the source image under about 300 KB. Astro generates resized
WebP versions with explicit dimensions. If a working screenshot is not
possible, use a `terminal` example built from documented commands and say
in the caption where the output comes from.

Current images:

- SpaceMosaic, Cambridge Dictionary Audio: captured for this site from local
  builds (version stated in the caption).
- MarginCarry: `docs/images/review.png` from the MarginCarry repository (Apache-2.0).
- Form Forge: start page of the public deployment, captured for this site.

## Deployment

[deploy.yml](.github/workflows/deploy.yml) builds and publishes `main` to
GitHub Pages. Pull requests run [ci.yml](.github/workflows/ci.yml) only.

One-time setup in the repository settings:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Optional: **Settings → Actions → General → Allow GitHub Actions to create
   and approve pull requests**, for the weekly snapshot pull request.

For a custom domain, set the repository variable `SITE_URL` (for example
`https://example.org`), configure the domain under Settings → Pages, and
redeploy. Canonical URLs, the sitemap and `robots.txt` follow `SITE_URL`.

## License

The site code and text are licensed under [Apache-2.0](LICENSE). Project
icons and screenshots belong to their projects and are used under those
projects' licenses (Apache-2.0, or MIT for ProtoCarry). Dictionary text
visible in the Cambridge Dictionary Audio screenshot comes from
dictionary.cambridge.org and remains subject to its terms.
