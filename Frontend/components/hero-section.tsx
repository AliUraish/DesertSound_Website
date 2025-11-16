"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen w-full bg-background">
      <div className="max-w-[90%] mx-auto px-3 lg:px-4 pt-20 lg:pt-24">
        {/* Image Container */}
        <div className="relative w-full h-[calc(100vh-8rem)] lg:h-[calc(100vh-10rem)] rounded-lg overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('${slide.image}')`,
                }}
              />
            </div>
          ))}

          {/* Content Overlay - Bottom Positioned */}
          <div className="relative z-10 h-full flex flex-col justify-end pb-8 lg:pb-12 px-6 lg:px-8">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-8">
              {/* Text - Bottom Left */}
              <div className="flex flex-col gap-2 lg:max-w-2xl">
                <p className="text-sm lg:text-base text-white/70 font-normal">
                  {heroSlides[currentSlide].description}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-normal leading-tight">
                  {heroSlides[currentSlide].title} {heroSlides[currentSlide].subtitle}
                </h1>
              </div>

              {/* Button - Bottom Right */}
              <div className="flex-shrink-0">
                <Button
                  className="bg-background text-foreground hover:bg-background/90 rounded-lg px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-normal transition-colors duration-200"
                >
                  Work with us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
