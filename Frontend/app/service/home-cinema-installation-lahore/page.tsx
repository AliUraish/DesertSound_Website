import type { Metadata } from "next"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import {
  lahoreCityLanderPage,
  lahoreCityLanderSlug,
} from "@/lib/lahore-city-lander"
import { createMetadata, faqPageJsonLd, serviceJsonLd } from "@/lib/seo"

const page = lahoreCityLanderPage

export const metadata: Metadata = {
  ...createMetadata({
    path: lahoreCityLanderSlug,
    title: page.title,
    description: page.description,
    image: page.image || undefined,
  }),
  title: { absolute: page.title },
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function LahoreCinemaInstallPage() {
  const service = {
    ...serviceJsonLd({
      path: lahoreCityLanderSlug,
      title: page.title,
      description: page.description,
      image: page.image,
    }),
    name: page.h1,
    serviceType: "Home theater installation",
    areaServed: [
      { "@type": "City", name: "Lahore" },
      { "@type": "Country", name: "Pakistan" },
    ],
  }

  const faqs = page.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(service) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(faqs)) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
