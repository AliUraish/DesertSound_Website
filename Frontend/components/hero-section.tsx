"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect, useRef, type ReactNode } from "react"
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from "framer-motion"

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

type HeroSlide = (typeof heroSlides)[number]

const copyClassName = "flex max-w-[22rem] flex-col gap-2 md:max-w-xl md:gap-3 lg:max-w-2xl"
const descriptionClassName =
  "max-w-[21rem] text-[0.8rem] leading-relaxed text-white/90 drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)] md:max-w-xl md:text-sm lg:text-base"
const titleClassName =
  "text-[2.85rem] font-normal leading-[0.95] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] md:text-4xl md:leading-tight lg:text-6xl xl:text-7xl"
const parallaxClassName = "relative w-full flex-grow overflow-hidden will-change-transform"

function HeroParallaxLayer({
  hasMounted,
  y,
  opacity,
  scale,
  children,
}: {
  hasMounted: boolean
  y: MotionValue<string>
  opacity: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  if (!hasMounted) {
    return <div className={parallaxClassName}>{children}</div>
  }

  return (
    <motion.div style={{ y, opacity, scale }} className={parallaxClassName}>
      {children}
    </motion.div>
  )
}

function HeroSlideImage({
  slide,
  animate,
  isFirstSlide,
}: {
  slide: HeroSlide
  animate: boolean
  isFirstSlide: boolean
}) {
  const image = (
    <>
      <Image
        src={slide.image}
        alt={`${slide.title} ${slide.subtitle}`}
        width={1920}
        height={1080}
        loading={isFirstSlide ? "eager" : "lazy"}
        fetchPriority={isFirstSlide ? "high" : "auto"}
        decoding="async"
        className="w-full h-full object-cover"
        style={{
          objectPosition: slide.imagePosition ?? "50% 50%",
        }}
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/35 to-transparent md:h-1/2 md:from-black/50 md:via-black/20" />
    </>
  )

  if (!animate) {
    return <div className="absolute inset-0 z-0">{image}</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute inset-0 z-0"
    >
      {image}
    </motion.div>
  )
}

function HeroCopy({ slide, animate }: { slide: HeroSlide; animate: boolean }) {
  if (!animate) {
    return (
      <div className={copyClassName}>
        <p className={`${descriptionClassName} opacity-70`}>{slide.description}</p>
        <div className="overflow-hidden">
          <h1 className={titleClassName}>
            <span className="block overflow-hidden">
              <span className="block">{slide.title} </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block">{slide.subtitle}</span>
            </span>
          </h1>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      key={`${slide.title}-${slide.subtitle}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5,
          },
        },
      }}
      className={copyClassName}
    >
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 0.7, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
        }}
        className={descriptionClassName}
      >
        {slide.description}
      </motion.p>
      <div className="overflow-hidden">
        <h1 className={titleClassName}>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="block"
            >
              {slide.title}{" "}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="block"
            >
              {slide.subtitle}
            </motion.span>
          </span>
        </h1>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [canStartSlideshow, setCanStartSlideshow] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  useEffect(() => {
    setHasMounted(true)
  }, [])

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

  const slide = heroSlides[currentSlide]

  return (
    <section ref={containerRef} className="relative w-full bg-[#F5F5DC] overflow-hidden">
      <div className="flex h-[84svh] min-h-[680px] w-full flex-col pt-[100px] pb-4 md:h-[82vh] md:min-h-0 md:pt-24 lg:h-screen lg:pt-28">
        <HeroParallaxLayer hasMounted={hasMounted} y={y} opacity={opacity} scale={scale}>
          <AnimatePresence mode="popLayout">
            <HeroSlideImage
              key={currentSlide}
              slide={slide}
              animate={hasMounted}
              isFirstSlide={currentSlide === 0}
            />
          </AnimatePresence>

          <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-5 md:px-6 md:pb-8 lg:px-8 lg:pb-12">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 md:gap-6 lg:gap-8">
              <HeroCopy slide={slide} animate={hasMounted} />

              <div className="flex-shrink-0">
                <a href="#contact">
                  {hasMounted ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-background text-foreground hover:bg-background/90 rounded-lg px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-xs md:text-sm lg:text-base font-normal transition-colors duration-200 cursor-pointer">
                        Work with us
                      </Button>
                    </motion.div>
                  ) : (
                    <Button className="bg-background text-foreground hover:bg-background/90 rounded-lg px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-xs md:text-sm lg:text-base font-normal transition-colors duration-200 cursor-pointer">
                      Work with us
                    </Button>
                  )}
                </a>
              </div>
            </div>
          </div>
        </HeroParallaxLayer>
      </div>
    </section>
  )
}
