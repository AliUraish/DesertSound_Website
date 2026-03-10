"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const heroSlides = [
  {
    image: "/homepage_header/homepage1.jpeg",
    imagePosition: "50% 28%",
    title: "We Create",
    subtitle: "Dream Spaces",
    description:
      "From luxurious home theaters to cutting-edge smart home systems, we design and install solutions that elevate your lifestyle and enhance your space.",
  },
  {
    image: "/homepage_header/homepage2.jpg",
    title: "Where Vision",
    subtitle: "Meets Structure",
    description:
      "Transform your space into an immersive entertainment experience with our premium home theater solutions.",
  },
  {
    image: "/homepage_header/homepage3.jpg",
    title: "Silence In",
    subtitle: "Motion",
    description: "Discover spaces where sound becomes memory, held in the air, the water, and the passing light.",
  },
  {
    image: "/homepage_header/homepage4.jpg",
    title: "Intelligent",
    subtitle: "Automation",
    description: "Experience the future of home automation with our state-of-the-art smart home solutions.",
  },
  {
    image: "/homepage_header/homepage8.jpg",
    title: "The Future",
    subtitle: "Makes You Ready",
    description: "Smart home automation that anticipates your needs and elevates your lifestyle beyond imagination.",
  },
  {
    image: "/homepage_header/homepage9.jpg",
    title: "Innovative",
    subtitle: "Solutions",
    description: "Tailored solutions for your unique needs, designed to enhance your lifestyle and elevate your space.",
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
    <section ref={containerRef} className="relative w-full bg-[#F5F5DC] overflow-hidden">
      <div className="w-full pt-[100px] md:pt-24 lg:pt-28 h-[65vh] md:h-[80vh] lg:h-screen pb-4 flex flex-col">
        {/* Image Container with Parallax */}
        <motion.div 
          style={{ y, opacity, scale }}
          className="relative w-full flex-grow overflow-hidden will-change-transform"
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
              <img
                src={heroSlides[currentSlide].image}
                alt={`${heroSlides[currentSlide].title} ${heroSlides[currentSlide].subtitle}`}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: heroSlides[currentSlide].imagePosition ?? "50% 50%",
                }}
              />
              <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
            </motion.div>
          </AnimatePresence>

          {/* Content Overlay - Bottom Positioned */}
          <div className="relative z-10 h-full flex flex-col justify-end pb-6 md:pb-8 lg:pb-12 px-4 md:px-6 lg:px-8">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 md:gap-6 lg:gap-8">
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
                  className="text-xs md:text-sm lg:text-base text-white font-normal"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                {/* Title - animates second */}
                <div className="overflow-hidden">
                  <motion.h1 
                    className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl text-white font-normal leading-tight"
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
                      className="bg-background text-foreground hover:bg-background/90 rounded-lg px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-xs md:text-sm lg:text-base font-normal transition-colors duration-200 cursor-pointer"
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
