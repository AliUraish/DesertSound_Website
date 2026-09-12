import type { Metadata } from "next"
import { getProject, type ProjectLibrary } from "@/lib/projects-data"

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://desertsound.com.pk"

export const siteName = "Desert Sound"

export function getMetadataBase() {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`)
  }

  return new URL(siteUrl)
}

export const socialLinks = {
  facebook: "https://www.facebook.com/share/1DLuj22aHw/?mibextid=wwXIfr",
  instagram: "https://www.instagram.com/desertsoundpk?igsi=MXZwemlkN3o5enVkdQ==",
}

export const defaultSeo = {
  title: "Home Theatre & Smart Home Automation in Pakistan",
  description:
    "Desert Sound designs and installs premium home theater systems, smart home automation, audio systems, control integration, and Wi-Fi networks in Karachi and across Pakistan.",
  image: "/og.jpg",
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
  const imagePath = image.startsWith("http") ? image : image.startsWith("/") ? image : `/${image}`

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
          url: imagePath,
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
      images: [imagePath],
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

  return {
    ...createMetadata({
      path: `/projects/${library}/${project.slug}`,
      title: project.title,
      description: `${project.description} View this ${project.category.toLowerCase()} project by Desert Sound in ${project.location}.`,
      image: project.image,
    }),
    title: {
      absolute: brandedSocialTitle(project.title),
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
    socialLinks.facebook,
    socialLinks.instagram,
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
