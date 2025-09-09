"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const heroSlides = [
  {
    image: "/luxury-modern-home-theater-room-with-warm-ambient-.jpg",
    title: "Where Vision",
    subtitle: "Meets Structure",
    description:
      "Transform your space into an immersive entertainment experience with our premium home theater solutions.",
    stats: { years: "15+", projects: "500+", clients: "1000+" },
  },
  {
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
    title: "Silence In",
    subtitle: "Motion",
    description: "Discover spaces where sound becomes memory, held in the air, the water, and the passing light.",
    stats: { years: "15+", projects: "500+", clients: "1000+" },
  },
  {
    image: "/modern-smart-home-minimalist-blue-tones.jpg",
    title: "The Future",
    subtitle: "Makes You Ready",
    description: "Smart home automation that anticipates your needs and elevates your lifestyle beyond imagination.",
    stats: { years: "15+", projects: "500+", clients: "1000+" },
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-2000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[8000ms] ease-out"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%), url('${slide.image}')`,
              transform: index === currentSlide ? "scale(1)" : "scale(1.05)",
            }}
          />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-32 w-full">
        <div className="max-w-3xl">
          <div
            className={`transform transition-all duration-1500 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.9] mb-8 text-white tracking-tight">
              <span className="block">{heroSlides[currentSlide].title}</span>
              <span className="block italic font-light">{heroSlides[currentSlide].subtitle}</span>
            </h1>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <p className="text-lg md:text-xl mb-12 text-white/90 max-w-2xl font-light leading-relaxed tracking-wide">
              {heroSlides[currentSlide].description}
            </p>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-900 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <Button className="bg-white text-black hover:bg-white/90 transition-all duration-500 px-10 py-4 text-sm font-medium tracking-wider hover:scale-105 hover:shadow-2xl">
              Start Your Journey
            </Button>
          </div>
        </div>

        <div
          className={`absolute bottom-20 right-8 hidden lg:flex space-x-20 text-white transform transition-all duration-1000 delay-1100 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-right group">
            <div className="text-5xl font-extralight mb-2 group-hover:scale-110 transition-transform duration-300">
              {heroSlides[currentSlide].stats.years}
            </div>
            <div className="text-xs text-white/70 font-light tracking-[0.2em] uppercase">Years of Innovation</div>
          </div>
          <div className="text-right group">
            <div className="text-5xl font-extralight mb-2 group-hover:scale-110 transition-transform duration-300">
              {heroSlides[currentSlide].stats.projects}
            </div>
            <div className="text-xs text-white/70 font-light tracking-[0.2em] uppercase">Projects Delivered</div>
          </div>
          <div className="text-right group">
            <div className="text-5xl font-extralight mb-2 group-hover:scale-110 transition-transform duration-300">
              {heroSlides[currentSlide].stats.clients}
            </div>
            <div className="text-xs text-white/70 font-light tracking-[0.2em] uppercase">Happy Clients</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 text-white/60">
        <button onClick={prevSlide} className="p-2 hover:text-white transition-colors duration-300 hover:scale-110">
          <ChevronLeft size={20} />
        </button>

        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white w-8" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="p-2 hover:text-white transition-colors duration-300 hover:scale-110">
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        className={`absolute bottom-8 right-8 text-white/60 transform transition-all duration-1000 delay-1300 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent mx-auto mb-3 animate-pulse"></div>
        <div className="text-[10px] font-light tracking-[0.3em] uppercase">Scroll</div>
      </div>
    </section>
  )
}
