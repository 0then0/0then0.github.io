# Changelog

All notable changes to this site are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Home page with task shortcuts and the six projects that have product pages.
- Catalog of 28 projects with search and filters for audience, task,
  platform and availability; filter state is kept in the URL.
- Product pages for SpaceMosaic, Cambridge Dictionary Audio, MarginCarry,
  BatteryBridge, Form Forge and DBReduce, with screenshots or command
  examples, platform evidence, limitations, first-run steps and downloads.
- Download selection rules that exclude prereleases, drafts, debug,
  unsigned Android and iOS builds from download buttons.
- Committed release snapshot with a validated, failure-safe updater and a
  weekly workflow that proposes changes as a pull request.
- About page, 404 page, sitemap, robots.txt, Open Graph metadata and
  structured data for product pages.
- CI, GitHub Pages deployment, external link check and Dependabot configuration.
- Quiet animated background of monospace glyphs (WebGL2) filling the whole
  home page hero, matched to the light and dark themes, with reduced-motion, no-WebGL
  and no-JavaScript fallbacks.
- Interface in seven languages (English, Russian, Spanish, German, French,
  Japanese, Brazilian Portuguese) with a language menu, `hreflang` links and
  localized catalog texts; product descriptions remain in English.
- Biome for formatting and linting, run in CI and by `npm run verify`.
