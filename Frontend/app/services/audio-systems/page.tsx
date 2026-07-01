"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import {
  AudioLines,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Phone,
  PlayCircle,
  SlidersHorizontal,
  Speaker,
  Wifi,
} from "lucide-react"

const features = [
  {
    icon: Wifi,
    title: "In-house Wi-Fi music systems",
    description:
      "Bring Every Beat to Every Corner of Your Home. With Seamless Integration and High-Quality Audio, Enjoy Your Favorite Tunes Wirelessly, Elevating Your Living Spaces with Music Tailored to Your Mood and Moments.",
  },
  {
    icon: AudioLines,
    title: "Multi-room audio setup",
    description:
      "Desert Sound’s Multi-Room Audio Set-Up Delivers an Unmatched Audio Experience Across Your Entire Home. Seamlessly Integrate High-Fidelity Sound in Every Room, Allowing You to Create Unique Soundscapes Tailored to Each Space and Occasion.",
  },
  {
    icon: SlidersHorizontal,
    title: "Speaker installation and calibration",
    description:
      "Our Expert Technicians Tailor Every Detail of Your Audio Setup, Ensuring Optimal Placement, Acoustic Tuning, and Seamless Integration for an Unrivaled Listening Experience in Every Corner of Your Space.",
  },
  {
    icon: PlayCircle,
    title: "Streaming services integration",
    description:
      "Connect and Customize Your Favorite Streaming Platforms Across Every Device and Room in Your Home. Our Comprehensive Solutions Ensure Fluid Access to Music, Movies, and More.",
  },
  {
    icon: Speaker,
    title: "Hi-Fi audio systems",
    description:
      "Audiophile experience with our high-fidelity solutions, delivering crystal-clear sound and rich, detailed acoustics. From turntables to amplifiers, speakers, and beyond, we curate a selection of premium audio equipment to elevate your listening experience.",
  },
  {
    icon: AudioLines,
    title: "Premium audio equipment",
    description:
      "From Turntables to Amplifiers, Speakers, and Beyond, We Curate a Selection of Premium Audio Equipment to Elevate Your Listening Experience and Bring Music to Life in Its Truest Form.",
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

export default function AudioSystemsPage() {
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
                    Audio Distribution
                  </p>

                  <h1 className="mb-5 text-4xl font-light leading-[1.1] tracking-tight text-black md:text-5xl lg:text-6xl">
                    Audio Systems
                    <br />
                    & Distribution
                  </h1>

                  <p className="text-base font-light leading-relaxed text-black/70 md:text-lg">
                    Bring Every Beat to Every Corner of Your Home. With
                    Seamless Integration and High-Quality Audio, Enjoy Your
                    Favorite Tunes Wirelessly, Elevating Your Living Spaces with
                    Music Tailored to Your Mood and Moments.
                  </p>

                  <div className="mt-8 flex">
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
                        src="/Pictures%20Final/Services/Audio_Systems/Cover.jpg"
                        alt="Audio systems and distribution"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />

                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Audio
                            </p>
                            <p className="text-sm font-medium text-white">
                              In-house Wi-Fi Music
                            </p>
                          </div>
                          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-white/70">
                              Systems
                            </p>
                            <p className="text-sm font-medium text-white">
                              Multi-room & Hi-Fi
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
                  Audio Distribution
                </p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="mb-6 text-4xl font-light tracking-tight text-black md:text-5xl lg:text-6xl">
                Six Essential Services
              </h2>
              <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-black/70 md:text-xl">
                Seamlessly integrate high-fidelity sound in every room,
                customize your favorite streaming platforms, and elevate your
                listening experience with premium audio equipment.
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
                <div className="flex aspect-[4/3] w-full items-center justify-center overflow-visible">
                  <img
                    src="/Pictures%20Final/Services/Audio_Systems/image_copy-removebg-preview.png"
                    alt="In-house Wi-Fi music and multi-room audio"
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-black/50">
                  In-house Wi-Fi Music Systems
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Multi-room Audio Setup
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Bring Every Beat to Every Corner of Your Home. With Seamless
                  Integration and High-Quality Audio, Enjoy Your Favorite Tunes
                  Wirelessly, Elevating Your Living Spaces with Music Tailored
                  to Your Mood and Moments.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Desert Sound’s Multi-Room Audio Set-Up Delivers an Unmatched
                  Audio Experience Across Your Entire Home. Seamlessly Integrate
                  High-Fidelity Sound in Every Room, Allowing You to Create
                  Unique Soundscapes Tailored to Each Space and Occasion.
                  Whether Hosting Guests or Relaxing Alone, Immerse Yourself in
                  the Perfect Playlist, Effortlessly Controlled from Any Device,
                  and Redefine Your Home’s Atmosphere with the Power of Music.
                </p>

                <div className="space-y-4">
                  {[
                    "In-house Wi-Fi music systems",
                    "High-Quality Audio",
                    "Multi-room audio setup",
                    "Effortlessly Controlled from Any Device",
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
                  Speaker Installation and Calibration
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
                  Streaming Services Integration
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-white/70">
                  Our Expert Technicians Tailor Every Detail of Your Audio
                  Setup, Ensuring Optimal Placement, Acoustic Tuning, and
                  Seamless Integration for an Unrivaled Listening Experience in
                  Every Corner of Your Space. From Home Theaters to Multi-Room
                  Audio Systems, We Combine Precision Engineering with Artistic
                  Sensibility to Elevate Your Audio Environment to New Heights.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-white/70">
                  Connect and Customize Your Favorite Streaming Platforms Across
                  Every Device and Room in Your Home. Our Comprehensive
                  Solutions Ensure Fluid Access to Music, Movies, and More,
                  Elevating Your Entertainment Experience to Unprecedented
                  Levels of Convenience and Enjoyment.
                </p>

                <div className="space-y-4">
                  {[
                    "Optimal Placement",
                    "Acoustic Tuning",
                    "Seamless Integration",
                    "Connect and Customize Your Favorite Streaming Platforms",
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
                <div className="flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#111] shadow-2xl">
                  <img
                    src="/Pictures%20Final/Services/Audio_Systems/image.png"
                    alt="Speaker installation and streaming integration"
                    className="h-full w-full object-contain"
                  />
                </div>
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
                <div className="mx-auto flex aspect-[2/3] h-[420px] max-h-[70vh] items-center justify-center overflow-hidden rounded-2xl shadow-2xl lg:h-[560px]">
                  <img
                    src="/Pictures%20Final/Services/Audio_Systems/IMG_9598.JPG"
                    alt="Premium audio equipment"
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.2em] text-black/50">
                  Hi-Fi Audio Systems
                </span>
                <h2 className="mb-6 text-3xl font-light tracking-tight text-black md:text-4xl lg:text-5xl">
                  Audiophile experience
                </h2>
                <p className="mb-6 text-lg font-light leading-relaxed text-black/70">
                  Audiophile experience with our high-fidelity solutions,
                  delivering crystal-clear sound and rich, detailed acoustics.
                  From turntables to amplifiers, speakers, and beyond, we
                  curate a selection of premium audio equipment to elevate your
                  listening experience.
                </p>
                <p className="mb-8 text-lg font-light leading-relaxed text-black/70">
                  Whether You’re a Casual Listener or Audiophile, Our Expertise
                  Ensures Every Note is Captured with Precision, Bringing Music
                  to Life in Its Truest Form. Rediscover the Joy of Listening
                  with Desert Sound’s Hi-Fi Audio Systems.
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    "Crystal-Clear Sound",
                    "Rich, Detailed Acoustics",
                    "Turntables to Amplifiers, Speakers, and Beyond",
                    "Premium Audio Equipment",
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
                Frequently Ask Question
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
                  Contact Us
                </Link>
                <a
                  href="tel:+922111570111"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  <Phone className="h-5 w-5" />
                  <span>(+92)21-111-570-111</span>
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
