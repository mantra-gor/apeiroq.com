/**
 * "How we work" — the numbered process timeline on Home (DESIGN.md §2 #4).
 *
 * This section carries the positioning from DESIGN.md §1: twelve engineers, no
 * bench, no handoff to a delivery team you never met. Small stated as the
 * advantage it is. Every line here must stay true of how we actually operate.
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
      "We learn the domain before we propose anything. What the system has to do, what it must never do, and which constraints are real.",
  },
  {
    number: "02",
    title: "Prototype",
    description:
      "Something you can open and click, early. Arguing about a working screen is faster than arguing about a document.",
  },
  {
    number: "03",
    title: "Iterate",
    description:
      "Short sprints, a demo at the end of each. You review the same board we work from, so nothing about progress is a surprise.",
  },
  {
    number: "04",
    title: "Ship",
    description:
      "Deployed, monitored, and documented. Handover is a written system, not a call where someone talks quickly.",
  },
  {
    number: "05",
    title: "Scale",
    description:
      "We stay on past launch. The team that made the architecture decisions is the team that lives with them under load.",
  },
];
