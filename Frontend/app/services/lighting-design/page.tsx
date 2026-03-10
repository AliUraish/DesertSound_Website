"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Home,
  Lightbulb,
  SlidersHorizontal,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Lightbulb,
    title: "Layered Lighting Plans",
    description:
      "We design balanced lighting schemes that combine ambient, task, accent, and decorative lighting so each room feels intentional and comfortable throughout the day.",
  },
  {
    icon: SlidersHorizontal,
    title: "Scene & Mood Control",
    description:
      "Preset scenes make it easy to shift from bright functional lighting to soft evening ambience with a single tap, keypad press, or automation trigger.",
  },
  {
    icon: Home,
    title: "Architectural Integration",
    description:
      "Fixtures, trims, coves, and concealed details are selected to support the architecture instead of competing with it, keeping the space clean and refined.",
  },
  {
    icon: Zap,
    title: "Efficiency & Performance",
    description:
      "We plan for LED performance, dimming compatibility, glare control, and long-term efficiency so the lighting looks good and works reliably over time.",
  },
]

const faqs = [
  {
    question: "What does a lighting design service usually include?",
    answer:
      "A lighting design service typically covers fixture planning, circuit strategy, scene recommendations, dimming considerations, and placement guidance for each room or zone.",
  },
  {
    question: "Can lighting design be added to an existing home?",
    answer:
      "Yes. Lighting upgrades can be planned for renovations, single-room refreshes, or phased improvements, depending on access, ceiling conditions, and control requirements.",
  },
  {
    question: "Do you design lighting with smart controls in mind?",
    answer:
      "Yes. Lighting layouts can be paired with automation, keypads, mobile control, and preset scenes so the system feels practical as well as visually polished.",
  },
  {
    question: "How early should lighting design happen in a project?",
    answer:
      "Ideally, lighting design should begin early in the project so fixture locations, wiring, ceiling details, and control planning can all be coordinated before installation starts.",
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

        <h3 className="mb-4 text-2xl font-light tracking-tight text-black">
          {feature.title}
        </h3>

        <p className="text-base font-light leading-relaxed text-black/70">
          {feature.description}
        </p>
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
        <span className="pr-8 text-lg font-light text-black lg:text-xl">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
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
            <p className="pb-6 text-base font-light leading-relaxed text-black/70">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function LightingDesignPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
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
        <section
          ref={containerRef}
          className="relative w-full overflow-hidden bg-[#F5F5DC]"
        >
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
                    Lighting Design
                  </p>

                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    Lighting Design
                    <br />
                    For Better Spaces
                  </h1>

                  <p className="mb-6 text-base font-light leading-relaxed text-black/70 md:text-lg">
                    Thoughtful lighting design shapes how a space feels,
                    functions, and transitions from one moment to the next. A
                    good plan goes beyond fixture selection and considers mood,
                    circulation, visual comfort, and how each area is actually
                    used.
                  </p>

                  <p className="text-base font-light leading-relaxed text-black/70 md:text-lg">
                    Whether the goal is a warm residential atmosphere or a more
                    polished commercial environment, the right lighting
                    strategy brings clarity to architecture, supports daily
                    routines, and makes the entire experience feel more
                    intentional.
                  </p>

                  <div className="mt-8 flex">
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:bg-black/90"
                    >
                      <span>Explore Solution</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
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
                      <img
                        src="/luxury-home-theater-cinematic-lighting.jpg"
                        alt="Lighting design installation"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Focus
                            </p>
                            <p className="text-sm font-medium text-white">
                              Mood, Comfort, Function
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Control
                            </p>
                            <p className="text-sm font-medium text-white">
                              Scenes, Dimming, Zoning
                            </p>
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
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/50">
                  Design Approach
                </p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
                Four Core Lighting Layers
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-black/70 md:text-xl">
                This placeholder structure gives you a complete service page
                now, while keeping the messaging easy to replace later.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
                <img
                  src="/luxury-modern-home-theater-dark-atmospheric.jpg"
                  alt="Layered residential lighting"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
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
                  Planning & Layout
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Lighting Starts With How A Space Is Used
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Effective lighting design begins with understanding movement,
                  sightlines, ceiling conditions, furniture layouts, and where
                  people naturally spend time. That planning phase helps avoid
                  flat rooms, harsh glare, and overlit surfaces.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Placeholder copy like this can later be replaced with your
                  exact positioning, preferred fixture types, and the markets
                  you want to speak to most directly.
                </p>

                <div className="space-y-4">
                  {[
                    "Ambient, task, accent, and decorative layers",
                    "Clear fixture positioning and zone planning",
                    "Comfortable light levels without visual clutter",
                    "A structure that is easy to revise later",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-black" />
                      <span className="text-base font-light text-black/80">
                        {item}
                      </span>
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
                  Scenes & Controls
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                  Good Lighting Feels Better When Control Is Simple
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-white/70">
                  Dimming, zoning, and preset scenes change the experience from
                  basic switching to intentional control. Day, evening,
                  entertaining, and cinema modes can each have their own
                  lighting response without making the system feel complicated.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-white/70">
                  This section is intentionally generic so you can later swap
                  in brand references, keypad options, and automation language
                  that matches the rest of your services.
                </p>

                <div className="space-y-4">
                  {[
                    "Single-touch scene selection",
                    "Room-by-room dimming and zoning",
                    "Manual control plus automation options",
                    "Easy alignment with control-system messaging",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-white" />
                      <span className="text-base font-light text-white/80">
                        {item}
                      </span>
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
                <img
                  src="/luxury-home-theater-room-with-ambient-lighting-and.jpg"
                  alt="Lighting control scenes"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
                />
              </motion.div>
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
                <img
                  src="/luxury-home-theater-cinematic-lighting.jpg"
                  alt="Architectural lighting detail"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
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
                  Atmosphere & Detail
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Lighting Can Quietly Define The Entire Mood
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  The most successful lighting schemes often feel subtle rather
                  than flashy. They support finishes, textures, circulation,
                  and focal points without demanding attention from the space
                  itself.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Use this final section as a placeholder for your future copy
                  around hospitality, residential, wellness, retail, or
                  entertainment environments once you decide how broad you want
                  the service to be presented.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    "Warm atmosphere with clear visual hierarchy",
                    "Accent lighting for textures and focal points",
                    "Performance-minded LED and dimming choices",
                    "Placeholder messaging ready for your final rewrite",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-black" />
                      <span className="text-base font-light text-black/80">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/services/control-integration"
                  className="inline-flex items-center gap-2 text-base font-light text-black transition-all duration-300 hover:gap-4"
                >
                  <span>See Control Integration</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
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
              <p className="text-lg font-light leading-relaxed text-black/70">
                Placeholder FAQ copy you can replace with your final lighting
                service messaging later.
              </p>
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
                Ready To Shape The Mood Of Your Space?
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/70">
                This closing section can stay as a call to action for now, then
                be updated once your final lighting copy is ready.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-black transition-colors duration-300 hover:bg-white/90"
                >
                  Contact Us
                </Link>
                <a
                  href="tel:+922111570111"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
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
