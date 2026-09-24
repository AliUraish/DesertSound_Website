import { ProjectCaseStudyPage, TheatreInstallLink } from "@/components/project-case-study-page"

export default function ResidencyPage() {
  return (
    <ProjectCaseStudyPage
      title="Residency Private Cinema"
      coverImage="/Pictures Final/Projects/Residential/Red&White/Cover.JPG"
      coverImageAlt="Residency Private Cinema in Karachi — large projection screen, acoustic walls, and leather seating in a dedicated media room"
      coverImageClassName="w-full aspect-[3/2] md:aspect-auto md:h-[58vh] object-cover object-[50%_15%] lg:h-[68vh]"
      galleryImages={[
        "/Pictures Final/Projects/Residential/Red&White/IMG_9563.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9699.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9709.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9724.JPG",
        "/Pictures Final/Projects/Residential/Red&White/IMG_9737.JPG",
      ]}
      galleryImageAlts={[
        "Acoustic wall treatment with integrated speakers in the Residency Private Cinema",
        "Ceiling-mounted projector and cove lighting in the Residency Private Cinema",
        "Film playing on the Residency Private Cinema screen in a darkened room",
        "Residency Private Cinema seating with recliners, sofa, acoustic panels, and a projector",
        "Side view of the Residency Private Cinema showing recliners, sofa, and acoustic wall finishes",
      ]}
      description={[
        "Residency Private Cinema is a Karachi residential cinema built for immersive viewing without losing a welcoming, livable atmosphere — comfort first, with a strong cinematic presence throughout the room.",
        "Lighting, sound, and display are integrated so the space stays refined. Acoustic wall finishes and a large-format screen carry the cinema character; the technology stays discreet in the architecture.",
        "Seating is arranged as a media room people actually use: recliners and a sofa, a clean finish, and a layout that still feels residential when the film is over.",
        <>
          The install still follows a proper cinema process — hidden wiring, acoustic control, and calibration of
          picture and sound. That is how we approach <TheatreInstallLink /> in dedicated rooms and media rooms alike.
        </>,
      ]}
      breadcrumb="Home / Projects / Residential / Residency Private Cinema"
    />
  )
}
