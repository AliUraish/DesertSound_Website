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
          <div className="w-full pt-[118px] md:pt-32 lg:pt-36 pb-12 md:pb-16 lg:pb-20">
            <div className="max-w-[88%] lg:max-w-7xl mx-auto px-4 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="max-w-2xl"
                >
                  <div className="mb-10 flex items-center gap-4">
                    <span className="h-px w-12 bg-black/20" />
                    <p className="text-xs text-black/50 uppercase tracking-[0.26em] font-medium">
                      Home Theatre Systems
                    </p>
                  </div>

                  <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.8rem] text-black font-light tracking-[-0.03em] leading-[0.96] mb-8">
                    Professional Cinema
                    <br />
                    <span className="font-serif italic text-black/65">Design & Installation</span>
                  </h1>

                  <p className="max-w-xl text-xl md:text-2xl text-black/75 font-light leading-[1.5] mb-10">
                    Transform your space with state-of-the-art projection, immersive Dolby Atmos sound, and seamless smart integration—tailored to your home in Pakistan.
                  </p>

                  <div className="mb-10 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-2">Visual Excellence</p>
                      <p className="text-sm text-black/70 font-light leading-relaxed">4K/8K projection systems with professional calibration</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-2">Immersive Audio</p>
                      <p className="text-sm text-black/70 font-light leading-relaxed">Dolby Atmos surround sound with acoustic treatment</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-2">Smart Control</p>
                      <p className="text-sm text-black/70 font-light leading-relaxed">Control4, Crestron & HDL automation integration</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-black/45 mb-2">Custom Design</p>
                      <p className="text-sm text-black/70 font-light leading-relaxed">Luxury seating and tailored room acoustics</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#features"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-black/90 hover:gap-3"
                    >
                      <span>Explore Complete Solutions</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/#contact"
                      className="inline-flex items-center justify-center rounded-full border border-black/15 bg-white/80 px-8 py-4 text-sm font-medium text-black transition-colors duration-300 hover:bg-white"
                    >
                      Get Free Consultation
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="relative lg:mt-0 mt-8"
                >
                  <motion.div
                    style={{ y, scale }}
                    className="relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
                  >
                    <div className="relative h-[450px] overflow-hidden rounded-[1.4rem] md:h-[550px] lg:h-[650px]">
                      <img
                        src="/luxury-home-theater-with-leather-recliners-and-amb.jpg"
                        alt="Professional Home Theatre Installation"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

                      <div className="absolute left-5 top-5 rounded-xl border border-white/15 bg-black/50 px-5 py-3.5 text-white backdrop-blur-xl md:left-7 md:top-7">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/55 mb-1">Premium Design</p>
                        <p className="text-sm font-light leading-snug">Custom room planning & acoustics</p>
                      </div>

                      <div className="absolute bottom-5 right-5 rounded-xl border border-white/15 bg-white/15 px-5 py-3.5 text-white backdrop-blur-xl md:bottom-7 md:right-7">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/55 mb-1">Expert Installation</p>
                        <p className="text-sm font-light leading-snug">Trusted across Pakistan</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-black/10 lg:grid-cols-3"
              >
                {[
                  {
                    label: "Complete Design Process",
                    value: "From room planning and acoustic treatment to screen positioning and lighting—every detail carefully considered for your space.",
                  },
                  {
                    label: "Premium Technology",
                    value: "State-of-the-art 4K/8K projectors, Dolby Atmos sound systems, and luxury seating from brands like Studio Vellari.",
                  },
                  {
                    label: "Local Expertise",
                    value: "Extensive experience across Pakistan with knowledge of local construction, power specs, and installation requirements.",
                  },
                ].map((item) => (
                  <div key={item.label} className="bg-white/70 px-7 py-7 backdrop-blur-sm lg:px-9 lg:py-8">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-black/45 mb-3">{item.label}</p>
                    <p className="text-sm md:text-base text-black/70 font-light leading-relaxed">{item.value}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 lg:py-24 bg-[#F5F5DC]">
          <div className="max-w-[88%] lg:max-w-5xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="inline-block bg-black text-white text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
                Premium Cinema Experience
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6 tracking-tight">
                Professional Home Theatre Design & Installation
              </h2>
              <p className="text-lg text-black/70 font-light leading-relaxed mb-6">
                Home theatre design and installation is a professionally planned project that can entirely transform how you enjoy entertainment in the comfort of your home. With stunning visual effects and immersive surround sound, a home theatre is no longer limited to commercial cinemas—it's now a viable upgrade for homes, apartments, and offices across Pakistan.
              </p>
              <p className="text-lg text-black/70 font-light leading-relaxed">
                Through the proper combination of cutting-edge technology, expert design skills, and seamless system integration, homeowners can enjoy a premium cinematic experience tailored to their lifestyle. We provide customized solutions that are performance-based, aesthetic, and user-friendly.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features" className="py-16 lg:py-24 bg-white">
          <div className="max-w-[88%] lg:max-w-7xl mx-auto px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-4 tracking-tight">
                Complete Theatre Solutions
              </h2>
              <p className="text-lg text-black/70 font-light leading-relaxed max-w-3xl mx-auto">
                Every element carefully designed and integrated for the ultimate cinematic experience
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
