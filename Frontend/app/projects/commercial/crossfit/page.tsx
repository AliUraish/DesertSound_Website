"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

const coverImage = "/Pictures Final/Projects/Commercial/Crossfit Gym/Cover.JPG"

const galleryImages = [
  "/Pictures Final/Projects/Commercial/Crossfit Gym/IMG_7890.JPG",
  "/Pictures Final/Projects/Commercial/Crossfit Gym/IMG_7898.JPG",
  "/Pictures Final/Projects/Commercial/Crossfit Gym/IMG_7906.JPG",
  "/Pictures Final/Projects/Commercial/Crossfit Gym/IMG_7911.JPG",
  "/Pictures Final/Projects/Commercial/Crossfit Gym/IMG_7918.JPG",
]

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

export default function CrossFitPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handlePrev = () => {
    if (isAnimating) return
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }

  const handleNext = () => {
    if (isAnimating) return
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }

  return (
    <div className="w-full overflow-x-clip bg-[#F5F5DC]">
      <Header />

      <main>
        <section className="pt-[100px] md:pt-24 lg:pt-28">
          <Image
            src={coverImage}
            alt="CrossFit Gym main image"
            className="w-full aspect-[3/2] md:aspect-auto md:h-[58vh] object-cover object-[62%_70%] lg:h-[68vh]"
                width={1600}
                height={1067}
              />
        </section>

        <section className="mx-auto max-w-[88%] px-4 py-12 lg:px-8 lg:py-16">
          <h1 className="mb-6 text-4xl text-black lg:text-6xl">CrossFit Gym</h1>
          <p className="max-w-5xl text-base text-black/70 lg:text-lg">
            CrossFit Gym is a commercial fitness project built around energy, rhythm, and a clean visual presence. The
            space is intended to feel motivating and immersive, with integrated audiovisual elements supporting both
            training intensity and the overall brand atmosphere.
          </p>
          <p className="mt-6 max-w-5xl text-base text-black/70 lg:text-lg">
            The audio and display systems are positioned to support training sessions and daily operations while
            maintaining a durable, uncluttered environment for members and staff.
          </p>
        </section>

        <section className="w-full pb-12 lg:pb-16">
          <div className="relative mx-auto max-h-[calc(100vh-170px)] min-h-[220px] max-w-[88%] overflow-hidden rounded-xl aspect-[18/9]">
            <AnimatePresence initial={false} onExitComplete={() => setIsAnimating(false)}>
              <motion.img
                key={activeIndex}
                src={galleryImages[activeIndex]}
                alt={`CrossFit Gym image ${activeIndex + 1}`}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onAnimationStart={() => setIsAnimating(true)}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
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
              Home / Projects / Commercial / CrossFit Gym
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
