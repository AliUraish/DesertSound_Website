import type { Metadata } from "next"
import ControlIntegrationPage from "@/app/services/control-integration/page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/control-systems"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <ControlIntegrationPage />
}
