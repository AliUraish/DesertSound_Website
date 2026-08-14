"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tv, Home, Smartphone, Wifi, Headphones, ArrowUpRight, type LucideIcon } from "lucide-react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const services = [
  {
    icon: Tv,
    title: "Home Theatre Systems",
    description:
      "Transform your space into a premium cinema experience with state-of-the-art 4K/8K projectors, immersive Dolby Atmos surround sound, custom luxury seating, and professional acoustic treatment. We design and install complete home theatre solutions tailored to your space and preferences.",
    image: "/Pictures Final/Services/Home_Theatre/Cover.jpg",
    color: "bg-[#1a1a1a]",
    textColor: "text-white",
    link: "/services/home-theatre-systems"
  },
  {
    icon: Home,
    title: "Smart Home Automation",
    description:
      "Experience the future of living with intelligent automation that responds to your lifestyle. From climate control and automated lighting to voice integration and energy management, we create seamless smart home ecosystems that enhance comfort and efficiency.",
    image: "/Pictures Final/Services/Smart_Home_Automation/image copy.jpg",
    color: "bg-[#f5f5f5]",
    textColor: "text-zinc-900",
    link: "/services/smart-home-automation"
  },
  {
    icon: Smartphone,
    title: "Control Integration",
    description:
      "Unify your entire home with a single, intuitive control system. Our integration solutions bring together lighting, climate, entertainment, and security into one seamless interface—accessible via universal remotes, mobile apps, touch panels, or voice commands.",
    image: "/Pictures Final/Services/Control_Integration/Cover.jpg",
    color: "bg-[#1a1a1a]",
    textColor: "text-white",
    link: "/services/control-integration"
  },
  {
    icon: Wifi,
    title: "Home Networking and Wi-Fi",
    description:
      "Stay connected with reliable home and office networking. We provide network setup and optimisation, stronger Wi-Fi coverage, performance improvements, and advanced security and parental controls.",
    image: "/Pictures Final/Services/Home_networking/Cover.jpeg",
    color: "bg-[#f5f5f5]",
    textColor: "text-zinc-900",
    link: "/services/home-networking-and-wi-fi"
  },
  {
    icon: Headphones,
    title: "Audio Systems",
    description:
      "Fill your home with crystal-clear sound through our multi-room audio solutions. From wireless streaming and hi-fi speaker installations to synchronized whole-home audio, we deliver premium sound experiences in every room.",
    image: "/Pictures Final/Services/Audio_Systems/Cover.jpg",
    imagePosition: "80% 50%",
    color: "bg-[#1a1a1a]",
    textColor: "text-white",
    link: "/services/audio-systems"
  },
]

interface CardProps {
  i: number
  title: string
  description: string
  image: string
  imagePosition?: string
  icon: LucideIcon
  color: string
  textColor: string
  link?: string
  progress: MotionValue<number>
  range: number[]
  targetScale: number
  isMobile?: boolean
}

// Unified Card component with sticky scroll animation
const Card = ({ i, title, description, image, imagePosition, icon: Icon, color, textColor, link, progress, range, targetScale, isMobile }: CardProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1])
  const scale = useTransform(progress, range, [1, targetScale])
  
  // Mobile layout - original format (image top, content below) with sticky effect
  if (isMobile) {
    return (
      <div ref={container} className="h-[85vh] flex items-start justify-center sticky top-0 pt-20 pointer-events-none">
        <motion.div 
          style={{ scale, top: `calc(12vh + ${i * 18}px)` }} 
          className={cn(
            "relative rounded-2xl overflow-hidden shadow-2xl origin-top border border-black/5 w-full max-w-[92vw] pointer-events-auto",
            color
          )}
        >
          {/* Image Section - Top */}
          <div className="relative h-48 w-full overflow-hidden">
            <motion.div 
              style={{ scale: imageScale }}
              className="w-full h-full"
            >
              <Image 
                src={image} 
                alt={title}
                className="w-full h-full object-cover"
                style={imagePosition ? { objectPosition: imagePosition } : undefined}
                width={1600}
                height={1067}
              />
            </motion.div>
            {/* Gradient overlay at bottom of image */}
            <div className={cn(
              "absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent",
              color === "bg-[#f5f5f5]" ? "from-[#f5f5f5]" : "from-[#1a1a1a]"
            )} />
          </div>

          {/* Content Section - Below */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("p-2.5 rounded-xl bg-black/5 backdrop-blur-sm", textColor)}>
                <Icon size={20} />
              </div>
              <span className={cn("text-xs uppercase tracking-wider font-medium opacity-70", textColor)}>
                Service 0{i + 1}
              </span>
            </div>
            
            <h3 className={cn("text-2xl font-light mb-3 leading-tight", textColor)}>
              {title}
            </h3>
            
            <p className={cn("text-sm leading-relaxed opacity-80 mb-5", textColor)}>
              {description}
            </p>

            {link ? (
              <Link href={link} className={cn("flex items-center gap-2 text-xs uppercase tracking-widest w-fit hover:gap-3 transition-all duration-300", textColor)}>
                <span>Explore Solution</span>
                <ArrowUpRight size={14} />
              </Link>
            ) : (
              <button className={cn("flex items-center gap-2 text-xs uppercase tracking-widest w-fit", textColor)}>
                <span>Explore Solution</span>
                <ArrowUpRight size={14} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }
  
  // Desktop layout - side by side
  return (
    <div ref={container} className="h-screen flex items-start justify-center sticky top-0 pt-16 pointer-events-none">
      <motion.div 
        style={{ scale, top: `calc(10vh + ${i * 25}px)` }} 
        className={cn(
          "relative flex flex-row gap-8 rounded-3xl p-12 h-[600px] w-full max-w-6xl shadow-2xl origin-top border border-black/5 overflow-hidden pointer-events-auto",
          color
        )}
      >
        {/* Content Side */}
        <div className="flex flex-col justify-between w-[45%] h-full z-10 relative">
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <div className={cn("p-3 rounded-xl bg-black/5 backdrop-blur-sm", textColor)}>
                        <Icon size={24} />
                    </div>
                    <span className={cn("text-sm uppercase tracking-wider font-medium opacity-70", textColor)}>Service 0{i + 1}</span>
                </div>
                
                <h3 className={cn("text-5xl font-light mb-6 leading-tight", textColor)}>
                    {title}
                </h3>
                
                <p className={cn("text-lg leading-relaxed opacity-80", textColor)}>
                    {description}
                </p>
            </div>

            {link ? (
              <Link href={link} className={cn("flex items-center gap-2 text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300 w-fit", textColor)}>
                  <span>Explore Solution</span>
                  <ArrowUpRight size={16} />
              </Link>
            ) : (
              <button className={cn("flex items-center gap-2 text-sm uppercase tracking-widest hover:gap-4 transition-all duration-300 w-fit", textColor)}>
                  <span>Explore Solution</span>
                  <ArrowUpRight size={16} />
              </button>
            )}
        </div>

        {/* Image Side */}
        <div className="relative w-[55%] h-full rounded-2xl overflow-hidden ml-auto">
            <motion.div 
                style={{ scale: imageScale }}
                className="w-full h-full"
            >
                <Image 
                    src={image} 
                    alt={title}
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    style={imagePosition ? { objectPosition: imagePosition } : undefined}
                width={1600}
                height={1067}
              />
            </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export function ServicesSection() {
  const container = useRef(null)
  const isMobile = useIsMobile()
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <section ref={container} id="services" className="relative bg-background">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 md:pt-24 lg:pt-32 pb-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="inline-block bg-foreground text-background text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
            Services
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-foreground mb-4">
            What we do
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
             Tailored solutions for modern living and working spaces
          </p>
        </motion.div>
      </div>

      {/* Sticky Cards - Same effect for both mobile and desktop */}
      <div className={cn(
        "px-4",
        isMobile ? "pb-16" : "pb-24 lg:pb-32"
      )}>
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
              isMobile={isMobile}
            />
          )
        })}
      </div>
    </section>
  )
}
