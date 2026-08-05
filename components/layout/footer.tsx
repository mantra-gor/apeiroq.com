import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import {
  footerNav,
  legalNav,
  siteConfig,
  socialLinks,
} from "@/lib/site";

/** DESIGN.md §6 — dark, four columns, over an oversized clipped wordmark. */
export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <Container className="pt-20 pb-12 md:pt-28">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.2fr_repeat(2,0.7fr)_1.4fr] lg:gap-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-sm"
              aria-label={`${siteConfig.name} — home`}
            >
              <Logo tone="white" height={30} />
            </Link>
            <p className="mt-5 max-w-[24ch] text-body-l text-white/70">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Sitemap */}
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-overline uppercase text-white/40">
                {group.heading}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption text-white/75 underline-offset-4 transition-colors duration-160 ease-standard hover:text-paper hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="text-overline uppercase text-white/40">
              The engineering letter
            </h2>
            <p className="mt-5 max-w-[38ch] text-caption text-white/70">
              How we build — architecture decisions, tradeoffs, and what broke.
            </p>
            <NewsletterForm className="mt-6" />
          </div>
        </div>

        {/* Legal */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-caption text-white/45">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-caption text-white/75 underline-offset-4 hover:text-paper hover:underline"
            >
              {siteConfig.email}
            </a>
            {legalNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-white/45 underline-offset-4 hover:text-paper hover:underline"
              >
                {link.label}
              </Link>
            ))}
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-caption text-white/45 underline-offset-4 hover:text-paper hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/*
        Oversized wordmark, clipped at the baseline. Decorative only — the real
        wordmark is the link above, so this is hidden from assistive tech.
      */}
      <div
        aria-hidden="true"
        className="mt-4 overflow-hidden px-gutter select-none"
      >
        <span className="block translate-y-[0.18em] text-center text-[clamp(4rem,18vw,15rem)] font-light leading-[0.75] tracking-[-0.04em] text-white/[0.07]">
          {siteConfig.name}
        </span>
      </div>
    </footer>
  );
}
