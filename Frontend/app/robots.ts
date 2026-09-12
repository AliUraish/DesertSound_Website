import type { MetadataRoute } from "next"

// Staging lock until cutover: block search crawlers, but allow WhatsApp / social previews.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
      {
        userAgent: ["FacebookBot", "facebookexternalhit", "WhatsApp", "Twitterbot", "LinkedInBot"],
        allow: "/",
      },
    ],
  }
}
