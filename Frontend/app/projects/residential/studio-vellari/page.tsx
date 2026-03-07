"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const galleryImages = ["/vellari2.png", "/vellari3.png", "/vellari4.png", "/vellari5.png"]

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

export default function StudioVellariPage() {
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
        <section className="pt-24 lg:pt-28">
          <img
            src="/vellari1.png"
            alt="Studio Vellari main image"
            className="h-[58vh] lg:h-[68vh] w-full object-cover"
          />
        </section>

        <section className="max-w-[88%] mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <h1 className="text-4xl lg:text-6xl text-black mb-6">M.A Project</h1>
          <p className="text-base lg:text-lg text-black/70 max-w-5xl">
            The Studio Vellari Stanley Recliners and Stanley Daybed take pride of place in the new Flagship Desert
            Sound Cinema, representing the pinnacle of luxury cinema seating. With a choice between a sleek single
            seat recliner and an expansive daybed, the Stanley collection caters to various preferences and space
            requirements. Each piece features customizable console widths and distinctive 3D carbon fibre panelling,
            adding a modern, sophisticated touch.
          </p>
          <p className="text-base lg:text-lg text-black/70 max-w-5xl mt-6">
            The versatility of the Stanley is further enhanced by the option to personalize consoles and armrests with
            a variety of quilted stitch patterns, seamlessly blending into any decor. Perfect for private home theaters
            or upscale entertainment spaces, the Stanley sets a new standard for both style and comfort. Available in
            four exquisite upholstery options, Alcantara, Napa Leather, Nubuck, and Velvet, this collection meets the
            diverse tastes of discerning customers.
          </p>
        </section>

        <section className="w-full pb-12 lg:pb-16">
          <div className="max-w-[88%] mx-auto overflow-hidden rounded-xl relative h-[62vh] lg:h-[74vh]">
            <AnimatePresence initial={false} custom={direction} onExitComplete={() => setIsAnimating(false)}>
              <motion.img
                key={activeIndex}
                src={galleryImages[activeIndex]}
                alt={`Studio Vellari image ${activeIndex + 2}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onAnimationStart={() => setIsAnimating(true)}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full object-cover"
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
              className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-black/25 text-black hover:bg-black/10 transition-colors"
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
              className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-black/25 text-black hover:bg-black/10 transition-colors"
            >
              <motion.span whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
                <ChevronRight size={20} />
              </motion.span>
            </motion.button>
          </div>

          <div className="max-w-[88%] mx-auto px-4 lg:px-8 pt-8">
            <p className="text-sm text-black/50 uppercase tracking-[0.16em]">
              Home / Projects / Residential / Studio Vellari
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
