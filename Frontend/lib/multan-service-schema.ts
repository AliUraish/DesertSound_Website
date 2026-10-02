import { catalogServicePages, serviceJsonLd } from "./seo"
import { multanServicePath } from "./multan-service-content"

export function getMultanCatalogService() {
  const service = catalogServicePages.find((page) => page.path === multanServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${multanServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Multan city lander. Provider stays the Karachi LocalBusiness. */
export function multanServiceJsonLd() {
  const service = getMultanCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Multan" },
    ],
  }
}
