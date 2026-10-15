"use client"

import dynamic from "next/dynamic"
import { punjabCityCards } from "@/lib/punjab-service-content"
import { punjabMapPoints, punjabMapSize, punjabMapStage, punjabMapTowns } from "@/lib/punjab-map-geometry"
import type { MapLocation, MapSide } from "@/components/punjab-map-scene"

const PunjabMapScene = dynamic(
  () => import("@/components/punjab-map-scene").then((mod) => ({ default: mod.PunjabMapScene })),
  { ssr: false },
)

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

const { width: mapWidth, height: mapHeight } = punjabMapSize

// Cities with a page keep the same write-up as the visible body section.
const cityLocations = punjabCityCards.map((card) => ({
  key: card.key,
  name: card.name,
  x: punjabMapPoints[card.key].x,
  y: punjabMapPoints[card.key].y,
  href: card.href as string | null,
  lead: card.lead,
  linkText: card.linkText,
  linkHref: card.href,
  tail: card.tail,
}))

// Pinned towns without a page: name only. No notes or service claims.
const townLocations = punjabMapTowns.map((town) => ({
  key: town.name,
  name: town.name,
  x: town.x,
  y: town.y,
  href: null as string | null,
}))

// North to south, so the pins drop in as a sweep down the province.
const locations: MapLocation[] = [...cityLocations, ...townLocations]
  .sort((a, b) => a.y - b.y)
  .map((place, rank) => ({
    ...place,
    side: sides[place.name] ?? "right",
    delay: Number((1.6 + rank * 0.04).toFixed(2)),
  }))

// The 3D scene builds in Three.js. The static drawing only shows if WebGL is unavailable.
const css = `
  .pm { --pm-brown: #7A5230; --pm-ink: #2B1D10; }
  .pm-canvas { opacity: 0; transition: opacity .6s ease; }
  .pm-fallback { opacity: 0; }
  .pm[data-gl="off"] .pm-fallback { opacity: 1; }
  .pm-fb-fill { fill: rgba(122,82,48,.1); }
  .pm-fb-line { fill: none; stroke: var(--pm-brown); stroke-width: 2.2; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
  .pm-city { opacity: 0; transform: translateY(-14px) scale(.5); }
  .pm[data-gl="on"] .pm-city, .pm[data-gl="off"] .pm-city { animation: pm-drop .7s cubic-bezier(.2,1.5,.4,1) forwards; }
  .pm-card { opacity: 0; pointer-events: none; transform: translateY(-6px) scale(.98); transition: opacity .2s ease, transform .2s ease; }
  .pm-city:hover, .pm-city:focus-within { z-index: 30; }
  .pm-city:hover .pm-card, .pm-city:focus-within .pm-card { opacity: 1; pointer-events: auto; transform: none; }
  @keyframes pm-drop { to { opacity: 1; transform: none; } }
  @media (hover: none) { .pm-link .pm-card { display: none; } }
  @media (prefers-reduced-motion: reduce) {
    .pm-canvas { transition: none; }
    .pm-city { animation: none !important; opacity: 1; transform: none; }
  }
`

export function PunjabCityMap() {
  return (
    <figure className="pm mt-6 md:mt-8" data-gl="pending">
      <style>{css}</style>
      <div
        className="relative mx-auto w-full max-w-[680px]"
        style={{ aspectRatio: `${mapWidth} / ${mapHeight * punjabMapStage}` }}
      >
        <PunjabMapScene locations={locations} />
      </div>
      <figcaption className="mx-auto mt-8 max-w-[680px] text-center">
        <p className="text-base font-light tracking-tight text-black md:text-lg">
          We have a team in Lahore.
        </p>
        <p className="mt-3 text-[10px] font-light text-black/30">Boundaries: geoBoundaries, CC BY 4.0</p>
      </figcaption>
    </figure>
  )
}
