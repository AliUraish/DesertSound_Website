import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project17Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 17"
      coverImage="/Pictures Final/Projects/Residential/project_17/img_1.jpg"
      coverImageAlt="Project 17 main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_17/img_2.jpg", "/Pictures Final/Projects/Residential/project_17/img_3.jpg"]}
      description={[
        "Project 17 highlights a private cinema room intended to feel intimate, practical, and visually resolved. The layout leans on clean composition and balanced finishes so the technology supports the space without overpowering it.",
        "A coordinated screen, sound, lighting, and control setup gives the room an immersive character while keeping the experience simple for everyday use.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 17"
    />
  )
}
