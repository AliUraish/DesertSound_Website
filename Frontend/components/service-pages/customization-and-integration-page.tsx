"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  Armchair,
  CheckCircle2,
  ChevronDown,
  LayoutTemplate,
  Palette,
  Sofa,
  Workflow,
} from "lucide-react"

const features = [
  {
    icon: Sofa,
    title: "Custom cabinetry and furniture",
    description:
      "Bespoke cabinets and furniture that hide equipment, match the interior, and keep the room looking like a home rather than a rack room.",
  },
  {
    icon: Armchair,
    title: "Theatre seating and acoustics",
    description:
      "Seating planned for throw distance, plus acoustic treatment so the room sounds as considered as it looks.",
  },
  {
    icon: Workflow,
    title: "Integration with existing systems",
    description:
      "Lighting, HVAC, security, and entertainment on one control layer instead of three apps that do not talk to each other.",
  },
  {
    icon: LayoutTemplate,
    title: "Custom user interfaces",
    description:
      "Keypads and touch layouts that match how the family actually uses the house, not a generic factory template.",
  },
  {
    icon: Palette,
    title: "Design consultation",
    description:
      "We work with you, and your architect or interior designer, so the technology does not fight the décor.",
  },
]

const faqs = [
  {
    question: "Do you design custom furniture for the theatre room?",
    answer:
      "Yes. Cabinetry and seating are built around the room and the equipment, not chosen off the shelf after the install is finished.",
  },
  {
    question: "Can you integrate with a system I already have?",
    answer:
      "Yes. We design automation and control to work with existing devices where possible, then replace only what cannot be made reliable.",
  },
  {
    question: "Do you work with our architect or interior designer?",
    answer:
      "Yes. Design consultation happens alongside them so the install matches the space, the finishes, and the way the room will be used.",
  },
  {
    question: "Can a small apartment still be customised?",
    answer:
      "Yes. Compact rooms are often where custom furniture and careful integration matter most, because every millimetre and every cable path counts.",
  },
]

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0]
  index: number
}) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl border border-black/5 bg-white p-8 transition-all duration-300 hover:border-black/10 hover:shadow-xl lg:p-10"
    >
      <div className="flex h-full flex-col">
        <div className="mb-6">
          <div className="inline-flex rounded-xl bg-black/5 p-4 transition-colors duration-300 group-hover:bg-black/10">
            <Icon className="h-8 w-8 text-black" />
          </div>
        </div>
        <h3 className="mb-4 text-2xl font-light tracking-tight text-black">{feature.title}</h3>
        <p className="text-base font-light leading-relaxed text-black/70">{feature.description}</p>
      </div>
    </motion.div>
  )
}

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="border-b border-black/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-8 text-lg font-light text-black lg:text-xl">{faq.question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
          <ChevronDown className="h-6 w-6 text-black/60 transition-colors group-hover:text-black" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base font-light leading-relaxed text-black/70">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function CustomizationAndIntegrationPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.03])

  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC]">
      <Header />
      <main>
        <section ref={containerRef} className="relative w-full overflow-hidden bg-[#F5F5DC]">
          <div className="w-full pb-16 pt-[130px] md:pb-20 md:pt-36 lg:pb-24 lg:pt-40">
            <div className="mx-auto max-w-[95%] px-4 lg:px-8 xl:max-w-[1600px]">
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="lg:pr-8"
                >
                  <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-black/50">
                    Customization and Integration
                  </p>
                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    Designed around
                    <br />
                    the actual room
                  </h1>
                  <p className="mb-8 text-base font-light leading-relaxed text-black/70 md:text-lg">
                    Furniture, seating, acoustics, and the systems already in the house, planned as one install rather than a pile of leftover boxes.
                  </p>
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:bg-black/90"
                  >
                    <span>Explore Solution</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative"
                >
                  <motion.div
                    style={{ y, scale }}
                    className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
                  >
                    <div className="relative h-[400px] overflow-hidden md:h-[500px] lg:h-[550px] xl:h-[650px]">
                      <Image
                        src="/Pictures Final/Services/Control_Integration/image copy.jpg"
                        alt="Customization and integration for a private cinema"
                        className="h-full w-full object-cover"
                        width={1920}
                        height={1280}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">Craft</p>
                            <p className="text-sm font-medium text-white">Cabinetry & seating</p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">Systems</p>
                            <p className="text-sm font-medium text-white">One control layer</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20 text-center"
            >
              <div className="mb-6 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-black/20" />
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/50">Tailored Installs</p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
                Built to the space
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-black/70 md:text-xl">
                Custom work is how a cinema or smart home disappears into the architecture instead of sitting on top of it.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5DC] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <Image
                  src="/Pictures Final/Services/Home_Theatre/vellari5.jpg"
                  alt="Custom home theatre seating"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
                  width={1920}
                  height={1280}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-black/50">
                  Seating and acoustics
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Comfort that matches the picture
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Seating is planned for the throw distance. Acoustic treatment is planned for the room, so dialogue stays clear and bass does not boom.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Cabinetry hides the rack, the cables, and the less photogenic hardware. The finished room should still look like it belongs in the house.
                </p>
                <div className="space-y-4">
                  {[
                    "Bespoke cabinets matched to the interior",
                    "Cinema seating for the actual viewing distance",
                    "Acoustic treatment as part of the design",
                    "Equipment hidden, not displayed",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-black" />
                      <span className="text-base font-light text-black/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                  Existing systems
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                  Make what you already own work together
                </h2>
                <p className="mb-8 text-lg font-light leading-relaxed text-white/70">
                  Lighting, HVAC, security, and entertainment should sit on one control layer. We integrate what can stay and replace only what cannot be made reliable.
                </p>
                <div className="space-y-4">
                  {[
                    "Control layouts that match daily use",
                    "Scenes instead of a drawer of remotes",
                    "Works with the systems already in the house",
                    "Designed to expand without a full rebuild",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-white" />
                      <span className="text-base font-light text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/Pictures Final/Services/Control_Integration/Image.jpg"
                  alt="Integrated home control"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
                  width={1920}
                  height={1280}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5DC] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-4xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                Frequently Asked Questions
              </h2>
            </motion.div>
            <div className="rounded-2xl bg-white p-6 shadow-lg lg:p-10">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1a1a1a] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 text-center lg:max-w-4xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                Ready to design around your room?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/70">
                Get a free consultation and we will plan the furniture, acoustics, and control around the space you already have.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-black transition-colors duration-300 hover:bg-white/90"
                >
                  Get Free Consultation
                </Link>
                <a
                  href="tel:+922111570111"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Call: (+92) 21-111-570-111
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
