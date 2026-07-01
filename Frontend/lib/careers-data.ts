export type Position = {
  id: number
  slug: string
  title: string
  location: "Lahore" | "Karachi"
  description: string
}

export const positions: Position[] = [
  {
    id: 1,
    slug: "accounts-engineer",
    title: "Accounts Engineer",
    location: "Karachi",
    description:
      "Work across project accounting, vendor coordination, billing records, and financial reporting for premium residential and commercial installations.",
  },
  {
    id: 2,
    slug: "av-installation-engineer",
    title: "AV Installation Engineer",
    location: "Lahore",
    description:
      "Install, test, and hand over theatre, audio, networking, and automation systems with careful attention to finish quality and client experience.",
  },
  {
    id: 3,
    slug: "project-engineer",
    title: "Project Engineer",
    location: "Karachi",
    description:
      "Coordinate site execution, documentation, timelines, and technical teams from first survey through commissioning and client handover.",
  },
  {
    id: 4,
    slug: "control-systems-engineer",
    title: "Control Systems Engineer",
    location: "Lahore",
    description:
      "Configure smart home control systems, lighting scenes, automation flows, and device integrations for high-end residential spaces.",
  },
  {
    id: 5,
    slug: "network-engineer",
    title: "Network Engineer",
    location: "Karachi",
    description:
      "Design and deploy reliable wired and wireless networks that support AV, security, automation, and streaming performance.",
  },
  {
    id: 6,
    slug: "acoustic-design-engineer",
    title: "Acoustic Design Engineer",
    location: "Lahore",
    description:
      "Support room planning, speaker placement, acoustic treatments, and calibration decisions for cinema and listening environments.",
  },
  {
    id: 7,
    slug: "site-engineer",
    title: "Site Engineer",
    location: "Karachi",
    description:
      "Manage on-site installation details, contractor coordination, drawings, snag lists, and quality checks across active projects.",
  },
  {
    id: 8,
    slug: "lighting-control-engineer",
    title: "Lighting Control Engineer",
    location: "Lahore",
    description:
      "Program lighting keypads, dimming modules, scene logic, and integrated control experiences for homes and commercial spaces.",
  },
  {
    id: 9,
    slug: "service-engineer",
    title: "Service Engineer",
    location: "Karachi",
    description:
      "Diagnose, maintain, and upgrade installed systems while keeping client communication clear and response times dependable.",
  },
  {
    id: 10,
    slug: "automation-engineer",
    title: "Automation Engineer",
    location: "Lahore",
    description:
      "Build automation experiences that connect lighting, climate, audio, video, security, and control platforms into one reliable system.",
  },
]
