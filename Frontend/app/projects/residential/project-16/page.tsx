import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project16Page() {
  return (
    <ProjectCaseStudyPage
      title="Dark Immersive Cinema"
      coverImage="/Pictures Final/Projects/Residential/project_16/img_1.jpg"
      coverImageAlt="Dark Immersive Cinema main image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/project_16/img_2.webp",
        "/Pictures Final/Projects/Residential/project_16/img_3.jpg",
        "/Pictures Final/Projects/Residential/project_16/img_4.jpg",
        "/Pictures Final/Projects/Residential/project_16/img_5.jpg",
      ]}
      description={[
        "Dark Immersive Cinema is a residential cinema installation designed with a darker, more immersive atmosphere and a clear emphasis on comfort. Seating, finishes, and lighting work together to create a room that feels composed, premium, and focused on the viewing experience.",
        "Equipment and cabling are integrated discreetly so the dark palette, layered finishes, and seating remain the visual focus of the room.",
      ]}
      breadcrumb="Home / Projects / Residential / Dark Immersive Cinema"
    />
  )
}
