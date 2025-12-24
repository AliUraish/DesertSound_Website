"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { number: 500, suffix: "+", label: "Projects Completed" },
  { number: 15, suffix: "+", label: "Years Experience" },
  { number: 100, suffix: "%", label: "Client Satisfaction" },
  { number: 50, suffix: "+", label: "Team Members" },
]

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 lg:py-14 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <span className="inline-block bg-black text-white text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-6">
            Numbers that speak
          </h2>
          <p className="text-black/60 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Since 2009, Desert Sound has been at the forefront of home entertainment and automation technology in Pakistan. We combine cutting-edge technology with artistic vision to create spaces that inspire and delight.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center py-4 lg:py-6 ${
                index < stats.length - 1 ? "lg:border-r lg:border-black/10" : ""
              }`}
            >
              {/* Number */}
              <div className="mb-4">
                <AnimatedNumber 
                  target={stat.number} 
                  suffix={stat.suffix} 
                  isVisible={isVisible} 
                />
              </div>
              
              {/* Label */}
              <p className="text-black/60 text-sm lg:text-base tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Subtle bottom border */}
        <div className="mt-8 lg:mt-10 pt-6 border-t border-black/10">
          <p className="text-center text-black/40 text-sm lg:text-base max-w-2xl mx-auto">
            From intimate home theatres to comprehensive smart home ecosystems — exceeding expectations since day one
          </p>
        </div>
      </div>
    </section>
  )
}

function AnimatedNumber({ 
  target, 
  suffix, 
  isVisible 
}: { 
  target: number
  suffix: string
  isVisible: boolean 
}) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = target / steps
    const stepDuration = duration / steps

    let currentValue = 0
    const timer = setInterval(() => {
      currentValue += increment
      if (currentValue >= target) {
        setCurrent(target)
        clearInterval(timer)
      } else {
        setCurrent(Math.floor(currentValue))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [target, isVisible])

  return (
    <span className="text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight">
      {current}
      <span className="text-black/40">{suffix}</span>
    </span>
  )
}
