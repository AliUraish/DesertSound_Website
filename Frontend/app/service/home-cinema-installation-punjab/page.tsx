import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import { punjabFaqJsonLdItems, punjabServicePath } from "@/lib/punjab-service-content"
import { punjabServiceJsonLd } from "@/lib/punjab-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata(punjabServicePath)

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(punjabServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(punjabServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(punjabFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
