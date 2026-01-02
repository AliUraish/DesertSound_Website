"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const heroSlides = [
  {
    image: "/luxury-modern-home-theater-room-with-warm-ambient-.jpg",
    title: "Where Vision",
    subtitle: "Meets Structure",
    description:
      "Transform your space into an immersive entertainment experience with our premium home theater solutions.",
  },
  {
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
    title: "Silence In",
    subtitle: "Motion",
    description: "Discover spaces where sound becomes memory, held in the air, the water, and the passing light.",
  },
  {
    image: "/modern-smart-home-minimalist-blue-tones.jpg",
    title: "The Future",
    subtitle: "Makes You Ready",
    description: "Smart home automation that anticipates your needs and elevates your lifestyle beyond imagination.",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-screen w-full bg-[#F5F5DC] overflow-hidden">
      <div className="max-w-[90%] mx-auto px-3 lg:px-4 pt-24 lg:pt-28 h-screen pb-4 flex flex-col">
        {/* Image Container with Parallax */}
        <motion.div 
          style={{ y, opacity, scale }}
          className="relative w-full flex-grow rounded-lg overflow-hidden will-change-transform"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 z-0"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${heroSlides[currentSlide].image}')`,
                }}
              />
              <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
            </motion.div>
          </AnimatePresence>

          {/* Content Overlay - Bottom Positioned */}
          <div className="relative z-10 h-full flex flex-col justify-end pb-8 lg:pb-12 px-6 lg:px-8">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-8">
              {/* Text - Bottom Left with staggered animations */}
              <motion.div 
                key={currentSlide}
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5
                    }
                  }
                }}
                className="flex flex-col gap-3 lg:max-w-2xl"
              >
                {/* Description - animates first */}
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 0.7, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="text-sm lg:text-base text-white font-normal"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                {/* Title - animates second */}
                <div className="overflow-hidden">
                  <motion.h1 
                    className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-normal leading-tight"
                  >
                    <span className="block overflow-hidden">
                      <motion.span
                        variants={{
                          hidden: { y: "100%" },
                          visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="block"
                      >
                        {heroSlides[currentSlide].title}{" "}
                      </motion.span>
                    </span>
                    <span className="block overflow-hidden">
                      <motion.span 
                        variants={{
                          hidden: { y: "100%" },
                          visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        className="block"
                      >
                        {heroSlides[currentSlide].subtitle}
                      </motion.span>
                    </span>
                  </motion.h1>
                </div>
              </motion.div>

              {/* Button - Bottom Right with animation */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex-shrink-0"
              >
                <a href="#contact">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      className="bg-background text-foreground hover:bg-background/90 rounded-lg px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-normal transition-colors duration-200 cursor-pointer"
                    >
                      Work with us
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
