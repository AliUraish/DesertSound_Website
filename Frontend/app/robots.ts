import type { MetadataRoute } from "next"

// Staging lock until cutover: disallow all crawling, no sitemap pointer at live domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  }
}
