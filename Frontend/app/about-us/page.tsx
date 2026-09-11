import type { Metadata } from "next"
import { AboutPage } from "@/components/site-pages/about-page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata("/about-us")

export default function AboutUsRoute() {
  return <AboutPage />
}
