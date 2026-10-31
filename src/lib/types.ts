/**
 * Editorial model of the catalog. The label maps below define the valid keys
 * and the English wording; translations live in src/i18n/messages. Everything here is written by hand and
 * reviewed; release versions, dates and assets come from the snapshot in
 * src/data/releases.json instead.
 */

export const CATEGORIES = {
  devices: 'Devices and networks',
  learning: 'Learning and languages',
  documents: 'Documents and research',
  media: 'Games and music',
  forms: 'Forms and web services',
  databases: 'Databases and data files',
  ci: 'CI and dependencies',
  testing: 'Testing and reliability',
  metrics: 'Metrics and usage',
} as const;
export type Category = keyof typeof CATEGORIES;

export const AUDIENCES = {
  everyone: 'Apps for everyone',
  developers: 'Developer tools',
} as const;
export type Audience = keyof typeof AUDIENCES;

export const PLATFORMS = {
  windows: 'Windows',
  macos: 'macOS',
  linux: 'Linux',
  android: 'Android',
  ios: 'iOS',
  web: 'Web browser',
} as const;
export type Platform = keyof typeof PLATFORMS;

export const AVAILABILITY = {
  download: 'Downloadable build',
  package: 'Package manager',
  web: 'Opens in a browser',
  source: 'Build from source',
} as const;
export type Availability = keyof typeof AVAILABILITY;

/** How strongly a platform claim is backed. Never upgrade a claim beyond its evidence. Labels live in src/i18n. */
export type Evidence = 'runtime-verified' | 'user-tested' | 'ci-build' | 'declared';

export type Os = 'windows' | 'macos' | 'linux' | 'android' | 'ios' | 'browser' | 'zotero' | 'any';

/**
 * Signing state of a release asset as documented by the project.
 * Only some states may ever become a recommended download, see downloads.ts.
 */
export type Signing =
  | 'publisher-signed'
  | 'release-signed'
  | 'ad-hoc'
  | 'unsigned'
  | 'not-applicable'
  | 'debug-test-only'
  | 'unsigned-not-installable'
  | 'requires-signing'
  | 'simulator-only';

export interface DownloadRule {
  /** Stable identifier, unique within a project. */
  id: string;
  os: Os;
  /** Architecture as published, e.g. "x86-64", "Apple Silicon (arm64)", "Universal". */
  arch: string;
  /** Short format label such as "Installer (.exe)". */
  label: string;
  /** Exact asset name; `{version}` is replaced by the tag without a leading "v". */
  asset: string;
  signing: Signing;
  /**
   * Editorial intent. `recommended` is still subject to the safety checks in
   * downloads.ts; `alternative` is shown as a secondary link; `test` is never
   * offered as a download button.
   */
  role: 'recommended' | 'alternative' | 'test';
  /** Minimum OS or runtime requirement shown next to the button. */
  requires?: string;
  /** Short installation steps for this asset. */
  steps: readonly string[];
}

export interface TerminalExample {
  kind: 'terminal';
  /** Omit to show a documented result on its own. */
  command?: string;
  /** Real or documented output only; never a paraphrase. */
  output?: string;
  /** Where the output comes from; shown under the example. */
  caption: string;
}

export interface ScreenshotMedia {
  kind: 'screenshot';
  /** File name under src/assets/screenshots/. */
  file: string;
  alt: string;
  caption: string;
}

export type Media = TerminalExample | ScreenshotMedia;

export interface PlatformSupport {
  platform: string;
  evidence: Evidence;
  note: string;
}

export interface Step {
  text: string;
  code?: string;
}

export interface PrimaryAction {
  kind: 'download' | 'try' | 'get-started';
  label: string;
  /** Required for `try` and `get-started`; downloads resolve from the snapshot. */
  href?: string;
}

export interface ProductDetail {
  tagline: string;
  summary: string;
  audience: readonly string[];
  scenarios: readonly { title: string; text: string }[];
  media: readonly Media[];
  primary: PrimaryAction;
  secondary?: readonly { label: string; href: string; note?: string }[];
  support: readonly PlatformSupport[];
  limitations: readonly string[];
  firstRun: readonly Step[];
  downloads?: readonly DownloadRule[];
  /** Package manager install, for tools distributed through PyPI and similar. */
  packageInstall?: { registry: string; url: string; command: string };
  checksumAsset?: string;
  /** Short explanation for test-only or source-only situations. */
  downloadNote?: string;
  links: {
    docs: string;
    changelog?: string;
  };
}

export interface CatalogEntry {
  slug: string;
  name: string;
  /** owner/name on GitHub. */
  repo: string;
  /** One concrete sentence: what problem it solves. */
  task: string;
  category: Category;
  audience: Audience;
  /** Platforms with a usable build or a supported way to run it. Used by filters. */
  platforms: readonly Platform[];
  /** Platforms with code or test builds only; never counted as supported in filters. */
  previewPlatforms?: readonly Platform[];
  /** Runtime or host requirement in plain words. */
  environment: string;
  availability: readonly Availability[];
  /** Only when the project itself declares it. */
  maturity?: 'alpha' | 'experimental';
  license: string;
  /** Project icon file under src/assets/icons/, copied unchanged from the project. */
  icon?: string;
  homepage?: string;
  fork?: { upstream: string; note: string };
  featured?: boolean;
  detail?: ProductDetail;
}
