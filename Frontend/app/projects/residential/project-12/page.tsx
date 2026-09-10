import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project12Page() {
  return (
    <ProjectCaseStudyPage
      title="Warm-Contrast Residential Cinema"
      coverImage="/Pictures Final/Projects/Residential/project_12/img_1.jpg"
      coverImageAlt="Warm-Contrast Residential Cinema main image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/project_12/img_2.jpg",
        "/Pictures Final/Projects/Residential/project_12/img_3.jpg",
        "/Pictures Final/Projects/Residential/project_12/img_4.jpg",
      ]}
      description={[
        "Warm-Contrast Residential Cinema is a residential cinema presentation shaped around warm contrast, controlled lighting, and a clean entertainment-focused layout. The space is intended to feel visually composed and comfortable while maintaining the sense of focus expected from a dedicated media room.",
        "Integrated audiovisual equipment and controlled lighting support an immersive experience without distracting from the room's warm materials and balanced composition.",
      ]}
      breadcrumb="Home / Projects / Residential / Warm-Contrast Residential Cinema"
    />
  )
}
