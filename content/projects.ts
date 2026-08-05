/**
 * Products and prototypes — the work cards in the Home rail (DESIGN.md §2 #2,
 * #6) and the index behind /projects.
 *
 * CONTENT INTEGRITY — read before editing (CLAUDE.md):
 * Real work only. No placeholder companies, no stock screenshots, no invented
 * outcomes. The Case studies section renders nothing while this array is empty.
 *
 * Framing (DESIGN.md §1, §11): say "prototype" when it is one. "Built as a
 * product thesis, then customised and shipped for X" is a stronger claim than
 * pretending to a portfolio we do not have — it reads as independent product
 * thinking, which is rarer than contract delivery.
 *
 * TODO: awaiting the three to four real entries. Each needs:
 *   title · one-line outcome · slug · screenshot (real product UI, not a mock)
 *   · optional client outcome stat, only where the client permits publishing it
 *
 * `outcome` is the DESIGN.md §5 stat pattern: it reports the client's result,
 * never a company-level vanity counter, and never ships unsourced.
 */

export type Project = {
  slug: string;
  title: string;
  /** One line, sits on the image. */
  summary: string;
  /** Path under /public. Real screenshot, fixed aspect ratio. */
  image: string;
  imageAlt: string;
  /** Optional, publishable client result. Omit rather than approximate. */
  outcome?: {
    stat: string;
    label: string;
  };
};

export const projects: Project[] = [];
