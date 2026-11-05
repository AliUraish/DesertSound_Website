import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import { smartHomeKarachiFaqJsonLdItems, smartHomeKarachiPath } from "@/lib/smart-home-karachi-content"
import { smartHomeKarachiServiceJsonLd } from "@/lib/smart-home-karachi-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata(smartHomeKarachiPath)

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(smartHomeKarachiPath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(smartHomeKarachiServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(smartHomeKarachiFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
