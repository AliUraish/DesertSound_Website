"use client"

import { useState, useRef, useCallback } from "react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const MIN_SLIDER_POSITION = 8
const MAX_SLIDER_POSITION = 92

export function ComparisonTransformation() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  
  // Scroll animations
  const { ref: headerRef, isVisible: isHeaderVisible } = useScrollAnimation({ threshold: 0.2 })
  const { ref: sliderRef, isVisible: isSliderVisible } = useScrollAnimation({ threshold: 0.2 })

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(MIN_SLIDER_POSITION, Math.min(MAX_SLIDER_POSITION, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [])

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    handleMove(e.clientX)
  }, [handleMove])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }, [handleMove])

  const handleClick = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX)
  }, [handleMove])

  return (
    <section className="py-24 lg:py-32 bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            isHeaderVisible
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-black leading-tight max-w-3xl">
            Transforming your space into something you’ll love
          </h2>
        </div>

        {/* Comparison Slider */}
        <div 
          ref={sliderRef}
          className={`transition-all duration-1000 ease-out delay-200 ${
            isSliderVisible
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-95"
          }`}
        >
          <div 
            ref={containerRef}
            className="relative w-full aspect-[16/10] lg:aspect-[16/9] rounded-lg overflow-hidden cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleClick}
          >
            {/* Before Image (Background) */}
            <div className="absolute inset-0">
              <Image
                src="/home-theater-before-generated.png"
                alt="Before transformation"
                className="w-full h-full object-cover"
                draggable={false}
                width={1280}
                height={592}
              />
              {/* Before Label */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6 bg-black/60 backdrop-blur-sm text-white text-xs lg:text-sm font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">
                Before
              </div>
            </div>

            {/* After Image (Clipped) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <Image
                src="/Pictures Final/Projects/Residential/New_Theatre/After.jpg"
                alt="After transformation"
                className="w-full h-full object-cover"
                draggable={false}
                width={1920}
                height={1280}
              />
              {/* After Label */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/90 backdrop-blur-sm text-black text-xs lg:text-sm font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">
                After
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* Handle Button - larger touch target on mobile */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-xl flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95">
                {/* Solid Triangle Arrows ◀ ▶ */}
                <div className="flex items-center gap-1">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-black">
                    <path d="M10 6L0 12L0 0L10 6Z" transform="rotate(180 5 6)" />
                  </svg>
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" className="text-black">
                    <path d="M10 6L0 12L0 0L10 6Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>

        {/* Optional: Instruction hint */}
        <p className={`text-center text-black/40 text-sm mt-6 lg:mt-8 transition-all duration-700 ease-out delay-500 ${
          isSliderVisible
            ? "opacity-100" 
            : "opacity-0"
        }`}>
          Drag the slider to compare before and after
        </p>
      </div>
    </section>
  )
}
