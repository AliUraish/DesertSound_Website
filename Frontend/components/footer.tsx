import { Instagram, Facebook, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 mb-12 lg:mb-16">
          {/* Logo */}
          <div>
            <img 
              src="/0-removebg-preview.png" 
              alt="Desert Sound Logo" 
              className="h-12 lg:h-14 w-auto object-contain"
            />
          </div>

          {/* Navigation & Social Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 lg:gap-12">
            {/* Navigation Links */}
            <nav className="flex items-center gap-6 lg:gap-8">
              <a href="#services" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
                Services
              </a>
              <a href="#contact" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
                Contact
              </a>
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-black/10">
          <p className="text-black/40 text-sm">
            © 2024 Desert Sound. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-black/40 hover:text-black/60 transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-black/40 hover:text-black/60 transition-colors text-sm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
