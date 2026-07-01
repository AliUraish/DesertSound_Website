import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata, getServicePage, serviceJsonLd } from "@/lib/seo"

const service = getServicePage("/services/home-theatre-systems")

export const metadata: Metadata = createMetadata(service)

export default function HomeTheatreSystemsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(service)).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  )
}
