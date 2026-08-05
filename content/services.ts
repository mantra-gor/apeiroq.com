/**
 * "What we do" — the three disclosure cards on Home (DESIGN.md §2 #3).
 *
 * Voice check (DESIGN.md §1): each body explains a decision to an engineer who
 * is paying for it. No "cutting-edge", no "passionate", nothing padded.
 *
 * TODO (confirm before launch): the two-week product concept turnaround in the
 * first card is the one committing promise on this page. It ships as written
 * only if we can hold it.
 */

export type Service = {
  id: string;
  title: string;
  /** One line, visible in the collapsed state. */
  summary: string;
  /** Revealed by the disclosure. Stays in the DOM — crawlable. */
  detail: string;
  /** Bulleted specifics. Concrete nouns only. */
  points: string[];
};

export const services: Service[] = [
  {
    id: "product-concept",
    title: "Product concept",
    summary: "A validated scope and a roadmap in two weeks.",
    detail:
      "A short, fixed engagement before anyone commits to a build. You end it holding a visual design concept, a scope we have argued down to what actually matters, and a roadmap with the risky parts named. If the answer is that the product should not be built the way you planned, you find out in week two rather than month six.",
    points: [
      "Visual design concept",
      "Validated scope",
      "Product roadmap",
      "Named technical risks",
    ],
  },
  {
    id: "architecture-planning",
    title: "Architecture planning",
    summary: "The decisions that are expensive to reverse, made first.",
    detail:
      "Architecture is how the parts of a system agree to talk to each other, and it is the layer you cannot cheaply change once there is traffic on it. We decide it deliberately and write down why, so the system still holds when usage grows and so the next engineer inherits reasoning rather than archaeology.",
    points: [
      "Database design",
      "API structure",
      "Infrastructure planning",
      "Security architecture",
    ],
  },
  {
    id: "agile-development",
    title: "Agile development",
    summary: "Short iterations. Working software at the end of each one.",
    detail:
      "We build in sprints rather than delivering one large system at the end. Every iteration closes with something you can open and use, which keeps the feedback loop short and means scope changes cost days instead of quarters. You see the same board we do.",
    points: [
      "Working software every sprint",
      "Shared backlog and board",
      "Demo at the end of each iteration",
      "Scope changes priced before they land",
    ],
  },
];
