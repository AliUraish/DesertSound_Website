import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function Project15Page() {
  return (
    <ProjectCaseStudyPage
      title="Compact Star-Ceiling Cinema"
      coverImage="/Pictures Final/Projects/Residential/project_15/img_1.jpg"
      coverImageAlt="Compact Star-Ceiling Cinema main image"
      galleryImages={["/Pictures Final/Projects/Residential/project_15/img_2.webp", "/Pictures Final/Projects/Residential/project_15/img_3.jpg"]}
      description={[
        "Compact Star-Ceiling Cinema presents a compact residential entertainment room built around layered comfort, controlled lighting, and a refined cinema mood. The design direction aims to keep the room elegant and relaxed while supporting an immersive viewing experience.",
        "The compact footprint is used efficiently, with the screen, sound system, and seating arranged to make the room feel open, comfortable, and easy to enjoy.",
      ]}
      breadcrumb="Home / Projects / Residential / Compact Star-Ceiling Cinema"
    />
  )
}
