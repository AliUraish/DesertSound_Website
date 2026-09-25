import { ProjectCaseStudyPage, TheatreInstallLink } from "@/components/project-case-study-page"

export default function ProjectPlatinumPage() {
  return (
    <ProjectCaseStudyPage
      title="Project Platinum"
      coverImage="/Pictures Final/Projects/Residential/Project_Platinum/Cover.jpg"
      coverImageAlt="Project Platinum in Karachi — residential cinema with two rows of recliners, a star ceiling, and a discreet projector"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Project_Platinum/image.jpg",
        "/Pictures Final/Projects/Residential/Project_Platinum/image copy 2.jpg",
      ]}
      galleryImageAlts={[
        "Looking toward the Project Platinum screen from the recliners, with a star ceiling and flanking speakers",
        "Project Platinum seating rows with wood-edged risers, cove lighting, and a rear bar wall",
      ]}
      description={[
        "Project Platinum is a residential cinema in Karachi shaped around a premium viewing experience — clean detailing, an elevated entertainment atmosphere, and equipment placed so the room still feels composed.",
        "The install keeps technology discreet. Projector, speakers, and cabling sit where they belong; controlled lighting and stepped seating do the visual work without turning the room into a rack of hardware.",
        "Two rows of recliners balance comfort, circulation, and a clear view of the screen. Acoustic surfaces and a calm lighting scheme support the picture rather than competing with it.",
        <>
          Once the envelope is finished, picture and sound are calibrated to the room. For a dedicated cinema like this,
          that is the core of our <TheatreInstallLink /> work.
        </>,
      ]}
      breadcrumb="Home / Projects / Residential / Project Platinum"
    />
  )
}
