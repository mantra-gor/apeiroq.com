"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Arrow } from "@/components/ui/arrow";
import { Logo } from "@/components/ui/logo";
import { lockPageScroll, unlockPageScroll } from "./smooth-scroll";
import { navLinks, primaryCta, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen overlay menu. DESIGN.md §6 — links stagger in at 40ms. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const panelId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Close on navigation — reset during render, not in an effect.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const { body } = document;
    const trigger = triggerRef.current;
    const previousOverflow = body.style.overflow;
    // Lock scroll, compensating for the scrollbar so the page cannot shift.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    // Smooth scrolling has to be parked too — it keeps integrating wheel
    // deltas against a scroll it can no longer apply, then snaps on close.
    lockPageScroll();

    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!items?.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = "";
      unlockPageScroll();
      trigger?.focus();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="Open menu"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-current transition-colors duration-160 ease-standard hover:bg-current/10 lg:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-60 flex flex-col bg-ink text-paper lg:hidden"
        >
          <div className="flex h-18 shrink-0 items-center justify-between px-gutter">
            <Logo tone="white" />
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-160 ease-standard hover:bg-white/10"
            >
              <X className="h-5 w-5" aria-hidden="true" strokeWidth={1.5} />
            </button>
          </div>

          <nav
            aria-label="Main"
            className="flex-1 overflow-y-auto px-gutter pt-6 pb-10"
          >
            <ul className="flex flex-col">
              {navLinks.map((link, index) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li
                    key={link.href}
                    className="animate-rise border-b border-white/10"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center justify-between py-5 text-h2"
                    >
                      <span className={cn(!active && "text-white/80")}>
                        {link.label}
                      </span>
                      <Arrow
                        className={cn(
                          "h-5 w-5",
                          active ? "text-ember" : "text-white/40",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ButtonLink
              href={primaryCta.href}
              variant="primary"
              size="hero"
              className="animate-rise mt-10 w-full"
              style={{ animationDelay: `${navLinks.length * 40}ms` }}
            >
              {primaryCta.label}
              <Arrow />
            </ButtonLink>

            <a
              href={`mailto:${siteConfig.email}`}
              className="animate-rise mt-8 block text-caption text-white/60 underline-offset-4 hover:text-paper hover:underline"
              style={{ animationDelay: `${(navLinks.length + 1) * 40}ms` }}
            >
              {siteConfig.email}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
