import type { Metadata } from "next"
import { MaintenanceAndSupportPage } from "@/components/service-pages/maintenance-and-support-page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/maintenance-and-support"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <MaintenanceAndSupportPage />
}
