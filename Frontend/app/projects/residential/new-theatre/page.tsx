import { ProjectCaseStudyPage } from "@/components/project-case-study-page"

export default function NewTheatrePage() {
  return (
    <ProjectCaseStudyPage
      title="Emerald Private Cinema"
      coverImage="/Pictures Final/Projects/Residential/New_Theatre/Cover.JPG"
      coverImageAlt="Emerald Private Cinema main image"
      galleryImages={[
        "/Pictures Final/Projects/Residential/New_Theatre/Theatre.JPG",
        "/Pictures Final/Projects/Residential/New_Theatre/DSC09622.JPG",
        "/Pictures Final/Projects/Residential/New_Theatre/DSC09639.JPG",
        "/Pictures Final/Projects/Residential/New_Theatre/DSC09650.JPG",
        "/Pictures Final/Projects/Residential/New_Theatre/DSC09743.JPG",
        "/Pictures Final/Projects/Residential/New_Theatre/image.jpg",
        "/Pictures Final/Projects/Residential/New_Theatre/image copy.jpg",
        "/Pictures Final/Projects/Residential/New_Theatre/image2.jpg",
        "/Pictures Final/Projects/Residential/New_Theatre/After.jpg",
      ]}
      description={[
        "Emerald Private Cinema is a dedicated residential cinema built around a darker, more focused viewing environment with acoustic detailing, controlled lighting, and a clean front-stage presentation.",
        "The room is presented as a complete entertainment space, balancing large-format visuals, immersive audio, concealed infrastructure, and a polished finish that keeps attention on the screen.",
      ]}
      breadcrumb="Home / Projects / Residential / Emerald Private Cinema"
    />
  )
}
