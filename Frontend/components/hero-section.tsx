"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"

const heroSlides = [
  {
    image: "/Pictures Final/Hero Page/homepage_header/homepage1.jpg",
    imagePosition: "50% 28%",
    title: "We Create",
    subtitle: "Dream Spaces",
    description:
      "From bespoke home cinemas to intelligent home automation, we deliver solutions that combine innovation, craftsmanship, and everyday luxury.",
  },
  {
    image: "/Pictures Final/Hero Page/homepage_header/Homepage22.JPG",
    title: "Where Vision",
    subtitle: "Meets Structure",
    description:
      "Experience the art of entertainment. Every project is thoughtfully designed, expertly engineered, and professionally installed to deliver exceptional performance without compromising aesthetics.",
  },
  {
    image: "/Pictures Final/Hero Page/homepage_header/homepage4.jpg",
    title: "Silence in",
    subtitle: "Motion",
    description: "We create spaces where technology disappears, leaving you with exceptional sound, stunning visuals, and unforgettable moments.",
  },
  {
    image: "/Pictures Final/Hero Page/homepage_header/Homepage33.JPG",
    title: "Bringing Cinema",
    subtitle: "Home",
    description: "Designed to impress. Built to perform. We create immersive entertainment spaces with world-class technology and timeless design.",
  },
  {
    image: "/Pictures Final/Hero Page/homepage_header/Hompage3.JPG",
    title: "Intelligent",
    subtitle: "Automation",
    description: "Your home deserves more than technology; it deserves experiences that bring family and friends together.",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [canStartSlideshow, setCanStartSlideshow] = useState(false)
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
    const startSlideshow = () => setCanStartSlideshow(true)

    window.addEventListener("desert-sound:preloader-complete", startSlideshow)
    return () => window.removeEventListener("desert-sound:preloader-complete", startSlideshow)
  }, [])

  useEffect(() => {
    if (!canStartSlideshow) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [canStartSlideshow])

  return (
    <section ref={containerRef} className="relative w-full bg-[#F5F5DC] overflow-hidden">
      <div className="flex h-[84svh] min-h-[680px] w-full flex-col pt-[100px] pb-4 md:h-[82vh] md:min-h-0 md:pt-24 lg:h-screen lg:pt-28">
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
              <Image
                src={heroSlides[currentSlide].image}
                alt={`${heroSlides[currentSlide].title} ${heroSlides[currentSlide].subtitle}`}
                width={1920}
                height={1080}
                loading={currentSlide === 0 ? "eager" : "lazy"}
                fetchPriority={currentSlide === 0 ? "high" : "auto"}
                decoding="async"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: heroSlides[currentSlide].imagePosition ?? "50% 50%",
                }}
              />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/35 to-transparent md:h-1/2 md:from-black/50 md:via-black/20" />
            </motion.div>
          </AnimatePresence>

          {/* Content Overlay - Bottom Positioned */}
          <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-5 md:px-6 md:pb-8 lg:px-8 lg:pb-12">
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
                className="flex max-w-[22rem] flex-col gap-2 md:max-w-xl md:gap-3 lg:max-w-2xl"
              >
                {/* Description - animates first */}
                <motion.p 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 0.7, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="max-w-[21rem] text-[0.8rem] leading-relaxed text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] md:max-w-xl md:text-sm lg:text-base"
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                {/* Title - animates second */}
                <div className="overflow-hidden">
                  <motion.h1 
                    className="text-[2.85rem] font-normal leading-[0.95] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] md:text-4xl md:leading-tight lg:text-6xl xl:text-7xl"
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
