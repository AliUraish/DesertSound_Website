"use client"

const testimonials = [
  {
    name: "Ahmed Khan",
    quote: "Desert Sound did an incredible job on our home theatre. The craftsmanship was top-notch, and the team was professional from start to finish. Highly recommend!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Sarah Ahmed",
    quote: "Brilliant service from start to finish. The team was professional, communicative, and the results exceeded my expectations. Our smart home system is amazing!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Imran Malik",
    quote: "I couldn't be happier with my home automation setup. The attention to detail and quality of work were outstanding. They made the whole process smooth and stress-free!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Fatima Hassan",
    quote: "Desert Sound transformed our living space with a beautiful audio system. The work was completed on time, and the finish is excellent. A great team to work with!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Ali Raza",
    quote: "From the first consultation to the final touches, Desert Sound delivered on every promise. Our home theatre is exactly what we wanted—immersive and beautifully finished!",
    avatar: "/placeholder-user.jpg",
  },
  {
    name: "Zara Sheikh",
    quote: "Exceptional workmanship! The team installed our security system with precision and it now works flawlessly. Would definitely use Desert Sound again.",
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
    <div className="flex-shrink-0 w-[350px] lg:w-[400px] mx-3 lg:mx-4">
      <div className="bg-[#F5F5DC] rounded-xl p-6 lg:p-8 h-full">
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
    </div>
  )
}

function MarqueeRow({ testimonials, direction = "left" }: { testimonials: typeof row1; direction?: "left" | "right" }) {
  const animationClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
  
  return (
    <div className="flex group">
      <div className={`flex ${animationClass} group-hover:[animation-play-state:paused]`}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`first-${index}`} testimonial={testimonial} />
        ))}
      </div>
      <div className={`flex ${animationClass} group-hover:[animation-play-state:paused]`} aria-hidden="true">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={`second-${index}`} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-20 lg:py-24 bg-white overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-12 lg:mb-16">
        <span className="inline-block bg-black text-white text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full mb-6">
          Testimonials
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black mb-4">
          Hear from our clients
        </h2>
        <p className="text-black/50 text-lg max-w-2xl mx-auto">
          Hear from our happy clients about their experience working with Desert Sound and the quality of our craftsmanship
        </p>
      </div>

      {/* Testimonials Marquee */}
      <div className="relative">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Row 1 - scrolls left */}
        <div className="mb-6 lg:mb-8">
          <MarqueeRow testimonials={row1} direction="left" />
        </div>

        {/* Row 2 - scrolls right */}
        <div>
          <MarqueeRow testimonials={row2} direction="right" />
        </div>
      </div>
    </section>
  )
}

