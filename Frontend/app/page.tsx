import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CertificationsSection, OurBrands } from "@/components/our-brands"
import { ServicesSection } from "@/components/services-section"
import { ComparisonTransformation } from "@/components/comparison-transformation"
import { ProjectLibraryChooser } from "@/components/project-library-chooser"
import { TheaterTourSection } from "@/components/theater-tour-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { createMetadata, defaultSeo, siteName } from "@/lib/seo"

export const metadata: Metadata = {
  ...createMetadata({
    path: "/",
    title: "Home Cinema Service in Pakistan | Home Theater Installation",
    description:
      "Experience professional home cinema, home theater, and sound system installation services across Pakistan.",
    image: defaultSeo.image,
  }),
  title: {
    absolute: "Home Cinema Service in Pakistan | Home Theater Installation",
  },
}

export default function HomePage() {
  return (
    <div className="w-full overflow-x-clip">
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <OurBrands />
        <ServicesSection />
        <ComparisonTransformation />
        <ProjectLibraryChooser />
        <TheaterTourSection />
        <Testimonials />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
