"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Imran Ahmed",
    quote: "One of the oldest hifi showroom with expertise and expert and the best price with gurantee satisfaction the friendly staff and the place and you don't have to worry for your car park as the beginning of entry there is a valley parking available. ",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Rizwan Ghafoor",
    quote: "Best place for audiophiles in Karachi. Samad Siddiqi is very knowledgable and friendly, guides you to the fullest. Some of the world's best brands you'll find here!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "MA Siddiqi",
    quote: "Excellent Products and well Trained Employees",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "David Kenney",
    quote: "A purveyor of state of the art smart home and office solutions. Karim and his team are knowledgeable and helpful. The upstairs has a home theatre set up for demonstrations of what you can expect from the latest technology on offer.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Ryan D'Souza",
    quote: "If you want the best audio equipment for home entertainment in Karachi, there is no better place than Desert Sound. I've helped configure and build a number of systems for friends and family and have a system built for myself as well. Their rates are surprisingly reasonable and they are the only home entertainment vendor that provides warranty on all their products. Very highly recommended.",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Salahuddin Malik",
    quote: "Desert sound is providing great services to the Pakistan audio video community, they have world's best brands like Marantz, Denon, Focal, Paradigm, SVS, Emotiva & so on. I have a very good experience with them & recently I purchased SVS PB 17 Ultra which is the beast in subwoofer category. Highly recommended.",
    avatar: "/placeholder-user.jpg",
  },
]

// Split testimonials for two rows
const row1 = testimonials.slice(0, 3)
const row2 = testimonials.slice(3, 6)

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-black fill-current"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[350px] lg:w-[400px] mx-2 sm:mx-3 lg:mx-4"
    >
      <div className="bg-[#F5F5DC] rounded-xl p-6 lg:p-8 h-full shadow-lg cursor-grab active:cursor-grabbing">
        <StarRating />
        <p className="text-black/80 text-sm lg:text-base leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-black/10 overflow-hidden">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-black font-medium text-sm">{testimonial.name}</span>
        </div>
      </div>
    </motion.div>
  )
}

function ParallaxMarquee({ testimonials, baseVelocity = 100 }: { testimonials: typeof row1; baseVelocity: number }) {
  // Create an infinite loop of items
  const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials]
  
  return (
    <div className="flex overflow-hidden -mx-4 lg:-mx-8">
       <motion.div 
        className="flex"
        animate={{
          x: baseVelocity < 0 ? [-1000, 0] : [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
       >
        {items.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
       </motion.div>
    </div>
  )
}

export function Testimonials() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Fade in elements as they enter view
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  return (
    <section ref={containerRef} id="testimonials" className="py-14 lg:py-16 bg-black overflow-hidden relative z-10">
      {/* Section Header */}
      <motion.div 
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-10 lg:mb-12"
      >
        <span className="inline-block bg-white text-black text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
          Hear from our clients
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
          Real experiences from homeowners who have transformed their living spaces with Desert Sound.
        </p>
      </motion.div>

      {/* Parallax Marquees */}
      <div className="flex flex-col gap-8 lg:gap-12 relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <ParallaxMarquee testimonials={row1} baseVelocity={-1} />

        {/* Row 2 - scrolls right */}
        <ParallaxMarquee testimonials={row2} baseVelocity={1} />
      </div>
    </section>
  )
}
