import { catalogServicePages, serviceJsonLd } from "./seo"

const theatrePath = "/service/home-theatre-design-and-installation"

export function getTheatreCatalogService() {
  const service = catalogServicePages.find((page) => page.path === theatrePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${theatrePath}`)
  }
  return service
}

/**
 * Service JSON-LD for the live theatre route. Pakistan-first nationwide
 * installation from Karachi.
 */
export function theatreServiceJsonLd() {
  const service = getTheatreCatalogService()
  return {
    ...serviceJsonLd(service),
    serviceType: "Home theater installation",
    areaServed: [
      { "@type": "Country", name: "Pakistan" },
      { "@type": "City", name: "Karachi" },
    ],
  }
}
