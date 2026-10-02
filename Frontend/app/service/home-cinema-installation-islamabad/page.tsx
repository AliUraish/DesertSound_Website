import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { RankingSeoPageView } from "@/components/ranking-seo-page"
import {
  islamabadFaqJsonLdItems,
  islamabadServicePath,
  islamabadServiceTitle,
} from "@/lib/islamabad-service-content"
import { islamabadServiceJsonLd } from "@/lib/islamabad-service-schema"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = {
  ...serviceRouteMetadata(islamabadServicePath),
  title: { absolute: islamabadServiceTitle },
}

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  const page = getRankingSeoPage(islamabadServicePath)
  if (!page) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(islamabadServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(islamabadFaqJsonLdItems())) }}
      />
      <RankingSeoPageView page={page} />
    </>
  )
}
