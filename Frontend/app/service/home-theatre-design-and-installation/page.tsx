import type { Metadata } from "next"
import HomeTheatreSystemsPage from "@/app/services/home-theatre-systems/page"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"
import { theatreServiceFaqItems } from "@/lib/theatre-service-faqs"

const slug = "/service/home-theatre-design-and-installation"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(theatreServiceFaqItems)).replace(/</g, "\\u003c"),
        }}
      />
      <HomeTheatreSystemsPage />
    </>
  )
}
