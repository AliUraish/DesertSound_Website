"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FaqCollapsePanel } from "@/components/faq-collapse-panel"
import { smartHomeServiceFaqs } from "@/lib/smart-home-service-faqs"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Home,
  Lightbulb,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
  Wifi,
} from "lucide-react"

const features = [
  {
    icon: SlidersHorizontal,
    title: "Centralized Control",
    description:
      "Bring lighting, climate, curtains, entertainment, and security into one interface that feels simple to use every day.",
  },
  {
    icon: Lightbulb,
    title: "Lighting & Scene Control",
    description:
      "Create one-touch scenes for movie nights, evening entertaining, bedtime routines, and energy-saving schedules across your home.",
  },
  {
    icon: Thermometer,
    title: "Climate Automation",
    description:
      "Manage air conditioning and temperature zones intelligently so comfort stays consistent without wasting power.",
  },
  {
    icon: ShieldCheck,
    title: "Security Integration",
    description:
      "Connect cameras, smart locks, sensors, and alarms for faster awareness and easier control whether you are home or away.",
  },
  {
    icon: Home,
    title: "Voice & App Control",
    description:
      "Use wall panels, smartphones, tablets, or voice commands to operate your space hands-free and from anywhere.",
  },
  {
    icon: Wifi,
    title: "Reliable Wi-Fi Backbone",
    description:
      "Automation only works well when the network is solid, so we design stable connectivity for fast response and future expansion.",
  },
]

const faqs = smartHomeServiceFaqs

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

      <FaqCollapsePanel isOpen={isOpen}>
        <p className="pb-6 text-base font-light leading-relaxed text-black/70">
          {faq.answer}
        </p>
      </FaqCollapsePanel>
    </motion.div>
  )
}

export default function SmartHomeAutomationPage() {
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
                    Smart Home Automation
                  </p>

                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    Smart Home Automation{" "}
                    <br />
                    System in Pakistan
                  </h1>

                  <p className="mb-8 text-base font-light leading-relaxed text-black/70 md:text-lg">
                    A home automation system in Pakistan links lighting, air conditioning, curtains, security and the home cinema so they run from one app, touch panel or voice command. Desert Sound designs and installs it from Karachi and surveys the home before quoting. We plan the network and backup around outages.
                  </p>

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
                        src="/Pictures Final/Services/Smart_Home_Automation/image copy.jpg"
                        alt="Smart home automation living room"
                        className="h-full w-full object-cover"
                width={1448}
                height={1086}
              />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Control
                            </p>
                            <p className="text-sm font-medium text-white">
                              App, Panel, Voice
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Systems
                            </p>
                            <p className="text-sm font-medium text-white">
                              Lighting, Climate, Security
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
                  Connected Living
                </p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
                Six Core Automation Layers
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-black/70 md:text-xl">
                Every system is planned to work together, respond quickly, and
                remain easy to manage as your home grows more capable over time.
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                Systems We Work With
              </h2>
              <p className="text-lg font-light leading-relaxed text-black/70">
                We work with wired and wireless home automation systems. Wired systems, such as KNX, run on cabling laid in the walls and the distribution board, so they are planned in while cable routes are still open. Wireless systems, such as Wi-Fi, Zigbee and Matter-based devices, connect over the home network or through a hub, so they fit finished homes and later additions. Many homes use a mix of the two. The system for each home is decided after the survey, based on the construction stage, the walls and how the family wants to control it. For the questions to weigh before a survey, see{" "}
                <Link href="/how-to-choose-a-home-automation-system-pakistan" className="underline underline-offset-4 hover:text-black">choosing between wired, wireless and local control</Link>.
              </p>
            </motion.div>
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
                  src="/Pictures Final/Services/Control_Integration/image copy.jpg"
                  alt="Smart home control and automation interface"
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
                  System Design
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Automation That Fits the Way You Live
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  A smart home automation system is most effective when it is
                  designed around real routines, not just devices. We evaluate
                  your home layout, daily habits, comfort preferences, and
                  future expansion plans before deciding how each system should
                  connect.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  The goal is a unified experience where lighting, climate,
                  security, curtains, and entertainment feel coordinated rather
                  than fragmented. That means fewer remotes, cleaner control,
                  and smoother performance across the entire property.
                </p>

                <div className="space-y-4">
                  {[
                    "Central control for multiple home systems",
                    "Layouts tailored for apartments, villas, and larger homes",
                    "Scalable design for phased upgrades",
                    "Cleaner daily operation with fewer control points",
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

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                New Build or Existing Home
              </h2>
              <p className="text-lg font-light leading-relaxed text-black/70">
                In a new build, automation is easiest to plan before the walls are plastered and the false ceiling is closed, so control, sensor, curtain and controller positions can go on the drawings and cabling can be routed before finishes go on. In an existing home, we work with the wiring already in the walls. Many older switch boxes have no neutral wire, which some smart switches need, so the survey checks each box before any switch is chosen. Where a new cable route isn't practical, the survey looks at whether wireless devices can fill the gap. Changes to the distribution board or circuits need a qualified electrician, and we plan the automation around that work.
              </p>
            </motion.div>
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
                  Voice & Scenes
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                  Hands-Free Control With Meaningful Automation
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-white/70">
                  Voice control is useful when it removes friction. Instead of
                  adjusting separate systems manually, you can trigger a
                  complete scene with a spoken command, a touch panel, or a
                  single button in the app.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-white/70">
                  Movie mode can dim the lights, close the curtains, start the
                  entertainment system, and set the room for viewing. Morning
                  mode can open shades, restore lighting, and prepare the home
                  for the day. The value comes from coordination, not gimmicks.
                </p>

                <div className="space-y-4">
                  {[
                    "Custom scenes for movie nights, arrivals, and bedtime",
                    "Voice assistant compatibility where it makes sense",
                    "Touch-panel and app control for every room",
                    "Better accessibility for busy households and older users",
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
                <video
                  src="/Pictures Final/Services/Smart_Home_Automation/curtain.mp4"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Automated curtain control demonstration"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-[#F5F5DC] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl rounded-2xl bg-white p-8 text-center shadow-2xl lg:p-12"
              >
                <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-black/50">
                  Connectivity & Expansion
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Stable Networking Makes Automation Reliable
                </h2>
                <p className="mx-auto mb-6 max-w-3xl text-lg font-light leading-relaxed text-black/70">
                  Remote control, fast response times, device sync, and system
                  monitoring all depend on a strong network. Smart home
                  automation is only as good as the Wi-Fi and infrastructure
                  supporting it.
                </p>
                <p className="mx-auto mb-8 max-w-3xl text-lg font-light leading-relaxed text-black/70">
                  We design automation with network stability and future
                  expansion in mind, so new rooms, security devices,
                  entertainment zones, and control interfaces can be added
                  without rebuilding the entire system later.
                </p>

                <div className="mx-auto mb-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
                  {[
                    "Remote monitoring and control from anywhere",
                    "Reliable response across connected devices",
                    "Support for multi-room entertainment and audio",
                    "Future-ready structure for phased upgrades",
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
                  href="/service/control-systems"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-base font-light text-white transition-all duration-300 hover:gap-4 hover:bg-black/90"
                >
                  <span>Explore Control Integration</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                Built for Load-Shedding and Internet Drops
              </h2>
              <p className="text-lg font-light leading-relaxed text-black/70">
                Power cuts and internet outages are part of daily life in Pakistan, so we plan for both from the start. We plan the network and backup around outages, starting with{" "}
                <Link href="/service/home-networking-and-wi-fi" className="underline underline-offset-4 hover:text-black">the home network automation runs on</Link>
                {" "}and the backup supply already in the home. The survey notes how the home is affected by power cuts and internet drops, what backup is already installed and which rooms matter most to the family, and the design is planned around that. If you are still weighing it up, see{" "}
                <Link href="/smart-home-automation-why-should-you-invest-in-it-for-your-home" className="underline underline-offset-4 hover:text-black">what's worth automating first, and what can wait</Link>.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-[#F5F5DC] py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                How a Project Runs
              </h2>
              <p className="text-lg font-light leading-relaxed text-black/70">
                Whether you want a full home automation solution or automation for a few rooms, every project starts with a site survey. We walk through the rooms, check the existing wiring and switch boxes, look at Wi-Fi coverage, note the existing backup supply and ask how the family uses each space, indoors and out. The design comes next: which controls go in each room, where the controller and network equipment sit, and the scenes the home needs, from outdoor lighting, the gate and garden audio to{" "}
                <Link href="/service/home-theatre-design-and-installation" className="underline underline-offset-4 hover:text-black">a home cinema tied into the same scenes</Link>
                {" "}if you have one. The quote follows the design, because the number of rooms, the devices and the wiring work set the cost. Then we install and programme the system, planning around a qualified electrician for any board or circuit work. At handover, we show the family how each control works.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[88%] px-4 lg:max-w-7xl lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                Where We Work
              </h2>
              <p className="text-lg font-light leading-relaxed text-black/70">
                Desert Sound designs and installs home cinemas, home theatres and smart homes, with a showroom in Karachi, and is a member of CEDIA. We work with homes across Pakistan. We have a team in Lahore. Fill in the form and we will contact you.
              </p>
            </motion.div>
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
                Common questions about smart home automation design and
                installation
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
                Plan a Smarter Home Experience
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/70">
                Talk to our team about lighting scenes, climate control,
                security integration, entertainment control, and the networking
                needed to make it all work reliably. Fill in the form and we will contact you.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-base font-medium text-black transition-colors duration-300 hover:bg-white/90"
                >
                  Book a Consultation
                </Link>
                <a
                  href="tel:+9221111570111"
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
