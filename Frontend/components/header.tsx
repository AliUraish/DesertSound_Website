"use client"

import { useState, useEffect } from "react"
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

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Testimonials", href: "#testimonials" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-1.5 lg:pt-2">
        <div className="max-w-[90%] mx-auto px-3 lg:px-4">
          <div className={`relative flex items-center justify-between py-2 lg:py-1.5 px-6 lg:px-8 rounded-full transition-all duration-300 ${
            isScrolled 
              ? "bg-[#F5F5DC] shadow-lg" 
              : "bg-[#F5F5DC]"
          }`}>
            {/* Logo - Left */}
            <a href="#" className="flex items-center cursor-pointer">
              <img 
                src="/0-removebg-preview.png" 
                alt="Desert Sound Logo" 
                className="h-16 lg:h-20 w-auto object-contain"
              />
            </a>

            {/* Navigation - Centered */}
            <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-10 lg:space-x-12">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm lg:text-base font-medium relative transition-colors duration-300 group text-black hover:text-black/70"
                >
                  {item.name}
                  {/* Hover underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-black" />
                </a>
              ))}
            </nav>

            {/* Contact Button - Right */}
            <div className="hidden md:flex items-center">
              <a 
                href="#contact"
                className="px-6 lg:px-8 py-2.5 lg:py-3 rounded-full text-sm font-medium transition-all duration-300 bg-black text-white hover:bg-black/90"
              >
                Contact
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 transition-colors duration-300 text-black"
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
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-[#F5F5DC] transform transition-all duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="p-8 pt-24">
            {/* Mobile Navigation */}
            <nav className="space-y-6">
              {[...navItems, { name: "Contact", href: "#contact" }].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-xl font-medium text-black hover:text-black/70 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile Contact Info */}
            <div className="mt-12 pt-8 border-t border-black/10 space-y-4">
              <div className="text-sm text-black/40 uppercase tracking-wider">Get in touch</div>
              <div className="space-y-2">
                <p className="text-black/60">+92 300 1234567</p>
                <p className="text-black/60">info@desertsound.com.pk</p>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <a 
                href="#contact"
                className="block w-full bg-black text-white text-center rounded-lg py-4 text-base font-medium transition-colors duration-200 hover:bg-black/90"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start Your Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </> 
  )
}
