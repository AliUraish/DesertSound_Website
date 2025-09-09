import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ProjectsSlideshow } from "@/components/projects-slideshow"
import { StatsSection } from "@/components/stats-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProjectsSlideshow />
      <StatsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
