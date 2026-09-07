export type Position = {
  id: number
  slug: string
  title: string
  location: "Lahore" | "Karachi"
  department: string
  employmentType: "Full-time"
  experience: string
  description: string
  overview: string[]
  responsibilities: string[]
  qualifications: string[]
  preferredQualifications: string[]
  whatWeOffer: string[]
}

export const positions: Position[] = [
  {
    id: 1,
    slug: "senior-software-engineer",
    title: "Senior Software Engineer",
    location: "Karachi",
    department: "Technology",
    employmentType: "Full-time",
    experience: "5+ years",
    description:
      "Lead the design and delivery of reliable software that powers Desert Sound's digital customer experience, internal operations, and connected-technology workflows.",
    overview: [
      "Desert Sound creates premium home theatre, automation, audio, networking, and lighting experiences. We are looking for a senior engineer who can turn complex business and technical requirements into software that feels simple, dependable, and carefully crafted.",
      "You will own meaningful projects from discovery through production, make sound architectural decisions, raise engineering standards, and work closely with business and technical teams. This is a hands-on role for someone who is equally comfortable shaping a solution and shipping the details.",
    ],
    responsibilities: [
      "Design, build, test, deploy, and maintain production-grade web applications and services.",
      "Translate operational and customer needs into clear technical plans, milestones, and resilient implementations.",
      "Own system architecture, data models, APIs, integrations, observability, performance, and security for assigned products.",
      "Improve engineering quality through thoughtful reviews, automated testing, documentation, and pragmatic standards.",
      "Diagnose production issues methodically and strengthen systems based on what you learn.",
      "Mentor engineers, communicate trade-offs clearly, and collaborate effectively with non-technical stakeholders.",
      "Evaluate new technologies with discipline and introduce them when they create measurable value.",
    ],
    qualifications: [
      "5+ years of professional software engineering experience, including ownership of production systems.",
      "Strong proficiency in TypeScript or JavaScript and modern web application architecture.",
      "Experience building APIs, working with relational databases, and designing reliable integrations.",
      "A practical command of testing, source control, CI/CD, monitoring, debugging, and secure development practices.",
      "Evidence of making sound technical decisions under real product, time, and operational constraints.",
      "Excellent written and verbal communication, with the ability to explain complex ideas precisely.",
      "A portfolio, GitHub profile, case study, or other example of previous work you can discuss.",
    ],
    preferredQualifications: [
      "Experience with React, Next.js, Node.js, PostgreSQL, and cloud deployment platforms.",
      "Experience integrating third-party services, automation platforms, IoT systems, or internal business tools.",
      "A strong eye for product quality, usability, accessibility, and performance.",
      "Experience guiding technical direction or mentoring other engineers.",
    ],
    whatWeOffer: [
      "High ownership over important systems and the technical direction behind them.",
      "Direct collaboration with decision-makers and teams close to the customer experience.",
      "A quality-focused environment where reliability, craft, and thoughtful execution matter.",
      "Room to shape engineering practices and grow with the technology function.",
    ],
  },
]
