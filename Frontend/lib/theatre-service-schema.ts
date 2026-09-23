import { absoluteUrl, catalogServicePages, serviceJsonLd } from "./seo"

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

/**
 * HowTo steps are the visible install process on the theatre service page:
 * plan the room → cinema design → projection/surround/calibration → smart control.
 * Names and text are taken from existing H1/H2s and body — not a new process strip.
 */
export const theatreInstallHowToSteps = [
  {
    name: "Plan around the room",
    text: "We plan home theater installation in Karachi and across Pakistan around the room: 4K/8K projection, Dolby Atmos, and smart control. Home theater installation starts with the room: size, layout, acoustics, lighting, and how you watch, whether that is a dedicated cinema or a compact apartment anywhere in Pakistan.",
  },
  {
    name: "Professional Home Cinema Design",
    text: "Professional home cinema design and installation in Pakistan goes beyond a screen and speakers. The design process is planned for the best sound quality, accurate screen positioning, and effective lighting control — room acoustics analysis and treatment, optimal screen size and positioning, professional lighting design, and custom seating arrangements.",
  },
  {
    name: "Immersive Audio & Visual Experience",
    text: "A complete home theatre can include a high-definition projector or large-format screen, Dolby Atmos or DTS:X surround sound, and integrated lighting. Careful speaker placement and calibration create a convincing sense of space and immersion. Calibration and optimisation balance audio and video for clear sound, accurate images, and consistent performance throughout the room.",
  },
  {
    name: "Smart Control & Integration",
    text: "With smart home automation systems like Control4, Crestron, and HDL, users can manage lighting, audio, video, curtains, and temperature using just one touch or a simple voice command. Displays, speakers, automation, and networking are installed to work together so the room needs fewer remotes.",
  },
] as const

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
