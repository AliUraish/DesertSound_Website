import { catalogServicePages, serviceJsonLd } from "./seo"
import { islamabadServicePath } from "./islamabad-service-content"

export function getIslamabadCatalogService() {
  const service = catalogServicePages.find((page) => page.path === islamabadServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${islamabadServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Islamabad city lander. Provider stays the Karachi LocalBusiness. */
export function islamabadServiceJsonLd() {
  const service = getIslamabadCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Islamabad" },
    ],
  }
}
