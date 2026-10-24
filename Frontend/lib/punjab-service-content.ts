import type { RankingSeoPage } from "./ranking-seo-types"

export const punjabServicePath = "/service/home-cinema-installation-punjab"

export const punjabServiceTitle = "Home Cinema Installation in Punjab"
export const punjabServiceH1 = "Home Cinema Installation in Punjab"
export const punjabServiceDescription =
  "Home cinema installation in Punjab from Desert Sound. Lahore, Faisalabad, Multan, Sialkot and Bahawalpur: survey, design, install and calibrate on site."

export type PunjabCityCard = {
  key: "Lahore" | "Faisalabad" | "Multan" | "Sialkot" | "Bahawalpur"
  name: string
  href: string
  /** What we do there and how. */
  about: string
  /** Shown before "You can contact us." */
  note: string
}

// Cards inside the Punjab map: the city name links to its page, then a short line and a contact line.
export const punjabCityCards: readonly PunjabCityCard[] = [
  {
    key: "Lahore",
    name: "Lahore",
    href: "/service/home-cinema-installation-lahore",
    about: "Older city houses and new builds both work. We survey the room, design the cinema around it, hide the wiring and calibrate.",
    note: "We have a team in Lahore.",
  },
  {
    key: "Faisalabad",
    name: "Faisalabad",
    href: "/service/home-cinema-installation-faisalabad",
    about: "Family compounds are common, so we help pick the right room first, then design, install and calibrate it.",
    note: "",
  },
  {
    key: "Multan",
    name: "Multan",
    href: "/service/home-cinema-installation-multan",
    about: "Bright afternoons and pre-monsoon dust decide where the screen and equipment go. We plan for both, then install.",
    note: "",
  },
  {
    key: "Sialkot",
    name: "Sialkot",
    href: "/service/home-cinema-installation-sialkot",
    about: "Close-set old-city houses make sound isolation an early question, so we survey for leaks before we design.",
    note: "",
  },
  {
    key: "Bahawalpur",
    name: "Bahawalpur",
    href: "/service/home-cinema-installation-bahawalpur",
    about: "On the edge of Cholistan, the room has to keep out daylight and grit. We seal it, then install and calibrate.",
    note: "",
  },
]

export const punjabCityCopy = punjabCityCards
  .map((city) => `[${city.name}](${city.href})\n${city.about} ${city.note ? `${city.note} ` : ""}You can contact us.`)
  .join("\n\n")

// Punjab towns without a page of their own: a short line on what we do, then contact.
export const punjabTownContact = { text: "Contact us", href: "/contact-us" } as const

export const punjabTownAbout: Record<string, string> = {
  Rawalpindi: "Older houses sit beside new extensions, so we check walls and roofs for sound leaks before we design the room.",
  "Wah Cantt": "Planned streets and newer homes give us room to work. We design, install and calibrate inside them.",
  Attock: "Hot summers by the Indus mean we plan quiet ventilation for the equipment before we install.",
  Jhelum: "Monsoon damp is a real question by the river, so we keep the rack and speakers off damp walls, then design and install.",
  Chakwal: "Homes on the Potohar plateau come in many shapes, so every design starts with a site survey.",
  "Mandi Bahauddin": "If the house is still being built, we mark speaker and screen positions and lay conduit before plastering, so no finished wall is cut open later.",
  Mianwali: "If you want to add height speakers or a second subwoofer later, we leave spare conduit now, so an upgrade does not mean opening the walls again.",
  Gujrat: "A city of furniture makers. We design seating and acoustic panels to suit the room, then install them.",
  Khushab: "Near the Salt Range. We survey the room for light and sound leaks, then design and install around it.",
  Gujranwala: "Large family houses often have a spare hall or basement. We help choose the room, then design and build it in.",
  Narowal: "In shared family houses, we check how sound carries between rooms before we design the isolation.",
  Sargodha: "Citrus country with spacious homes. We size the screen and seating to the room, then install and calibrate.",
  Hafizabad: "We plan the room's light control and acoustics first, then install the system and calibrate it.",
  Chiniot: "Famous for carved woodwork. We can blend panels and seating with the wood already in the house.",
  Sheikhupura: "Daytime viewing often matters, so we plan blinds, wall colour and the screen for the light, then install.",
  Bhakkar: "On the edge of the Thal desert, the room has to keep out heat, light and dust before the cinema goes in.",
  "Nankana Sahib": "Many families want one room for films and for guests, so we design a lounge cinema that still works as a sitting room.",
  Jhang: "We place the subwoofer and the seats together, so bass stays even at every seat instead of booming in one corner, then measure and calibrate.",
  Kasur: "Power cuts are part of the plan, so the survey includes advice on UPS or generator backup before we design and install.",
  "Toba Tek Singh": "We check the room's power on the survey and plan a separate circuit for the cinema, away from pumps and AC units, before we install.",
  Layyah: "In-wall speakers need walls that can be opened, so on the survey we decide between in-wall, on-wall and floor-standing speakers for each wall.",
  Okara: "We size the screen to how far the seats sit from it, then place the speakers and hide the cabling.",
  Sahiwal: "Where there are two rows of seats, we set the riser height so the back row sees the whole screen, then tune the sound for both rows.",
  Pakpattan: "Concrete roofs carry heat and sound, so we check the ceiling first, then design the room and calibrate it.",
  Khanewal: "A railway junction city, so we check rooms for outside noise before we design the isolation.",
  Burewala: "Cotton-belt heat means we plan ventilation for the equipment, then install and calibrate.",
  Muzaffargarh: "Between the Chenab and the Indus, summers are hot, so we plan cooling and blackout from the start.",
  "Dera Ghazi Khan": "Under the Suleman range, heat and dust lead the plan: a sealed room, cool equipment, careful calibration.",
  Vehari: "High ceilings and hard floors echo, so we plan acoustic panels and soft finishes before the system goes in.",
  Bahawalnagar: "Near Cholistan, grit finds its way into vents, so we put the equipment where its filters and fans can be reached for cleaning.",
  Rajanpur: "A projector or a large TV depends on the room's size and how dark it can get, so we measure both on the survey before we suggest either.",
  "Rahim Yar Khan": "One remote should run the room, so we plan lights, screen and sound on a single control scene before we install.",
}

// Lander cities already have their own pages. The other-towns section skips them.
export const punjabLanderTownNames = [
  "Lahore",
  "Islamabad",
  "Multan",
  "Faisalabad",
  "Sialkot",
  "Bahawalpur",
] as const

const punjabLanderTownSet = new Set<string>(punjabLanderTownNames)

export const punjabOtherTownsHeading = "Other Punjab towns we visit"

export const punjabOtherTownsLead =
  "Outside the cities with their own pages, these are other Punjab towns we can visit for home cinema projects, and each one starts with the same site visit."

// Same short lines the map hover cards use. One list, so the section and the cards cannot drift.
export const punjabOtherTowns = Object.entries(punjabTownAbout)
  .filter(([name]) => !punjabLanderTownSet.has(name))
  .map(([name, about]) => ({ name, about }))

export const punjabOtherTownsSection = [
  `### ${punjabOtherTownsHeading}`,
  "",
  punjabOtherTownsLead,
  "",
  punjabOtherTowns.map(({ name, about }) => `- **${name}.** ${about}`).join("\n"),
].join("\n")

export const punjabServicePage: RankingSeoPage = {
  slug: punjabServicePath,
  title: punjabServiceTitle,
  description: punjabServiceDescription,
  h1: punjabServiceH1,
  body: `Desert Sound is a Karachi home cinema company, and this page covers our work in Punjab. Pick your city on the map for the local detail. Wherever the house is, a project runs in one order. We survey the room, design the theatre for it, build it in with the wiring hidden, and calibrate picture and sound from the seats you will use.

Every Punjab project starts with a site visit. Ask for one on our [contact page](/contact-us).

### One method for every Punjab home

For home theatre installation in Punjab, the steps never change from city to city: survey, design, installation with concealed cabling and power, then calibration. The full scope is on [home theater / home cinema design and installation in Pakistan](/service/home-theatre-design-and-installation), and the questions worth putting to any installer are in [what a cinema installer in Pakistan actually does](/home-cinema-and-cinema-installer-pakistan).

Our finished rooms, under [finished residential theatres](/projects/residential), are all Karachi homes. We show them as Karachi work, never as Punjab projects.

${punjabOtherTownsSection}

### Book a Punjab site visit

Tell us your city, your area and the room you have in mind through our [contact page](/contact-us), and we will come back with a visit date.`,
  faqs: [
    {
      q: "Do you install home cinemas in Punjab?",
      a: "Yes. We have a team in Lahore, and for Faisalabad, Multan, Sialkot and Bahawalpur our team travels from Karachi. Every project follows the same order: survey, design, install, calibrate.",
    },
    {
      q: "Does Desert Sound have an office in Punjab?",
      a: "Desert Sound is based in Karachi. We have a team in Lahore. We have no office or showroom in Faisalabad, Multan, Sialkot or Bahawalpur, and we serve those cities on site visits.",
    },
    {
      q: "Which Punjab cities do you cover?",
      a: "Lahore, Faisalabad, Multan, Sialkot and Bahawalpur each have their own page, linked above. For another Punjab city, ask us and we will confirm whether a visit is possible.",
    },
    {
      q: "What happens on a Punjab site visit?",
      a: "We look at light, sound leaks and the structure, set the seats, screen and speakers, and plan hidden wiring and power. Installation and calibration follow once the design is agreed.",
    },
    {
      q: "How do I book a survey in Punjab?",
      a: "Send your city, area and room through our [contact page](/contact-us). We will confirm the visit date.",
    },
  ],
  links: [
    {
      label: "home cinema installation in Lahore",
      href: "/service/home-cinema-installation-lahore",
    },
    {
      label: "home cinema installation in Faisalabad",
      href: "/service/home-cinema-installation-faisalabad",
    },
    {
      label: "home cinema installation in Multan",
      href: "/service/home-cinema-installation-multan",
    },
    {
      label: "home cinema installation in Sialkot",
      href: "/service/home-cinema-installation-sialkot",
    },
    {
      label: "home cinema installation in Bahawalpur",
      href: "/service/home-cinema-installation-bahawalpur",
    },
    {
      label: "home theater / home cinema design and installation in Pakistan",
      href: "/service/home-theatre-design-and-installation",
    },
    {
      label: "what a cinema installer in Pakistan actually does",
      href: "/home-cinema-and-cinema-installer-pakistan",
    },
    {
      label: "finished residential theatres",
      href: "/projects/residential",
    },
    {
      label: "contact page",
      href: "/contact-us",
    },
  ],
}

export function punjabFaqJsonLdItems() {
  return punjabServicePage.faqs.map((faq) => ({
    question: faq.q,
    answer: faq.a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
  }))
}
