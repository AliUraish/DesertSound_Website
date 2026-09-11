import type { Metadata } from "next"
import { CustomizationAndIntegrationPage } from "@/components/service-pages/customization-and-integration-page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/customization-and-integration"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <CustomizationAndIntegrationPage />
}
