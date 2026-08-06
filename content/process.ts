/**
 * "How we work" — the numbered process timeline on Home (DESIGN.md §2 #4).
 *
 * Eight steps, from first domain conversation to life after launch. Rendered
 * by ProcessStepper as four paged pairs, so the array order is the reading
 * and paging order at every breakpoint — never reorder for layout reasons.
 *
 * This section carries the positioning from DESIGN.md §1: twelve engineers, no
 * bench, no handoff to a delivery team you never met. Small stated as the
 * advantage it is. The claim is threaded through steps 04, 05, 06 and 08 rather
 * than repeated — the designer builds, the author fixes, the architect stays.
 * Every line here must stay true of how we actually operate.
 *
 * TODO (confirm before adding): the testing step deliberately claims no
 * second-engineer review, staging environment, or automated CI, and deployment
 * claims monitoring carried over from the old copy. Confirm what is genuinely
 * true today — all three would sharpen 06, and "monitored" should go if nothing
 * is actually watched in production.
 */

export type ProcessStep = {
  /** Rendered as an oversized Sora numeral. */
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We learn the domain before proposing anything: what the system must do, what it must never do, which constraints are real.",
  },
  {
    number: "02",
    title: "Product Concept",
    description:
      "Scope, flows, and a first visual direction, early enough to argue with. Cutting a feature costs a conversation, not a sprint.",
  },
  {
    number: "03",
    title: "Architecture",
    description:
      "Data model, service boundaries, hosting. The reasoning gets written down so it can be questioned before code depends on it.",
  },
  {
    number: "04",
    title: "Design",
    description:
      "Interfaces drawn against the real data model, not a blank canvas. Whoever builds the screen helped decide how it behaves.",
  },
  {
    number: "05",
    title: "Development",
    description:
      "The people who drew the screens write the code for them, in iterations you can follow. No bench, no subcontractors.",
  },
  {
    number: "06",
    title: "Testing",
    description:
      "Tested against the edge cases discovery turned up, not just the happy path. Whoever wrote the code fixes what it breaks.",
  },
  {
    number: "07",
    title: "Deployment",
    description:
      "Deployed, monitored, documented. You get a written handover, not a call where someone talks quickly.",
  },
  {
    number: "08",
    title: "Continuous Improvement",
    description:
      "We stay on past launch. The people who made the architecture decisions are the ones who live with them under load.",
  },
];
