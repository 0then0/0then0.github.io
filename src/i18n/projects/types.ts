/** Translated catalog texts of one project. Product page bodies stay in English. */
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
}

export type ProjectTexts = Record<string, ProjectText>;
