"use client"

import { useRef } from "react"
import { Tv, Home, Smartphone, Shield, Zap, Headphones, ArrowUpRight } from "lucide-react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Tv,
    title: "Home Theatre Systems",
    description:
      "Transform your space into a premium cinema experience with state-of-the-art 4K/8K projectors, immersive Dolby Atmos surround sound, custom luxury seating, and professional acoustic treatment. We design and install complete home theater solutions tailored to your space and preferences.",
    image: "/luxury-home-theater-with-leather-recliners-and-amb.jpg",
    color: "bg-[#1a1a1a]",
    textColor: "text-white"
  },
  {
    icon: Home,
    title: "Smart Home Automation",
    description:
      "Experience the future of living with intelligent automation that responds to your lifestyle. From climate control and automated lighting to voice integration and energy management, we create seamless smart home ecosystems that enhance comfort and efficiency.",
    image: "/modern-smart-home-living-room-with-automated-light.jpg",
    color: "bg-[#f5f5f5]",
    textColor: "text-zinc-900"
  },
  {
    icon: Smartphone,
    title: "Control Integration",
    description:
      "Unify your entire home with a single, intuitive control system. Our integration solutions bring together lighting, climate, entertainment, and security into one seamless interface—accessible via universal remotes, mobile apps, touch panels, or voice commands.",
    image: "/smart-home-control-room-futuristic.jpg",
    color: "bg-[#1a1a1a]",
    textColor: "text-white"
  },
  {
    icon: Shield,
    title: "Security Solutions",
    description:
      "Protect what matters most with advanced surveillance and access control systems. We install HD camera networks, smart locks, motion detection, and remote monitoring solutions that provide complete peace of mind for your home or business.",
    image: "/corporate-boardroom-premium-av-equipment-modern.jpg",
    color: "bg-[#f5f5f5]",
    textColor: "text-zinc-900"
  },
  {
    icon: Zap,
    title: "Lighting Design",
    description:
      "Elevate your spaces with architectural lighting that transforms ambiance at the touch of a button. Our lighting solutions include LED architectural fixtures, mood control systems, daylight harvesting, and automated scheduling for the perfect atmosphere.",
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
    color: "bg-[#1a1a1a]",
    textColor: "text-white"
  },
  {
    icon: Headphones,
    title: "Audio Systems",
    description:
      "Fill your home with crystal-clear sound through our multi-room audio solutions. From wireless streaming and hi-fi speaker installations to synchronized whole-home audio, we deliver premium sound experiences in every room.",
    image: "/luxury-modern-home-theater-room-with-warm-ambient-.jpg",
    color: "bg-[#f5f5f5]",
    textColor: "text-zinc-900"
  },
]

interface CardProps {
  i: number
  title: string
  description: string
  image: string
  icon: any
  color: string
  textColor: string
  progress: MotionValue<number>
  range: number[]
  targetScale: number
}

const Card = ({ i, title, description, image, icon: Icon, color, textColor, progress, range, targetScale }: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1])
  const scale = useTransform(progress, range, [1, targetScale])
  
  return (
    <div ref={container} className="h-screen flex items-start justify-center sticky top-0 pt-16">
      <motion.div 
        style={{ scale, top: `calc(10vh + ${i * 25}px)` }} 
        className={cn(
          "relative flex flex-col md:flex-row gap-8 rounded-3xl p-8 md:p-12 h-[550px] md:h-[600px] w-full max-w-6xl shadow-2xl origin-top border border-black/5 overflow-hidden",
          color
        )}
      >
        {/* Content Side */}
        <div className="flex flex-col justify-between w-full md:w-[45%] h-full z-10 relative">
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className={cn("p-3 rounded-xl bg-black/5 backdrop-blur-sm", textColor)}>
                        <Icon size={24} />
                    </div>
                    <span className={cn("text-sm uppercase tracking-wider font-medium opacity-70", textColor)}>Service 0{i + 1}</span>
                </div>
                
                <h3 className={cn("text-3xl md:text-5xl font-light mb-6 leading-tight", textColor)}>
                    {title}
                </h3>
                
                <p className={cn("text-lg leading-relaxed opacity-80", textColor)}>
                    {description}
                </p>
            </div>

            <button className={cn("flex items-center gap-2 text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300 w-fit", textColor)}>
                <span>Explore Solution</span>
                <ArrowUpRight size={16} />
            </button>
        </div>

        {/* Image Side */}
        <div className="absolute md:relative inset-0 md:inset-auto w-full md:w-[55%] h-full md:rounded-2xl overflow-hidden md:ml-auto">
            <motion.div 
                style={{ scale: imageScale }}
                className="w-full h-full"
            >
                <img 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
            </motion.div>
            {/* Mobile overlay for readability */}
            <div className={cn("absolute inset-0 md:hidden bg-gradient-to-t from-black/80 via-black/40 to-transparent", color === "bg-[#f5f5f5]" ? "opacity-20" : "opacity-80")} />
        </div>
      </motion.div>
    </div>
  )
}

export function ServicesSection() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <section ref={container} id="services" className="relative bg-background">
      {/* Header that scrolls away */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            What we do
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
             Tailored solutions for modern living and working spaces
          </p>
        </motion.div>
      </div>

      {/* Sticky Cards Container */}
      <div className="pb-24 lg:pb-32 px-4">
        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.05)
          return (
            <Card 
              key={i} 
              i={i} 
              {...service} 
              progress={scrollYProgress}
              range={[i * 0.16, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  )
}
