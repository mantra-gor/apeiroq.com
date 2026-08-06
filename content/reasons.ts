/**
 * "Why businesses choose Apeiroq" — the objection-handling grid on Home.
 *
 * Each entry answers a question a buyer is already asking silently: who will I
 * actually work with, will I know what is happening, will this survive growth,
 * do they understand my business, what happens after launch, how do we start.
 *
 * Voice check (DESIGN.md §1): every answer is one declarative sentence. No
 * "cutting-edge", no "passionate", nothing padded.
 *
 * Content check (CLAUDE.md): these are capabilities and commitments, not
 * metrics. Nothing here needs a number to be true, which is why none is
 * invented. Anything that later earns a figure belongs in the §2 #5 outcome
 * stat pattern attached to a named client — not here.
 */

export type Reason = {
  id: string;
  title: string;
  /** One sentence. The whole answer. */
  description: string;
};

export const reasons: Reason[] = [
  {
    id: "direct-engineering-team",
    title: "Direct Engineering Team",
    description: "You'll collaborate with the people writing the code.",
  },
  {
    id: "transparent-delivery",
    title: "Transparent Delivery",
    description: "Sprint planning, demos, and continuous communication.",
  },
  {
    id: "scalable-architecture",
    title: "Scalable Architecture",
    description: "Built to grow with your business.",
  },
  {
    id: "business-first-thinking",
    title: "Business-First Thinking",
    description: "Technology decisions driven by business outcomes.",
  },
  {
    id: "long-term-partnership",
    title: "Long-Term Partnership",
    description: "We stay after launch.",
  },
  {
    id: "flexible-engagement",
    title: "Flexible Engagement",
    description: "Dedicated teams or project-based development.",
  },
];
