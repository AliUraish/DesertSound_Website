import type { Metadata } from "next"
import HomeTheatreSystemsPage from "@/app/services/home-theatre-systems/page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/home-theatre-design-and-installation"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <HomeTheatreSystemsPage />
}
