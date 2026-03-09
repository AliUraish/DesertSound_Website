"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const galleryImages = [
  "/Cafe_Flow/IMG_2842.JPG",
  "/Cafe_Flow/IMG_2848.JPG",
  "/Cafe_Flow/IMG_2852.JPG",
  "/Cafe_Flow/IMG_2854.JPG",
  "/Cafe_Flow/IMG_2857.JPG",
  "/Cafe_Flow/IMG_2860.JPG",
  "/Cafe_Flow/IMG_2863.JPG",
  "/Cafe_Flow/IMG_2897.JPG",
  "/Cafe_Flow/IMG_2911.JPG",
  "/Cafe_Flow/IMG_2912.JPG",
  "/Cafe_Flow/IMG_2913.JPG",
  "/Cafe_Flow/IMG_2914.JPG",
  "/Cafe_Flow/IMG_2915.JPG",
  "/Cafe_Flow/IMG_2918.JPG",
  "/Cafe_Flow/IMG_2920.JPG",
  "/Cafe_Flow/IMG_2922.JPG",
  "/Cafe_Flow/IMG_2925.JPG",
  "/Cafe_Flow/IMG_2926.JPG",
  "/Cafe_Flow/IMG_2933.JPG",
  "/Cafe_Flow/IMG_2942.JPG",
  "/Cafe_Flow/IMG_2945.JPG",
  "/Cafe_Flow/IMG_2946.JPG",
  "/Cafe_Flow/IMG_2954.JPG",
  "/Cafe_Flow/IMG_2955.JPG",
  "/Cafe_Flow/IMG_2969.JPG",
  "/Cafe_Flow/IMG_2977.JPG",
  "/Cafe_Flow/IMG_2978.JPG",
  "/Cafe_Flow/IMG_2979.JPG",
  "/Cafe_Flow/IMG_2980.JPG",
  "/Cafe_Flow/IMG_2981.JPG",
  "/Cafe_Flow/IMG_2982.JPG",
  "/Cafe_Flow/IMG_2983.JPG",
  "/Cafe_Flow/IMG_2984.JPG",
  "/Cafe_Flow/IMG_2985.JPG",
  "/Cafe_Flow/IMG_2988.JPG",
  "/Cafe_Flow/IMG_2989.JPG",
  "/Cafe_Flow/IMG_2990.JPG",
  "/Cafe_Flow/IMG_2991.JPG",
  "/Cafe_Flow/IMG_2997.JPG",
  "/Cafe_Flow/IMG_3002.JPG",
  "/Cafe_Flow/IMG_3008.JPG",
  "/Cafe_Flow/IMG_3010.JPG",
]

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
}

export default function CafeFlowPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = () => {
    if (isAnimating) return
    setDirection(-1)
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }

  const handleNext = () => {
    if (isAnimating) return
    setDirection(1)
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC]">
      <Header />

      <main>
        <section className="pt-[100px] md:pt-24 lg:pt-28">
          <img
            src="/Cafe_Flow/Cover.JPG"
            alt="Cafe Flow main image"
            className="w-full aspect-[3/2] md:aspect-auto md:h-[58vh] object-cover lg:h-[68vh]"
          />
        </section>

        <section className="mx-auto max-w-[88%] px-4 py-12 lg:px-8 lg:py-16">
          <h1 className="mb-6 text-4xl text-black lg:text-6xl">Cafe Flow</h1>
          <p className="max-w-5xl text-base text-black/70 lg:text-lg">
            Cafe Flow is a commercial showcase project built around a warm, design-led hospitality atmosphere with
            integrated audio, display, and control systems. The space was planned to feel inviting throughout the day,
            while still supporting crisp media playback and a polished customer-facing presentation.
          </p>
          <p className="mt-6 max-w-5xl text-base text-black/70 lg:text-lg">
            From the visual finish to the system layout, the installation focuses on delivering a seamless experience
            for both guests and staff. It demonstrates how coordinated AV design can support ambience, operational
            simplicity, and a stronger identity for a modern commercial venue.
          </p>
        </section>

        <section className="w-full pb-12 lg:pb-16">
          <div className="relative mx-auto max-w-[88%] overflow-hidden rounded-xl aspect-[18/9]">
            <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
              <motion.img
                key={activeIndex}
                src={galleryImages[activeIndex]}
                alt={`Cafe Flow image ${activeIndex + 1}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onAnimationStart={() => setIsAnimating(true)}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6">
            <motion.button
              type="button"
              aria-label="Previous image"
              onClick={handlePrev}
              whileHover={{ scale: 1.06, x: -2 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-black transition-colors hover:bg-black/10"
            >
              <motion.span whileHover={{ x: -2 }} transition={{ duration: 0.15 }}>
                <ChevronLeft size={20} />
              </motion.span>
            </motion.button>
            <motion.button
              type="button"
              aria-label="Next image"
              onClick={handleNext}
              whileHover={{ scale: 1.06, x: 2 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/25 text-black transition-colors hover:bg-black/10"
            >
              <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
                <ChevronRight size={20} />
              </motion.span>
            </motion.button>
          </div>

          <div className="mx-auto max-w-[88%] px-4 pt-8 lg:px-8">
            <p className="text-sm uppercase tracking-[0.16em] text-black/50">
              Home / Projects / Commercial / Cafe Flow
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
