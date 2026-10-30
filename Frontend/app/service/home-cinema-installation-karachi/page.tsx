import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import { karachiFaqJsonLdItems, karachiServicePath } from "@/lib/karachi-service-content"
import { karachiServiceJsonLd } from "@/lib/karachi-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata(karachiServicePath)

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(karachiServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(karachiServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(karachiFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
