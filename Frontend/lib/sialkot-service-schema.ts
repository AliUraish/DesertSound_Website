import { catalogServicePages, serviceJsonLd } from "./seo"
import { sialkotServicePath } from "./sialkot-service-content"

export function getSialkotCatalogService() {
  const service = catalogServicePages.find((page) => page.path === sialkotServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${sialkotServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Sialkot city lander. Provider stays the Karachi LocalBusiness. */
export function sialkotServiceJsonLd() {
  const service = getSialkotCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Sialkot" },
    ],
  }
}
