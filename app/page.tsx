import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { HowWeWork } from "@/components/sections/how-we-work";
import { CaseStudies } from "@/components/sections/case-studies";
import { TechStack } from "@/components/sections/tech-stack";
import { EngineeringPrinciples } from "@/components/sections/engineering-principles";
import { WhyApeiroq } from "@/components/sections/why-apeiroq";
import { EngagementModels } from "@/components/sections/engagement-models";
import { Faq } from "@/components/sections/faq";
import { Testimonials } from "@/components/sections/testimonials";
import { Newsletter } from "@/components/sections/newsletter";
import { ClosingCta } from "@/components/sections/closing-cta";

/**
 * Home. Section order follows DESIGN.md §11, with the tech stack added between
 * the work and the client proof.
 *
 * Canvases alternate — dark, light, tint, light, dark, light, tint, light,
 * tint, light, tint, dark — so the page has rhythm without a third surface
 * being invented. Check this when adding a section: the content-gated ones
 * (below) drop out of the sequence, so a new section has to alternate against
 * whatever survives on either side of it, not just its neighbours in the JSX.
 *
 * Three sections render nothing until their content files are filled in:
 *
 *   CaseStudies   content/case-studies.ts   — real screenshots and outcomes
 *   Testimonials  content/testimonials.ts   — three attributed, permitted quotes
 *   Faq           content/faqs.ts           — seven answers, several contractual
 *
 * That is deliberate. Scaffolding them with placeholder companies or invented
 * metrics is the one thing CLAUDE.md rules out absolutely, and filler ships.
 * The FAQ is per-question rather than all-or-nothing: each answer appears as
 * someone commits to it.
 *
 * The §11 §2 slot is now SocialProof — capability labels, not the three client
 * logos that section specifies. Those still need signed permission; see the
 * note in social-proof.tsx for what replaces what once they land.
 *
 * Still blocked on assets, not built: the team strip (§11 §7, needs a real
 * photo).
 *
 * Metadata: the root layout already owns this route's title, description and
 * canonical, plus Organization + WebSite JSON-LD. Home is not nested, so there
 * is no BreadcrumbList to add.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <SocialProof /> */}
      <WhatWeDo />
      <HowWeWork />
      <CaseStudies />
      <TechStack />
      <EngineeringPrinciples />
      <WhyApeiroq />
      <EngagementModels />
      <Faq />
      <Testimonials />
      {/* <Newsletter /> */}
      {/* <ClosingCta /> */}
    </>
  );
}
