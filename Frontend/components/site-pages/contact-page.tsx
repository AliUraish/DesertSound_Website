"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactSection } from "@/components/contact-section"

export function ContactPage() {
  return (
    <div className="w-full overflow-x-clip bg-black">
      <Header />
      <main>
        <section className="bg-[#F5F5DC] pt-[130px] pb-12 md:pt-36 md:pb-16 lg:pt-40">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-black/45">Contact Us</p>
              <h1 className="mb-5 text-4xl font-light leading-[1.08] tracking-tight text-black md:text-6xl">
                Visit the showroom or book a site visit
              </h1>
              <p className="mb-8 text-lg font-light leading-relaxed text-black/65">
                We work across Karachi and take projects in Lahore, Islamabad, and the rest of Pakistan. Walk into Zamzama, or send a note and we will come to the room.
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/45">Karachi showroom</p>
                  <p className="text-base font-light leading-relaxed text-black">
                    22-C/II, 2nd Zamzama Commercial Lane
                    <br />
                    Phase V, D.H.A Karachi
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.18em] text-black/45">Any query?</p>
                  <a href="tel:+9221111570111" className="block text-base font-light text-black hover:text-black/70">
                    +92 21 111 570 111
                  </a>
                  <a href="mailto:info@desertsound.com.pk" className="block text-base font-light text-black hover:text-black/70">
                    info@desertsound.com.pk
                  </a>
                </div>
              </div>
              <p className="mt-8 text-sm font-light text-black/50">
                Prefer to read first? See{" "}
                <Link href="/about-us" className="underline underline-offset-4 hover:text-black">
                  about us
                </Link>{" "}
                or{" "}
                <Link href="/service/home-theatre-design-and-installation" className="underline underline-offset-4 hover:text-black">
                  home theatre design
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
