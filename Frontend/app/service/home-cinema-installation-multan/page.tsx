import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import {
  multanFaqJsonLdItems,
  multanServicePath,
  multanServiceTitle,
} from "@/lib/multan-service-content"
import { multanServiceJsonLd } from "@/lib/multan-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = {
  ...serviceRouteMetadata(multanServicePath),
  title: { absolute: multanServiceTitle },
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(multanServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(multanServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(multanFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
