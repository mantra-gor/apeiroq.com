"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialNewsletterState: NewsletterState = {
  status: "idle",
  message: "",
};

// Deliberately permissive — the provider does the authoritative check, and
// over-strict regexes reject valid addresses.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Minimum time a human takes to fill one field. Below this, it is a bot. */
const MIN_FILL_MS = 1500;

export async function subscribeToNewsletter(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  // Honeypot: hidden from humans, irresistible to bots. Fail silently so the
  // bot cannot learn it was caught.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — please check your inbox." };
  }

  const startedAt = Number(formData.get("startedAt"));
  if (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "success", message: "Thanks — please check your inbox." };
  }

  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Enter an email address." };
  }
  if (!EMAIL.test(email) || email.length > 254) {
    return { status: "error", message: "That email address looks incomplete." };
  }

  // TODO: wire the newsletter provider. Until NEWSLETTER_API_KEY is set this
  // fails loudly rather than telling a visitor they subscribed when they did
  // not — see CLAUDE.md, content integrity.
  if (!process.env.NEWSLETTER_API_KEY) {
    console.error(
      "[newsletter] NEWSLETTER_API_KEY is not set — subscription dropped:",
      email,
    );
    return {
      status: "error",
      message: "Sign-up is not live yet. Email us and we will add you.",
    };
  }

  try {
    // TODO: replace with the provider's double opt-in endpoint.
    throw new Error("Newsletter provider not implemented");
  } catch (error) {
    console.error("[newsletter] subscribe failed:", error);
    return {
      status: "error",
      message: "Something went wrong. Try again in a moment.",
    };
  }
}
