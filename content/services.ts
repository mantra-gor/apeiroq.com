/**
 * "What we do" — the four service cards on Home (DESIGN.md §11 §3).
 *
 * These are one engagement read in order, not a menu to pick from: validate,
 * architect, build, then the years after launch. The order is the content,
 * which is why the section renders them as an ordered list.
 *
 * One sentence each, and nothing hidden behind it. Anything that would need a
 * second layer — a turnaround, a price, a team size — is a commitment someone
 * has to sign off, and belongs on /hire-us rather than here.
 *
 * Voice check (DESIGN.md §1): declarative, concrete nouns, no padding.
 */

export type Service = {
  id: string;
  title: string;
  /** The whole card. There is no expanded state behind it. */
  description: string;
};

export const services: Service[] = [
  {
    id: "product-strategy",
    title: "Product Strategy",
    description:
      "Transform ideas into validated product concepts with clear scope, user journeys, technical direction, and execution planning.",
  },
  {
    id: "architecture-engineering",
    title: "Architecture & Engineering",
    description:
      "Design scalable systems that remain maintainable as your business grows.",
  },
  {
    id: "agile-product-development",
    title: "Agile Product Development",
    description:
      "Ship software through iterative development with continuous feedback and transparent progress.",
  },
  {
    id: "long-term-partnership",
    title: "Long-Term Partnership",
    description:
      "Support, maintenance, feature expansion, and technical consulting after launch.",
  },
];
