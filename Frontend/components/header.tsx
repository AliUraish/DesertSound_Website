"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 lg:pt-1.5">
        <div className="max-w-[90%] mx-auto px-3 lg:px-4">
          <div className={`relative flex items-center justify-between py-2.5 lg:py-1.5 px-6 lg:px-8 rounded-full transition-all duration-300 ${
            isScrolled 
              ? "bg-[#F5F5DC] shadow-lg backdrop-blur-sm" 
              : "bg-white/10 backdrop-blur-md border border-white/20"
          }`}>
            {/* Logo - Left */}
            <div className="flex items-center cursor-pointer">
              <img 
                src="/0-removebg-preview.png" 
                alt="Desert Sound Logo" 
                className="h-12 lg:h-14 w-auto object-contain"
              />
            </div>

            {/* Navigation - Centered */}
            <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-8 lg:space-x-10">
              {[
                { name: "Projects", href: "#projects" },
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm lg:text-base font-normal text-black hover:text-black/70 transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Contact Button - Right */}
            <div className="hidden md:flex items-center">
              <Button
                className="bg-black text-white hover:bg-black/90 rounded-lg px-6 py-2 text-sm font-normal transition-colors duration-200"
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-black hover:text-black/70 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ease-out ${
        isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border/50 transform transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-8 pt-24">
            {/* Mobile Navigation */}
            <nav className="space-y-6">
              {[
                { name: "Projects", href: "#projects" },
                { name: "Services", href: "#services" },
                { name: "About", href: "#about" },
                { name: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-xl font-normal text-black hover:text-black/70 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="mt-12 pt-8 border-t border-border/50 space-y-4">
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Get in touch</div>
              <div className="space-y-2">
                <p className="text-muted-foreground">+92 300 1234567</p>
                <p className="text-muted-foreground">info@desertsound.com.pk</p>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Button 
                className="w-full bg-black text-white hover:bg-black/90 rounded-lg py-4 text-base font-normal transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}
