"use client"

import { useEffect, useState } from "react"

const stats = [
  { number: 500, suffix: "+", label: "Projects Completed" },
  { number: 15, suffix: "+", label: "Years Experience" },
  { number: 100, suffix: "%", label: "Client Satisfaction" },
  { number: 50, suffix: "+", label: "Team Members" },
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
      { threshold: 0.5 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 font-playfair">
                <AnimatedNumber target={stat.number} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AnimatedNumber({ target, suffix, isVisible }: { target: number; suffix: string; isVisible: boolean }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const increment = target / 50
    const timer = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= target) {
          clearInterval(timer)
          return target
        }
        return Math.min(prev + increment, target)
      })
    }, 30)

    return () => clearInterval(timer)
  }, [target, isVisible])

  return (
    <span>
      {Math.floor(current)}
      {suffix}
    </span>
  )
}
