import { Award, Users, Clock, Star } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest components and materials for lasting excellence.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified professionals with decades of combined experience.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Projects completed on schedule with meticulous attention to detail.",
  },
  {
    icon: Star,
    title: "Lifetime Support",
    description: "Comprehensive warranty and ongoing maintenance services.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-slide-in-left">
            <div className="text-sm text-white/60 font-light tracking-widest uppercase mb-4">Our Story</div>
            <h2 className="text-4xl md:text-6xl font-light leading-tight text-white mb-8">
              Crafting Experiences
              <span className="text-white/60 italic block">Since 2009</span>
            </h2>
            <p className="text-lg text-white/80 mb-8 font-light leading-relaxed">
              Desert Sound has been at the forefront of home entertainment and automation technology in Pakistan. We
              combine cutting-edge technology with artistic vision to create spaces that inspire and delight.
            </p>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              From intimate home theatres to comprehensive smart home ecosystems, we deliver solutions that seamlessly
              integrate into your lifestyle while exceeding your expectations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <feature.icon className="w-8 h-8 text-white/60 mb-6 group-hover:text-white transition-colors duration-300" />
                <h3 className="font-light text-white mb-3 tracking-wide">{feature.title}</h3>
                <p className="text-sm text-white/70 font-light leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
