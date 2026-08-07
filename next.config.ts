import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * /projects was the route before the work was reframed as case studies.
   * Permanent so any link that escaped — a draft deck, an outbound email, an
   * early crawl — lands on the new URL and passes its equity along instead of
   * hitting the 404 page.
   */
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/projects/:slug",
        destination: "/case-studies/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
