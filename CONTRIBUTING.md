# Contributing

This repository contains the catalog site only. Bugs in a listed project
belong in that project's issue tracker.

## Setup

```sh
npm ci
npx playwright install chromium
npm run verify
```

Use Node.js from `.nvmrc` and npm. Do not add a second lockfile.

## Pull requests

- Keep changes focused and explain the user-visible effect.
- Run `npm run format`, then `npm run verify`, and say in the pull request which checks you ran.
- Use Conventional Commits in English, for example `feat(catalog): add LANPair page`.
- Do not add tracking, cookies, third-party scripts or remote fonts.
- Do not commit binaries, tokens, private paths or personal data.

## Adding a project

1. Add an entry to `src/data/projects.ts`. Required fields:
   - `task`: one concrete sentence about the problem it solves;
   - `category` and `audience`: pick an existing value from `src/lib/types.ts`;
   - `platforms`: only platforms with a usable build or a documented way to
     run it; put platforms that only have code or test builds in
     `previewPlatforms`;
   - `availability`, `environment`, `license`;
   - `maturity` only if the project itself declares alpha or experimental status;
   - `fork` for forks, naming the upstream repository.
2. Copy the project's own icon unchanged to `src/assets/icons/<slug>.svg`
   if it has one. Do not redraw icons.
3. Run `npm run releases:update` so the snapshot includes the repository.
4. Run `npm test`. The data tests check that the repository is in the
   snapshot and that the icon exists.

Course exercises and forks without meaningful changes are not listed.

### Adding a product page

Add a `detail` block only when the project is ready for users and you can
show what it looks like. Write for the visitor: describe tasks and
scenarios, not the implementation, and keep every limitation that affects
whether it will work for them.

- `support`: one line per platform with the strongest evidence that exists:
  `runtime-verified` (it was run and checked), `user-tested`, `ci-build`, or
  `declared`. A successful build is not a runtime check.
- `media`: a real screenshot, or a `terminal` example with a caption that
  says where the output comes from. Never present a mockup as the product.
- `primary`: `download` when there is a recommended installer, otherwise
  `get-started` or `try` with a link.
- `firstRun`: the shortest path to a first result.
- `downloads`: see below.

### Translating a new project

Add the project's `task` and `environment` (and `tagline`, `primary`,
`secondary`, `forkNote`, `downloadNote` where the English entry has them) to
every file in `src/i18n/projects/`. For a product page, also translate its
`detail` prose: summary, audience, scenarios, media captions and alt text,
platform notes, limitations, first-run text and `downloadSteps` keyed by
download-rule ID. Keep the same array order and length as the English entry.
Do not translate commands, recorded output, file names or rule identifiers.
A new download format label goes into
`terms` in every file in `src/i18n/messages/`. `npm test` lists anything
missing.

## Download rules

Each rule describes one release asset:

```ts
{
  id: 'macos-dmg',
  os: 'macos',
  arch: 'Apple Silicon (arm64)',
  label: 'Disk image (.dmg)',
  asset: 'app-{version}-macos-arm64.dmg', // exact name, {version} = tag without "v"
  signing: 'ad-hoc',
  role: 'recommended',                    // or 'alternative' or 'test'
  requires: 'macOS 14+',
  steps: ['Open the DMG and drag the app to Applications.'],
}
```

Take signing states and requirements from the project's own documentation.
Mark debug APKs, unsigned APKs, unsigned iOS archives and simulator builds as
`test`; `downloads.ts` also refuses to recommend them if a rule is wrong.
List the checksum file in `checksumAsset` when the release has one.

When a project renames its assets, `npm test` fails with the rule that no
longer matches. Update the rule rather than pointing it at a different file.

## Release metadata

Never edit `src/data/releases.json` by hand. Run:

```sh
GITHUB_TOKEN=$(gh auth token) npm run releases:update
```

If the command fails, the previous snapshot is kept; fix the cause (network,
rate limit, a removed release) and run it again. Review the diff before
committing.

## Screenshots

- Capture a released or locally built version with neutral sample data.
- Remove or avoid personal names, paths that identify a person, tokens,
  account data, QR pairing codes and private documents.
- Save to `src/assets/screenshots/` as PNG or JPEG under about 300 KB.
- Write an `alt` text that describes what the screenshot shows, and a
  caption that says the version and where the image comes from.
- Respect the license of images taken from other repositories and mention
  the source in the caption.

## Design rules

- Monochrome palette, one green accent, hairline borders, 6 px radius.
- Colors are tokens in `src/styles/global.css` with light and dark values.
- Every control needs a visible label and a visible focus style.
- Content must work without JavaScript; scripts only enhance it.
- The glyph background of the home hero is the only animated element; keep it faint. Keep motion slow, stop it
  outside the viewport, and keep a still version for reduced motion.
