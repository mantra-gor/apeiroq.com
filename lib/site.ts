/**
 * Single source of truth for site-wide constants, navigation, and contact data.
 *
 * Content integrity (CLAUDE.md): nothing in here may be invented. Values marked
 * TODO are placeholders that must be confirmed before launch — they are wired
 * so that anything unset simply does not render, rather than rendering a lie.
 */

export const siteConfig = {
  name: "Apeiroq",
  tagline: "Scale Beyond Limits",
  // TODO: confirm production domain before launch.
  url: "https://apeiroq.com",
  description:
    "Apeiroq builds custom software for global businesses. Our focused team of 12 engineers remote engineering team works directly with clients from day one, no bench, no layers of management, no handoffs. The people you speak with are the same people designing, building, and shipping your product.",
  // TODO: confirm the address this inbox routes to.
  email: "info@apeiroq.com",
  locale: "en",
} as const;

export type NavLink = {
  href: string;
  label: string;
};

/** Primary navigation. Flat by design — DESIGN.md §2 rules out nested menus. */
export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

/** The one persistent CTA, present in the header on every route. */
export const primaryCta = { href: "/hire-us", label: "Hire Us" } as const;

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/projects", label: "Projects" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Work with us",
    links: [
      { href: "/hire-us", label: "Hire Us" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/**
 * TODO: add real profile URLs. Left empty deliberately — the footer renders
 * nothing rather than dead or invented links.
 */
export const socialLinks: { href: string; label: string }[] = [];
