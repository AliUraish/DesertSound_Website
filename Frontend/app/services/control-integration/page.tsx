"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Mic,
  SlidersHorizontal,
  Smartphone,
  TabletSmartphone,
} from "lucide-react"

const features = [
  {
    icon: SlidersHorizontal,
    title: "Smart home control panels",
    description:
      "Desert Sound’s Smart Home Control Panel revolutionizes home management. With an intuitive interface, effortlessly monitor and command various systems like lighting, security, HVAC, and entertainment from one sleek hub.",
  },
  {
    icon: TabletSmartphone,
    title: "Touchscreen interfaces",
    description:
      "Desert Sound’s Touch Screen Interfaces redefine convenience and sophistication in home control. With intuitive touch controls, easily manage your smart home systems with precision and style.",
  },
  {
    icon: Smartphone,
    title: "Remote control integration",
    description:
      "Seamlessly integrate remote controls for effortless management of your home systems. Enjoy convenience and accessibility with centralized control over lighting, entertainment, security, and more.",
  },
  {
    icon: Mic,
    title: "Voice control integration",
    description:
      "Voice Control Integration syncs your smart home systems with leading voice assistants. Simply command adjustments to lighting, temperature, entertainment, and security, enjoying the ultimate convenience and accessibility in home automation.",
  },
]

const faqs = [
  {
    question: "How much does a home theatre cost?",
    answer:
      "Projects vary widely depending on your needs and budget. Our representatives visit with you to better understand your home remodeling needs. At Konstruktion Home Improvements we do more than give you a quote. We provide you with the information you need to make the right decisions for your home. Our representatives take time to explain the details regarding your project. We answer all of your questions and explain our estimates for your home improvement project. There is no obligation. Give us some time to review your wish list and we will give you valuable information. We believe that an educated consumer is our best customer!",
  },
  {
    question: "What is included with a free remodeling estimate?",
    answer:
      "Our free remodeling estimates include a detailed written scope of work. At times, when necessary or when requested, we will provide renderings for you to view what your remodel will look like upon completion. Renderings look like a picture of your home and are a likeness of what your remodel will look like so you can visualize the space to be remodeled.",
  },
  {
    question: "How long will my project take?",
    answer:
      "During our free consultation with you, we will discuss the duration of your project. The key element in completing your project in a timely manner is for you to be available during the process so you can select your products. In addition, we will need full access to your home during the remodel during regular work hours (Monday through Friday 09:30 to 07:30). We will not begin work on your home until all the materials have been received. Our company policy is to stay on your project until completion once we have started construction.",
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

export default function ControlIntegrationPage() {
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
                    Control Systems
                  </p>

                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    Control
                    <br />
                    Systems
                  </h1>

                  <p className="mb-6 text-base font-light leading-relaxed text-black/70 md:text-lg">
                    A control system is a fundamental tool used in engineering
                    to manage and regulate the behavior of dynamic systems. It
                    comprises sensors, actuators, and a controller working
                    together to maintain desired conditions or achieve specific
                    objectives.
                  </p>

                  <p className="text-base font-light leading-relaxed text-black/70 md:text-lg">
                    By continuously monitoring and adjusting inputs based on
                    comparisons with reference values, control systems ensure
                    stability and optimize performance across a wide range of
                    applications, from industrial automation to aerospace and
                    automotive industries.
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
                        src="/Pictures%20Final/Services/Control_Integration/Cover.jpg"
                        alt="Control systems installation"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Systems
                            </p>
                            <p className="text-sm font-medium text-white">
                              Lighting, Security, HVAC
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Control
                            </p>
                            <p className="text-sm font-medium text-white">
                              Remote, Touch, Voice
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
                  We work in an integral manner
                </p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
                Control Systems
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-black/70 md:text-xl">
                We address projects in the following dimensions.
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
                  src="/Pictures%20Final/Services/Control_Integration/Image.jpg"
                  alt="Smart home control panels"
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
                  Smart home control panels
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Smart home control panels
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Desert Sound’s Smart Home Control Panel revolutionizes home
                  management. With an intuitive interface, effortlessly monitor
                  and command various systems like lighting, security, HVAC,
                  and entertainment from one sleek hub.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Customizable layouts and advanced features offer tailored
                  control, while integration with voice assistants ensures
                  hands-free operation. Experience the pinnacle of convenience
                  and efficiency as your smart home adapts to your needs with
                  Desert Sound’s state-of-the-art control panel.
                </p>

                <div className="space-y-4">
                  {[
                    "Lighting, security, HVAC, and entertainment",
                    "One sleek hub",
                    "Customizable layouts and advanced features",
                    "Integration with voice assistants",
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
                  Touchscreen interfaces
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                  Touchscreen interfaces
                </h2>
                <p className="mb-8 text-lg font-light leading-relaxed text-white/70">
                  Desert Sound’s Touch Screen Interfaces redefine convenience
                  and sophistication in home control. With intuitive touch
                  controls, easily manage your smart home systems with
                  precision and style, enhancing your daily routines with
                  effortless functionality and modern elegance.
                </p>

                <div className="space-y-4">
                  {[
                    "Intuitive touch controls",
                    "Manage your smart home systems with precision and style",
                    "Effortless functionality",
                    "Modern elegance",
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
                  src="/Pictures%20Final/Services/Control_Integration/image.png"
                  alt="Touchscreen interfaces"
                  className="h-[400px] w-full rounded-2xl object-cover shadow-2xl lg:h-[600px]"
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
                  Remote control integration
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Remote control integration
                </h2>
                <p className="mx-auto mb-6 max-w-3xl text-lg font-light leading-relaxed text-black/70">
                  Seamlessly integrate remote controls for effortless
                  management of your home systems. Enjoy convenience and
                  accessibility with centralized control over lighting,
                  entertainment, security, and more.
                </p>
                <p className="mx-auto mb-8 max-w-3xl text-lg font-light leading-relaxed text-black/70">
                  Voice Control Integration syncs your smart home systems with
                  leading voice assistants. Simply command adjustments to
                  lighting, temperature, entertainment, and security, enjoying
                  the ultimate convenience and accessibility in home automation.
                </p>

                <div className="mx-auto mb-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
                  {[
                    "Effortless management of your home systems",
                    "Centralized control over lighting, entertainment, security, and more",
                    "Leading voice assistants",
                    "Ultimate convenience and accessibility in home automation",
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
                  href="/services/home-networking-and-wi-fi"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-base font-light text-white transition-all duration-300 hover:gap-4 hover:bg-black/90"
                >
                  <span>Explore Home Networking</span>
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

              <div className="mb-12 flex justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-medium text-black transition-colors duration-300 hover:bg-white/90"
                >
                  <span>Contact Us</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="space-y-3 text-white/80">
                <h3 className="text-2xl font-light leading-tight text-white md:text-3xl">
                  Ready to begin your
                  <br />
                  home theater journey?
                </h3>
                <p className="text-base font-light">
                  Ask [email protected]
                </p>
                <p className="text-base font-light">Tel: (+92)21-111-570-111</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
