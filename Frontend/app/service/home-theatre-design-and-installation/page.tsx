import type { Metadata } from "next"
import HomeTheatreSystemsPage from "@/app/services/home-theatre-systems/page"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"
import { theatreServiceFaqs } from "@/lib/theatre-service-faqs"
import { theatreInstallHowToJsonLd, theatreServiceJsonLd } from "@/lib/theatre-service-schema"

const slug = "/service/home-theatre-design-and-installation"

export const metadata: Metadata = serviceRouteMetadata(slug)

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(theatreServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(theatreInstallHowToJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(theatreServiceFaqs)) }}
      />
      <HomeTheatreSystemsPage />
    </>
  )
}
