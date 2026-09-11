import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"
import { serviceRouteMetadata } from "@/lib/service-route-metadata"

export const metadata: Metadata = serviceRouteMetadata("/contact-us")

export default function ContactPage() {
  return (
    <div className="w-full overflow-x-clip bg-black">
      <Header />
      <main>
        <div className="pt-[110px] md:pt-28">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  )
}
