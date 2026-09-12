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
