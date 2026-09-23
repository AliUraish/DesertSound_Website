import { absoluteUrl, catalogServicePages, serviceJsonLd } from "./seo"
import { theatreInstallHowToSteps } from "./theatre-service-howto"

export { theatreInstallHowToSteps }

const theatrePath = "/service/home-theatre-design-and-installation"

export function getTheatreCatalogService() {
  const service = catalogServicePages.find((page) => page.path === theatrePath)
  if (!service) {
    throw new Error(`Missing SEO catalog entry for ${theatrePath}`)
  }
  return service
}

/**
 * Service JSON-LD for the live theatre route. Pakistan first; Karachi is the
 * HQ / city market inside Pakistan (not “including Karachi”).
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

export function theatreInstallHowToJsonLd() {
  const service = getTheatreCatalogService()
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Home Theater Installation",
    description:
      "We plan home theater installation in Karachi and across Pakistan around the room: 4K/8K projection, Dolby Atmos, and smart control. This is cinema installation work, not a boxed retail system.",
    url: absoluteUrl(theatrePath),
    image: absoluteUrl(service.image || "/Pictures Final/Services/Home_Theatre/Cover.jpg"),
    step: theatreInstallHowToSteps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }
}
