import type { Metadata } from "next"
import AudioSystemsPage from "@/app/services/audio-systems/page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/audio-distribution"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <AudioSystemsPage />
}
