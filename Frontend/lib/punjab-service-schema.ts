import { catalogServicePages, serviceJsonLd } from "./seo"
import { punjabServicePath } from "./punjab-service-content"

export function getPunjabCatalogService() {
  const service = catalogServicePages.find((page) => page.path === punjabServicePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${punjabServicePath}`)
  }
  return service
}

/** Service JSON-LD for the Punjab hub. Provider stays the Karachi LocalBusiness @id. */
export function punjabServiceJsonLd() {
  const service = getPunjabCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home cinema installation",
    areaServed: [
      { "@type": "AdministrativeArea", name: "Punjab" },
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Faisalabad" },
      { "@type": "City", name: "Multan" },
      { "@type": "City", name: "Sialkot" },
      { "@type": "City", name: "Bahawalpur" },
    ],
  }
}
