import { catalogServicePages, serviceJsonLd } from "./seo"
import { bahawalpurServicePath } from "./bahawalpur-service-content"

export function getBahawalpurCatalogService() {
  const service = catalogServicePages.find((page) => page.path === bahawalpurServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${bahawalpurServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Bahawalpur city lander. Provider stays the Karachi LocalBusiness. */
export function bahawalpurServiceJsonLd() {
  const service = getBahawalpurCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Bahawalpur" },
    ],
  }
}
