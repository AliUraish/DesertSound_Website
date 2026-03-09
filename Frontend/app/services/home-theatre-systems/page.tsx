"use client"

import { useState, useRef } from "react"
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
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Tv,
    title: "Projector & Screen Setup",
    description: "State-of-the-art 4K/8K projectors and large-format screens for the ultimate viewing experience. We install premium projection systems tailored to your room dimensions."
  },
  {
    icon: Volume2,
    title: "Surround Sound System",
    description: "Immersive Dolby Atmos and DTS:X surround sound installations that bring cinema-quality audio to your home with precision speaker placement."
  },
  {
    icon: Settings,
    title: "Calibration & Optimization",
    description: "Professional audio and visual calibration to ensure audiophile-grade sound and enthusiast-level visual dynamic range for the perfect experience."
  },
  {
    icon: Smartphone,
    title: "Smart Integration",
    description: "Seamless integration with Control4, Crestron, and HDL automation systems. Control your entire theater with a single touch or voice command."
  },
  {
    icon: Waves,
    title: "Acoustic Treatment",
    description: "Professional room acoustics design and treatment to eliminate echo, optimize sound clarity, and create the perfect listening environment."
  },
  {
    icon: Armchair,
    title: "Custom Seating",
    description: "Luxury cinema seating solutions from premium brands like Studio Vellari, featuring motorized recliners and custom upholstery options."
  }
]

const faqs = [
  {
    question: "What's included in a full home theater system in Pakistan?",
    answer: "A complete system includes audio and video equipment (projector/screen or large display, surround sound speakers, AV receiver), custom seating, acoustic treatment, lighting control, control system integration, and professional home networking and WiFi for seamless streaming and automation."
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
    question: "Can small spaces be customized for home theaters?",
    answer: "Definitely. We specialize in customization and integration solutions for spaces of all sizes. Whether it's a dedicated cinema room or a multi-purpose media space, we design systems that maximize your available space."
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
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
            <div className="max-w-[88%] lg:max-w-6xl mx-auto px-4 lg:px-8">
              {/* Simple Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center mb-12 md:mb-16"
              >
                <p className="text-xs text-black/50 uppercase tracking-[0.26em] font-medium mb-6">
                  Home Theatre Systems
                </p>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-light tracking-tight leading-[1.1] mb-6">
                  Professional Cinema Design & Installation
                </h1>
                
                <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed max-w-3xl mx-auto mb-8">
                  Transform your space with state-of-the-art projection, immersive Dolby Atmos sound, and seamless smart integration—tailored to your home in Pakistan.
                </p>
                
                <div className="flex flex-col gap-3 sm:flex-row justify-center">
                  <a
                    href="#features"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-black/90 hover:gap-3"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/#contact"
                    className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/80 px-7 py-3.5 text-sm font-medium text-black transition-colors duration-300 hover:bg-white"
                  >
                    Free Consultation
                  </a>
                </div>
              </motion.div>

              {/* Simple Landscape Image */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
              >
                <motion.div
                  style={{ y, scale }}
                  className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative h-[280px] md:h-[400px] lg:h-[500px] overflow-hidden">
                    <img
                      src="/luxury-modern-home-theater-dark-atmospheric.jpg"
                      alt="Professional Home Theatre Installation"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </motion.div>
              </motion.div>
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
                Every component meticulously planned, installed, and calibrated to deliver a cinematic experience that transforms how you enjoy entertainment at home
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
                <img
                  src="/luxury-modern-home-theater-dark-atmospheric.jpg"
                  alt="Professional Home Cinema Design"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
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
                  Professional design and installation of a home cinema goes beyond simply installing a screen and speakers. It involves careful consideration of room size, layout, acoustic settings, lighting environment, and user preferences.
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
                  A complete home theatre experience includes high-definition projectors or large-format screens, Dolby Atmos or DTS:X surround sound systems, and smart lighting setups. We ensure spatial sound and immersion with expert installation of surround sound systems.
                </p>
                <p className="text-lg text-white/70 font-light leading-relaxed mb-8">
                  Our calibration and optimization services ensure you get the best immersive audio and visual experience possible. We calibrate and optimize sound and visual systems to deliver audiophile-grade sound and enthusiast-level visual dynamic range, letting you feel every detail.
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
                <img
                  src="/luxury-modern-home-theater-room-with-warm-ambient-.jpg"
                  alt="Immersive Audio Visual Experience"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Content Section C - Smart Control & Integration */}
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
                <img
                  src="/modern-smart-home-living-room-with-automated-light.jpg"
                  alt="Smart Control Integration"
                  className="w-full h-[400px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
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
                  Smart Technology
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 tracking-tight">
                  Smart Control & Integration
                </h2>
                <p className="text-lg text-black/70 font-light leading-relaxed mb-6">
                  Intelligent technology is a significant factor in modern home theatres. With smart home automation systems like Control4, Crestron, and HDL, users can manage lighting, audio, video, curtains, and temperature using just one touch or a simple voice command.
                </p>
                <p className="text-lg text-black/70 font-light leading-relaxed mb-8">
                  Our expertise in customization and integration ensures all parts of the system—displays, speakers, automation, and networking—work together seamlessly. This unified approach makes usage more convenient and eliminates the need for multiple remotes.
                </p>
                
                <div className="space-y-4 mb-8">
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

                <a 
                  href="/#services"
                  className="inline-flex items-center gap-2 text-black hover:gap-4 transition-all duration-300 text-base font-light"
                >
                  <span>Explore Smart Home Automation</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
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
                Ready to Transform Your Space?
              </h2>
              <p className="text-lg text-white/70 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                Get a free consultation from our experts and discover how we can create the perfect home theatre system for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-lg text-base font-medium hover:bg-white/90 transition-colors duration-300"
                >
                  Get Free Consultation
                </a>
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
