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
    }, 7000) // Slightly slower for more premium feel
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
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[10000ms] ease-out"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%), url('${slide.image}')`,
              transform: index === currentSlide ? "scale(1)" : "scale(1.05)",
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-32 lg:py-40 w-full">
        <div className="max-w-4xl">
          {/* Main Title */}
          <div
            className={`transform transition-all duration-[2000ms] ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl hero-text leading-[0.85] mb-8 lg:mb-12 text-white">
              <span className="block animate-fade-in-up">{heroSlides[currentSlide].title}</span>
              <span className="block accent-text text-white/80 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                {heroSlides[currentSlide].subtitle}
              </span>
            </h1>
          </div>

          {/* Description */}
          <div
            className={`transform transition-all duration-[1500ms] delay-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl lg:text-2xl mb-12 lg:mb-16 text-white/90 max-w-3xl font-light leading-[1.6] tracking-wide">
              {heroSlides[currentSlide].description}
            </p>
          </div>

          {/* CTA Button */}
          <div
            className={`transform transition-all duration-[1500ms] delay-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
          >
            <Button className="glass-effect text-foreground hover:bg-primary hover:text-primary-foreground border border-white/20 hover:border-primary/30 transition-all duration-700 px-12 lg:px-16 py-4 lg:py-5 text-premium hover-lift group backdrop-blur-md">
              <span className="group-hover:tracking-wider transition-all duration-300">
                Start Your Journey
              </span>
            </Button>
          </div>
        </div>

        {/* Stats - Desktop Only */}
        <div
          className={`absolute bottom-20 lg:bottom-24 right-8 lg:right-12 hidden lg:flex space-x-16 xl:space-x-20 text-white transform transition-all duration-[1500ms] delay-1300 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="text-right group hover-lift">
            <div className="text-4xl xl:text-5xl font-extralight mb-2 text-white/90 group-hover:text-white transition-all duration-500">
              {heroSlides[currentSlide].stats.years}
            </div>
            <div className="text-premium text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Years of Innovation
            </div>
          </div>
          <div className="text-right group hover-lift">
            <div className="text-4xl xl:text-5xl font-extralight mb-2 text-white/90 group-hover:text-white transition-all duration-500">
              {heroSlides[currentSlide].stats.projects}
            </div>
            <div className="text-premium text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Projects Delivered
            </div>
          </div>
          <div className="text-right group hover-lift">
            <div className="text-4xl xl:text-5xl font-extralight mb-2 text-white/90 group-hover:text-white transition-all duration-500">
              {heroSlides[currentSlide].stats.clients}
            </div>
            <div className="text-premium text-white/60 group-hover:text-white/80 transition-colors duration-300">
              Happy Clients
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 text-white/60">
        <button 
          onClick={prevSlide} 
          className="p-3 hover:text-white transition-all duration-300 hover-lift rounded-full glass-effect"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 hover-lift ${
                index === currentSlide 
                  ? "bg-white w-12" 
                  : "bg-white/40 hover:bg-white/60 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide} 
          className="p-3 hover:text-white transition-all duration-300 hover-lift rounded-full glass-effect"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 lg:bottom-12 right-8 lg:right-12 text-white/60 transform transition-all duration-[1500ms] delay-1500 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-px h-16 lg:h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-gentle-pulse"></div>
          <div className="text-premium text-white/50 animate-subtle-float">Scroll</div>
        </div>
      </div>
    </section>
  )
}
