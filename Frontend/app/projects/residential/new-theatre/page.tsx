import { ProjectCaseStudyPage, TheatreInstallLink } from "@/components/project-case-study-page"

export default function NewTheatrePage() {
  return (
    <ProjectCaseStudyPage
      title="Emerald Private Cinema"
      coverImage="/Pictures Final/Projects/Residential/New_Theatre/Cover.JPG"
      coverImageAlt="Emerald Private Cinema in Karachi — dedicated home theater with leather recliners, stepped risers, and acoustic wall finishes"
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
      galleryImageAlts={[
        "Front stage of Emerald Private Cinema with a large projection screen, flanking speakers, and a star ceiling",
        "Stepped carpeted risers with under-step lighting leading to a concealed equipment rack beside leather recliners",
        "Acoustic diffuser wall panel above leather cinema recliners in the Emerald Private Cinema",
        "Star ceiling over the projection screen in the Emerald Private Cinema",
        "Quilted leather cinema recliners with cup holders in the Emerald Private Cinema",
        "Perforated acoustic feature wall with edge lighting at the side of the Emerald Private Cinema",
        "View from the recliners toward the Emerald Private Cinema screen with concealed speakers",
        "Two rows of leather recliners in the Emerald Private Cinema, with acoustic panels and a lit feature wall",
        "Looking forward through the Emerald Private Cinema seating toward the acoustic rear wall",
      ]}
      description={[
        "Emerald Private Cinema is a dedicated residential cinema in Karachi — a darker, more focused viewing room with acoustic detailing, controlled lighting, and a clean front-stage presentation.",
        "The room is installed as a complete entertainment space: large-format visuals, immersive audio, and infrastructure concealed in the architecture so the finish stays quiet and the screen holds attention.",
        "Stepped recliner rows keep sightlines clear. Acoustic wall treatments and a controlled ceiling take the ring out of the room, which is what separates a cinema that looks finished from one that actually plays like a cinema.",
        <>
          Picture and sound are calibrated to this space after the room is built. That is the same process we use for{" "}
          <TheatreInstallLink /> across dedicated residential cinemas: survey the room, hide the wiring, finish the
          envelope, and tune what you see and hear.
        </>,
      ]}
      breadcrumb="Home / Projects / Residential / Emerald Private Cinema"
    />
  )
}
