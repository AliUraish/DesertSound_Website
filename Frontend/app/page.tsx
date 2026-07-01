import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CertificationsSection, OurBrands } from "@/components/our-brands"
import { ServicesSection } from "@/components/services-section"
import { ComparisonTransformation } from "@/components/comparison-transformation"
import { ProjectLibraryChooser } from "@/components/project-library-chooser"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { createMetadata, defaultSeo, siteName } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  path: "/",
  title: `${siteName} - ${defaultSeo.title}`,
  description: defaultSeo.description,
  image: defaultSeo.image,
})

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
        <Testimonials />
        <CertificationsSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
