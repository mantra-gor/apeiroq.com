"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { MobileMenu } from "./mobile-menu";
import { navLinks, primaryCta, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Sticky header — DESIGN.md §6 (header), §2 #7 (logo morph).
 *
 * Transparent over a dark hero, blurred-white once scrolled past it. The
 * transparent state is selected in CSS via `body:has(#hero-sentinel)`, so this
 * component only has to answer one question: has the sentinel left the top?
 * That is an IntersectionObserver, never a scroll listener.
 */
export function Header() {
  const [condensed, setCondensed] = useState(false);
  const pathname = usePathname();
  const [renderedPath, setRenderedPath] = useState(pathname);

  // Reset during render on navigation — otherwise a route entered while
  // scrolled would keep the previous route's collapsed logo.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setCondensed(false);
  }

  useEffect(() => {
    // No dark hero on this route: CSS already renders the solid header.
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    // The sentinel is a 24px block at the top of the hero: it stops
    // intersecting once the page has scrolled past it, which is the trigger.
    // No rootMargin — shrinking the root would exclude a sentinel that starts
    // flush with the top, condensing the header before any scroll happens.
    const observer = new IntersectionObserver(([entry]) =>
      setCondensed(!entry.isIntersecting),
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      data-header
      data-condensed={condensed}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-18 border-b text-ink",
        "border-ink-200/70 bg-paper/80 backdrop-blur-xl",
        "transition-[background-color,color,border-color] duration-240 ease-standard",
      )}
    >
      <Container className="flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center rounded-sm"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo tone="adaptive" collapsed={condensed} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-caption transition-opacity duration-160 ease-standard",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px",
                      "after:origin-left after:scale-x-0 after:bg-ember",
                      "after:transition-transform after:duration-160 after:ease-standard",
                      "hover:after:scale-x-100",
                      active
                        ? "opacity-100 after:scale-x-100"
                        : "opacity-70 hover:opacity-100",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={primaryCta.href}
            variant="primary"
            size="compact"
            className="hidden sm:inline-flex"
          >
            {primaryCta.label}
          </ButtonLink>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
