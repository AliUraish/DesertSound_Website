import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import {
  bahawalpurFaqJsonLdItems,
  bahawalpurServicePath,
  bahawalpurServiceTitle,
} from "@/lib/bahawalpur-service-content"
import { bahawalpurServiceJsonLd } from "@/lib/bahawalpur-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = {
  ...serviceRouteMetadata(bahawalpurServicePath),
  title: { absolute: bahawalpurServiceTitle },
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(bahawalpurServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(bahawalpurServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(bahawalpurFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
