import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes from the Apeiroq team — architecture decisions, the tradeoffs behind them, and what broke along the way.",
  alternates: { canonical: "/blog" },
};

// TODO (DESIGN.md §10): MDX posts from content/, statically generated, with
// BlogPosting JSON-LD per post. The blog is the growth engine — engineering
// depth, not "Top 10 Trends" filler.
export default function BlogPage() {
  return (
    <PageHero
      overline="Blog"
      title="How we build."
      lede="Architecture decisions, the tradeoffs behind them, and what broke. Written by the engineers who shipped it."
    />
  );
}
