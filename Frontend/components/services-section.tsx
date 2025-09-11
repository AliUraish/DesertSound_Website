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
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 lg:mb-28">
          <div className="text-premium text-muted-foreground mb-6 animate-fade-in-up">
            Our Expertise
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground max-w-5xl animate-fade-in-up">
            Crafting intelligent environments
            <span className="accent-text text-muted-foreground block mt-2"> that enhance your lifestyle.</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Main Service Card */}
              <div className="surface-elevated border border-border/50 p-8 lg:p-10 h-80 lg:h-96 transition-all duration-700 hover:border-border group-hover:shadow-lg hover-lift">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-6 lg:mb-8">
                    <service.icon className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground transition-all duration-500 group-hover:text-[color:var(--color-accent-gold)] group-hover:scale-110" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl lg:text-2xl mb-4 lg:mb-6 text-foreground tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base mb-6 lg:mb-8">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Timeline */}
                  <div className="text-premium text-muted-foreground/80">
                    {service.timeline}
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 z-10 transition-all duration-700 ease-out ${
                  hoveredService === index 
                    ? "opacity-100 translate-y-0 visible" 
                    : "opacity-0 translate-y-4 invisible pointer-events-none"
                }`}
              >
                <div className="glass-effect border border-border/60 p-8 lg:p-10 h-full">
                  <div className="flex flex-col h-full">
                    {/* Icon & Title */}
                    <div className="mb-6">
                      <service.icon className="w-8 h-8 lg:w-10 lg:h-10 text-[color:var(--color-accent-gold)] mb-4" />
                      <h3 className="text-lg lg:text-xl text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm lg:text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex-1">
                      <h4 className="text-premium text-foreground mb-4">Key Features</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {service.features.map((feature, idx) => (
                          <div 
                            key={idx} 
                            className="text-muted-foreground text-sm flex items-center group/feature"
                          >
                            <div className="w-1.5 h-1.5 bg-[color:var(--color-accent-gold)] rounded-full mr-3 transition-transform duration-300 group-hover/feature:scale-125"></div>
                            <span className="group-hover/feature:text-foreground transition-colors duration-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <button className="mt-6 surface-elevated hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-6 py-3 text-premium transition-all duration-500 hover-lift group/btn">
                      <span className="group-hover/btn:tracking-wider transition-all duration-300">
                        Learn More
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 lg:mt-28 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10 leading-relaxed">
              Ready to transform your space into something extraordinary?
            </p>
            <button className="glass-effect text-foreground hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-10 lg:px-12 py-4 lg:py-5 text-premium transition-all duration-700 hover-lift group">
              <span className="group-hover:tracking-wider transition-all duration-300">
                Start Your Project
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
