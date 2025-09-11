"use client"

import { useEffect, useState } from "react"

const stats = [
  { number: 500, suffix: "+", label: "Projects Completed", sublabel: "Across Pakistan" },
  { number: 15, suffix: "+", label: "Years Experience", sublabel: "In the Industry" },
  { number: 100, suffix: "%", label: "Client Satisfaction", sublabel: "Guaranteed Quality" },
  { number: 50, suffix: "+", label: "Team Members", sublabel: "Expert Professionals" },
]

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-24 lg:py-32 bg-muted/20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="text-premium text-muted-foreground mb-6">
            Our Impact
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
            Excellence measured in 
            <span className="accent-text text-muted-foreground block mt-2">numbers and satisfaction</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover-lift animate-fade-in-up" 
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="surface-elevated border border-border/30 rounded-xl p-8 lg:p-10 h-full flex flex-col justify-center transition-all duration-500 group-hover:border-border group-hover:shadow-lg">
                <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 text-foreground transition-all duration-500 group-hover:text-[color:var(--color-accent-gold)]">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} isVisible={isVisible} />
                </div>
                <div className="space-y-2">
                  <div className="text-base lg:text-lg text-foreground font-medium">
                    {stat.label}
                  </div>
                  <div className="text-premium text-muted-foreground">
                    {stat.sublabel}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="mt-16 lg:mt-20 text-center">
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            These numbers represent more than statistics — they reflect our commitment to 
            <span className="text-foreground font-medium"> exceptional craftsmanship</span> and 
            <span className="text-foreground font-medium"> client satisfaction</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

function AnimatedNumber({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds for smoother animation
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps

    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= target) {
          clearInterval(timer)
          return target
        }
        return Math.min(prev + increment, target)
      })
    }, stepDuration)

    return () => clearInterval(timer)
  }, [target, isVisible])

  return (
    <span className="font-extralight tracking-tight">
      {Math.floor(current)}
      <span className="text-[color:var(--color-accent-gold)]">{suffix}</span>
    </span>
  )
}
