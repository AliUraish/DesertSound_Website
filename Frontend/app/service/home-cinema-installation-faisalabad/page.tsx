import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import {
  faisalabadFaqJsonLdItems,
  faisalabadServicePath,
  faisalabadServiceTitle,
} from "@/lib/faisalabad-service-content"
import { faisalabadServiceJsonLd } from "@/lib/faisalabad-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = {
  ...serviceRouteMetadata(faisalabadServicePath),
  title: { absolute: faisalabadServiceTitle },
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(faisalabadServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faisalabadServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(faisalabadFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
