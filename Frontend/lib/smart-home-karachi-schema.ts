import { catalogServicePages, serviceJsonLd } from "./seo"
import { smartHomeKarachiPath } from "./smart-home-karachi-content"

export function getSmartHomeKarachiCatalogService() {
  const service = catalogServicePages.find((page) => page.path === smartHomeKarachiPath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${smartHomeKarachiPath}`)
  }
  return service
}

/** Service JSON-LD for the Karachi smart-home lander. Provider stays the Karachi LocalBusiness. */
export function smartHomeKarachiServiceJsonLd() {
  const service = getSmartHomeKarachiCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home automation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Karachi" },
    ],
  }
}
