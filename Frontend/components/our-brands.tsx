"use client"

// Placeholder brand names - replace with actual logos later
const brands = [
  { name: "Control4" },
  { name: "Crestron" },
  { name: "Savant" },
  { name: "Lutron" },
  { name: "Sonos" },
  { name: "Bang & Olufsen" },
  { name: "Bose" },
  { name: "Sony" },
  { name: "JBL" },
  { name: "Denon" },
  { name: "Harman Kardon" },
  { name: "KEF" },
]

export function OurBrands() {
  return (
    <section className="py-12 lg:py-16 bg-[#F5F5DC] overflow-hidden">
      {/* Optional: Section label */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground/60 uppercase tracking-[0.2em] font-light">
          Trusted Brands We Work With
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#F5F5DC] to-transparent z-10 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#F5F5DC] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex group">
          {/* First set of logos */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 lg:mx-12"
              >
                {/* Placeholder logo box - replace with actual <img> tags */}
                <div className="flex items-center justify-center h-12 lg:h-14 px-6 lg:px-8 rounded-lg bg-black/5 backdrop-blur-sm border border-black/5 transition-all duration-500 hover:bg-black/10 hover:scale-105 cursor-pointer">
                  <span className="text-foreground/40 font-light text-sm lg:text-base tracking-wide whitespace-nowrap transition-colors duration-300 hover:text-foreground/70">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 lg:mx-12"
              >
                <div className="flex items-center justify-center h-12 lg:h-14 px-6 lg:px-8 rounded-lg bg-black/5 backdrop-blur-sm border border-black/5 transition-all duration-500 hover:bg-black/10 hover:scale-105 cursor-pointer">
                  <span className="text-foreground/40 font-light text-sm lg:text-base tracking-wide whitespace-nowrap transition-colors duration-300 hover:text-foreground/70">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

