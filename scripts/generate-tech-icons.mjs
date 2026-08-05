/**
 * Regenerates lib/tech-icons.ts from simple-icons.
 *
 * simple-icons is intentionally NOT a dependency — it is 3,400+ icons we would
 * carry to use 38, and the output never changes on its own. To run this:
 *
 *   npm i -D simple-icons && node scripts/generate-tech-icons.mjs && npm un simple-icons
 *
 * If a slug disappears upstream the script throws rather than silently emitting
 * a short file. That usually means the trademark holder asked to be removed, in
 * which case drop the `icon` key from that item in content/tech-stack.ts and
 * add it to the "deliberately absent" list — do not substitute a lookalike.
 */

import * as si from "simple-icons";
import { writeFileSync } from "node:fs";

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

const entries = slugs
  .map((s) => {
    const icon = byslug.get(s);
    return `  ${s}: {\n    title: ${JSON.stringify(icon.title)},\n    path: ${JSON.stringify(icon.path)},\n  },`;
  })
  .join("\n");

const header = `/**
 * Brand glyphs for the Home tech-stack section.
 *
 * Generated from simple-icons (CC0-1.0 for the icon data; each mark remains the
 * trademark of its owner and is used here only to identify the technology).
 * Vendored rather than kept as a dependency, the same way React Bits components
 * are: this is 38 paths, it never changes on its own, and having it in the repo
 * means the exact set of marks we ship is reviewable in one file.
 *
 * Regenerate by re-running the generator against a newer simple-icons.
 *
 * Every path is a single 24x24 shape drawn in currentColor — no brand colours.
 * A wall of vendor colours would fight the two-colour palette in DESIGN.md §4;
 * monochrome glyphs read as one system and cost nothing.
 *
 * Deliberately absent: OpenAI, AWS, DynamoDB, Azure, Azure DevOps, Magento and
 * React Native. simple-icons removed those marks at the trademark holders'
 * request, so we do not ship them either. Those items render as text-only
 * pills, which the section handles as a normal state rather than a fallback.
 */

export type TechIcon = {
  title: string;
  /** Single path, 24x24 viewBox. */
  path: string;
};

export const techIcons = {
`;

writeFileSync(
  "/Users/mantragor/Developer/apeiroq.com/lib/tech-icons.ts",
  header + entries + "\n} as const satisfies Record<string, TechIcon>;\n\nexport type TechIconName = keyof typeof techIcons;\n",
);

const bytes = slugs.reduce((n, s) => n + byslug.get(s).path.length, 0);
console.log("icons:", slugs.length, "total path bytes:", bytes);
