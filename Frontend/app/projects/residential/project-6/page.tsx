import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project6Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 6"
      coverImage="/Pictures Final/Projects/Residential/project_6/img_1.webp"
      coverImageAlt="Project 6 main image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/project_6/img_2.webp",
        "/Pictures Final/Projects/Residential/project_6/img_3.webp",
        "/Pictures Final/Projects/Residential/project_6/img_4.webp",
      ]}
      description={[
        "Project 6 is a residential cinema environment shaped around a darker material palette, layered detailing, and a clear focus on immersive comfort. The room is intended to feel premium and composed while keeping the technology visually controlled within the architecture.",
        "The screen, audio system, lighting, and seating are coordinated within the architecture to maintain a clean finish and a focused viewing environment.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 6"
    />
  )
}
