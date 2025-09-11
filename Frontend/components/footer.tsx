import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react"

const services = [
  "Home Theatre Systems",
  "Smart Home Automation", 
  "Audio Visual Solutions",
  "Security Systems",
  "Lighting Design",
  "Control Integration"
]

const company = [
  "About Us",
  "Our Projects", 
  "Services",
  "Careers",
  "Contact",
  "Blog"
]

const socialLinks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "YouTube", href: "#" }
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border/50">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6 lg:space-y-8">
            <div>
              <div className="text-3xl lg:text-4xl text-refined text-foreground mb-4">
                Desert Sound
                <span className="text-[color:var(--color-accent-gold)] font-serif italic text-2xl lg:text-3xl">®</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                Transforming spaces with premium home theatre and smart home solutions across Pakistan since 2009.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-[color:var(--color-accent-gold)]" />
                <span>Karachi, Pakistan • Serving Nationwide</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-[color:var(--color-accent-gold)]" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-[color:var(--color-accent-gold)]" />
                <span>info@desertsound.com.pk</span>
              </div>
            </div>

            {/* Awards/Certifications */}
            <div className="surface-elevated border border-border/30 rounded-xl p-6">
              <div className="text-premium text-foreground mb-3">Certified Excellence</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-light text-[color:var(--color-accent-gold)]">ISO</div>
                  <div className="text-premium text-muted-foreground">Certified</div>
                </div>
                <div>
                  <div className="text-lg font-light text-[color:var(--color-accent-gold)]">15+</div>
                  <div className="text-premium text-muted-foreground">Years</div>
                </div>
                <div>
                  <div className="text-lg font-light text-[color:var(--color-accent-gold)]">500+</div>
                  <div className="text-premium text-muted-foreground">Projects</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-lg lg:text-xl text-foreground font-medium mb-6 lg:mb-8">Services</h4>
            <ul className="space-y-3 lg:space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service}
                    </span>
                    <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-lg lg:text-xl text-foreground font-medium mb-6 lg:mb-8">Company</h4>
            <ul className="space-y-3 lg:space-y-4">
              {company.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                    <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="lg:col-span-2">
            <h4 className="text-lg lg:text-xl text-foreground font-medium mb-6 lg:mb-8">Connect</h4>
            <div className="space-y-4 lg:space-y-6">
              <ul className="space-y-3 lg:space-y-4">
                {socialLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                      <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="mt-6 lg:mt-8">
                <div className="text-premium text-foreground mb-3">Stay Updated</div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Get the latest in smart home technology and design trends.
                </p>
                <button className="surface-elevated hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/30 px-4 py-2 text-premium transition-all duration-300 hover-lift group w-full">
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    Subscribe
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border/50 bg-muted/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12 py-6 lg:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground text-sm lg:text-base">
                &copy; 2024 Desert Sound. All rights reserved.
              </p>
              <p className="text-premium text-muted-foreground/80 mt-1">
                Designed with precision and passion.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 lg:space-x-8">
              <a href="#" className="text-premium text-muted-foreground hover:text-foreground transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-premium text-muted-foreground hover:text-foreground transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-premium text-muted-foreground hover:text-foreground transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
