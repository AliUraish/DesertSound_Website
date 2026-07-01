"use client"

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react"
import { ArrowLeftRight } from "lucide-react"

const brands = [
  { name: "Anthem", logo: "/brands_final/Anthem.png", sizeClass: "h-24 lg:h-32", href: "https://www.anthemav.com/" },
  { name: "Acoustic Innovation", logo: "/brands_final/acoustic-innovation.png", sizeClass: "h-24 lg:h-32", href: "" },
  { name: "AC Infinity", logo: "/brands_final/acinfinity.png", href: "https://acinfinity.com/" },
  { name: "Basalte", logo: "/brands_final/Basalte.png", href: "https://www.basalte.be/en" },
  { name: "Beemax", logo: "/brands_final/beemax.png", href: "https://bemaxsound.com/" },
  { name: "Control4", logo: "/brands_final/control4.png", href: "https://www.control4.com/" },
  { name: "Creston", logo: "/brands_final/creston.png", sizeClass: "h-24 lg:h-32", href: "https://www.creston.com/" },
  { name: "Denon", logo: "/brands_final/denon.png", href: "https://www.denon.com/" },
  { name: "Eversolo", logo: "/brands_final/eversolo.png", href: "https://www.eversolo.com/" },
  { name: "Focal", logo: "/brands_final/Focal.png", href: "https://www.focal.com/" },
  { name: "HDL", logo: "/brands_final/HDL.png", href: "https://www.hdl-usa.com/" },
  { name: "HEOS", logo: "/brands_final/HEOS.png", href: "https://www.denon.com/denon-heos.html" },
  { name: "IsoAcoustics", logo: "/brands_final/isoacoustics.png", href: "https://www.isoacoustics.com/" },
  { name: "JVC", logo: "/brands_final/JVC.png", href: "https://www.jvc.com/sg/projectors/d-ila/" },
  { name: "Marantz", logo: "/brands_final/marantz.png", href: "https://www.marantz.com/" },
  { name: "Martin Logan", logo: "/brands_final/martin_logan.png", href: "https://www.martinlogan.com/" },
  { name: "Naim", logo: "/brands_final/naim.png", href: "https://www.naim.com/" },
  { name: "Paradigm", logo: "/brands_final/paradigm.png", href: "https://www.paradigm.com/" },
  { name: "Polk Audio", logo: "/brands_final/polkaudio.png", href: "https://www.polkaudio.com/" },
  { name: "Seemax", logo: "/brands_final/Seemax.png", href: "https://seemaxscreen.com/" },
  { name: "Storm Audio", logo: "/brands_final/stormaudio.png", href: "https://www.stormaudio.com/" },
  { name: "Studio Vellari", logo: "/brands_final/studio_vellari.png", href: "https://www.studiovellari.com/" },
  { name: "Supra Cables", logo: "/brands_final/Supra_cables.png", sizeClass: "h-24 lg:h-32", href: "https://www.supracables.com/" },
  { name: "Workiw", logo: "/brands_final/Workiw.png", sizeClass: "h-24 lg:h-32", href: "https://www.workiw.com/" },
  { name: "Zidoo", logo: "/brands_final/zidoo.png", href: "https://www.zidoo.com/" },
  { name: "Zaricr", logo: "/brands_final/zaricr.png", href: "https://zaricr.com/" },
  { name: "Arylic", logo: "/brands_final/Arylic.png", href: "https://www.arylic.com/?srsltid=AfmBOopZVgqwJo-W21JKzjG7mcfAwHMfgE1vBQzvxdFvkLhYXfVkww15" },
]

const awards = [
  { name: "Award 1", logo: "/Awards/global_2025.png" },
  { name: "Award 2", logo: "/Awards/IE_2025.png" },
  { name: "Award 3", logo: "/Awards/image-removebg-preview (1).png" },
  { name: "Award 4", logo: "/Awards/image_copy-removebg-preview.png" },
  { name: "Award 5", logo: "/Awards/image_copy_2-removebg-preview.png" },
  { name: "Award 6", logo: "/Awards/image_copy_3-removebg-preview.png", wide: true },
]

const certifications = [
  { name: "Certification 1", logo: "/certifications/image.png" },
  { name: "Certification 2", logo: "/certifications/image copy.png" },
  { name: "Certification 3", logo: "/certifications/image copy 2.png" },
  { name: "Certification 4", logo: "/certifications/image copy 3.png" },
  { name: "Certification 5", logo: "/certifications/image copy 4.png" },
  { name: "Certification 6", logo: "/certifications/image copy 5.png" },
  { name: "Certification 7", logo: "/certifications/image copy 6.png" },
  { name: "Certification 8", logo: "/certifications/image copy 7.png" },
  { name: "Certification 9", logo: "/certifications/image copy 8.png" },
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
        data-brand-card="true"
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
    <div className={cardClassName} data-brand-card="true">
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        className={`${brand.sizeClass ?? "h-24 lg:h-32"} w-full object-contain opacity-90`}
        loading="lazy"
      />
    </div>
  )
}

function StaticLogoRow({
  title,
  items,
  className = "mt-12",
}: {
  title: string
  items: { name: string; logo: string; wide?: boolean }[]
  className?: string
}) {
  return (
    <div className={`mx-auto max-w-7xl px-6 text-center lg:px-10 ${className}`}>
      <div className="mb-7 flex justify-center">
        <p className="text-center text-base font-medium uppercase tracking-[0.26em] text-black/45 lg:text-lg">
          {title}
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-7">
        {items.map((item) => (
          <div
            key={item.logo}
            className={`flex h-36 items-center justify-center rounded-lg border border-black/5 bg-black/5 px-6 py-5 sm:h-40 lg:h-44 ${
              item.wide ? "w-[320px] sm:w-[380px] lg:w-[440px]" : "w-[190px] sm:w-[220px] lg:w-[250px]"
            }`}
          >
            <img
              src={item.logo}
              alt={item.name}
              className="h-full w-full object-contain opacity-90"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function OurBrands() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const dragStartOffsetRef = useRef(0)
  const dragStartXRef = useRef(0)
  const hasDraggedRef = useRef(false)
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
    const animate = (time: number) => {
      const track = trackRef.current
      const loopWidth = track ? track.scrollWidth / 2 : 0

      if (lastTimeRef.current === null) {
        lastTimeRef.current = time
      }

      const delta = time - lastTimeRef.current
      lastTimeRef.current = time

      if (!isDraggingRef.current && loopWidth) {
        offsetRef.current -= (loopWidth / 60000) * delta
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
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return
    if ((event.target as HTMLElement).closest("[data-brand-card='true']")) return

    isDraggingRef.current = true
    hasDraggedRef.current = false
    dragStartXRef.current = event.clientX
    dragStartOffsetRef.current = offsetRef.current
    setIsDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const deltaX = event.clientX - dragStartXRef.current
    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true
    }

    offsetRef.current = dragStartOffsetRef.current + deltaX
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

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (!hasDraggedRef.current) return

    event.preventDefault()
    event.stopPropagation()
    hasDraggedRef.current = false
  }

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
          <div
            ref={trackRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClickCapture={handleClickCapture}
            className={`flex w-max touch-pan-y select-none py-4 will-change-transform transform-gpu [backface-visibility:hidden] ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
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

      <div className="mt-5 flex justify-center px-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-black/55">
          <ArrowLeftRight className="h-4 w-4" />
          <span>Drag empty space to move</span>
        </div>
      </div>

      <StaticLogoRow title="Awards" items={awards} />
    </section>
  )
}

export function CertificationsSection() {
  return (
    <section className="bg-[#F5F5DC] py-12 lg:py-16">
      <StaticLogoRow title="Certifications" items={certifications} className="mt-0" />
    </section>
  )
}
