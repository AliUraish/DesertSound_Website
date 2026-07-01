import type { Metadata } from "next"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desertsound.com.pk"

export const siteName = "Desert Sound"

export const defaultSeo = {
  title: "Home Theater & Smart Home Automation in Pakistan",
  description:
    "Desert Sound designs and installs premium home theater systems, smart home automation, audio systems, control integration, and Wi-Fi networks in Karachi and across Pakistan.",
  image: "/Pictures%20Final/Services/Home_Theatre/Cover.jpg",
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
    image: "/Pictures%20Final/Services/Home_Theatre/Cover.jpg",
  },
  {
    path: "/services/smart-home-automation",
    title: "Smart Home Automation in Pakistan",
    description:
      "Integrated smart home automation for lighting, climate, entertainment, security, curtains, voice control, and one-touch control systems.",
    image: "/Pictures%20Final/Services/Smart_Home_Automation/image%20copy.png",
  },
  {
    path: "/services/audio-systems",
    title: "Audio Systems & Multi-Room Sound",
    description:
      "Hi-Fi audio, multi-room music, speaker installation, calibration, and premium sound systems for homes and commercial spaces.",
    image: "/Pictures%20Final/Services/Audio_Systems/Cover.jpg",
  },
  {
    path: "/services/control-integration",
    title: "Control Systems Integration",
    description:
      "Centralized control systems for AV, lighting, climate, entertainment, and smart home technology using elegant touch, app, and voice interfaces.",
    image: "/Pictures%20Final/Services/Control_Integration/Cover.jpg",
  },
  {
    path: "/services/home-networking-and-wi-fi",
    title: "Home Networking & Wi-Fi Installation",
    description:
      "Reliable wired and wireless networking, Wi-Fi coverage planning, performance optimization, and network security for smart homes and offices.",
    image: "/Pictures%20Final/Services/Home_networking/Cover.jpeg",
  },
]

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

export function createMetadata({
  path,
  title,
  description,
  image = defaultSeo.image,
}: SeoPage): Metadata {
  const url = absoluteUrl(path)
  const imageUrl = absoluteUrl(image)
  const imageAltTitle = title.replace(new RegExp(`^${siteName}\\s[-|]\\s`), "")

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
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
      title,
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

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#localbusiness`,
  name: siteName,
  url: siteUrl,
  image: absoluteUrl(defaultSeo.image),
  telephone: "+9221111570111",
  email: "info@desertsound.com.pk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "22-C/II, 2nd Zamzama Commercial Lane, Phase V, D.H.A",
    addressLocality: "Karachi",
    addressCountry: "PK",
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
  ],
  priceRange: "$$$",
  sameAs: [
    "https://www.facebook.com/desertsoundpakistan",
    "https://www.instagram.com/desertsoundpakistan",
  ],
  makesOffer: servicePages.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      url: absoluteUrl(service.path),
    },
  })),
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
