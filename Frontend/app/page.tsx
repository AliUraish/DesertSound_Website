import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OurBrands } from "@/components/our-brands"
import { ServicesSection } from "@/components/services-section"
import { ComparisonTransformation } from "@/components/comparison-transformation"
import { ProjectsSlideshow } from "@/components/projects"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <OurBrands />
      <ServicesSection />
      <ComparisonTransformation />
      <ProjectsSlideshow />
      <StatsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
