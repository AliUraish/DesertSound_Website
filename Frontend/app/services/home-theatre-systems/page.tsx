"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  Tv, 
  Volume2, 
  Settings, 
  Smartphone, 
  Waves, 
  Armchair,
  ChevronDown,
  CheckCircle2,
  ArrowRight
} from "lucide-react"

const features = [
  {
    icon: Tv,
    title: "Projector & screen setup",
    description: "State-of-the-art 4K/8K projectors and large-format screens for the ultimate viewing experience. We install premium projection systems tailored to your room dimensions."
  },
  {
    icon: Volume2,
    title: "Surround sound system",
    description: "Immersive Dolby Atmos and DTS:X surround sound installations that bring cinema-quality audio to your home with precision speaker placement."
  },
  {
    icon: Settings,
    title: "Calibration & optimisation",
    description: "Professional audio and video calibration for balanced sound, accurate images, and consistent performance throughout the room."
  },
  {
    icon: Smartphone,
    title: "Smart integration",
    description: "Seamless integration with Control4, Crestron, and HDL automation systems. Control your entire theatre with a single touch or voice command."
  },
  {
    icon: Waves,
    title: "Acoustic treatment",
    description: "Professional room acoustics design and treatment to eliminate echo, optimize sound clarity, and create the perfect listening environment."
  },
  {
    icon: Armchair,
    title: "Custom seating",
    description: "Luxury cinema seating solutions from premium brands like Studio Vellari, featuring motorized recliners and custom upholstery options."
  }
]

const faqs = [
  {
    question: "What's included in a complete home theatre system in Pakistan?",
    answer: "A complete system can include a projector and screen or large display, surround sound speakers, an AV receiver or processor, seating, acoustic treatment, lighting control, system integration, and reliable home networking for streaming and automation."
  },
  {
    question: "Can I integrate smart home features with my cinema?",
    answer: "Absolutely. Modern home cinema design incorporates smart home automation systems like Control4, Crestron, and HDL, enabling you to manage entertainment, lighting, climate, and more from a single platform with touch or voice control."
  },
  {
    question: "Do you provide multi-room audio solutions?",
    answer: "Yes. With our audio distribution installation services, we deliver high-quality sound to multiple rooms with centralized control. Perfect for syncing music throughout your home—from living rooms to bedrooms and outdoor spaces."
  },
  {
    question: "Can a small space be customised as a home theatre?",
    answer: "Yes. Home theater installation in Pakistan works in apartments and compact rooms, not only a dedicated cinema."
  },
  {
    question: "How long does installation take?",
    answer: "Project timelines vary based on system complexity and room requirements. Most installations are completed efficiently with minimal disruption to your daily routine. We provide detailed timelines during the consultation phase."
  }
]

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const Icon = feature.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl p-8 lg:p-10 border border-black/5 hover:border-black/10 transition-all duration-300 hover:shadow-xl"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <div className="inline-flex p-4 rounded-xl bg-black/5 group-hover:bg-black/10 transition-colors duration-300">
            <Icon className="w-8 h-8 text-black" />
          </div>
        </div>
        
        <h3 className="text-2xl font-light text-black mb-4 tracking-tight">
          {feature.title}
        </h3>
        
        <p className="text-base text-black/70 font-light leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

function FAQItem({ faq, index }: { faq: typeof faqs[0], index: number }) {
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
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg lg:text-xl font-light text-black pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-6 h-6 text-black/60 group-hover:text-black transition-colors" />
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
            <p className="pb-6 text-base text-black/70 font-light leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function HomeTheatreSystemsPage() {
  const containerRef = useRef(null)
  const [canParallax, setCanParallax] = useState(false)

  useEffect(() => {
    setCanParallax(true)
  }, [])

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
        {/* Hero Section */}
        <section ref={containerRef} className="relative w-full overflow-hidden bg-[#F5F5DC]">
          <div className="w-full pt-[130px] md:pt-36 lg:pt-40 pb-16 md:pb-20 lg:pb-24">
            <div className="max-w-[95%] xl:max-w-[1600px] mx-auto px-4 lg:px-8">
              {/* Text and Image Side by Side */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
                {/* Header Text */}
                <div className="lg:pr-8">
                  <p className="text-xs text-black/50 uppercase tracking-[0.2em] font-medium mb-6">
                    Home Theatre Systems
                  </p>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-light tracking-tight leading-[1.1] mb-5">
                    Home Cinema Design
                    <br />
                    & Installation
                  </h1>
                  
                  <p className="text-base md:text-lg text-black/70 font-light leading-relaxed mb-8">
                    We plan each home cinema and home theatre installation in Pakistan around the room, with 4K/8K projection, Dolby Atmos, and smart control. Home theater installation in Karachi is one local example of that nationwide work.
                  </p>

                  <div className="flex">
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black/90 hover:gap-3"
                    >
                      <span>Explore Solutions</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="relative">
                  <motion.div
                    style={canParallax ? { y, scale } : undefined}
                    className="relative overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
                  >
                    <div className="relative h-[400px] md:h-[500px] lg:h-[550px] xl:h-[650px] overflow-hidden">
                      <Image
                        src="/Pictures Final/Services/Home_Theatre/Cover.jpg"
                        alt="Professional Home Theatre Installation"
                        className="h-full w-full object-cover"
                width={1920}
                height={1057}
              />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                      
                      {/* Floating Stats on Image */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">Visual</p>
                            <p className="text-sm text-white font-medium">4K/8K Projection</p>
                          </div>
                          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-4 border border-white/20">
                            <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-1">Audio</p>
                            <p className="text-sm text-white font-medium">Dolby Atmos</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="py-20 lg:py-28 bg-white">
          <div className="max-w-[88%] lg:max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="mb-6 flex items-center justify-center gap-4">
                <span className="h-px w-12 bg-black/20" />
                <p className="text-xs text-black/50 uppercase tracking-[0.26em] font-medium">
                  Complete Solutions
                </p>
                <span className="h-px w-12 bg-black/20" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6 tracking-tight">
                Six Essential Elements
              </h2>
              <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-3xl mx-auto">
                Every component is carefully planned, installed, and calibrated to transform how you enjoy entertainment at home.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Content Section A - Professional Home Cinema Design */}
        <section className="py-16 lg:py-24 bg-[#F5F5DC]">
          <div className="max-w-[88%] lg:max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <Image
                  src="/Pictures Final/Services/Home_Theatre/IMG_9762.JPG"
                  alt="Professional Home Cinema Design"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
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
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-black/50 mb-4 font-medium">
                  Design Excellence
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 tracking-tight">
                  Professional Home Cinema Design
                </h2>
                <p className="text-lg text-black/70 font-light leading-relaxed mb-6">
                  Professional home cinema design in Pakistan goes beyond a screen and speakers.{" "}
                  <Link
                    href="/how-to-plan-home-theater-installation-for-any-room"
                    className="underline underline-offset-4 hover:text-black"
                  >
                    Home theater installation
                  </Link>{" "}
                  starts with the room: size, layout, acoustics, lighting, and how you watch, whether that is a dedicated cinema or a compact apartment anywhere in Pakistan.
                </p>
                <p className="text-lg text-black/70 font-light leading-relaxed mb-8">
                  By integrating these elements, we deliver a cinematic experience that rivals commercial theatres without leaving the comfort of your home. The spatial and acoustic needs of every home are unique, which is why our design process is meticulously planned to ensure the best sound quality, accurate screen positioning, and effective lighting control.
                </p>
                
                <div className="space-y-4">
                  {[
                    "Room acoustics analysis and treatment",
                    "Optimal screen size and positioning",
                    "Professional lighting design",
                    "Custom seating arrangements"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                      <span className="text-base text-black/80 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section B - Immersive Audio & Visual */}
        <section className="py-16 lg:py-24 bg-[#1a1a1a]">
          <div className="max-w-[88%] lg:max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-white/50 mb-4 font-medium">
                  Audio & Visual Excellence
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
                  Immersive Audio & Visual Experience
                </h2>
                <p className="text-lg text-white/70 font-light leading-relaxed mb-6">
                  A complete home theatre can include a high-definition projector or large-format screen, Dolby Atmos or DTS:X surround sound, and integrated lighting. Careful speaker placement and calibration create a convincing sense of space and immersion.
                </p>
                <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                  Our calibration and optimisation services balance the audio and video systems for clear sound, accurate images, and consistent performance throughout the room.
                </p>
                
                <div className="space-y-4">
                  {[
                    "4K/8K projection systems",
                    "Dolby Atmos & DTS:X surround sound",
                    "Professional audio/visual calibration",
                    "Premium speaker placement & tuning"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-base text-white/80 font-light">{item}</span>
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
                  src="/Pictures Final/Services/Home_Theatre/DSC09887.JPG"
                  alt="Immersive Audio Visual Experience"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
                width={1920}
                height={1280}
              />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section C - Smart Control & Integration */}
        <section className="py-16 lg:py-24 bg-[#F5F5DC]">
          <div className="max-w-[88%] lg:max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl rounded-2xl bg-white p-8 text-center shadow-2xl lg:p-12"
              >
                <span className="inline-block text-xs uppercase tracking-[0.2em] text-black/50 mb-4 font-medium">
                  Smart Technology
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 tracking-tight">
                  Smart Control & Integration
                </h2>
                <p className="mx-auto max-w-3xl text-lg text-black/70 font-light leading-relaxed mb-6">
                  Intelligent technology is a significant factor in modern home theatres. With smart home automation systems like Control4, Crestron, and HDL, users can manage lighting, audio, video, curtains, and temperature using just one touch or a simple voice command.
                </p>
                <p className="mx-auto max-w-3xl text-lg text-black/70 font-light leading-relaxed mb-8">
                  Our expertise in customisation and integration ensures every part of the system—displays, speakers, automation, and networking—works together seamlessly. This unified approach makes the room easier to use and reduces the need for multiple remotes.
                </p>
                
                <div className="mx-auto mb-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
                  {[
                    "Control4 & Crestron integration",
                    "Voice control compatibility",
                    "Single-touch automation",
                    "Multi-room audio distribution"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                      <span className="text-base text-black/80 font-light">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/service/smart-home-automation"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-base font-light text-white transition-all duration-300 hover:gap-4 hover:bg-black/90"
                >
                  <span>Explore Smart Home Automation</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-[#F5F5DC]">
          <div className="max-w-[88%] lg:max-w-4xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-black/70 font-light leading-relaxed">
                Everything you need to know about our home theatre systems
              </p>
            </motion.div>

            <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-lg">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-[#1a1a1a]">
          <div className="max-w-[88%] lg:max-w-4xl mx-auto px-4 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 tracking-tight">
                Ready to transform your space?
              </h2>
              <p className="text-lg text-white/70 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                Get a free consultation from our experts and discover how we can create the perfect home theatre system for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-lg text-base font-medium hover:bg-white/90 transition-colors duration-300"
                >
                  Get Free Consultation
                </Link>
                <a 
                  href="tel:+922111570111"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-base font-medium hover:bg-white hover:text-black transition-all duration-300"
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
