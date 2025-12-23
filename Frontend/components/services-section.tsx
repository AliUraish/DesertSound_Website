"use client"

import { useState } from "react"
import { Tv, Home, Smartphone, Shield, Zap, Headphones, Plus, X } from "lucide-react"

const services = [
  {
    icon: Tv,
    title: "Home Theatre Systems",
    description:
      "Transform your space into a premium cinema experience with state-of-the-art 4K/8K projectors, immersive Dolby Atmos surround sound, custom luxury seating, and professional acoustic treatment. We design and install complete home theater solutions tailored to your space and preferences.",
    image: "/luxury-home-theater-with-leather-recliners-and-amb.jpg",
  },
  {
    icon: Home,
    title: "Smart Home Automation",
    description:
      "Experience the future of living with intelligent automation that responds to your lifestyle. From climate control and automated lighting to voice integration and energy management, we create seamless smart home ecosystems that enhance comfort and efficiency.",
    image: "/modern-smart-home-living-room-with-automated-light.jpg",
  },
  {
    icon: Smartphone,
    title: "Control Integration",
    description:
      "Unify your entire home with a single, intuitive control system. Our integration solutions bring together lighting, climate, entertainment, and security into one seamless interface—accessible via universal remotes, mobile apps, touch panels, or voice commands.",
    image: "/smart-home-control-room-futuristic.jpg",
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description:
      "Protect what matters most with advanced surveillance and access control systems. We install HD camera networks, smart locks, motion detection, and remote monitoring solutions that provide complete peace of mind for your home or business.",
    image: "/corporate-boardroom-premium-av-equipment-modern.jpg",
  },
  {
    icon: Zap,
    title: "Lighting Design",
    description:
      "Elevate your spaces with architectural lighting that transforms ambiance at the touch of a button. Our lighting solutions include LED architectural fixtures, mood control systems, daylight harvesting, and automated scheduling for the perfect atmosphere.",
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
  },
  {
    icon: Headphones,
    title: "Audio Systems",
    description:
      "Fill your home with crystal-clear sound through our multi-room audio solutions. From wireless streaming and hi-fi speaker installations to synchronized whole-home audio, we deliver premium sound experiences in every room.",
    image: "/luxury-modern-home-theater-room-with-warm-ambient-.jpg",
  },
]

export function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  // Default image when nothing is selected
  const currentImage = expandedIndex !== null 
    ? services[expandedIndex].image 
    : "/luxury-home-theater-cinematic-lighting.jpg"

  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            What we do
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Find out which one of our services fit the needs of your project
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Dynamic Image */}
          <div className="relative aspect-square lg:aspect-[4/5] w-full max-h-[600px] overflow-hidden rounded-lg">
            {services.map((service, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  expandedIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Default image when nothing is selected */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                expandedIndex === null ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src="/luxury-home-theater-cinematic-lighting.jpg"
                alt="Our Services"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Accordion List */}
          <div className="flex flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                className="border-b border-border/60 last:border-b-0"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full flex items-center justify-between py-5 lg:py-6 text-left group transition-colors duration-300 hover:bg-muted/30"
                >
                  <div className="flex items-center gap-4">
                    <service.icon 
                      className={`w-6 h-6 transition-colors duration-300 ${
                        expandedIndex === index 
                          ? "text-foreground" 
                          : "text-muted-foreground group-hover:text-foreground"
                      }`} 
                      strokeWidth={1.5}
                    />
                    <span 
                      className={`text-lg lg:text-xl font-normal transition-colors duration-300 cursor-pointer${
                        expandedIndex === index 
                          ? "text-foreground cursor-pointer" 
                          : "text-foreground cursor-pointer"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    {expandedIndex === index ? (
                      <X className="w-5 h-5 text-foreground transition-transform duration-300 cursor-pointer" />
                    ) : (
                      <Plus className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300 cursor-pointer" />
                    )}
                  </div>
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedIndex === index 
                      ? "max-h-96 opacity-100" 
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pb-6 pl-10 pr-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
