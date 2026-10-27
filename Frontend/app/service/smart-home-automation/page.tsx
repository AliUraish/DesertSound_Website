import type { Metadata } from "next"
import SmartHomeAutomationPage from "@/app/services/smart-home-automation/page"
import { faqPageJsonLd } from "@/lib/seo"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"
import { smartHomeServiceFaqs } from "@/lib/smart-home-service-faqs"

const slug = "/service/smart-home-automation"

export const metadata: Metadata = serviceRouteMetadata(slug)

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}

export default function ServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPageJsonLd(smartHomeServiceFaqs)) }}
      />
      <SmartHomeAutomationPage />
    </>
  )
}
