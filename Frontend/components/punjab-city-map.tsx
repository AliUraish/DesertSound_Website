import { punjabCityCards, punjabTownAbout, punjabTownContact } from "@/lib/punjab-service-content"
import { punjabMapPoints, punjabMapTowns } from "@/lib/punjab-map-geometry"
import { PunjabMapScene, type MapLocation, type MapSide } from "@/components/punjab-map-scene"

// Label side per place, chosen so neighbouring labels never sit on top of each other.
const sides: Record<string, MapSide> = {
  Sialkot: "above",
  Multan: "above",
  Faisalabad: "left",
  Chiniot: "left",
  Gujrat: "left",
  Gujranwala: "above",
  Sahiwal: "left",
  Attock: "left",
  Mianwali: "left",
  Chakwal: "left",
  Khushab: "left",
  Bhakkar: "left",
  Layyah: "left",
  Rajanpur: "left",
  Jhang: "left",
  "Toba Tek Singh": "left",
  Vehari: "left",
  "Rahim Yar Khan": "left",
  Sheikhupura: "left",
  "Mandi Bahauddin": "left",
  "Dera Ghazi Khan": "left",
  Muzaffargarh: "below",
  "Nankana Sahib": "below",
}

// Every place is the same kind of pin. Cities with a page link to it; the rest only offer contact.
const cityLocations = punjabCityCards.map((card) => ({
  key: card.key,
  name: card.name,
  x: punjabMapPoints[card.key].x,
  y: punjabMapPoints[card.key].y,
  href: card.href as string | null,
  about: card.about,
  note: card.note,
  contactHref: punjabTownContact.href,
}))

const townLocations = punjabMapTowns.map((town) => ({
  key: town.name,
  name: town.name,
  x: town.x,
  y: town.y,
  href: null as string | null,
  about: punjabTownAbout[town.name] ?? "",
  note: "",
  contactHref: punjabTownContact.href,
}))

const locations: MapLocation[] = [...cityLocations, ...townLocations]
  .sort((a, b) => a.y - b.y)
  .map((place) => ({ ...place, side: sides[place.name] ?? "right" }))

// A still 3D scene in Three.js; nothing on the map moves on its own.
// The flat drawing only shows if WebGL is unavailable.
const css = `
  .pm { --pm-brown: #7A5230; --pm-ink: #2B1D10; }
  .pm-canvas { opacity: 0; }
  .pm-fallback { opacity: 0; }
  .pm[data-gl="off"] .pm-fallback { opacity: 1; }
  .pm-fb-fill { fill: rgba(122,82,48,.1); }
  .pm-fb-line { fill: none; stroke: var(--pm-brown); stroke-width: 2.2; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
  .pm-city { opacity: 0; }
  .pm[data-gl="on"] .pm-city, .pm[data-gl="off"] .pm-city { opacity: 1; }
  .pm-card { opacity: 0; pointer-events: none; }
  .pm-city:hover, .pm-city:focus-within { z-index: 30; }
  .pm-city:hover .pm-card, .pm-city:focus-within .pm-card { opacity: 1; pointer-events: auto; }
  @media (hover: none) { .pm-link .pm-card { display: none; } }
`

export function PunjabCityMap() {
  return (
    <figure className="pm mt-6 md:mt-8" data-gl="pending">
      <style>{css}</style>
      <PunjabMapScene locations={locations} />
      <figcaption className="mx-auto mt-6 max-w-[680px] text-center text-[10px] font-light text-black/30">
        Boundaries: geoBoundaries, CC BY 4.0
      </figcaption>
    </figure>
  )
}
