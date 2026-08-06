import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

/**
 * Sora, variable axis only — one self-hosted file, no external request, no
 * layout shift. Never enumerate weights; that ships a static file per weight.
 */
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#1b1918",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * No `h-full` on <html>, deliberately — see globals.css §Lenis. Lenis
     * watches documentElement with a ResizeObserver to know how far the page
     * can scroll, and `height: 100%` pins that box to the viewport so the
     * observer never fires when content grows. Opening an FAQ disclosure would
     * then leave the scroll limit stuck at the old page height.
     *
     * The sticky footer that `h-full` + `min-h-full` used to buy is now
     * `min-h-svh` on <body> alone, which needs no height on the ancestor.
     * Small viewport units, not `dvh`: dvh changes as mobile browser chrome
     * hides during scroll, and every change resizes the document mid-gesture.
     */
    <html lang={siteConfig.locale} className={`${sora.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-ink px-5 py-3 text-caption text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>

        <SmoothScroll />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
