import {
  CaseStudyLink,
  cinemaInstallerArticleHref,
  ProjectCaseStudyPage,
  TheatreInstallLink,
} from "@/components/project-case-study-page"

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
        "Karachi home theater / home cinema installation — finished residential room.",
        "Project Platinum is a residential cinema in Karachi shaped around a premium viewing experience — clean detailing, an elevated entertainment atmosphere, and equipment placed so the room still feels composed.",
        "The install keeps technology discreet. Projector, speakers, and cabling sit where they belong; controlled lighting and stepped seating do the visual work without turning the room into a rack of hardware.",
        "Two rows of recliners balance comfort, circulation, and a clear view of the screen. Acoustic surfaces and a calm lighting scheme support the picture rather than competing with it.",
        "Once the envelope is finished, picture and sound are calibrated to the room. For a dedicated cinema like this, that is the core of the install.",
      ]}
      sections={[
        {
          heading: "What this room needed",
          paragraphs: [
            "The room had to play as a cinema without looking like a showroom floor. Projector, speakers, and cabling needed a home in the architecture so the star ceiling, cove lighting, and wood-edged risers could stay the visual language. Two recliner rows plus a rear bar wall meant sightlines and circulation were part of the brief, not a later furniture pass.",
          ],
        },
        {
          heading: "How the install shows up",
          paragraphs: [
            "Concealment first: the projector sits discreetly, speakers flank the screen, wiring does not show. Calibration second: once the envelope is closed, picture and sound are matched to this room rather than left on a factory preset. That is the Platinum proof — a composed Karachi cinema, not a rack on display.",
          ],
        },
        {
          heading: "Survey → design → install on this room",
          paragraphs: [
            "Survey locked the projector niche and wood-edged riser geometry before paint, so the star ceiling and cove lighting could stay the visual language. Design locked two recliner rows and circulation to the rear bar wall. Install hid the kit — discreet projector, speakers flanking the screen, wiring out of sight. Once the envelope was finished, picture and sound were calibrated to the main seat.",
          ],
        },
        {
          heading: "Explore more",
          paragraphs: [
            <>
              This room is one finished example of{" "}
              <TheatreInstallLink>home cinema installation in Karachi</TheatreInstallLink>. The
              sequence behind it — design, hide the work, calibrate — is the{" "}
              <CaseStudyLink href={cinemaInstallerArticleHref}>
                home cinema installer process for Karachi rooms
              </CaseStudyLink>
              . For a livable media-room counterpart, see{" "}
              <CaseStudyLink href="/projects/residential/residency">
                Residency Private Cinema
              </CaseStudyLink>
              .
            </>,
          ],
        },
      ]}
      breadcrumb="Home / Projects / Residential / Project Platinum"
    />
  )
}
