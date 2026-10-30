import { catalogServicePages, serviceJsonLd } from "./seo"
import { karachiServicePath } from "./karachi-service-content"

export function getKarachiCatalogService() {
  const service = catalogServicePages.find((page) => page.path === karachiServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${karachiServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Karachi city lander. Provider stays the Karachi LocalBusiness. */
export function karachiServiceJsonLd() {
  const service = getKarachiCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Karachi" },
    ],
  }
}
