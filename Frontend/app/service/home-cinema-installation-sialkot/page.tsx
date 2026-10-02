import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import {
  sialkotFaqJsonLdItems,
  sialkotServicePath,
  sialkotServiceTitle,
} from "@/lib/sialkot-service-content"
import { sialkotServiceJsonLd } from "@/lib/sialkot-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = {
  ...serviceRouteMetadata(sialkotServicePath),
  title: { absolute: sialkotServiceTitle },
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(sialkotServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(sialkotServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(sialkotFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
