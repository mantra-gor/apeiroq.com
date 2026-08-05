"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Arrow } from "@/components/ui/arrow";
import {
  initialNewsletterState,
  subscribeToNewsletter,
} from "@/app/actions/newsletter";
import { cn } from "@/lib/utils";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group absolute inset-y-1.5 right-1.5 inline-flex items-center gap-2 rounded-full",
        "bg-ember px-5 text-caption font-medium text-ink",
        "transition-[filter,opacity] duration-160 ease-standard",
        "hover:brightness-[1.06] disabled:opacity-60",
      )}
    >
      {pending ? "Sending" : "Subscribe"}
      {!pending && <Arrow className="h-3.5 w-3.5" />}
    </button>
  );
}

/**
 * Canvas-dependent styling only. The form's behaviour is identical on both —
 * DESIGN.md §4 sanctions exactly two surfaces, so this is the whole matrix.
 */
const tones = {
  dark: {
    input:
      "border-white/15 text-paper placeholder:text-white/40 hover:border-white/25 focus:border-white/40",
    // 6.2:1 on ink — clears the 3:1 floor for a UI boundary.
    errorBorder: "border-ember",
    status: "text-white/70",
    // Errors read as text, never colour alone. Full-strength ink/paper rather
    // than an ember tint, because neither green clears 4.5:1 on both canvases.
    errorStatus: "text-paper",
    privacy: "text-white/45",
  },
  light: {
    input:
      "border-ink-200 text-ink placeholder:text-ink-400 hover:border-ink-300 focus:border-ink-500",
    // Plain ember is 2.8:1 on paper and would fail; the darkened one is 4.2:1.
    errorBorder: "border-ember-strong",
    status: "text-ink-500",
    errorStatus: "text-ink",
    privacy: "text-ink-500",
  },
} as const;

/**
 * Email only — every extra field costs conversions (DESIGN.md §12).
 * Honeypot + timing check instead of a CAPTCHA, which would be third-party JS.
 */
export function NewsletterForm({
  className,
  tone = "dark",
}: {
  className?: string;
  /** The canvas this sits on. Footer is dark; the Home section is light. */
  tone?: keyof typeof tones;
}) {
  const styles = tones[tone];
  const [state, formAction] = useActionState(
    subscribeToNewsletter,
    initialNewsletterState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  // Stamped after mount — Date.now() during render is impure, and this value
  // is never rendered, so there is nothing to hydrate-mismatch either.
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  function submit(formData: FormData) {
    formData.set("startedAt", String(mountedAt.current));
    formAction(formData);
  }

  return (
    <div className={className}>
      <form ref={formRef} action={submit} noValidate>
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <div className="relative">
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            aria-describedby="newsletter-status newsletter-privacy"
            aria-invalid={state.status === "error" || undefined}
            className={cn(
              // pr clears the absolutely-positioned Subscribe button.
              "h-14 w-full rounded-full border bg-transparent pl-5 pr-44 text-body",
              "transition-colors duration-160 ease-standard focus:outline-none",
              styles.input,
              state.status === "error" && styles.errorBorder,
            )}
          />
          <SubmitButton />
        </div>

        {/* Bot traps — never shown, never announced. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="newsletter-company">Company</label>
          <input id="newsletter-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
        </div>
        {/* `startedAt` is stamped onto FormData in submit(), not rendered. */}
      </form>

      {/*
        Always in the DOM so the announcement is reliable and nothing shifts
        when a message appears — CLS stays at 0.
      */}
      <p
        id="newsletter-status"
        role="status"
        aria-live="polite"
        className={cn(
          "mt-3 min-h-5 px-5 text-caption",
          state.status === "error" ? styles.errorStatus : styles.status,
        )}
      >
        {state.message}
      </p>

      <p id="newsletter-privacy" className={cn("px-5 text-caption", styles.privacy)}>
        One letter a month. No pitches. Unsubscribe in one click.
      </p>
    </div>
  );
}
