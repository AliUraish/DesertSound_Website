import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project16Page() {
  return (
    <ProjectCaseStudyPage
      title="Project 16"
      coverImage="/Pictures%20Final/Projects/Residential/project_16/img_1.jpg"
      coverImageAlt="Project 16 main image"
      galleryImages={[
        "/Pictures%20Final/Projects/Residential/project_16/img_2.webp",
        "/Pictures%20Final/Projects/Residential/project_16/img_3.jpg",
        "/Pictures%20Final/Projects/Residential/project_16/img_4.jpg",
        "/Pictures%20Final/Projects/Residential/project_16/img_5.jpg",
      ]}
      description={[
        "Project 16 is a residential cinema installation designed with a darker, more immersive atmosphere and a clear emphasis on comfort. Seating, finishes, and lighting work together to create a room that feels composed, premium, and focused on the viewing experience.",
        "The current copy is serving as a placeholder until the final project write-up is ready. Approved details can be dropped into the same format later, including design notes, equipment highlights, and any room-specific features.",
      ]}
      breadcrumb="Home / Projects / Residential / Project 16"
    />
  )
}
