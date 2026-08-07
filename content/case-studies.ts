/**
 * Case studies — the work cards in the Home rail (DESIGN.md §2 #2, #6), the
 * index behind /case-studies, and the source for each /case-studies/[slug].
 *
 * There is no separate "projects" list. Everything we publish about our work is
 * a case study: a named problem, the product we built against it, and what
 * changed. A screenshot with a title and no problem is a portfolio tile, and a
 * portfolio of four tiles reads as thin (DESIGN.md §11) — the problem → product
 * → outcome structure is what makes a small body of work read as depth.
 *
 * CONTENT INTEGRITY — read before editing (CLAUDE.md):
 * Real work only. No placeholder companies, no stock screenshots, no invented
 * outcomes. Every section that reads this file renders nothing while it is
 * empty, and /case-studies/[slug] 404s. Add real entries and they appear.
 *
 * Framing (DESIGN.md §1, §11): say "prototype" when it is one. "Built as a
 * product thesis, then customised and shipped for X" is a stronger claim than
 * pretending to a portfolio we do not have — it reads as independent product
 * thinking, which is rarer than contract delivery.
 *
 * TODO: awaiting the three to four real entries. Each needs:
 *   title · one-line summary · slug · screenshot (real product UI, not a mock)
 *   · the problem in the client's own terms · how the product solves it
 *   · the stack · optional outcome stat, only where the client permits
 *     publishing it
 *
 * `outcome` is the DESIGN.md §5 stat pattern: it reports the client's result,
 * never a company-level vanity counter, and never ships unsourced.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  /** One line, sits on the image. What the product is. */
  summary: string;
  /** Path under /public. Real screenshot, fixed aspect ratio. */
  image: string;
  imageAlt: string;
  /**
   * The situation before we built anything, stated concretely — the cost,
   * the manual step, the thing that broke at scale. No generic pain points.
   */
  problem: string;
  /**
   * How the product removes that problem. Mechanism, not adjectives: what it
   * does, and why that answers the paragraph above.
   */
  solution: string;
  /** What we actually built, in order. Screens over prose — keep each short. */
  build?: string[];
  /** Technologies used. Names only; the reader can infer the rest. */
  stack?: string[];
  /** Optional, publishable client result. Omit rather than approximate. */
  outcome?: {
    stat: string;
    label: string;
  };
};

export const caseStudies: CaseStudy[] = [];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
