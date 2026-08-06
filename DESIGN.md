# Apeiroq — Design System & Site Blueprint

**Brand:** Apeiroq · **Domain:** apeiroq.com · **Tagline:** *Scale Beyond Limits*
**What we sell:** custom software engineering for international clients, built by a fully remote team of 12.

This document is the single source of truth for how the site looks, moves, reads, and performs.
Engineering conventions live in [CLAUDE.md](CLAUDE.md). When the two disagree, this file wins on *design*, CLAUDE.md wins on *implementation*.

---

## 1. Positioning

We are a bootstrapped startup with **3 clients** and **3–4 in-house prototypes** that clients liked enough to ask for customization. We do not have impressive numbers yet. The entire design strategy follows from that one fact.

**The rule: we buy trust with craft, not with claims.**

A visitor decides in ~5 seconds whether we are a serious international vendor or a freelancer collective with a template. The site earns that verdict through execution quality — typography, spacing discipline, motion restraint, page speed — not through "500+ projects delivered."

| Never do this | Do this instead |
| --- | --- |
| "500+ projects", "98% satisfaction", fabricated counters | Show the work: real prototypes, real screens, real architecture decisions |
| Grey placeholder logo walls | 3 real client logos, larger, with the outcome named next to each |
| "World-class team of experts" | "12 engineers. One timezone-agnostic process. You talk to the people writing the code." |
| Stock photos of handshakes in boardrooms | Real code, real terminals, real teams working (video — see §8) |
| Hiding that we're small | Leading with it as an advantage: senior-only, no account-manager layer, direct access |

Small is a feature. Frame it that way everywhere: **no bench, no juniors billed as seniors, no handoff to a delivery team you never met.**

### Voice

Declarative, specific, unpadded. Short sentences. Concrete nouns. No exclamation marks, no "leverage", "cutting-edge", "synergy", "we are passionate about". Write like an engineer explaining a decision to another engineer who is paying for it.

- ✅ "Three products. Each one built to a thesis, then reshaped for the client who wanted it."
- ❌ "We deliver innovative, cutting-edge solutions that empower businesses to thrive."

---

## 2. Reference points — Apple × Tallium

Two references, used for different things. Do not blend them evenly.

- **[apple.com](https://apple.com) → the visual system.** Restraint, scale, whitespace, monochrome discipline, full-bleed media, one idea per screen. Governs *how it looks*.
- **[tallium.com/en](https://tallium.com/en) → the UI/UX pattern library.** A software agency's interaction vocabulary: how a card behaves, how a service expands, how work is browsed, how a form asks for a brief. Governs *how it works*.

**The translation rule:** take Tallium's *mechanics*, re-skin them in our system. Tallium signals with color (orange, teal, blue, pink gradients on every card); we signal with **motion, hairlines, and one Ember arrow**. Same affordance, different material. Any pattern below that arrives carrying a gradient loses it at the door.

### UI/UX patterns to adopt

**1. The arrow as affordance language** — Tallium marks every clickable with an orange `→`. Adopt it exactly, in Ember. On a monochrome site this does the work color usually does. Spec: 16px stroked arrow, `currentColor` inheriting to Ember on interactive parents, translates **+4px on hover/focus** over 160ms, `aria-hidden` (the link text carries meaning). Every card, link-out, and secondary CTA gets one. Never on a primary button — the fill is already the signal.

**2. Work card** — Tallium: layered image + colored blur overlay + title + short description + arrow. Ours: full-bleed screenshot, `--radius-xl`, ink scrim gradient bottom-up, title and one-line outcome sitting *on* the image, arrow bottom-right.

- Hover: image `scale(1.03)` (400ms, `--ease-out-expo`), scrim opacity 0.85→0.7, arrow +4px, card lift `translateY(-2px)` + the single permitted shadow.
- Image is inside `overflow-hidden` with a fixed `aspect-ratio` — the scale must never shift layout.
- The whole card is one `<a>`. No nested interactive elements.

**3. Expandable service card (disclosure)** — Tallium's bundle cards: title + descriptor + CTA, with a bulleted feature list revealed on click. Adopt for the "What we build" capabilities.

- Hairline card on white, no icon illustration, chevron rotates 180° over 240ms.
- Animate with `grid-template-rows: 0fr → 1fr` on a wrapper — height animation without a magic pixel number and without layout thrash.
- Semantics: `<button aria-expanded aria-controls>`; content stays in the DOM (crawlable). One open at a time is *not* enforced — accordions that close your previous choice are hostile.

**4. Numbered process timeline** — Tallium's 4-step progression (icon + title + description per step). Ours drops the icons and uses **oversized Sora numerals** (`01`–`08`, weight 600, `--ink-200`) as the visual anchor. At eight steps, neither a swipeable track nor a 4×2 grid reads well, so it pages: a permanent connector rail across the top shows all 8 numerals and a progress fill, real prev/next `<button>`s page through 4 pairs below it — nothing scrolls or drags. Order stays unambiguous because the rail never reorders and the fill only moves forward with the page. The paired content re-enters on `animate-rise` (transform + opacity, §7) each time the page changes.

**5. Outcome stat block** — Tallium pairs a bold metric with a client logo and a case-study link ("500K+ downloads", "30% increase in signups"). **This is the one metrics pattern we're allowed**, because it reports the *client's* result, not our vanity numbers. Rules: attach every stat to a named client and a linked case study, never float a company-level counter, and ship no stat we cannot source. Three real client outcomes beat a band of round numbers. If a client won't let us publish a figure, that card carries a quote instead.

**6. Horizontal work rail instead of a JS carousel** — Tallium slides case studies with prev/next arrows. Achieve the same feel with **CSS scroll-snap** (`scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`) plus real `<button>` prev/next that call `scrollBy`. Zero animation library, native touch, keyboard and screen-reader correct, and it costs nothing against the §9 budget. Cards peek ~15% at the right edge to signal more.

**7. Sticky header with logo morph** — Tallium swaps a full wordmark for a compact mark in the condensed state. Adopt: full lockup over the hero → mark-only after 24px of scroll, alongside the transparent → `backdrop-blur-xl bg-paper/80` transition. Drive it with `IntersectionObserver` on a sentinel, **not** a scroll listener.

Implemented as a **width transition on the single lockup asset** (`overflow-hidden` container clipped to the mark's 146/167 slice) rather than swapping to a second image — the morph costs no extra download. The transparent/solid state itself is selected in CSS via `body:has(#hero-sentinel)`, so the first paint is correct before any JS runs. Those override rules must sit **outside `@layer`**: Tailwind's `utilities` layer outranks `@layer components`, so a layered rule loses to the header's own `bg-paper/80` no matter how specific it is.

**8. Location pill on testimonials** — Tallium badges quotes with city + country ("Stockholm, Sweden"). Adopt directly: with 3 clients across different countries, a location pill does more for the "international vendor" claim than any adjective. Spec: `--ink-100` fill, `--ink-600` text, caption size, pill radius. Use a text country code, **not** a flag emoji (renders inconsistently across platforms).

**9. Brief-first contact form** — Tallium's form takes name / company / email / phone / description **plus a file attachment** and a privacy checkbox. Adopt, including the attachment — an international buyer usually already has an RFP or spec, and letting them upload it converts far better than a bare textarea.

- Fields: name, work email, company, budget range (select), message, optional file.
- File: `.pdf,.doc,.docx,.md,.txt`, ≤10MB, validated **server-side** by type and size in the Server Action, never trusted from the client.
- Required marked with a word, not just `*` and color. Inline errors as text, `aria-live="polite"`, privacy consent as an explicit unchecked checkbox.

**10. Client logo row with origin** — Tallium runs a scrolling logo strip with location data. Ours: 3 logos, large, each with its country in caption type underneath. Marquee only if the count reaches 6+; three logos centered and confident beats three logos pretending to scroll.

**11. Productized offer cards with visible pricing** — Tallium publishes fixed ranges ($4,950–$7,950). Adopt on `/hire-us`: a named fixed-scope entry offer with a real number. For an unknown 12-person team, a priced, bounded first engagement is the lowest-friction path to a first meeting. Card layout: name, one-line outcome, price, what's included (disclosure per #3), CTA.

**12. Hero with a swapping keyword** — Tallium: *"Build your **[product]** with flawless technology, design, and execution."* Ours holds **Scale Beyond Limits** fixed — it's the brand, it never animates away — and rotates the noun in the *sub*-line instead (platforms · integrations · teams · uptime). Reserve `min-width` on the rotating slot so nothing reflows; respect reduced-motion by rendering the first word statically.

### Patterns to skip

Tallium has 120+ people, 13+ case studies, 39 reviews, and five offices. Several of its components are containers that only work when full. Building them empty is the fastest way to look like a shell company.

- ❌ **Company metrics band** (founded / team size / projects delivered) — replaced by per-client outcome stats (#5).
- ❌ **15+ testimonial blocks and the paginated quote carousel** — we have 3; show them large, static, one at a time.
- ❌ **Awards & certifications strip** — omit until real.
- ❌ **Global offices / world map with pins** — we're one distributed team. Pins we don't own are a lie.
- ❌ **13-project portfolio grid** — 3–4 deep case studies instead; depth is our only substitute for volume.
- ❌ **Multi-color card gradients** (#FF6F0A / #35BEBC / #3A85C6 / #BB5277) — conflicts head-on with the two-color brand. Ember only, ≤5% (§4).
- ❌ **Mega-menu with three dropdowns** — six flat links. Our surface area doesn't justify nested nav, and flat nav is faster and more crawlable.
- ❌ **Vertical/industry expertise grid** — only name verticals we've actually shipped in. Two honest ones beat six aspirational ones.

**In one line:** *Tallium's interaction patterns, Apple's material and restraint, and only claims we can prove.*

---

## 3. Design principles

1. **Monochrome, until it matters.** The palette is two colors. Hierarchy comes from scale, weight, and space — not from adding color. Color appears only where the user must act.
2. **Whitespace is the product.** Sections breathe at 120–180px vertical rhythm. If a layout feels empty, it is probably right.
3. **One idea per screen.** Each section makes exactly one claim, supported by one visual. Never two competing focal points.
4. **Motion reveals, it does not perform.** Animation clarifies where things came from. If an animation would still look fine removed, remove it.
5. **Type is the interface.** Large, tightly tracked Sora headlines carry the design. Decoration is a last resort.
6. **Nothing ships that costs a Lighthouse point.** Beauty that costs performance is not beauty, it is a defect. See §9.
7. **Edge-to-edge, never boxed.** Full-bleed media, hairline dividers, content constrained by a max-width — the Apple structural pattern.

---

## 4. Color

Two brand colors. Everything else is a derived neutral.

### Core

| Token | Hex | Role |
| --- | --- | --- |
| `--ink` | `#1B1918` | Brand black (warm charcoal). Dark canvases, primary text on light. |
| `--paper` | `#FFFFFF` | Brand white. Light canvases, primary text on dark. |

`#1B1918` is *warm* (hue ≈ 20°). Every derived neutral keeps that warmth — never mix in a cool grey like `#8A8A8A`, it reads as a different brand.

### Neutral ramp (derived from `--ink`)

| Token | Hex | Use |
| --- | --- | --- |
| `--ink-900` | `#1B1918` | Brand black |
| `--ink-800` | `#262322` | Raised surface on dark, dark card fill |
| `--ink-700` | `#343130` | Dark-mode hairline, disabled dark fill |
| `--ink-600` | `#4A4644` | Icon strokes on light |
| `--ink-500` | `#6B6664` | **Minimum for secondary body text on white** (5.7:1) |
| `--ink-400` | `#918B88` | Large text / captions ≥19px / non-text only (3.4:1) |
| `--ink-300` | `#B8B2AF` | Decorative rules, disabled text |
| `--ink-200` | `#D9D4D1` | **Default hairline border on light** |
| `--ink-100` | `#EDE9E7` | Section tint, input fill |
| `--ink-050` | `#F7F5F4` | Warm off-white page alternate |

### Accent — "Ember"

The name is historical — the accent is green. It kept its token name so nothing downstream had to be renamed.

| Token | Hex | On `--ink` | On white |
| --- | --- | --- | --- |
| `--ember` | `#38B000` | 6.2:1 ✅ | 2.8:1 ❌ |
| `--ember-strong` | `#2E9000` | 4.2:1 ✅ | 4.2:1 ✅ |

A single accent. `--ember` is the brand colour and the one anybody sees as colour; `--ember-strong` is the same hue darkened, and exists purely to satisfy contrast where `--ember` cannot.

**Which one to use:**

- **`--ember`** — primary CTA fill (with `--ink` text on it, 6.2:1), CTA hover states, and small signal marks *on a dark canvas*: list bullets, the dot in a status pill, an active nav underline.
- **`--ember-strong`** — the `:focus-visible` ring everywhere (3px, 2px offset). It is the only one of the two that clears the 3:1 WCAG 1.4.11 floor against *both* canvases, and one ring colour sitewide beats scoping the ring per section. Also any accent hairline or border that lands on a light canvas, where `--ember` is 2.8:1 and fails.

**Budget: the accent covers ≤5% of any viewport.** That budget is why the Home hero's pixel field is white rather than green — a full-viewport green field would blow it and steal the signal from the CTA.

**Forbidden:** either green as body text on white (`--ember` fails outright; `--ember-strong` at 4.2:1 still misses the 4.5:1 AA floor, so error text uses `--ink` and the *words* carry the state — never colour alone). No accent gradients, no accent background larger than a button, no more than one accent element per viewport section.

If a section looks like it needs more color, it needs more space instead.

### Surfaces

The site alternates two canvases. Do not invent a third.

- **Light canvas** — `--paper` or `--ink-050`, text `--ink-900`, secondary `--ink-500`, borders `--ink-200`.
- **Dark canvas** — `--ink-900`, text `--paper`, secondary `rgba(255,255,255,0.72)` (9.4:1), borders `rgba(255,255,255,0.10)`.

Alternate them section to section for rhythm. Hero and footer are dark; the page breathes light in between.

**The site has one appearance.** No user-facing light/dark theme toggle, and `prefers-color-scheme` is ignored — this is a brand surface, not an app. Strip the `@media (prefers-color-scheme: dark)` block that ships in the starter `globals.css`.

### Tokens (Tailwind v4, CSS-first)

Tailwind v4 has no `tailwind.config.js`. Declare tokens in `app/globals.css` under `@theme`:

```css
@import "tailwindcss";

@theme {
  --color-ink: #1b1918;
  --color-ink-800: #262322;
  --color-ink-700: #343130;
  --color-ink-600: #4a4644;
  --color-ink-500: #6b6664;
  --color-ink-400: #918b88;
  --color-ink-300: #b8b2af;
  --color-ink-200: #d9d4d1;
  --color-ink-100: #ede9e7;
  --color-ink-050: #f7f5f4;
  --color-paper: #ffffff;
  --color-ember: #38b000;
  --color-ember-strong: #2e9000;

  --font-sans: var(--font-sora), ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
}
```

Use `bg-ink`, `text-ink-500`, `border-ink-200`, `text-ember` etc. **Never hardcode a hex in a component.**

---

## 5. Typography — Sora

Sora is the only typeface. No secondary display face, no serif accent. A mono is permitted *only* inside code blocks on the blog (`ui-monospace, "SF Mono", Menlo, monospace` — a system stack, not another downloaded font).

**The logo is artwork, not type.** The wordmark is never set in Sora — it ships as the supplied lockup image (see §7). Nothing on the site attempts to reproduce it with live text.

**Verified from `next/font` font data:** Sora is a variable font, `wght` axis **100–800**, `normal` style only (**no italic** — never apply `italic`, the browser will synthesize an ugly oblique), subsets `latin`, `latin-ext`.

### Loading

```tsx
// app/layout.tsx
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});
```

Self-hosted and preloaded automatically by `next/font` — zero external requests, zero layout shift. Load the **variable** font only; never enumerate `weight: ["400","600","700"]`, that ships three static files instead of one variable file.

### Scale

Fluid via `clamp()`. Sora is geometric and wide — **large sizes need negative tracking or they look amateur.** The tracking column is not optional.

| Role | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| Display XL (hero only) | `clamp(3.25rem, 7.5vw, 7rem)` | 0.95 | `-0.035em` | 600 |
| Display L (section opener) | `clamp(2.5rem, 5vw, 4.5rem)` | 1.0 | `-0.03em` | 600 |
| H1 (page title) | `clamp(2rem, 3.6vw, 3.25rem)` | 1.05 | `-0.025em` | 600 |
| H2 | `clamp(1.625rem, 2.6vw, 2.25rem)` | 1.15 | `-0.02em` | 600 |
| H3 | `1.25rem` | 1.3 | `-0.01em` | 600 |
| Body L (lede) | `1.125rem` | 1.6 | `0` | 400 |
| Body | `1.0625rem` (17px) | 1.65 | `0` | 400 |
| Caption | `0.875rem` | 1.5 | `0.01em` | 500 |
| Overline (eyebrow) | `0.75rem` | 1 | `0.14em` | 600, uppercase |

**Weight 700–800 is reserved for ≤3 words** (a logotype, one emphasized phrase). Headlines are 600. Weights 100–300 are unused — they read as fragile at any size Sora is comfortable at.

**Measure:** body copy capped at `max-w-[68ch]`; leded intros at `max-w-[52ch]`. Never a full-width paragraph.

Set `antialiased` on `<html>` (the starter already does) and `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

---

## 6. Layout, space, and components

### Grid

- Content max-width **1280px**; full-bleed media may exceed it.
- 12 columns, gutter 24px mobile / 32px tablet / 40px desktop.
- Page padding: `clamp(1.25rem, 4vw, 2.5rem)`.
- Breakpoints: default Tailwind (`sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`).

### Vertical rhythm

Spacing is an 8px scale (4px allowed for icon/text nudges only).

| Gap | Value |
| --- | --- |
| Section padding (block) | `clamp(6rem, 12vw, 11rem)` |
| Heading → body | 24px |
| Body → CTA | 40px |
| Card grid gap | 24px mobile, 32px desktop |
| Between sibling sections of one idea | 64px |

### Surfaces & shape

- Radius: buttons **pill** (`9999px`), cards `--radius-lg` (20px), inputs `--radius-md` (12px), media `--radius-xl` (28px).
- **Hairlines over shadows.** Default separation is a 1px border. Shadow is permitted only on a hover-lifted card: `0 12px 32px -12px rgba(27,25,24,0.18)`. No shadow ever exceeds that.
- No glassmorphism except one place: the sticky header on scroll (`backdrop-blur-xl` + `bg-paper/80`).

### Buttons

| Variant | Rest | Hover | Use |
| --- | --- | --- | --- |
| Primary | `bg-ember` + `text-ink` | brightness 1.06, `translateY(-1px)` | "Hire Us", form submit — **one per viewport** |
| Secondary (on light) | `bg-ink` + `text-paper` | `bg-ink-800` | "See our work" |
| Secondary (on dark) | `bg-paper` + `text-ink` | 92% opacity | Hero secondary |
| Ghost | transparent, `border-ink-200` | `bg-ink-050` | Tertiary |
| Text link | underline offset 4px, 1px `--ember` underline on hover | — | Inline |

Height 48px (52px for hero), horizontal padding 28px, weight 500, tracking `-0.01em`.

### Logo

The supplied artwork is the only logo. Source of truth: `public/logos/apeiroq-logo-transparent-horizontal.png` (white, transparent, 805×170).

Two derived files are committed and used everywhere:

| File | Use |
| --- | --- |
| `apeiroq-lockup-white.png` | Dark canvases — overlay header, footer, mobile menu |
| `apeiroq-lockup-ink.png` | Light canvases — solid header |

Both are the source artwork tightly trimmed to 790×167; the ink variant is the same alpha recoloured to `--ink`. **Regenerate both from the source if the artwork changes** — do not hand-edit them, and never redraw the mark as SVG or set the wordmark in a font.

Rendered with `next/image` from a static import, so intrinsic width and height are always in the HTML and the logo cannot shift layout. Both variants ship on the header and CSS chooses between them, which keeps the correct one painted before any JS runs.

The raster icons (`apeiroq-icon-*`, `apeiroq-logo-dark-og`) serve `app/icon.png`, `app/apple-icon.png`, and `app/opengraph-image.png`, where raster is required.

### Header

Sticky, 72px, transparent over the hero and blurred-white after 24px of scroll. Left: lockup. Center: Home · About · Projects · Blog · Careers · Contact. Right: **Hire Us** (primary pill). Mobile: full-screen overlay menu, links staggered in at 40ms intervals.

### Footer

Dark (`--ink-900`), four columns — lockup + tagline, sitemap, contact/legal, newsletter — over a full-width oversized `Apeiroq` set in Sora and clipped at the baseline. That oversized treatment is decorative texture, `aria-hidden`, and the one place the name appears as type rather than artwork. Nothing else.

---

## 7. Motion

| Token | Duration | Easing | Use |
| --- | --- | --- | --- |
| Micro | 160ms | `--ease-standard` | Hover, focus, color |
| Short | 240ms | `--ease-standard` | Buttons, small reveals |
| Medium | 420ms | `--ease-out-expo` | Section entrance, cards |
| Long | 720ms | `--ease-out-expo` | Hero headline, page transition |

**Rules**

- Entrance = fade + translateY **12–24px max**. Never scale from 0, never rotate, never bounce, never spring overshoot.
- Stagger siblings at **60–80ms**. Cap a stagger chain at 6 items; item 7+ appears with the group.
- Reveal each element **once** (`IntersectionObserver`, `threshold: 0.2`, unobserve after fire). Nothing re-animates on scroll-back.
- No parallax on text. Parallax on media capped at 8% travel.
- **Never animate `width`, `height`, `top`, or `left`.** `transform` and `opacity` only.

### Reduced motion — mandatory

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Additionally, in JS: when `prefers-reduced-motion` is set, background videos never mount and canvas/WebGL effects never initialize — the poster or a static gradient renders instead. This is a functional requirement, not a nicety.

### React Bits

Components come from [reactbits.dev](https://reactbits.dev). They are **copied into the repo**, not installed as a dependency — once added, they are our code to edit, simplify, and delete from.

```bash
# Always the TS + Tailwind variant — this project is TS + Tailwind v4
npx shadcn@latest add @react-bits/BlurText-TS-TW
```

Four variants exist (JS-CSS, JS-TW, TS-CSS, TS-TW). **Only `-TS-TW` is permitted here.** Confirm the exact component name on reactbits.dev before running the command — names are case-sensitive and the catalog changes.

Land them in `components/reactbits/<Name>.tsx` with a header comment recording source URL, variant, and date, then strip every prop and branch we don't use.

**Use React Bits for (pick sparingly):**

| Need | Category | Where |
| --- | --- | --- |
| Headline reveal | word/char text animation (e.g. BlurText, SplitText) | Hero H1 — **once per page** |
| Scroll reveal | scroll-triggered fade/rise | Section openers |
| Client logo row | continuous marquee / logo loop | Home trust bar |
| Card hover | spotlight / subtle tilt | Projects grid |
| Ambient hero backdrop | canvas/WebGL field | **≤1 per page**, below-the-fold only, see limits |

**Hard limits**

- **Max 3 React Bits components per page. Max 1 WebGL/canvas component per page**, and never in the hero or above the fold.
- Any WebGL/canvas component must be `dynamic(() => import(...), { ssr: false })` and mounted only on intersection.
- Any component pulling a heavy animation runtime (GSAP, three, ogl, motion) must be lazy-loaded and its cost measured against the §9 budget *before* it is merged. If two components want two different runtimes, one of them gets rewritten in CSS.
- Tilt ≤6°, magnetic pull ≤8px, no cursor trails, no click sparks, no decrypting/scrambling text. Those read as portfolio-site, not vendor-site.

---

## 8. Background video

Video from **pexels.com** and **pixabay.com** — teams working, code on screens, hands on keyboards, screen-glow on faces. Both licenses permit commercial use without attribution; still record the source URL in `content/media-credits.md`.

**Selection:** slow, ambient, dark-toned footage with low motion energy and no recognizable faces looking at camera, no visible third-party logos or real proprietary code. If a clip "does something" in the first 3 seconds, it competes with the headline — reject it.

**Treatment:** every background video sits under a scrim so text hits AA:
`bg-ink/72` flat, or `linear-gradient(180deg, rgba(27,25,24,0.85) 0%, rgba(27,25,24,0.62) 45%, rgba(27,25,24,0.92) 100%)`. Desaturate to ~35% so it stays monochrome-adjacent. Text over video is always `--paper`, weight 600, never over the video's own bright region.

### The performance contract

**The video is never the LCP element.** The poster image is (or the headline). This is what makes a 100 Lighthouse score compatible with a video hero.

Required implementation:

1. Render `<Image src={poster} priority fill>` immediately — it is the LCP candidate.
2. `<video>` renders with `preload="none"`, `muted`, `playsInline`, `loop`, `autoPlay`, `aria-hidden="true"`, `tabIndex={-1}`, and the same poster.
3. Mount the `<video>` element only **after** first paint — `requestIdleCallback` (with a `setTimeout` fallback), inside a client component.
4. **Skip the video entirely** when any of: viewport `< 768px`, `prefers-reduced-motion: reduce`, `navigator.connection.saveData === true`, or `effectiveType` is `2g`/`slow-2g`. Poster only.
5. Fade the video in over 600ms once `canplaythrough` fires. No pop.
6. Reserve the box with `aspect-ratio` so CLS stays 0.

**Encoding budget: ≤1.8MB per clip, ≤12s loop, 1920px wide max, 24fps, no audio track.**

```bash
# H.264 (universal)
ffmpeg -i src.mp4 -t 12 -vf "scale=1920:-2,fps=24" -c:v libx264 -crf 27 \
  -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an hero.mp4

# VP9 (smaller, served first via <source>)
ffmpeg -i src.mp4 -t 12 -vf "scale=1920:-2,fps=24" -c:v libvpx-vp9 -crf 34 \
  -b:v 0 -row-mt 1 -an hero.webm

# Poster (becomes the LCP image)
ffmpeg -i hero.mp4 -vframes 1 -q:v 2 hero-poster.jpg
```

Order sources `webm` then `mp4`. Store under `public/media/`; if a clip exceeds budget after encoding, cut its duration, not its resolution.

**Video appears on at most 3 routes** — Home hero, About (culture), Careers (culture). Everywhere else uses a still.

---

## 9. Performance & accessibility budget

Target: **100 / 100 / 100 / 100** on mobile Lighthouse. Treat these as build gates, not aspirations.

| Metric | Budget |
| --- | --- |
| LCP | < 1.8s (mobile, throttled) |
| CLS | **0** |
| INP | < 200ms |
| TBT | < 150ms |
| Initial JS (gzipped, per route) | **< 120KB** |
| Fonts | 1 file (Sora variable, self-hosted) |
| Images above fold | 1, `priority`, AVIF/WebP |
| Third-party scripts | **0** at first load |

**Rules that make this achievable**

- **Server Components by default.** `"use client"` only for interactivity, and pushed to the smallest possible leaf. A page must never be a client component.
- No analytics, chat widget, or tag manager in the critical path. Analytics loads via `next/script` with `strategy="lazyOnload"`; a chat widget, if ever added, mounts on user intent only.
- `next/image` everywhere, always with `width`/`height` or `fill` + a sized parent. Never a raw `<img>`.
- `next/link` for every internal link — crawlable `<a href>` output, prefetched.
- Every route statically prerendered. Nothing opts into dynamic rendering without a written reason.
- No layout-shifting skeletons; reserve space with `aspect-ratio`.

**Accessibility (all required for the 100)**

- Skip-to-content link, first focusable element.
- Visible `:focus-visible` ring everywhere: `3px solid var(--color-ember-strong)`, `outline-offset: 2px`. Never `outline: none` without a replacement. It is `--ember-strong`, not `--ember`, because only the darkened green clears 3:1 on both canvases — see §4.
- Semantic landmarks (`header`/`nav`/`main`/`footer`), one `<h1>` per page, no heading levels skipped.
- Contrast: body text ≥4.5:1, large text and UI borders ≥3:1. `--ink-400` is large-text-only. Neither green is ever body text — including error text, which uses `--ink` and states the problem in words.
- Decorative video/canvas: `aria-hidden="true"`, not focusable. Zero autoplaying audio.
- Every form input has a `<label>`; errors are text (not color alone) and announced via `aria-live`.
- Full keyboard operability including the mobile menu (focus trap + Esc to close).

---

## 10. SEO

Primary intent to capture: *hire custom software development team*, *custom software development company*, *dedicated development team*, *MVP development for startups* — plus long-tail from the blog.

**Per route, required:**

- Unique `title` (≤60 chars) and `description` (140–160 chars) via the `metadata` export.
- Canonical URL via `alternates.canonical`.
- OG + Twitter card image, 1200×630, generated with `ImageResponse` from `next/og` so every route has a branded card without hand-designing PNGs.

**Root layout** sets `metadataBase`, a `title.template` of `"%s — Apeiroq"`, `title.default`, `openGraph.siteName`, `twitter.card: "summary_large_image"`, and `robots` (index, follow).

**Files:** `app/sitemap.ts` (`MetadataRoute.Sitemap` — includes every static route plus every blog post), `app/robots.ts` (`MetadataRoute.Robots`, pointing at the sitemap), `app/favicon.ico`, `app/opengraph-image.tsx`.

**JSON-LD** (`<script type="application/ld+json">`, server-rendered):

| Schema | Where |
| --- | --- |
| `Organization` + `WebSite` | Root layout |
| `BreadcrumbList` | Every nested route |
| `BlogPosting` | Each blog post |
| `JobPosting` | Each open role — drives Google Jobs, disproportionate value for a 12-person team hiring |
| `Service` | Hire Us |

Include `Review`/`AggregateRating` **only** when we have verifiable, attributed reviews. Fabricated review markup is a manual-action risk and a trust risk. Not worth it.

**Content SEO:** the blog is the growth engine — it is the only part of the site that can rank on volume while the brand is unknown. Target engineering-decision posts, not "Top 10 Trends" filler.

---

## 11. Site architecture

```
/                 Home
/about            About Us
/projects         Projects (index)
/projects/[slug]  Case study
/blog             Blog (index)
/blog/[slug]      Post
/careers          Careers
/careers/[slug]   Role
/contact          Contact Us
/hire-us          Hire Us  ← nav CTA target
```

### Decision: testimonials & clients live on the Home page

**No standalone `/testimonials` or `/clients` route.** With 3 clients, a dedicated page reads as thin — it advertises the gap and dilutes crawl equity across near-empty URLs. Concentrated on Home, the same 3 proofs read as focused and confident, and they land exactly where the buying decision happens. They are built as reusable sections and also placed on `/projects` (client quote inside the matching case study) and `/hire-us` (one quote above the form).

Revisit at ~8 clients.

### Decision: `/hire-us` is a real route, not an anchor

It ranks for commercial-intent queries, gives the nav CTA a destination with room to sell (engagement models, process, pricing shape, the form), and keeps `/contact` clean for general enquiries. `Service` JSON-LD lives here.

### Home — section order

1. **Hero** — full-bleed **pixel field** (React Bits PixelBlast, stripped; see §7). H1: **Scale Beyond Limits**. Lede: one sentence naming custom software for international clients. Two CTAs: *Hire Us* (Ember) + *See our work*.

   The field replaces the background video §8 describes — one ambient treatment, not both — but inherits the whole §8 contract: a CSS pixel grid is painted in the server HTML and is what the LCP measures, the canvas mounts on idle after first paint, and it is skipped entirely under `prefers-reduced-motion`, save-data, 2G, or below 768px. It is masked out above the headline so the copy always sits on opaque ink.
2. **Trust bar** — "Trusted by teams building at" + 3 client logos, generous size, country in caption type under each (§2 #10). No fake grid padding, no marquee at three logos.
3. **What we build** — 3–4 capability cards (custom platforms, product engineering, integrations, cloud & scale). Plain language, no icon soup.
4. **Products & prototypes** — the strongest section. Our 3–4 prototypes as work cards (§2 #2) in a scroll-snap rail (§2 #6), each honestly framed: *"Built as a product thesis. Customized and shipped for [client]."* This turns a small portfolio into evidence of independent product thinking, which is rarer than contract delivery. Where a client outcome is publishable, attach an outcome stat (§2 #5).
5. **How we work** — the remote-first process: discovery → prototype → iterate → ship → scale. Where "12 engineers, no handoffs, direct access" is stated explicitly.
6. **Testimonials** — 3 real quotes, name + role + company + location pill (§2 #8), one per client. Large type, static, one at a time. Never a carousel with dots and fake velocity — the scroll-snap rail (§2 #6) is for *work*, not for quotes.
7. **The team** — 12 engineers, fully distributed. A short strip, real faces or a real work-in-progress shot.
8. **Newsletter** — see §12.
9. **Closing CTA** — dark, single primary action: *Hire Us*.

### Other pages

- **About Us** — origin story, operating principles (3–5, opinionated), the 12-person team, how full-remote actually works (overlap hours, comms cadence, demo rhythm), engagement models.
- **Projects** — index of the 3–4 prototypes; each case study runs problem → thesis → what we built → stack → what changed for the client. Screens over prose. Say "prototype" when it is one; that honesty is the differentiator.
- **Blog** — MDX, filesystem-sourced, statically generated. Engineering depth, not marketing.
- **Careers** — remote-first pitch, how we hire (transparent stages + timeline), open roles with `JobPosting` schema. Even with zero openings this page recruits and signals stability.
- **Contact Us** — form (name, email, company, budget range, message), expected response time stated in writing, alternate email, timezone note. No phone-only wall.
- **Hire Us** — engagement models, process, what we need from you to quote, FAQ, one testimonial, the form.

---

## 12. Newsletter

Positioned as an **engineering letter**, not a marketing list. Promise something specific and keepable: *"One letter a month on how we build. Architecture decisions, tradeoffs, and what broke. No pitches."*

- Placement: a dedicated Home section + a footer field sitewide + end of every blog post.
- Fields: email only. Every extra field costs conversions.
- Implementation: Server Action → provider API. Validate on the server, never expose an API key to the client.
- States: idle / submitting / success / error, all announced via `aria-live="polite"`. Never a layout shift between states.
- Double opt-in, an unambiguous unsubscribe line, and a one-line privacy note under the field. Required for GDPR — the target audience is international.
- Honeypot field + timing check for spam. No CAPTCHA (third-party JS, breaks the §9 budget).

---

## 13. Definition of done

A page or section ships only when all of these hold:

- [ ] Uses only tokens from §4 and §5 — no hardcoded hex, no off-scale font size or spacing value
- [ ] Renders correctly at 375 / 768 / 1280 / 1920px
- [ ] Server Component unless interactivity genuinely requires otherwise
- [ ] Lighthouse mobile 100/100/100/100 on the built output (`next build && next start`)
- [ ] Full keyboard pass; visible focus on every interactive element
- [ ] Behaves correctly with `prefers-reduced-motion: reduce` — no video, no canvas, no transitions
- [ ] Unique title, description, canonical, and OG image
- [ ] Every claim on the page is true and verifiable — no invented metrics, clients, or reviews
- [ ] ≤3 React Bits components, ≤1 WebGL component, ≤1 primary CTA in view
