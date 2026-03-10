"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  Wifi,
  Settings,
  Shield,
  Smartphone,
  Network,
  ChevronDown,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"

const features = [
  {
    icon: Network,
    title: "Home and office networking solutions",
    description:
      "Connect seamlessly with our Home and Office Networking solutions, designed to support reliable connectivity for everyday use, entertainment, and automation.",
  },
  {
    icon: Settings,
    title: "Home network setup and optimization",
    description:
      "Connect seamlessly with our Home and Office Networking solutions. Our services ensure a robust Home Network Setup and Optimization for peak performance.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi coverage and performance enhancement",
    description:
      "Get extensive Wi-Fi Coverage and Performance Enhancement to eliminate dead zones and improve connectivity throughout your space.",
  },
  {
    icon: Wifi,
    title: "Wired and wireless network solutions",
    description:
      "Our experts design and implement reliable Wired and Wireless Network Solutions tailored to your needs, whether for a smart home, office, or multi-level environment.",
  },
  {
    icon: Shield,
    title: "Network security and parental controls",
    description:
      "We prioritize Network Security and Parental Controls, safeguarding your data and controlling access for family members.",
  },
  {
    icon: Smartphone,
    title: "Integration with smart devices",
    description:
      "Additionally, we offer Integration with Smart Devices, enabling seamless connectivity for all your home automation and entertainment systems.",
  },
]

const faqs = [
  {
    question: "How do I know if my house is suitable for automation?",
    answer:
      "Our experts will assess your home's existing infrastructure, Wi-Fi strength, and layout to recommend the right setup. Whether you're building new or upgrading an existing home, Desert Sound's solutions can be tailored to fit.",
  },
  {
    question: "Can I control everything from one app or remote?",
    answer:
      "Yes, with our smart home control systems, you can manage lighting, climate, security, entertainment, and more from a single interface such as a smartphone, touch panel, or voice assistant.",
  },
  {
    question: "Is smart home automation expensive in Pakistan?",
    answer:
      "Costs vary depending on the size of your home and the level of automation you want. Desert Sound offers scalable solutions, from essential smart features to fully integrated luxury systems, to suit different budgets.",
  },
  {
    question: "Can smart systems be added to an already built home?",
    answer:
      "Absolutely. Retrofit smart automation is possible without major renovations. Wireless controls, smart switches, and discreet devices make it easy to modernize an existing home with minimal disruption.",
  },
  {
    question: "What happens if the internet goes down?",
    answer:
      "Basic automation functions like lighting scenes, local control, and scheduled events usually continue to work without internet. However, remote access and cloud-based features may pause until the connection is restored.",
  },
]

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const Icon = feature.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative rounded-2xl border border-black/5 bg-white p-8 lg:p-10 transition-all duration-300 hover:border-black/10 hover:shadow-xl"
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

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
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
            <p className="pb-6 text-base font-light leading-relaxed text-black/70">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function HomeNetworkingAndWifiPage() {
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
                    Home Networking and Wi-Fi
                  </p>

                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    Home Networking
                    <br />
                    and Wi-Fi
                  </h1>

                  <p className="mb-8 text-base font-light leading-relaxed text-black/70 md:text-lg">
                    Connect seamlessly with our Home and Office Networking solutions. Our services ensure a robust Home
                    Network Setup and Optimization for peak performance.
                  </p>

                  <div className="flex">
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:gap-3 hover:bg-black/90"
                    >
                      <span>Explore Solutions</span>
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
                        src="/smart-home-control-room-futuristic.jpg"
                        alt="Home Networking and Wi-Fi"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">Coverage</p>
                            <p className="text-sm font-medium text-white">Wi-Fi enhancement</p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">Security</p>
                            <p className="text-sm font-medium text-white">Parental controls</p>
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
                <p className="text-xs font-medium uppercase tracking-[0.26em] text-black/50">Home Networking and Wi-Fi</p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
                Home Networking and Wi-Fi
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-black/70 md:text-xl">
                Get extensive Wi-Fi Coverage and Performance Enhancement to eliminate dead zones and improve connectivity
                throughout your space.
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
                <img
                  src="/modern-smart-home-living-room-with-automated-light.jpg"
                  alt="Home network setup and optimization"
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
                  Home Networking and Wi-Fi
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Home network setup and optimization
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Connect seamlessly with our Home and Office Networking solutions. Our services ensure a robust Home
                  Network Setup and Optimization for peak performance.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Get extensive Wi-Fi Coverage and Performance Enhancement to eliminate dead zones and improve connectivity
                  throughout your space.
                </p>

                <div className="space-y-4">
                  {[
                    "Home network setup and optimization",
                    "Wi-Fi coverage and performance enhancement",
                    "Wired and wireless network solutions",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
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
                  Wired and Wireless Network Solutions
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                  Wired and wireless network solutions
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-white/70">
                  Our experts design and implement reliable Wired and Wireless Network Solutions tailored to your needs,
                  whether for a smart home, office, or multi-level environment.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-white/70">
                  We prioritize Network Security and Parental Controls, safeguarding your data and controlling access for
                  family members.
                </p>

                <div className="space-y-4">
                  {[
                    "Wired and wireless network solutions",
                    "Network security and parental controls",
                    "Wi-Fi coverage and performance enhancement",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
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
                <img
                  src="/homepage8.jpg"
                  alt="Wired and wireless network solutions"
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
                  src="/homepage3.jpg"
                  alt="Integration with smart devices"
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
                  Smart Device Integration
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Integration with smart devices
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Additionally, we offer Integration with Smart Devices, enabling seamless connectivity for all your home
                  automation and entertainment systems.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Connect seamlessly with our Home and Office Networking solutions. Our services ensure a robust Home
                  Network Setup and Optimization for peak performance.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    "Integration with smart devices",
                    "Home network setup and optimization",
                    "Network security and parental controls",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-black" />
                      <span className="text-base font-light text-black/80">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 text-base font-light text-black transition-all duration-300 hover:gap-4"
                >
                  <span>Explore Services</span>
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
                Frequently Ask Question
              </h2>
              <p className="text-lg font-light leading-relaxed text-black/70">
                Home Networking and Wi-Fi
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
                Get Free Consultation
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/70">
                Contact us now for a free consultation from our experts!
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
