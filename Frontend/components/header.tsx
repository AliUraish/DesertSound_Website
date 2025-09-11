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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        isScrolled 
          ? "glass-effect border-b border-border/30" 
          : "bg-gradient-to-b from-background/20 via-background/10 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between py-6 lg:py-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl lg:text-2xl text-refined text-foreground">
              Desert Sound
              <span className="text-[color:var(--color-accent-gold)] font-serif italic text-lg">®</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <a
              href="#projects"
              className="text-premium text-muted-foreground hover:text-foreground transition-all duration-300 hover:tracking-wider relative group"
            >
              Projects
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[color:var(--color-accent-gold)] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="text-premium text-muted-foreground hover:text-foreground transition-all duration-300 hover:tracking-wider relative group"
            >
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[color:var(--color-accent-gold)] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="text-premium text-muted-foreground hover:text-foreground transition-all duration-300 hover:tracking-wider relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[color:var(--color-accent-gold)] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Contact Button */}
          <Button
            variant="outline"
            className="hidden md:inline-flex surface-elevated border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary/20 transition-all duration-500 px-8 py-2.5 text-premium hover-lift group"
          >
            <span className="group-hover:tracking-wider transition-all duration-300">Contact</span>
          </Button>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subtle bottom border gradient */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent transition-opacity duration-700 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  )
}
