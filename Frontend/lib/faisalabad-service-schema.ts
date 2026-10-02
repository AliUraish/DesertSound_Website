import { catalogServicePages, serviceJsonLd } from "./seo"
import { faisalabadServicePath } from "./faisalabad-service-content"

export function getFaisalabadCatalogService() {
  const service = catalogServicePages.find((page) => page.path === faisalabadServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${faisalabadServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Faisalabad city lander. Provider stays the Karachi LocalBusiness. */
export function faisalabadServiceJsonLd() {
  const service = getFaisalabadCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Faisalabad" },
    ],
  }
}
