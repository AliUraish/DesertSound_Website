"use client"

const brands = [
  { name: "Anthem", logo: "/Anthem.png", sizeClass: "h-24 lg:h-32", href: "https://www.anthemav.com/" },
  { name: "Eli Acoustic", logo: "/EliAcoustic.png", href: "https://www.eliacoustic.com/" },
  { name: "Focal", logo: "/Focal.png", href: "https://www.focal.com/" },
  { name: "HDL", logo: "/HDL.png", href: "https://www.hdlautomation.com/" },
  { name: "HEOS", logo: "/HEOS.png", href: "https://www.heoslink.com/" },
  { name: "JVC", logo: "/JVC.png", href: "https://www.jvc.com/" },
  { name: "SVI", logo: "/SVI.png", href: "https://www.svi.nl/" },
  { name: "SVS Revolution", logo: "/SVS_revolution.png", sizeClass: "h-24 lg:h-32", href: "https://www.svsound.com/" },
  { name: "Supra Cables", logo: "/Supra_cables.png", sizeClass: "h-24 lg:h-32", href: "https://www.jenving.se/" },
  { name: "Workiw", logo: "/Workiw.png", sizeClass: "h-24 lg:h-32", href: "https://www.workiw.com/" },
  { name: "Acoustic Innovation", logo: "/acoustic-innovation.png", sizeClass: "h-24 lg:h-32", href: "https://www.acoustic-innovation.com/" },
  { name: "Control4", logo: "/control4.png", href: "https://www.control4.com/" },
  { name: "Creston", logo: "/creston.png", sizeClass: "h-24 lg:h-32", href: "https://www.crestron.com/" },
  { name: "Dalite", logo: "/dalite.png", href: "https://www.legrandav.com/products/da-lite" },
  { name: "Denon", logo: "/denon.png", href: "https://www.denon.com/" },
  { name: "Marantz", logo: "/marantz.png", href: "https://www.marantz.com/" },
  { name: "Martin Logan", logo: "/martin_logan.png", href: "https://www.martinlogan.com/" },
  { name: "Naim", logo: "/naim.png", href: "https://www.naimaudio.com/" },
  { name: "Paradigm", logo: "/paradigm.png", href: "https://www.paradigm.com/" },
  { name: "Polk Audio", logo: "/polkaudio.png", href: "https://www.polkaudio.com/" },
  { name: "Zappiti", logo: "/zappiti.png", href: "https://www.zappiti.com/" },
  { name: "Zidoo", logo: "/zidoo.png", href: "https://www.zidoo.tv/" },
]

function BrandCard({
  brand,
  interactive = true,
}: {
  brand: { name: string; logo: string; sizeClass?: string; href?: string }
  interactive?: boolean
}) {
  const hasLink = interactive && Boolean(brand.href)
  const cardClassName =
    "flex-shrink-0 flex items-center justify-center h-32 lg:h-40 w-[220px] lg:w-[280px] px-6 lg:px-10 rounded-lg bg-black/5 border border-black/5 overflow-hidden transition"

  if (hasLink) {
    return (
      <a
        href={brand.href}
        target="_blank"
        rel="noreferrer"
        className={`${cardClassName} hover:bg-black/[0.08] hover:border-black/10`}
        aria-label={brand.name}
      >
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className={`${brand.sizeClass ?? "h-24 lg:h-32"} w-full object-contain opacity-90`}
          loading="lazy"
        />
      </a>
    )
  }

  return (
    <div className={cardClassName}>
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        className={`${brand.sizeClass ?? "h-24 lg:h-32"} w-full object-contain opacity-90`}
        loading="lazy"
      />
    </div>
  )
}

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
                <BrandCard key={`first-${index}`} brand={brand} />
              ))}
            </div>
            <div className="flex items-center gap-10 lg:gap-14 shrink-0" aria-hidden="true">
              {brands.map((brand, index) => (
                <BrandCard key={`second-${index}`} brand={brand} interactive={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
