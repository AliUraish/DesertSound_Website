import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CertificationsSection, OurBrands } from "@/components/our-brands"
import { ServicesSection } from "@/components/services-section"
import { InstallProcessSection } from "@/components/install-process-section"
import { ComparisonTransformation } from "@/components/comparison-transformation"
import { ProjectLibraryChooser } from "@/components/project-library-chooser"
import { TheaterTourSection } from "@/components/theater-tour-section"
import { Testimonials } from "@/components/testimonials"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import {
  createMetadata,
  defaultSeo,
  faqPageJsonLd,
  homepageInstallFaqs,
  installHowToJsonLd,
  installProcessItemListJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = {
  ...createMetadata({
    path: "/",
    title: "Home Cinema Service in Pakistan | Home Theater Installation",
    description:
      "Best home theater installation in Pakistan: home cinema and home theatre installation nationwide, with Karachi as the local market.",
    image: defaultSeo.image,
  }),
  title: {
    absolute: "Home Cinema Service in Pakistan | Home Theater Installation",
  },
}

export default function HomePage() {
  return (
    <div className="w-full overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageJsonLd(homepageInstallFaqs)).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(installHowToJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(installProcessItemListJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <main className="min-h-screen bg-background">
        <Header />
        <HeroSection />
        <OurBrands />
        <ServicesSection />
        <InstallProcessSection />
        <ComparisonTransformation />
        <ProjectLibraryChooser />
        <TheaterTourSection />
        <Testimonials />
        <CertificationsSection />
        <ContactSection showFaq />
        <Footer />
      </main>
    </div>
  )
}
