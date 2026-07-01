import Link from "next/link"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export function CareersFooter() {
  return (
    <footer className="bg-[#F5F5DC] text-black">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-12 lg:py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <img
              src="/0-removebg-preview.png"
              alt="Desert Sound Logo"
              className="h-16 w-auto object-contain lg:h-20"
            />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-black/65">
              Premium home theatre, automation, audio, and lighting experiences
              designed for carefully built spaces.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link href="/#services" className="transition-colors hover:text-black/65">
                Services
              </Link>
              <Link href="/#projects" className="transition-colors hover:text-black/65">
                Projects
              </Link>
              <Link href="/careers" className="transition-colors hover:text-black/65">
                Careers
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black transition-colors hover:bg-black hover:text-[#F5F5DC]"
                aria-label="Instagram"
              >
                <Instagram className="h-[15px] w-[15px]" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black transition-colors hover:bg-black hover:text-[#F5F5DC]"
                aria-label="Facebook"
              >
                <Facebook className="h-[15px] w-[15px]" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black transition-colors hover:bg-black hover:text-[#F5F5DC]"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-[15px] w-[15px]" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-black/15 pt-6 text-sm text-black/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Desert Sound. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-black">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-black">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
