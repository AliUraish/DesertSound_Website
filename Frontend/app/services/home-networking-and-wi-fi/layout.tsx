import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata, getServicePage, serviceJsonLd } from "@/lib/seo"

const service = getServicePage("/services/home-networking-and-wi-fi")

export const metadata: Metadata = createMetadata(service)

export default function HomeNetworkingLayout({ children }: { children: ReactNode }) {
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
