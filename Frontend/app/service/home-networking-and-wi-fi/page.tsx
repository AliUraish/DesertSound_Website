import type { Metadata } from "next"
import HomeNetworkingPage from "@/app/services/home-networking-and-wi-fi/page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/home-networking-and-wi-fi"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <HomeNetworkingPage />
}
