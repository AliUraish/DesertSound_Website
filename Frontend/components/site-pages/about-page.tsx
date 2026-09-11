"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, Award, CheckCircle2, GraduationCap, ShieldCheck, Users } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CertificationsSection } from "@/components/our-brands"

const offerings = [
  "Turn-key home cinema rooms",
  "Multi-room audio and video",
  "Smart home automation",
  "Motorized screens and curtains",
  "Custom theatre furniture",
  "High-end equipment installation",
]

const awards = [
  {
    year: "2021",
    title: "50 Most Admired",
    source: "The Silicon Review",
  },
  {
    year: "2022",
    title: "Global 100 Winner",
    source: "Best Home Theater and Smart Home Solutions Company in Pakistan",
  },
  {
    year: "APAC",
    title: "Best Home Theater Company",
    source: "Asia Pacific award for work in Pakistan",
  },
]

const cediaPoints = [
  {
    icon: ShieldCheck,
    title: "Industry leadership",
    text: "We follow CEDIA’s code of ethics and professional guidelines, not hobbyist guesswork.",
  },
  {
    icon: Users,
    title: "A working network",
    text: "Access to manufacturers and specialists who keep us current on systems that actually hold up in the field.",
  },
  {
    icon: GraduationCap,
    title: "Education and training",
    text: "Ongoing courses in audiovisual, automation, and networking so the install matches the spec.",
  },
  {
    icon: Award,
    title: "Standards, not slogans",
    text: "CEDIA membership is how we stay aligned with the codes and practices used on serious homes worldwide.",
  },
]

export function AboutPage() {
  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC]">
      <Header />
      <main>
        <section className="relative w-full overflow-hidden bg-[#F5F5DC]">
          <div className="w-full pb-16 pt-[130px] md:pb-20 md:pt-36 lg:pb-24 lg:pt-40">
            <div className="mx-auto max-w-[95%] px-4 lg:px-8 xl:max-w-[1600px]">
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                <div className="lg:pr-8">
                  <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-black/50">About Us</p>
                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    High-end cinema
                    <br />
                    and smart homes
                  </h1>
                  <p className="mb-8 text-base font-light leading-relaxed text-black/70 md:text-lg">
                    Desert Sound is a Karachi-based home theatre, high-end audio-video, and smart home company. We spec the right products, handle the technical build, and deliver turn-key rooms across Pakistan.
                  </p>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:bg-black/90"
                  >
                    <span>Visit the showroom</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.2)]">
                  <div className="relative h-[400px] overflow-hidden md:h-[500px] lg:h-[550px] xl:h-[650px]">
                    <Image
                      src="/Pictures Final/Services/Home_Theatre/Cover.jpg"
                      alt="Desert Sound home cinema"
                      className="h-full w-full object-cover"
                      width={1920}
                      height={1057}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">Based in</p>
                          <p className="text-sm font-medium text-white">Karachi, Pakistan</p>
                        </div>
                        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">Member</p>
                          <p className="text-sm font-medium text-white">CEDIA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-black/50">
                  The work
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  You tell us how you live. We handle the rest.
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  There are too many gadgets and too many ways to get the room wrong. We determine what the space actually needs, then specify products from manufacturers we install every week.
                </p>
                <p className="text-lg font-light leading-relaxed text-black/70">
                  Specialists take care of the technical build: wiring, acoustics, control, furniture, and commissioning. The room should still look like a home when we leave.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {offerings.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex items-start gap-3 rounded-2xl border border-black/5 bg-[#F5F5DC] p-5"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-black" />
                    <span className="text-base font-light text-black/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 text-center"
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-white/50">Recognition</p>
              <h2 className="text-3xl font-light tracking-tight text-white md:text-5xl">Awards that followed the work</h2>
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {awards.map((award, index) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-8"
                >
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/50">{award.year}</p>
                  <h3 className="mb-3 text-2xl font-light text-white">{award.title}</h3>
                  <p className="text-base font-light leading-relaxed text-white/65">{award.source}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5DC] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="mb-14 grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.26em] text-black/50">CEDIA member</p>
                <h2 className="text-3xl font-light tracking-tight text-black md:text-5xl">
                  Part of the association that sets the standard
                </h2>
              </div>
              <p className="text-lg font-light leading-relaxed text-black/70">
                CEDIA is the global association for home technology professionals. Membership means we train, install, and document to the same codes used on serious homes worldwide.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {cediaPoints.map((point, index) => {
                const Icon = point.icon
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="rounded-2xl border border-black/5 bg-white p-8"
                  >
                    <div className="mb-5 inline-flex rounded-xl bg-black/5 p-3">
                      <Icon className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="mb-3 text-xl font-light text-black">{point.title}</h3>
                    <p className="text-base font-light leading-relaxed text-black/70">{point.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <CertificationsSection />

        <section className="bg-[#1a1a1a] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 text-center lg:max-w-4xl lg:px-8">
            <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-5xl">
              Ready to begin your home theatre journey?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/70">
              Visit the Zamzama showroom or book a site visit. We work across Karachi and take projects in Lahore, Islamabad, and the rest of Pakistan.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-black transition-colors hover:bg-white/90"
              >
                Contact us
              </Link>
              <Link
                href="/service/home-theatre-design-and-installation"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-base font-medium text-white transition-all hover:bg-white hover:text-black"
              >
                Explore home theatre
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
