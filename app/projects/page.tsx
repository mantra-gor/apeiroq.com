import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Products we built to a thesis, then reshaped for the clients who wanted them. Problem, approach, stack, and what actually changed.",
  alternates: { canonical: "/projects" },
};

// TODO (DESIGN.md §11): the 3-4 prototypes as work cards, each linking to a
// case study running problem -> thesis -> what we built -> stack -> outcome.
// Blocked on real screenshots and client sign-off. Say "prototype" when it is
// one — that honesty is the differentiator.
export default function ProjectsPage() {
  return (
    <PageHero
      overline="Projects"
      title="Products built to a thesis."
      lede="Each of these started as our own product bet. Clients saw them, and asked us to reshape them into something of their own."
    />
  );
}
