import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function NewTheatrePage() {
  return (
    <ProjectCaseStudyPage
      title="New Theatre"
      coverImage="/Pictures%20Final/Projects/Residential/New_Theatre/Cover.JPG"
      coverImageAlt="New Theatre main image"
      galleryImages={[
        "/Pictures%20Final/Projects/Residential/New_Theatre/Theatre.JPG",
        "/Pictures%20Final/Projects/Residential/New_Theatre/DSC09622.JPG",
        "/Pictures%20Final/Projects/Residential/New_Theatre/DSC09639.JPG",
        "/Pictures%20Final/Projects/Residential/New_Theatre/DSC09650.JPG",
        "/Pictures%20Final/Projects/Residential/New_Theatre/DSC09743.JPG",
        "/Pictures%20Final/Projects/Residential/New_Theatre/image.png",
        "/Pictures%20Final/Projects/Residential/New_Theatre/image%20copy.png",
        "/Pictures%20Final/Projects/Residential/New_Theatre/image2.png",
        "/Pictures%20Final/Projects/Residential/New_Theatre/After.png",
      ]}
      description={[
        "New Theatre is a dedicated residential cinema built around a darker, more focused viewing environment with acoustic detailing, controlled lighting, and a clean front-stage presentation.",
        "The room is presented as a complete entertainment space, balancing large-format visuals, immersive audio, concealed infrastructure, and a polished finish that keeps attention on the screen.",
      ]}
      breadcrumb="Home / Projects / Residential / New Theatre"
    />
  )
}
