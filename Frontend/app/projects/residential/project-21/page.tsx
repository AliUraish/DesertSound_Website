import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project21Page() {
  return (
    <ProjectCaseStudyPage
      title="Balanced-Contrast Home Cinema"
      coverImage="/Pictures Final/Projects/Residential/project_21/img_1.jpg"
      coverImageAlt="Balanced-Contrast Home Cinema main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_21/img_2.jpg", "/Pictures Final/Projects/Residential/project_21/img_3.jpg", "/Pictures Final/Projects/Residential/project_21/img_4.jpg"]}
      description={[
        "This private cinema is designed around tonal contrast, comfort, and a clean room layout that keeps the visual focus where it belongs. The space aims to feel composed and premium without losing its residential warmth.",
        "The technology is arranged around clear sightlines and balanced sound, allowing the room's finishes and seating to remain central to the experience.",
      ]}
      breadcrumb="Home / Projects / Residential / Balanced-Contrast Home Cinema"
    />
  )
}
