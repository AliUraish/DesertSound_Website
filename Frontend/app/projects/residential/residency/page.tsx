"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const coverImage = "/spiderman/Cover.JPG"

const galleryImages = [
  "/spiderman/IMG_9563.JPG",
  "/spiderman/IMG_9699.JPG",
  "/spiderman/IMG_9709.JPG",
  "/spiderman/IMG_9724.JPG",
  "/spiderman/IMG_9737.JPG",
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

export default function ResidencyPage() {
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
            src={coverImage}
            alt="Residency main image"
            className="w-full aspect-[3/2] md:aspect-auto md:h-[58vh] object-cover object-[50%_15%] lg:h-[68vh]"
          />
        </section>

        <section className="mx-auto max-w-[88%] px-4 py-12 lg:px-8 lg:py-16">
          <h1 className="mb-6 text-4xl text-black lg:text-6xl">Residency</h1>
          <p className="max-w-5xl text-base text-black/70 lg:text-lg">
            Residency is a residential showcase project shaped around comfort, visual atmosphere, and a balanced
            integration of entertainment technology. The space is intended to feel refined and welcoming, while still
            delivering a strong cinematic presence throughout the room.
          </p>
          <p className="mt-6 max-w-5xl text-base text-black/70 lg:text-lg">
            For now, this page uses placeholder copy to hold the presentation structure. The layout mirrors the other
            project case studies and can be updated later with final project details, specifications, and approved
            descriptive text.
          </p>
        </section>

        <section className="w-full pb-12 lg:pb-16">
          <div className="relative mx-auto max-w-[88%] overflow-hidden rounded-xl aspect-[18/9]">
            <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
              <motion.img
                key={activeIndex}
                src={galleryImages[activeIndex]}
                alt={`Residency image ${activeIndex + 1}`}
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
              Home / Projects / Residential / Residency
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
