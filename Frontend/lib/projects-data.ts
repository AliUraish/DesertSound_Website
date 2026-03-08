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
    id: 5,
    slug: "studio-vellari",
    title: "Studio Vellari",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/vellari1.png",
    description:
      "Flagship Desert Sound cinema seating project featuring Studio Vellari Stanley recliners and daybed.",
    year: "2024",
    size: "Flagship Installation",
  },
  {
    id: 6,
    slug: "cafe-flow",
    title: "Cafe Flow",
    category: "Commercial Hospitality",
    location: "Karachi, Pakistan",
    image: "/Cafe_Flow/Cover.JPG",
    description:
      "A refined hospitality AV environment designed to balance ambience, presentation clarity, and an immersive guest experience.",
    year: "2024",
    size: "Full Venue Installation",
  },
  {
    id: 7,
    slug: "xanders",
    title: "Xanders",
    category: "Commercial Installation",
    location: "Karachi, Pakistan",
    image: "/Xander%27s/Cover.JPG",
    description:
      "A placeholder commercial case study featuring a design-led space, integrated AV, and a refined presentation experience.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 8,
    slug: "crossfit",
    title: "Crossfit Gym",
    category: "Commercial Fitness",
    location: "Karachi, Pakistan",
    image: "/Gym/Cover.JPG",
    description:
      "A placeholder fitness-focused commercial case study with integrated AV, strong atmosphere, and a clean presentation flow.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 9,
    slug: "residency",
    title: "Residency",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/spiderman/Cover.JPG",
    description:
      "A placeholder residential case study focused on immersive viewing, refined comfort, and a clean technology integration.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 10,
    slug: "project-2",
    title: "Project 2",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/projects_desert/project_2/Cover.jpg",
    description:
      "A placeholder residential case study focused on comfort, immersive viewing, and a balanced design language.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 11,
    slug: "project-5",
    title: "Project 5",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/projects_desert/project_5/Cover.webp",
    description:
      "A placeholder residential case study built around refined finishes, integrated AV, and a calm cinematic atmosphere.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 12,
    slug: "project-7",
    title: "Project 7",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/projects_desert/project_7/Cover.jpg",
    description:
      "A placeholder residential case study combining a polished interior mood with an immersive entertainment setup.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 13,
    slug: "project-9",
    title: "Project 9",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/projects_desert/project_9/Cover.jpg",
    description:
      "A placeholder residential case study centered on soft ambiance, practical comfort, and strong visual presentation.",
    year: "2024",
    size: "Featured Installation",
  },
  {
    id: 14,
    slug: "project-11",
    title: "Project 11",
    category: "Residential Cinema",
    location: "Karachi, Pakistan",
    image: "/projects_desert/project_11/Cover.jpg",
    description:
      "A placeholder residential case study designed to present a quiet, intimate setting with integrated cinematic performance.",
    year: "2024",
    size: "Featured Installation",
  },
]

export const projectLibraries: {
  commercial: Project[]
  residential: Project[]
} = {
  commercial: allProjects.filter((project) => project.id === 6 || project.id === 7 || project.id === 8),
  residential: allProjects.filter(
    (project) =>
      project.id === 5 ||
      project.id === 9 ||
      project.id === 10 ||
      project.id === 11 ||
      project.id === 12 ||
      project.id === 13 ||
      project.id === 14,
  ),
}
