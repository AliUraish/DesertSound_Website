export type Project = {
  id: number
  slug: string
  title: string
  category: string
  location: string
  image: string
  description: string
  year: string
  size: string
}

export const allProjects: Project[] = [
  {
    id: 1,
    slug: "desert-oasis-cinema",
    title: "Desert Oasis Cinema",
    category: "Luxury Villa Theatre",
    location: "Karachi, Pakistan",
    image: "/luxury-modern-home-theater-dark-atmospheric.jpg",
    description:
      "A state-of-the-art home cinema featuring 4K projection, Dolby Atmos surround sound, and custom Italian leather seating.",
    year: "2024",
    size: "450 sq ft",
  },
  {
    id: 2,
    slug: "smart-living-integration",
    title: "Smart Living Integration",
    category: "Penthouse Automation",
    location: "Lahore, Pakistan",
    image: "/modern-smart-home-minimalist-blue-tones.jpg",
    description:
      "Complete smart home transformation with integrated lighting, climate control, and voice-activated controls.",
    year: "2024",
    size: "3,200 sq ft",
  },
  {
    id: 3,
    slug: "executive-boardroom-av",
    title: "Executive Boardroom AV",
    category: "Corporate Installation",
    location: "Islamabad, Pakistan",
    image: "/corporate-boardroom-premium-av-equipment-modern.jpg",
    description:
      "Professional-grade audiovisual setup with wireless presentation systems and automated room controls.",
    year: "2023",
    size: "800 sq ft",
  },
  {
    id: 4,
    slug: "riverside-residence",
    title: "Riverside Residence",
    category: "Home Automation",
    location: "Dubai, UAE",
    image: "/luxury-home-theater-cinematic-lighting.jpg",
    description:
      "A seamless blend of technology and design, featuring automated shades, lighting scenes, and multi-room audio.",
    year: "2024",
    size: "5,000 sq ft",
  },
]

export const projectLibraries: {
  commercial: Project[]
  residential: Project[]
} = {
  commercial: allProjects.filter((project) => project.id === 1 || project.id === 2),
  residential: allProjects.filter((project) => project.id === 3 || project.id === 4),
}
