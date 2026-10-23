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
  "Wah Cantt": "Planned, solidly built homes give us good rooms to work with. We design, install and calibrate inside them.",
  Attock: "Hot summers by the Indus mean we plan quiet ventilation for the equipment before we install.",
  Jhelum: "We survey the room, then design the screen, seats and speakers around it and hide the wiring.",
  Chakwal: "Homes on the Potohar plateau come in many shapes, so every design starts with a site survey.",
  "Mandi Bahauddin": "We survey the room, plan seating and screen size, then install with concealed cabling and calibrate.",
  Mianwali: "Long, hot summers shape the plan. We keep the equipment cool and quiet, then calibrate picture and sound.",
  Gujrat: "A city of furniture makers. We design seating and acoustic panels to suit the room, then install them.",
  Khushab: "Near the Salt Range. We survey the room for light and sound leaks, then design and install around it.",
  Gujranwala: "Large family houses often have a spare hall or basement. We help choose the room, then design and build it in.",
  Narowal: "We survey the room, design the cinema around it, install with hidden wiring and calibrate from your seats.",
  Sargodha: "Citrus country with spacious homes. We size the screen and seating to the room, then install and calibrate.",
  Hafizabad: "We plan the room's light control and acoustics first, then install the system and calibrate it.",
  Chiniot: "Famous for carved woodwork. We can blend panels and seating with the wood already in the house.",
  Sheikhupura: "We survey the room, design for its size and shape, install with concealed wiring and calibrate on site.",
  Bhakkar: "On the edge of the Thal desert, the room has to keep out heat, light and dust before the cinema goes in.",
  "Nankana Sahib": "We survey the room, design for its size and shape, then install and calibrate on site.",
  Jhang: "Hot summers and bright days: we plan blackout and a cool, quiet equipment space, then install.",
  Kasur: "We survey the room, design the cinema, hide the wiring and calibrate picture and sound.",
  "Toba Tek Singh": "Farmhouses and city homes alike: we pick the right room, then design, install and calibrate it.",
  Layyah: "Thal desert heat and dust shape the plan: a sealed room, cool equipment, then a careful calibration.",
  Okara: "We plan the screen, seats and speakers for the room you have, then install with hidden cabling.",
  Sahiwal: "We check light, sound leaks and the structure, then design and install the room.",
  Pakpattan: "Every room starts with a survey. Then we design, install and calibrate from the seats you will use.",
  Khanewal: "A railway junction city, so we check rooms for outside noise before we design the isolation.",
  Burewala: "Cotton-belt heat means we plan ventilation for the equipment, then install and calibrate.",
  Muzaffargarh: "Between the Chenab and the Indus, summers are hot, so we plan cooling and blackout from the start.",
  "Dera Ghazi Khan": "Under the Suleman range, heat and dust lead the plan: a sealed room, cool equipment, careful calibration.",
  Vehari: "In the cotton belt. We design the room for its size, install with concealed wiring and calibrate.",
  Bahawalnagar: "Near Cholistan, rooms need to keep out heat and grit. We seal them, then install and calibrate.",
  Rajanpur: "Summers are long and hot, so we plan cooling and blackout before we install anything.",
  "Rahim Yar Khan": "Long hot summers mean blackout, sealing and cool equipment space come first, then calibration.",
}

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
