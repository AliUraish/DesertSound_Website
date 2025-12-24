export function Footer() {
  return (
    <footer className="bg-[#F5F5DC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0 mb-12 lg:mb-16">
          {/* Logo */}
          <div>
            <div className="text-2xl lg:text-3xl font-light text-black">
              Desert Sound<span className="text-black/40">®</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center gap-6 lg:gap-10">
            <a href="#services" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
              Services
            </a>
            <a href="#contact" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
              Contact
            </a>
            <a href="#" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
              Instagram
            </a>
            <a href="#" className="text-black/60 hover:text-black transition-colors text-sm lg:text-base">
              LinkedIn
            </a>
          </nav>
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
