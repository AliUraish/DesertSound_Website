"use client"

import { Home, Tv, Smartphone, Shield, Zap, Headphones } from "lucide-react"
import { useState } from "react"

const services = [
  {
    icon: Tv,
    title: "Home Theatre Systems",
    description: "Premium cinema experiences with 4K projectors, surround sound, and custom seating solutions.",
    features: ["4K/8K Projection", "Dolby Atmos Sound", "Custom Seating", "Acoustic Treatment"],
    timeline: "4-8 weeks",
  },
  {
    icon: Home,
    title: "Smart Home Automation",
    description: "Intelligent lighting, climate control, and security systems that respond to your lifestyle.",
    features: ["Climate Control", "Automated Lighting", "Voice Integration", "Energy Management"],
    timeline: "3-6 weeks",
  },
  {
    icon: Smartphone,
    title: "Control Integration",
    description: "Unified control systems that manage your entire home from a single interface.",
    features: ["Universal Remote", "Mobile Control", "Touch Panels", "Voice Commands"],
    timeline: "2-4 weeks",
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description: "Advanced surveillance and access control systems for complete peace of mind.",
    features: ["HD Cameras", "Smart Locks", "Motion Detection", "Remote Monitoring"],
    timeline: "2-3 weeks",
  },
  {
    icon: Zap,
    title: "Lighting Design",
    description: "Architectural lighting that transforms spaces with mood and ambiance control.",
    features: ["LED Architecture", "Mood Control", "Daylight Harvesting", "Auto Scheduling"],
    timeline: "3-5 weeks",
  },
  {
    icon: Headphones,
    title: "Audio Systems",
    description: "Multi-room audio solutions with crystal-clear sound throughout your home.",
    features: ["Multi-Zone Audio", "Wireless Streaming", "Hi-Fi Speakers", "Synchronized Play"],
    timeline: "2-4 weeks",
  },
]

export function ServicesSection() {
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  return (
    <section id="services" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-24">
          <div className="text-sm text-white/60 font-light tracking-widest uppercase mb-4">Our Expertise</div>
          <h2 className="text-4xl md:text-6xl font-light leading-tight text-white max-w-4xl">
            Crafting intelligent environments
            <span className="text-white/60 italic"> that enhance your lifestyle.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 h-80 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:-translate-y-2">
                <service.icon className="w-10 h-10 text-white/60 mb-6 transition-all duration-300 group-hover:text-white group-hover:scale-110" />
                <h3 className="text-xl font-light mb-4 text-white tracking-wide">{service.title}</h3>
                <p className="text-white/60 font-light leading-relaxed text-sm mb-6">{service.description}</p>
                <div className="text-xs text-white/40 font-light tracking-wider uppercase">{service.timeline}</div>
              </div>

              <div
                className={`absolute top-0 left-0 w-full bg-black/90 backdrop-blur-md border border-white/30 p-8 transition-all duration-500 z-10 ${
                  hoveredService === index ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                }`}
              >
                <service.icon className="w-8 h-8 text-white mb-4" />
                <h3 className="text-lg font-light mb-3 text-white">{service.title}</h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">{service.description}</p>

                <div className="mb-4">
                  <h4 className="text-white text-xs font-light mb-2 tracking-wider uppercase">Key Features</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="text-white/70 text-xs font-light flex items-center">
                        <div className="w-1 h-1 bg-white/60 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="bg-white text-black px-4 py-2 text-xs font-medium tracking-wider hover:bg-white/90 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
