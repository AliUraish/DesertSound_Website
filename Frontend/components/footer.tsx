export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-primary mb-4 font-playfair">Desert Sound</div>
            <p className="text-muted-foreground text-pretty">
              Transforming spaces with premium home theatre and smart home solutions across Pakistan.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Home Theatre Systems</li>
              <li>Smart Home Automation</li>
              <li>Audio Visual Solutions</li>
              <li>Security Systems</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>About Us</li>
              <li>Our Projects</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
              <li>YouTube</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Desert Sound. All rights reserved. | Designed with precision and passion.</p>
        </div>
      </div>
    </footer>
  )
}
