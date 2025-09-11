import { Award, Users, Clock, Star } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "We use only the finest components and materials for lasting excellence.",
    highlight: "Certified Excellence",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified professionals with decades of combined experience.",
    highlight: "Skilled Craftsmanship",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "Projects completed on schedule with meticulous attention to detail.",
    highlight: "Reliable Service",
  },
  {
    icon: Star,
    title: "Lifetime Support",
    description: "Comprehensive warranty and ongoing maintenance services.",
    highlight: "Ongoing Partnership",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div className="lg:col-span-6 animate-slide-in-left">
            <div className="space-y-8 lg:space-y-10">
              <div>
                <div className="text-premium text-muted-foreground mb-6">Our Story</div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-foreground mb-8 lg:mb-10">
                  Crafting Experiences
                  <span className="accent-text text-muted-foreground block mt-2">Since 2009</span>
                </h2>
              </div>
              
              <div className="space-y-6 lg:space-y-8">
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Desert Sound has been at the forefront of home entertainment and automation technology in Pakistan. We
                  combine cutting-edge technology with artistic vision to create spaces that inspire and delight.
                </p>
                <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  From intimate home theatres to comprehensive smart home ecosystems, we deliver solutions that seamlessly
                  integrate into your lifestyle while exceeding your expectations.
                </p>
              </div>

              {/* Key Stats */}
              <div className="surface-elevated border border-border/50 rounded-xl p-6 lg:p-8">
                <div className="grid grid-cols-3 gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-light text-[color:var(--color-accent-gold)] mb-2">
                      15+
                    </div>
                    <div className="text-premium text-muted-foreground">
                      Years Excellence
                    </div>
                  </div>
                  <div className="text-center border-l border-r border-border/50">
                    <div className="text-2xl lg:text-3xl font-light text-[color:var(--color-accent-gold)] mb-2">
                      500+
                    </div>
                    <div className="text-premium text-muted-foreground">
                      Projects Complete
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-light text-[color:var(--color-accent-gold)] mb-2">
                      100%
                    </div>
                    <div className="text-premium text-muted-foreground">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="surface-elevated border border-border/50 p-8 lg:p-10 transition-all duration-700 hover:border-border group hover-lift animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col h-full">
                    {/* Icon */}
                    <div className="mb-6 lg:mb-8">
                      <feature.icon className="w-10 h-10 lg:w-12 lg:h-12 text-muted-foreground transition-all duration-500 group-hover:text-[color:var(--color-accent-gold)] group-hover:scale-110" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl lg:text-2xl text-foreground tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    
                    {/* Highlight */}
                    <div className="mt-6 pt-4 border-t border-border/30">
                      <div className="text-premium text-[color:var(--color-accent-gold)]">
                        {feature.highlight}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 lg:mt-28 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl xl:text-4xl text-foreground mb-6 lg:mb-8 leading-tight">
              Ready to begin your transformation?
            </h3>
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10 leading-relaxed">
              Let's discuss your vision and create a space that reflects your lifestyle and exceeds your expectations.
            </p>
            <button className="glass-effect text-foreground hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-10 lg:px-12 py-4 lg:py-5 text-premium transition-all duration-700 hover-lift group">
              <span className="group-hover:tracking-wider transition-all duration-300">
                Schedule Consultation
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
