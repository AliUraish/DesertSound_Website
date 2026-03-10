"use client"

const brands = [
  { name: "Anthem", logo: "/brands_final/Anthem.png", sizeClass: "h-24 lg:h-32", href: "https://www.anthemav.com/" },
  { name: "Acoustic Innovation", logo: "/brands_final/acoustic-innovation.png", sizeClass: "h-24 lg:h-32", href: "" },
  { name: "AC Infinity", logo: "/brands_final/acinfinity.png", href: "https://acinfinity.com/" },
  { name: "Basalte", logo: "/brands_final/Basalte.png", href: "https://www.basalte.be/en" },
  { name: "Control4", logo: "/brands_final/control4.png", href: "https://www.control4.com/" },
  { name: "Creston", logo: "/brands_final/creston.png", sizeClass: "h-24 lg:h-32", href: "https://www.creston.com/" },
  { name: "Denon", logo: "/brands_final/denon.png", href: "https://www.denon.com/" },
  { name: "Eversolo", logo: "/brands_final/eversolo.png", href: "https://www.eversolo.com/" },
  { name: "Focal", logo: "/brands_final/Focal.png", href: "https://www.focal.com/" },
  { name: "HDL", logo: "/brands_final/HDL.png", href: "https://www.hdl-usa.com/" },
  { name: "HEOS", logo: "/brands_final/HEOS.png", href: "https://www.denon.com/denon-heos.html" },
  { name: "IsoAcoustics", logo: "/brands_final/isoacoustics.png", href: "https://www.isoacoustics.com/" },
  { name: "JVC", logo: "/brands_final/JVC.png", href: "https://www.jvc.com/" },
  { name: "Marantz", logo: "/brands_final/marantz.png", href: "https://www.marantz.com/" },
  { name: "Martin Logan", logo: "/brands_final/martin_logan.png", href: "https://www.martinlogan.com/" },
  { name: "Naim", logo: "/brands_final/naim.png", href: "https://www.naim.com/" },
  { name: "Paradigm", logo: "/brands_final/paradigm.png", href: "https://www.paradigm.com/" },
  { name: "Polk Audio", logo: "/brands_final/polkaudio.png", href: "https://www.polkaudio.com/" },
  { name: "Storm Audio", logo: "/brands_final/stormaudio.png", href: "https://www.stormaudio.com/" },
  { name: "Supra Cables", logo: "/brands_final/Supra_cables.png", sizeClass: "h-24 lg:h-32", href: "https://www.supracables.com/" },
  { name: "Workiw", logo: "/brands_final/Workiw.png", sizeClass: "h-24 lg:h-32", href: "https://www.workiw.com/" },
  { name: "Zidoo", logo: "/brands_final/zidoo.png", href: "https://www.zidoo.com/" },
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
