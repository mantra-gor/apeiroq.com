import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { HowWeWork } from "@/components/sections/how-we-work";
import { CaseStudies } from "@/components/sections/case-studies";
import { TechStack } from "@/components/sections/tech-stack";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { ClosingCta } from "@/components/sections/closing-cta";

/**
 * Home. Section order follows DESIGN.md §11, with the tech stack added between
 * the work and the client proof.
 *
 * Canvases alternate — dark, light, tint, light, dark, light, tint, dark — so
 * the page has rhythm without a third surface being invented.
 *
 * Two sections render nothing until their content files are filled in:
 *
 *   CaseStudies   content/projects.ts       — real screenshots and outcomes
 *   Testimonials  content/testimonials.ts   — three attributed, permitted quotes
 *
 * That is deliberate. Scaffolding them with placeholder companies or invented
 * metrics is the one thing CLAUDE.md rules out absolutely, and filler ships.
 *
 * Still blocked on assets, not built: the trust bar (§11 §2, needs 3 real
 * client logos) and the team strip (§11 §7, needs a real photo).
 *
 * Metadata: the root layout already owns this route's title, description and
 * canonical, plus Organization + WebSite JSON-LD. Home is not nested, so there
 * is no BreadcrumbList to add.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <HowWeWork />
      <CaseStudies />
      <TechStack />
      <Testimonials />
      <Newsletter />
      <ClosingCta />
    </>
  );
}
