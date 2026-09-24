import type { Metadata } from "next"
import { getProject, type ProjectLibrary } from "@/lib/projects-data"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.desertsound.com.pk"

export const siteName = "Desert Sound"

export function getMetadataBase() {
  return new URL(siteUrl)
}

export const socialLinks = {
  facebook: "https://www.facebook.com/share/1DLuj22aHw/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/desertsoundpk?igsi=MXZwemlkN3o5enVkdQ==",
}

/** Clean profile URLs for JSON-LD sameAs. Footer hrefs stay on socialLinks. */
export const sameAsProfiles = [
  "https://www.instagram.com/desertsoundpk",
  "https://www.facebook.com/desertsoundpk",
] as const

/**
 * Showroom coordinates from the existing Google Maps embed in contact-section.tsx
 * (`2d` = lng 67.03972317603166, `3d` = lat 24.815761947043313) for
 * 22-C/II, 2nd Zamzama Commercial Lane, Phase V, DHA Karachi.
 */
export const showroomGeo = {
  latitude: 24.815761947043313,
  longitude: 67.03972317603166,
} as const

export const defaultSeo = {
  title: "Home Theatre & Smart Home Automation in Pakistan",
  description:
    "Desert Sound designs and installs premium home theater systems, smart home automation, audio systems, control integration, and Wi-Fi networks in Karachi and across Pakistan.",
  image: "/og.jpg",
}

export function shareImageUrl(path = defaultSeo.image) {
  if (path.startsWith("http")) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  return new URL(normalized, siteUrl).toString()
}

export type SeoPage = {
  path: string
  title: string
  description: string
  image?: string
}

export const servicePages: SeoPage[] = [
  {
    path: "/services/home-theatre-systems",
    title: "Home Theatre Systems in Pakistan",
    description:
      "Custom home theatre design and installation in Pakistan, including projection, surround sound, acoustic treatment, cinema seating, and smart control.",
    image: "/Pictures Final/Services/Home_Theatre/Cover.jpg",
  },
  {
    path: "/services/smart-home-automation",
    title: "Smart Home Automation in Pakistan",
    description:
      "Integrated smart home automation for lighting, climate, entertainment, security, curtains, voice control, and one-touch control systems.",
    image: "/Pictures Final/Services/Smart_Home_Automation/image copy.jpg",
  },
  {
    path: "/services/audio-systems",
    title: "Audio Systems & Multi-Room Sound",
    description:
      "Hi-Fi audio, multi-room music, speaker installation, calibration, and premium sound systems for homes and commercial spaces.",
    image: "/Pictures Final/Services/Audio_Systems/Cover.jpg",
  },
  {
    path: "/services/control-integration",
    title: "Control Systems Integration",
    description:
      "Centralized control systems for AV, lighting, climate, entertainment, and smart home technology using elegant touch, app, and voice interfaces.",
    image: "/Pictures Final/Services/Control_Integration/Cover.jpg",
  },
  {
    path: "/services/home-networking-and-wi-fi",
    title: "Home Networking & Wi-Fi Installation",
    description:
      "Reliable wired and wireless networking, Wi-Fi coverage planning, performance optimization, and network security for smart homes and offices.",
    image: "/Pictures Final/Services/Home_networking/Cover.jpeg",
  },
]

/** Live `/service/...` routes used in LocalBusiness offers / hasOfferCatalog. */
export const catalogServicePages: SeoPage[] = [
  {
    path: "/service/home-theatre-design-and-installation",
    title: "Home Theater Installation in Pakistan | Design and Install",
    description:
      "Home theater installation across Pakistan from Karachi. We design, install, and calibrate cinema rooms — site visits nationwide.",
    image: "/Pictures Final/Services/Home_Theatre/Cover.jpg",
  },
  {
    path: "/service/smart-home-automation",
    title: "Smart Home Automation System in Pakistan | Voice & WiFi Controlled Installation",
    description: "Smart Home Automation Services in Karachi, Pakistan - Desert Sound",
    image: "/Pictures Final/Services/Smart_Home_Automation/image copy.jpg",
  },
  {
    path: "/service/audio-distribution",
    title: "Audio Distribution Installation in Karachi | Audio Distribution Service",
    description:
      "Professional audio distribution installation in Karachi, Pakistan for seamless sound in every room with a reliable smart audio system.",
    image: "/Pictures Final/Services/Audio_Systems/Cover.jpg",
  },
  {
    path: "/service/control-systems",
    title: "Control Systems installation in Karachi, Pakistan",
    description:
      "Expert control systems installation services in Karachi, Pakistan, offering seamless automation and control for your home or business.",
    image: "/Pictures Final/Services/Control_Integration/Cover.jpg",
  },
  {
    path: "/service/home-networking-and-wi-fi",
    title: "Best Home Networking & Wi-Fi Service in Karachi",
    description:
      "Best Home Networking and Wi-Fi Service in Karachi, Pakistan. Expert home Wi-Fi setup and installation for fast, stable internet.",
    image: "/Pictures Final/Services/Home_networking/Cover.jpeg",
  },
  {
    path: "/service/customization-and-integration",
    title: "Customization and Integration System in Karachi, Pakistan",
    description:
      "Expert customization and integration system services in Karachi, Pakistan, tailored to meet your home or business automation needs.",
    image: "/Pictures Final/Services/Control_Integration/image copy.jpg",
  },
  {
    path: "/service/maintenance-and-support",
    title: "Maintenance and Support Service in Karachi, Pakistan",
    description:
      "Discover our comprehensive maintenance and support services, ensuring optimal performance and longevity for your systems and equipment.",
    image: "/Pictures Final/Services/Home_networking/Image2.jpg",
  },
]

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  const encoded = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")
  return `${siteUrl}${encoded}`
}

function brandedSocialTitle(title: string) {
  return title.includes(siteName) ? title : `${title} | ${siteName}`
}

export function createMetadata({
  path,
  title,
  description,
  image = defaultSeo.image,
}: SeoPage): Metadata {
  const url = absoluteUrl(path)
  const imageAltTitle = title.replace(new RegExp(`^${siteName}\\s[-|]\\s`), "")
  const socialTitle = brandedSocialTitle(title)
  const imageUrl = shareImageUrl(image.startsWith("/") || image.startsWith("http") ? image : `/${image}`)

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${imageAltTitle}`,
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  }
}

export function getServicePage(path: string) {
  const servicePage = servicePages.find((page) => page.path === path)

  if (!servicePage) {
    throw new Error(`Missing SEO config for ${path}`)
  }

  return servicePage
}

export function createProjectMetadata(library: ProjectLibrary, slug: string): Metadata {
  const project = getProject(library, slug)

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    }
  }

  const title = project.seoTitle ?? project.title

  return {
    ...createMetadata({
      path: `/projects/${library}/${project.slug}`,
      title,
      description: `${project.description} View this ${project.category.toLowerCase()} project by Desert Sound in ${project.location}.`,
      image: project.image,
    }),
    title: {
      absolute: brandedSocialTitle(title),
    },
  }
}

function toServiceOffer(service: SeoPage) {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      url: absoluteUrl(service.path),
    },
  }
}

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: siteName,
  url: siteUrl,
  image: absoluteUrl(defaultSeo.image),
  logo: absoluteUrl("/0-removebg-preview.png"),
  telephone: "+9221111570111",
  email: "info@desertsound.com.pk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22-C/II, 2nd Zamzama Commercial Lane, Phase V, D.H.A",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: showroomGeo.latitude,
    longitude: showroomGeo.longitude,
  },
  areaServed: [
    {
      "@type": "Country",
      name: "Pakistan",
    },
    {
      "@type": "City",
      name: "Karachi",
    },
    {
      "@type": "City",
      name: "Lahore",
    },
    {
      "@type": "City",
      name: "Islamabad",
    },
  ],
  priceRange: "$$$",
  sameAs: [...sameAsProfiles],
  // openingHours omitted: hours are not published anywhere in-repo.
  offers: catalogServicePages.map(toServiceOffer),
  makesOffer: catalogServicePages.map(toServiceOffer),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Desert Sound services",
    itemListElement: catalogServicePages.map(toServiceOffer),
  },
}

export function serviceJsonLd(service: SeoPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: {
      "@id": `${siteUrl}/#localbusiness`,
    },
    areaServed: {
      "@type": "Country",
      name: "Pakistan",
    },
  }
}

export type FaqItem = {
  question: string
  answer: string
}

/** Homepage-only install-intent Q/As. Do not use for retail “best system” copy. */
export const homepageInstallFaqs: FaqItem[] = [
  {
    question: "Do you offer home theater installation in Pakistan?",
    answer:
      "Yes. Desert Sound offers home theater installation across Pakistan. Karachi is our local market; we survey the room, hide the wiring, and calibrate picture and sound.",
  },
  {
    question: "Do you install home cinemas in Karachi and outside?",
    answer:
      "Yes. Home cinema installation in Karachi is our core work, and we take projects nationwide after a site visit and a written scope. Local rooms get the full survey, hidden wiring, and calibration; out-of-city installs follow the same process after we visit the space.",
  },
  {
    question: "Is this a retail “best home theater system” package?",
    answer:
      "No. We do not sell boxed retail systems. Home theater installation here is a designed, installed, and calibrated room—not a shelf SKU.",
  },
  {
    question: "Can you install a home cinema in an existing room?",
    answer:
      "Yes. We design the install around the room you already have: layout, speaker and screen placement, hidden cabling, and calibration. A new extension is not required.",
  },
  {
    question: "What does professional home theater installation include?",
    answer:
      "Room layout, speaker and screen placement, hidden cabling, picture and sound calibration, and control. Equipment is specified for the space, not a generic bundle.",
  },
  {
    question: "How do I start a home theater or home cinema installation?",
    answer:
      "Book a site visit. We measure the room, write a scope, and install after you approve the design—Karachi locally, nationwide after a survey.",
  },
]

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
