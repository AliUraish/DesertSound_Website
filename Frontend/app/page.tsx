import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OurBrands } from "@/components/our-brands"
import { ServicesSection } from "@/components/services-section"
import { ComparisonTransformation } from "@/components/comparison-transformation"
import { ProjectLibraryChooser } from "@/components/project-library-chooser"
import { StatsSection } from "@/components/stats-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

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
        <StatsSection />
        <Testimonials />
        <ContactSection />
        <Footer />
      </main>
    </div>
  )
}
