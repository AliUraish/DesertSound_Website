import type { Metadata } from "next"
import HomeTheatreSystemsPage from "@/app/services/home-theatre-systems/page"
import { getRankingSeoPage } from "@/lib/ranking-seo-content"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/home-theatre-design-and-installation"
const rankingPage = getRankingSeoPage(slug)

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  const faqs = (rankingPage?.faqs ?? []).map((faq) => ({
    question: faq.q,
    answer: faq.a,
  }))

  return (
    <>
      {faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqPageJsonLd(faqs)).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}
      <HomeTheatreSystemsPage />
    </>
  )
}
