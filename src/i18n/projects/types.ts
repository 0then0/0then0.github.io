/** Translated catalog texts of one project. Includes the prose on product pages. */
export interface ProjectText {
  task: string;
  environment: string;
  /** Only for forks whose display name contains English words. */
  name?: string;
  tagline?: string;
  primary?: string;
  /** Parallel to detail.secondary in projects.ts. */
  secondary?: readonly { label: string; note?: string }[];
  forkNote?: string;
  downloadNote?: string;
  detail?: ProductDetailText;
}

export type ProjectTexts = Record<string, ProjectText>;

/** Prose only. Commands, release rules, file names and evidence levels stay in the source entry. */
export interface ProductDetailText {
  summary: string;
  audience: readonly string[];
  scenarios: readonly { title: string; text: string }[];
  media: readonly { alt?: string; caption: string }[];
  support: readonly { platform: string; note: string }[];
  limitations: readonly string[];
  firstRun: readonly string[];
  downloadSteps: Readonly<Record<string, readonly string[]>>;
}
