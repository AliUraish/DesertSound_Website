import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sitemap - Desert Sound",
  description: "Sitemap of Desert Sound pages.",
}

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About us" },
  { href: "/contact-us", label: "Contact us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/projects", label: "Projects" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-condition", label: "Terms and condition" },
  { href: "/service/home-theatre-design-and-installation", label: "Home theatre design and installation" },
  { href: "/service/smart-home-automation", label: "Smart home automation" },
  { href: "/service/audio-distribution", label: "Audio distribution" },
  { href: "/service/control-systems", label: "Control systems" },
  { href: "/service/home-networking-and-wi-fi", label: "Home networking and Wi-Fi" },
  { href: "/service/customization-and-integration", label: "Customization and integration" },
  { href: "/service/maintenance-and-support", label: "Maintenance and support" },
  { href: "/transform-your-entertainment-space-with-desert-sound", label: "Transform your entertainment space" },
  { href: "/optimal-steps-to-improve-the-sound-experience-of-your-home-theater-designs", label: "Steps to enhance home theater sound" },
  { href: "/creating-the-perfect-acoustic-environment", label: "Creating the perfect acoustic environment" },
  { href: "/the-rise-of-voice-controlled-home-theatre-service-in-pakistan", label: "Voice-controlled home theatre in Pakistan" },
  { href: "/turn-any-room-into-a-home-theatre-with-smart-automation", label: "Turn any room into a home theatre" },
  { href: "/voice-controlled-smart-home-systems-explained", label: "Voice-controlled smart home systems" },
  { href: "/home-theater-companies-near-me-are-leveling-up-gaming-setups", label: "Home theater companies near me" },
  { href: "/how-to-plan-a-smart-home-theater-in-pakistan-tips-from-desert-sound", label: "How to plan a smart home theater in Pakistan" },
  { href: "/soundproofing-home-cinema-installation", label: "Soundproofing home cinema" },
  { href: "/home-theater-design-and-installation-why-is-professional-help-important", label: "Why professional home theater help matters" },
  { href: "/set-home-theater-systems-with-desert-sound-2024", label: "Set home theater systems 2024" },
  { href: "/acoustic-panels-and-soundproofing-tips-for-private-home-cinemas", label: "Acoustic panels and soundproofing tips" },
  { href: "/why-decoupled-walls-and-floors-matter-for-complete-sound-isolation", label: "Decoupled walls and floors" },
]

export default function SitemapPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Sitemap</h1>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="underline underline-offset-2">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
