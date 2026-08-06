/**
 * Regenerates lib/tech-icons.ts from simple-icons.
 *
 * simple-icons is intentionally NOT a dependency — it is 3,400+ icons we would
 * carry to use 38, and the output never changes on its own. To run this:
 *
 *   npm i -D simple-icons && node scripts/generate-tech-icons.mjs && npm un simple-icons
 *
 * If a slug disappears upstream the script throws rather than silently emitting
 * a short file. That usually means the trademark holder asked to be removed. In
 * that case move the mark into scripts/archived-tech-icons.mjs, pinned to the
 * last release that carried it — do not substitute a lookalike.
 */

import * as si from "simple-icons";
import { writeFileSync } from "node:fs";
import { archivedIcons } from "./archived-tech-icons.mjs";

const slugs = [
  "react", "nextdotjs", "svelte", "alpinedotjs", "redux",
  "nodedotjs", "express", "nestjs", "typescript", "laravel", "filament",
  "django", "fastapi", "go", "springboot",
  "googlegemini", "claude", "langchain", "langgraph", "qdrant",
  "android", "swift", "flutter", "electron",
  "mysql", "postgresql", "mongodb", "cockroachlabs", "sqlite", "firebase",
  "googlecloud", "digitalocean", "cloudflare",
  "jenkins", "docker", "kubernetes",
  "woocommerce", "shopify",
];

const all = Object.values(si).filter((i) => i && i.slug);
const byslug = new Map(all.map((i) => [i.slug, i]));

const missing = slugs.filter((s) => !byslug.has(s));
if (missing.length) throw new Error("missing: " + missing.join(", "));

// An archived mark that reappears upstream should be taken from upstream again,
// not carried here forever. Fail loudly rather than shipping the stale copy.
const revived = Object.keys(archivedIcons).filter((s) => byslug.has(s));
if (revived.length)
  throw new Error(
    "back in simple-icons, move to `slugs`: " + revived.join(", "),
  );

const format = (slug, icon) =>
  `  ${slug}: {\n    title: ${JSON.stringify(icon.title)},\n    path: ${JSON.stringify(icon.path)},\n  },`;

const entries = [
  ...slugs.map((s) => format(s, byslug.get(s))),
  ...Object.entries(archivedIcons).map(([s, icon]) => format(s, icon)),
].join("\n");

const header = `/**
 * Brand glyphs for the Home tech-stack section.
 *
 * DO NOT EDIT BY HAND — regenerate with scripts/generate-tech-icons.mjs.
 *
 * Generated from simple-icons (CC0-1.0 for the icon data; each mark remains the
 * trademark of its owner and is used here only to identify the technology).
 * Vendored rather than kept as a dependency, the same way React Bits components
 * are: it never changes on its own, and having it in the repo means the exact
 * set of marks we ship is reviewable in one file.
 *
 * The last six come from scripts/archived-tech-icons.mjs rather than from the
 * installed simple-icons, which no longer carries the Microsoft, Amazon, OpenAI
 * or Magento marks — see that file for provenance and for why we still ship
 * them. Everything above them is generated from the current release.
 *
 * Every path is a single 24x24 shape drawn in currentColor — no brand colours.
 * A wall of vendor colours would fight the two-colour palette in DESIGN.md §4;
 * monochrome glyphs read as one system and cost nothing.
 */

export type TechIcon = {
  title: string;
  /** Single path, 24x24 viewBox. */
  path: string;
};

export const techIcons = {
`;

writeFileSync(
  new URL("../lib/tech-icons.ts", import.meta.url),
  header + entries + "\n} as const satisfies Record<string, TechIcon>;\n\nexport type TechIconName = keyof typeof techIcons;\n",
);

const paths = [
  ...slugs.map((s) => byslug.get(s).path),
  ...Object.values(archivedIcons).map((i) => i.path),
];
const bytes = paths.reduce((n, p) => n + p.length, 0);
console.log("icons:", paths.length, "total path bytes:", bytes);
