import type { MetadataRoute } from "next"

// Staging lock until cutover: do not advertise any URLs (robots already Disallow: /).
// Restore the full sitemap generator from git history when desertsound.com.pk points here.
export default function sitemap(): MetadataRoute.Sitemap {
  return []
}
