import type { Metadata } from "next"
import { ContactPage } from "@/components/site-pages/contact-page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata("/contact-us")

export default function ContactUsRoute() {
  return <ContactPage />
}
