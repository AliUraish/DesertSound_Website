import type { Metadata } from "next"
import SmartHomeAutomationPage from "@/app/services/smart-home-automation/page"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

const slug = "/service/smart-home-automation"

export const metadata: Metadata = serviceRouteMetadata(slug)

export default function ServicePage() {
  return <SmartHomeAutomationPage />
}
