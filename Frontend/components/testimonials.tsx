"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeftRight } from "lucide-react"
import { useEffect, useRef, useState, type PointerEvent } from "react"
import { testimonialInitials } from "@/lib/testimonial-initials"

const testimonials = [
  {
    name: "Imran Ahmed",
    quote: "One of the oldest hi-fi showrooms, with expert guidance, great pricing, and guaranteed satisfaction. The staff is friendly, and you do not have to worry about parking because valet parking is available at the entrance.",
  },
  {
    name: "Rizwan Ghafoor",
    quote: "Best place for audiophiles in Karachi. Samad Siddiqi is very knowledgable and friendly, guides you to the fullest. Some of the world's best brands you'll find here!",
  },
  {
    name: "MA Siddiqi",
    quote: "Excellent products and well-trained employees.",
  },
  {
    name: "David Kenney",
    quote: "A purveyor of state of the art smart home and office solutions. Karim and his team are knowledgeable and helpful. The upstairs has a home theatre set up for demonstrations of what you can expect from the latest technology on offer.",
  },
  {
    name: "Ryan D'Souza",
    quote: "If you want the best audio equipment for home entertainment in Karachi, there is no better place than Desert Sound. I've helped configure and build a number of systems for friends and family and have a system built for myself as well. Their rates are surprisingly reasonable and they are the only home entertainment vendor that provides warranty on all their products. Very highly recommended.",
  },
  {
    name: "Salahuddin Malik",
    quote: "Desert sound is providing great services to the Pakistan audio video community, they have world's best brands like Marantz, Denon, Focal, Paradigm, SVS, Emotiva & so on. I have a very good experience with them & recently I purchased SVS PB 17 Ultra which is the beast in subwoofer category. Highly recommended.",
  },
  {
    name: "Ali Iqbal",
    quote: "Had a great time with Desert Sound. Handled every situation perfectly and was impressed with the highly professional team. They have made our home theater truly exceptional.",
  },
  {
    name: "Fahad Hussain",
    quote: "They provided a great installation service, and even their after-sales service was perfect. There was not a single thing that disappointed me.",
  },
  {
    name: "Faraz Qureshi",
    quote: "They completely changed our living space into a cinematic experience. From consultation to installation, their team guided us professionally and delivered exceptional sound.",
  },
  {
    name: "Marium Sheikh",
    quote: "Desert Sound provided a complete audio, video, and automation solution with professionalism. Their ability to combine technology, design, and comfort makes them stand out.",
  },
  {
    name: "Ahsan Malik",
    quote: "Desert Sound exceeded our expectations. Everything works seamlessly, from automation to audio and video.",
  },
  {
    name: "Junaid Khan",
    quote: "The sound quality, screen setup, lighting, and overall integration were handled with perfect attention to detail.",
  },
  {
    name: "Ijaz Ahmad",
    quote: "Professional, dependable and highly skilled. Desert Sound made the entire process simple and delivered excellent results.",
  },
  {
    name: "Sameer Ali",
    quote: "Desert Sound completely transformed our home. The speakers are excellent, the sound is crystal clear with absolutely beautiful lighting.",
  },
  {
    name: "Sarah",
    quote: "They understood our needs exactly and delivered sound quality that exceeded our expectations.",
  },
  {
    name: "Faruq",
    quote: "We have worked with several audio teams over the years, and Desert Sound stands out for their reliability and incredible service. They made our home theatre experience flawless.",
  },
  {
    name: "Ahmad",
    quote: "Desert Sound helped create the perfect atmosphere. The setup looked clean, the sound was excellent, and their team was friendly and efficient.",
  },
  {
    name: "Omer Ahmad",
    quote: "We could not have asked for a better sound partner. Desert Sound was responsive, prepared, and committed to making sure every detail was right.",
  },
  {
    name: "Hassan Malik",
    quote: "We wanted a clean home theatre setup without visible wiring or complicated controls, and Desert Sound delivered exactly that. Everything looks elegant and is easy for the whole family to use.",
  },
  {
    name: "Ali Farooq",
    quote: "We were looking for high-end sound without making the room look cluttered. Desert Sound gave us a beautiful setup with powerful performance and a very neat finish.",
  },
  {
    name: "Bilal A",
    quote: "We appreciated how Desert Sound recommended what was right for our space instead of pushing unnecessary products.",
  },
  {
    name: "Danish Ali",
    quote: "Excellent service, a knowledgeable team, and outstanding results. Desert Sound gave us a polished, high-quality home cinema experience that we enjoy every day.",
  },
  {
    name: "Zaid Ahmed",
    quote: "The support after installation impressed us the most. They did not just set up the system and disappear; they made sure everything worked smoothly.",
  },
  {
    name: "Zainab Q",
    quote: "Desert Sound is dependable even after the sale. When we needed help with a settings issue, their team was easy to reach and solved it without delay.",
  },
]

// Split testimonials for two rows
const row1 = testimonials.filter((_, index) => index % 2 === 0)
const row2 = testimonials.filter((_, index) => index % 2 === 1)

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

function TestimonialCard({
  testimonial,
  inert = false,
}: {
  testimonial: (typeof testimonials)[0]
  inert?: boolean
}) {
  return (
    <motion.div
      whileHover={inert ? undefined : { y: -5 }}
      className="mx-2 w-[280px] flex-shrink-0 sm:mx-3 sm:w-[320px] md:w-[350px] lg:mx-4 lg:w-[400px]"
      aria-hidden={inert}
    >
      <div className="h-full rounded-xl bg-[#F5F5DC] p-6 shadow-lg lg:p-8">
        <StarRating />
        <p className="mb-6 text-sm leading-relaxed text-black/80 lg:text-base">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-black/10"
            aria-hidden={inert}
          >
            <span className="text-xs font-medium tracking-wide text-black/70">
              {testimonialInitials(testimonial.name)}
            </span>
          </div>
          <span className="text-sm font-medium text-black">{testimonial.name}</span>
        </div>
      </div>
    </motion.div>
  )
}

function useDraggableMarquee(direction: "left" | "right", enabled: boolean) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const dragStartOffsetRef = useRef(0)
  const dragStartXRef = useRef(0)
  const isDraggingRef = useRef(false)
  const lastTimeRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const [isDragging, setIsDragging] = useState(false)

  const normalizeOffset = () => {
    const track = trackRef.current
    if (!track) return

    const loopWidth = track.scrollWidth / 2
    if (!loopWidth) return

    while (offsetRef.current <= -loopWidth) {
      offsetRef.current += loopWidth
    }

    while (offsetRef.current > 0) {
      offsetRef.current -= loopWidth
    }
  }

  const applyOffset = () => {
    const track = trackRef.current
    if (!track) return

    track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`
  }

  useEffect(() => {
    if (!enabled) return

    const animate = (time: number) => {
      const track = trackRef.current
      const loopWidth = track ? track.scrollWidth / 2 : 0

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }

      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isDraggingRef.current && loopWidth) {
        const distance = (loopWidth / 80000) * delta
        offsetRef.current += direction === "left" ? -distance : distance
        normalizeOffset()
        applyOffset()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [direction, enabled])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return

    isDraggingRef.current = true
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    offsetRef.current = dragStartOffsetRef.current + (event.clientX - dragStartXRef.current)
    normalizeOffset()
    applyOffset()
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    setIsDragging(false)

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return {
    trackRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  }
}

function ParallaxMarquee({
  testimonials,
  direction,
}: {
  testimonials: typeof row1
  direction: "left" | "right"
}) {
  const [hasLoopClone, setHasLoopClone] = useState(false)
  const { trackRef, isDragging, handlePointerDown, handlePointerMove, handlePointerUp } =
    useDraggableMarquee(direction, hasLoopClone)

  useEffect(() => {
    setHasLoopClone(true)
  }, [])

  return (
    <div className="flex -mx-4 -my-3 overflow-x-hidden overflow-y-visible py-3 lg:-mx-8">
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`flex w-max touch-pan-y select-none will-change-transform transform-gpu [backface-visibility:hidden] ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex shrink-0">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
          ))}
        </div>
        {hasLoopClone ? (
          <div className="flex shrink-0" aria-hidden="true">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`second-${index}`} testimonial={testimonial} inert />
            ))}
          </div>
        ) : null}
      </div>
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
    <section ref={containerRef} id="testimonials" className="pt-12 pb-14 lg:pt-16 lg:pb-16 bg-black overflow-x-clip overflow-y-visible relative z-10">
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

        {/* Row 1 - auto-scrolls right, matching the previous marquee direction */}
        <ParallaxMarquee testimonials={row1} direction="right" />

        {/* Row 2 - auto-scrolls left */}
        <ParallaxMarquee testimonials={row2} direction="left" />
      </div>

      <div className="mt-8 flex justify-center px-6 lg:mt-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white/55">
          <ArrowLeftRight className="h-4 w-4" />
          <span>Drag to move</span>
        </div>
      </div>
    </section>
  )
}
