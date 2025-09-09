"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-blur-md bg-black/80 border-b border-white/20" : "bg-black/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-light tracking-wider text-white">
            Desert Sound<span className="text-amber-400">®</span>
          </div>

          <nav className="hidden md:flex items-center space-x-12">
            <a
              href="#projects"
              className="text-white/90 hover:text-white transition-colors text-sm font-light tracking-wide uppercase"
            >
              Projects
            </a>
            <a
              href="#studio"
              className="text-white/90 hover:text-white transition-colors text-sm font-light tracking-wide uppercase"
            >
              Studio
            </a>
            <a
              href="#about"
              className="text-white/90 hover:text-white transition-colors text-sm font-light tracking-wide uppercase"
            >
              About
            </a>
          </nav>

          <Button
            variant="outline"
            className="hidden md:inline-flex bg-black/60 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-2 text-sm font-light tracking-wide"
          >
            Contact
          </Button>
        </div>
      </div>
    </header>
  )
}
