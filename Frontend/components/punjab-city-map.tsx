import Link from "next/link"

const viewBox = { x: 60, y: 28, width: 460, height: 620 }

const outline =
  "M 263.2 52.4 C 278.1 50.0, 306.1 53.3, 326.6 62.2 C 347.1 71.2, 367.6 89.8, 386.2 106.1 C 404.8 122.4, 423.4 146.0, 438.3 159.8 C 453.2 173.6, 467.5 177.7, 475.6 189.1 C 483.7 200.5, 487.9 214.4, 486.7 228.2 C 485.4 242.0, 474.3 260.7, 468.1 272.1 C 461.9 283.5, 453.9 285.9, 449.5 296.5 C 445.1 307.1, 448.2 321.0, 442 335.6 C 435.8 350.3, 423.4 369.8, 412.2 384.4 C 401.0 399.0, 385.6 409.7, 375 423.5 C 364.4 437.3, 357.0 451.1, 348.9 467.4 C 340.8 483.7, 338.4 504.8, 326.6 521.1 C 314.8 537.4, 298.6 552.1, 278.1 565.1 C 257.6 578.1, 226.6 590.3, 203.6 599.2 C 180.6 608.2, 157.1 618.0, 140.3 618.8 C 123.6 619.6, 111.8 616.3, 103.1 604.1 C 94.4 591.9, 87.0 565.8, 88.2 545.5 C 89.4 525.2, 103.0 503.3, 110.5 482.1 C 118.0 461.0, 124.2 440.6, 132.9 418.6 C 141.6 396.6, 156.5 372.2, 162.7 350.2 C 168.9 328.2, 166.4 307.9, 170.1 286.8 C 173.8 265.7, 180.0 242.8, 185 223.3 C 190.0 203.8, 194.9 185.9, 199.9 169.6 C 204.9 153.3, 208.6 141.1, 214.8 125.6 C 221.0 110.1, 229.1 89.0, 237.2 76.8 C 245.3 64.6, 248.3 54.8, 263.2 52.4 Z"

const route =
  "M 436.3 194.5 C 434.3 210.4, 441.3 272.7, 424.1 289.7 C 406.9 306.7, 368.1 274.3, 332.9 296.5 C 297.7 318.7, 230.9 389.3, 212.9 422.7 C 194.9 456.1, 222.7 484.7, 224.7 497.1"

const cities = [
  {
    name: "Sialkot",
    href: "/service/home-cinema-installation-sialkot",
    x: 436.3,
    y: 194.5,
    side: "left",
  },
  {
    name: "Lahore",
    href: "/service/home-cinema-installation-lahore",
    x: 424.1,
    y: 289.7,
    side: "right",
  },
  {
    name: "Faisalabad",
    href: "/service/home-cinema-installation-faisalabad",
    x: 332.9,
    y: 296.5,
    side: "above",
  },
  {
    name: "Multan",
    href: "/service/home-cinema-installation-multan",
    x: 212.9,
    y: 422.7,
    side: "left",
  },
  {
    name: "Bahawalpur",
    href: "/service/home-cinema-installation-bahawalpur",
    x: 224.7,
    y: 497.1,
    side: "right",
  },
] as const

function place(x: number, y: number) {
  return {
    left: `${((x - viewBox.x) / viewBox.width) * 100}%`,
    top: `${((y - viewBox.y) / viewBox.height) * 100}%`,
  }
}

export function PunjabCityMap() {
  return (
    <figure className="punjab-map mt-10">
      <style>{`
        .punjab-stroke,
        .punjab-route {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
        .punjab-stroke {
          stroke: #1c1c1c;
          stroke-width: 1.6;
          animation: punjab-draw 1.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .punjab-fill {
          fill: rgba(28, 28, 28, 0.045);
          opacity: 0;
          animation: punjab-fade 0.7s ease 1s forwards;
        }
        .punjab-route {
          stroke: #8c6a3d;
          stroke-width: 1.35;
          animation: punjab-draw 1.25s cubic-bezier(0.4, 0, 0.2, 1) 1.05s forwards;
        }
        .punjab-route-dash {
          fill: none;
          stroke: #8c6a3d;
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-dasharray: 1.4 2.8;
          opacity: 0;
          animation: punjab-fade 0.35s ease 2.2s forwards, punjab-march 9s linear 2.2s infinite;
        }
        .punjab-city {
          opacity: 0;
          animation: punjab-fade 0.45s ease forwards;
        }
        .punjab-dot {
          box-shadow: 0 0 0 7px rgba(28, 28, 28, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .punjab-city:hover .punjab-dot,
        .punjab-city:focus-visible .punjab-dot {
          transform: scale(1.35);
          box-shadow: 0 0 0 8px rgba(140, 106, 61, 0.28);
        }
        @keyframes punjab-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes punjab-fade {
          to { opacity: 1; }
        }
        @keyframes punjab-march {
          to { stroke-dashoffset: -21; }
        }
        @media (prefers-reduced-motion: reduce) {
          .punjab-stroke,
          .punjab-route,
          .punjab-fill,
          .punjab-route-dash,
          .punjab-city {
            animation: none;
            opacity: 1;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
      <div className="rounded-3xl bg-white px-4 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] md:px-8 md:py-8">
        <div className="relative mx-auto aspect-[460/620] w-full max-w-[420px]">
          <svg
            viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <path className="punjab-fill" d={outline} />
            <path className="punjab-stroke" pathLength={100} d={outline} />
            <path className="punjab-route" pathLength={100} d={route} />
            <path className="punjab-route-dash" pathLength={100} d={route} />
          </svg>
          {cities.map((city, index) => (
            <Link
              key={city.href}
              href={city.href}
              aria-label={`Home cinema installation in ${city.name}`}
              className="punjab-city group absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-black/40"
              style={{ ...place(city.x, city.y), animationDelay: `${1.45 + index * 0.12}s` }}
            >
              <span className="punjab-dot block h-[11px] w-[11px] rounded-full bg-black" />
              <span
                className={
                  city.side === "left"
                    ? "absolute right-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-right text-sm font-light tracking-tight text-black group-hover:underline group-hover:underline-offset-[3px]"
                    : city.side === "right"
                      ? "absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-light tracking-tight text-black group-hover:underline group-hover:underline-offset-[3px]"
                      : "absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-light tracking-tight text-black group-hover:underline group-hover:underline-offset-[3px]"
                }
              >
                {city.name}
              </span>
            </Link>
          ))}
        </div>
        <figcaption className="mx-auto mt-2 max-w-sm text-center text-sm font-light leading-relaxed text-black/60">
          Lahore has a team. Faisalabad, Multan, Sialkot and Bahawalpur are site visits from Karachi.
        </figcaption>
      </div>
    </figure>
  )
}
