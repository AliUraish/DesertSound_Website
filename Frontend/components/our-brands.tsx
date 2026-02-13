"use client"

const brands = [
  { name: "Anthem", logo: "/Anthem.png", sizeClass: "h-24 lg:h-32" },
  { name: "Eli Acoustic", logo: "/EliAcoustic.png" },
  { name: "Focal", logo: "/Focal.png" },
  { name: "HDL", logo: "/HDL.png" },
  { name: "HEOS", logo: "/HEOS.png" },
  { name: "JVC", logo: "/JVC.png" },
  { name: "SVI", logo: "/SVI.png" },
  { name: "SVS Revolution", logo: "/SVS_revolution.png", sizeClass: "h-24 lg:h-32" },
  { name: "Supra Cables", logo: "/Supra_cables.png", sizeClass: "h-24 lg:h-32" },
  { name: "Workiw", logo: "/Workiw.png", sizeClass: "h-24 lg:h-32" },
  { name: "Acoustic Innovation", logo: "/acoustic-innovation.png", sizeClass: "h-24 lg:h-32" },
  { name: "Control4", logo: "/control4.png" },
  { name: "Creston", logo: "/creston.png", sizeClass: "h-24 lg:h-32" },
  { name: "Dalite", logo: "/dalite.png" },
  { name: "Denon", logo: "/denon.png" },
  { name: "Marantz", logo: "/marantz.png" },
  { name: "Martin Logan", logo: "/martin_logan.png" },
  { name: "Naim", logo: "/naim.png" },
  { name: "Paradigm", logo: "/paradigm.png" },
  { name: "Polk Audio", logo: "/polkaudio.png" },
  { name: "Zappiti", logo: "/zappiti.png" },
  { name: "Zidoo", logo: "/zidoo.png" },
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
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-[#F5F5DC] to-transparent z-0 pointer-events-none" />
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-[#F5F5DC] to-transparent z-0 pointer-events-none" />

        {/* Scrolling track */}
        <div className="relative z-10">
          <div className="flex w-max animate-marquee py-4 will-change-transform transform-gpu [backface-visibility:hidden]">
            <div className="flex items-center gap-10 lg:gap-14 shrink-0 pr-10 lg:pr-14">
              {brands.map((brand, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-[220px] lg:w-[280px]"
                >
                  <div className="flex items-center justify-center h-32 lg:h-40 px-6 lg:px-10 rounded-lg bg-black/5 border border-black/5 cursor-default overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className={`${brand.sizeClass ?? "h-24 lg:h-32"} w-full object-contain opacity-90`}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-10 lg:gap-14 shrink-0" aria-hidden="true">
              {brands.map((brand, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-[220px] lg:w-[280px]"
                >
                  <div className="flex items-center justify-center h-32 lg:h-40 px-6 lg:px-10 rounded-lg bg-black/5 border border-black/5 cursor-default overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      className={`${brand.sizeClass ?? "h-24 lg:h-32"} w-full object-contain opacity-90`}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
