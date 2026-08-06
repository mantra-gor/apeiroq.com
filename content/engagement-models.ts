/**
 * Engagement models — the three ways an engagement is structured.
 *
 * DESIGN.md §11 puts engagement models on /hire-us and /about. This is the
 * Home summary of the same three, not a second source of truth: when /hire-us
 * is built it should import this file rather than restate it, or the two pages
 * will drift and a buyer will notice.
 *
 * TODO (confirm before launch): the descriptions below are definitional — they
 * say what each model *is*, and deliberately commit to no team size, duration,
 * price, or notice period. Those are commercial terms and none of them is
 * invented here. If any model is not actually offered today, delete it; three
 * real options beat three that sound complete.
 */

export type EngagementModel = {
  id: string;
  title: string;
  /** One sentence. What the model is — never what it costs. */
  description: string;
};

export const engagementModels: EngagementModel[] = [
  {
    id: "end-to-end",
    title: "End-to-End Product Development",
    description:
      "We take the product from discovery through architecture, build, and launch, then keep improving it.",
  },
  {
    id: "dedicated-team",
    title: "Dedicated Engineering Team",
    description:
      "Engineers working as part of your team, on your roadmap, for the length of the engagement.",
  },
  {
    id: "consulting",
    title: "Technical Consulting & Architecture",
    description:
      "Architecture review, technical direction, and delivery planning without a full build.",
  },
];
