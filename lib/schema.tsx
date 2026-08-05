import { siteConfig, socialLinks } from "./site";

/**
 * JSON-LD builders. DESIGN.md §10.
 *
 * Only assert what is true and verifiable — never emit Review or
 * AggregateRating without attributed reviews to back it.
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: `${siteConfig.url}/logos/apeiroq-logo-dark-square.png`,
    email: siteConfig.email,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 12 },
    ...(socialLinks.length > 0 && {
      sameAs: socialLinks.map((link) => link.href),
    }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

/** Renders JSON-LD. Server-rendered so crawlers see it without executing JS. */
export function JsonLd({ schema }: { schema: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
