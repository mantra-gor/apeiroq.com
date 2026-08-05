import type { TechIconName } from "@/lib/tech-icons";

/**
 * The stack, for the Home tech-stack section.
 *
 * Content integrity (CLAUDE.md): a stack list is a capability claim, and this
 * one is long. Every item below must be something someone on the team has
 * actually shipped with — not something we have read about. Cut anything that
 * fails that test; a shorter honest list is worth more than a long aspirational
 * one, and a buyer will open the conversation by asking about the specific
 * items (LangGraph, Qdrant, Bedrock, CockroachDB).
 *
 * Names use each vendor's own casing on purpose. A stack list with the product
 * names misspelled undercuts the exact credibility the section exists to build.
 *
 * Order is deliberate: AI sits second rather than last. It is what an
 * international buyer is scanning for, and it reads as a team that has built
 * retrieval systems rather than one that has called an API once.
 *
 * `icon` is optional. Seven marks here have no glyph because their trademark
 * holders asked to be removed from the icon set we generate from — see
 * lib/tech-icons.ts. Those pills render as text, which is a normal state, not
 * a missing asset. Do not substitute a lookalike icon for them.
 */

export type TechItem = {
  name: string;
  icon?: TechIconName;
};

export type TechCategory = {
  name: string;
  items: TechItem[];
};

export const techStack: TechCategory[] = [
  {
    name: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Svelte", icon: "svelte" },
      { name: "Alpine.js", icon: "alpinedotjs" },
      { name: "Redux", icon: "redux" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "NestJS", icon: "nestjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Laravel", icon: "laravel" },
      { name: "FilamentPHP", icon: "filament" },
      { name: "Django", icon: "django" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Go", icon: "go" },
      { name: "Spring Boot", icon: "springboot" },
    ],
  },
  {
    name: "AI",
    items: [
      { name: "OpenAI (GPT)" },
      { name: "Google Gemini", icon: "googlegemini" },
      { name: "Claude", icon: "claude" },
      { name: "AWS Bedrock" },
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", icon: "langgraph" },
      { name: "Qdrant", icon: "qdrant" },
    ],
  },
  {
    name: "Mobile & desktop",
    items: [
      { name: "Android (Java/Kotlin)", icon: "android" },
      { name: "iOS (SwiftUI)", icon: "swift" },
      { name: "Flutter", icon: "flutter" },
      { name: "React Native", icon: "react" },
      { name: "Electron", icon: "electron" },
    ],
  },
  {
    name: "Databases",
    items: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "CockroachDB", icon: "cockroachlabs" },
      { name: "DynamoDB" },
      { name: "SQLite", icon: "sqlite" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    name: "Cloud",
    items: [
      { name: "AWS" },
      { name: "GCP", icon: "googlecloud" },
      { name: "Azure" },
      { name: "DigitalOcean", icon: "digitalocean" },
      { name: "Cloudflare", icon: "cloudflare" },
      { name: "Self-managed VPS" },
    ],
  },
  {
    name: "DevOps",
    items: [
      { name: "Jenkins", icon: "jenkins" },
      { name: "Azure DevOps" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
    ],
  },
  {
    name: "eCommerce",
    items: [
      { name: "WooCommerce", icon: "woocommerce" },
      { name: "Magento" },
      { name: "Shopify", icon: "shopify" },
    ],
  },
];
