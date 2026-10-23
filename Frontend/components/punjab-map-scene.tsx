"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import {
  punjabMapCentroid,
  punjabMapOutline,
  punjabMapSize,
} from "@/lib/punjab-map-geometry"

export type MapSide = "left" | "right" | "above" | "below"

export type MapLocation = {
  key: string
  name: string
  x: number
  y: number
  /** Pin link for cities that have their own page. Towns without a page have none. */
  href: string | null
  /** What we do there and how. */
  about: string
  /** Extra line for cities with a page, e.g. the Lahore team. */
  note: string
  contactHref: string
  side: MapSide
}

const { width: W, height: H } = punjabMapSize
const { x: CX, y: CY } = punjabMapCentroid

const DEPTH = 16
const PIN_HEAD_Z = 19
const TILT = (32 * Math.PI) / 180
// The tilted province is shorter on screen, so the stage is a little shorter than the flat map.
const STAGE = 0.92
const RING_SCALES = [0.95, 0.89, 0.83, 0.77, 0.71]

const labelSide: Record<MapSide, string> = {
  left: "right-[calc(100%-1px)] top-1/2 -translate-y-1/2 text-right",
  right: "left-[calc(100%-1px)] top-1/2 -translate-y-1/2",
  above: "bottom-[calc(100%-2px)] left-1/2 -translate-x-1/2",
  below: "top-[calc(100%-2px)] left-1/2 -translate-x-1/2",
}

function cardAlign(x: number) {
  if (x < W * 0.35) return "left-[-8px]"
  if (x > W * 0.65) return "right-[-8px]"
  return "left-1/2 -translate-x-1/2"
}

type Vec = [number, number]

function parseOutline(path: string): Vec[] {
  const nums = (path.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
  const pts: Vec[] = []
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]])
  const first = pts[0]
  const last = pts[pts.length - 1]
  if (first && last && first[0] === last[0] && first[1] === last[1]) pts.pop()
  return pts
}

function resampleClosed(poly: Vec[], count: number): Vec[] {
  const lens: number[] = [0]
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i]
    const b = poly[(i + 1) % poly.length]
    lens.push(lens[i] + Math.hypot(b[0] - a[0], b[1] - a[1]))
  }
  const total = lens[lens.length - 1]
  const out: Vec[] = []
  let seg = 0
  for (let k = 0; k < count; k++) {
    const target = (total * k) / count
    while (seg < poly.length - 1 && lens[seg + 1] < target) seg++
    const a = poly[seg]
    const b = poly[(seg + 1) % poly.length]
    const span = lens[seg + 1] - lens[seg] || 1
    const f = (target - lens[seg]) / span
    out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f])
  }
  return out
}

function insidePolygon(x: number, y: number, poly: Vec[]) {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

export function PunjabMapScene({ locations }: { locations: MapLocation[] }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const cityRefs = useRef<(HTMLDivElement | null)[]>([])
  const hoverRef = useRef(-1)
  const invalidateRef = useRef<() => void>(() => {})

  useEffect(() => {
    const box = boxRef.current
    const figure = box?.closest<HTMLElement>(".pm")
    if (!box || !figure) return

    // A fresh canvas per mount: a WebGL context can't be reused after it was lost.
    const canvas = document.createElement("canvas")
    canvas.setAttribute("aria-hidden", "true")
    canvas.className = "pm-canvas pointer-events-none absolute inset-0 h-full w-full"
    box.prepend(canvas)

    let cancelled = false
    let cleanup = () => {}

    ;(async () => {
      try {
        const THREE = await import("three")
        const { Line2 } = await import("three/addons/lines/Line2.js")
        const { LineGeometry } = await import("three/addons/lines/LineGeometry.js")
        const { LineMaterial } = await import("three/addons/lines/LineMaterial.js")
        if (cancelled) return

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
        renderer.setClearColor(0x000000, 0)

        const disposables: { dispose: () => void }[] = []
        const track = <T extends { dispose: () => void }>(item: T) => {
          disposables.push(item)
          return item
        }

        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(26, 1, 10, 6000)
        const fovTan = Math.tan((26 * Math.PI) / 360)

        scene.add(new THREE.AmbientLight(0xffffff, 1.15))
        const sun = new THREE.DirectionalLight(0xffffff, 1.1)
        sun.position.set(-300, -200, 500)
        scene.add(sun)

        const tx = (x: number) => x - W / 2
        const ty = (y: number) => -(y - H / 2)

        const outline = parseOutline(punjabMapOutline)
        const shape = new THREE.Shape(outline.map(([x, y]) => new THREE.Vector2(tx(x), ty(y))))

        // Extruded province: cream top, brown walls.
        const bodyGeo = track(new THREE.ExtrudeGeometry(shape, { depth: DEPTH, bevelEnabled: false }))
        const capMat = track(new THREE.MeshBasicMaterial({ color: 0xe9e5cb }))
        const wallMat = track(new THREE.MeshLambertMaterial({ color: 0x7a5230 }))
        const body = new THREE.Mesh(bodyGeo, [capMat, wallMat])
        scene.add(body)

        // Soft offset shadow under the province.
        const shadowGeo = track(new THREE.ShapeGeometry(shape))
        const shadowMat = track(
          new THREE.MeshBasicMaterial({ color: 0x2b1d10, transparent: true, opacity: 0.07, depthWrite: false }),
        )
        const shadow = new THREE.Mesh(shadowGeo, shadowMat)
        shadow.position.set(12, -20, -1)
        scene.add(shadow)

        // Everything that sits on the top face.
        const top = new THREE.Group()
        top.position.z = DEPTH
        scene.add(top)

        const dotTex = track(
          (() => {
            const c = document.createElement("canvas")
            c.width = c.height = 64
            const ctx = c.getContext("2d")!
            ctx.beginPath()
            ctx.arc(32, 32, 28, 0, Math.PI * 2)
            ctx.fillStyle = "#fff"
            ctx.fill()
            return new THREE.CanvasTexture(c)
          })(),
        )

        const makePoints = (coords: number[], size: number, opacity: number) => {
          const geo = track(new THREE.BufferGeometry())
          geo.setAttribute("position", new THREE.Float32BufferAttribute(coords, 3))
          const mat = track(
            new THREE.PointsMaterial({
              color: 0x7a5230,
              size,
              map: dotTex,
              transparent: true,
              opacity,
              depthWrite: false,
              alphaTest: 0.02,
            }),
          )
          const pts = new THREE.Points(geo, mat)
          pts.renderOrder = 2
          top.add(pts)
          return mat
        }

        // Background dot grid, clipped to Punjab.
        const grid: number[] = []
        for (let y = 5; y < H; y += 10) {
          for (let x = 5; x < W; x += 10) {
            if (insidePolygon(x, y, outline)) grid.push(tx(x), ty(y), 0.4)
          }
        }
        makePoints(grid, 4.6, 0.4)

        // Stippled rings that thin out toward the middle.
        const rim = resampleClosed(outline, 520)
        let perimeter = 0
        for (let i = 0; i < rim.length; i++) {
          const a = rim[i]
          const b = rim[(i + 1) % rim.length]
          perimeter += Math.hypot(b[0] - a[0], b[1] - a[1])
        }
        RING_SCALES.forEach((scale, i) => {
          const spacing = Math.max(1, Math.round(7 / ((perimeter / rim.length) * scale)))
          const coords: number[] = []
          for (let k = 0; k < rim.length; k += spacing) {
            const [x, y] = rim[k]
            coords.push(tx(CX + (x - CX) * scale), ty(CY + (y - CY) * scale), 0.5)
          }
          makePoints(coords, 5.2 - i * 0.5, 0.62 - i * 0.1)
        })

        // The border.
        const loop = [...rim, rim[0]]
        const linePositions = loop.flatMap(([x, y]) => [tx(x), ty(y), 0.8])

        const borderGeo = track(new LineGeometry())
        borderGeo.setPositions(linePositions)
        const borderMat = track(new LineMaterial({ color: 0x7a5230, linewidth: 2.2 }))
        const border = new Line2(borderGeo, borderMat)
        border.renderOrder = 3
        top.add(border)

        // Pins: every location gets the same pin.
        const ringGeo = track(new THREE.RingGeometry(5.5, 8, 40))
        const stemGeo = track(new THREE.CylinderGeometry(0.9, 0.9, PIN_HEAD_Z - 4, 8))
        const headGeo = track(new THREE.SphereGeometry(5, 24, 16))
        const ringMat = track(
          new THREE.MeshBasicMaterial({ color: 0x7a5230, transparent: true, opacity: 0.5, depthWrite: false }),
        )
        const stemMat = track(new THREE.MeshLambertMaterial({ color: 0x2b1d10 }))
        const headMat = track(new THREE.MeshLambertMaterial({ color: 0x2b1d10 }))

        const pins = locations.map((loc) => {
          const group = new THREE.Group()
          group.position.set(tx(loc.x), ty(loc.y), 0)
          const ring = new THREE.Mesh(ringGeo, ringMat)
          ring.position.z = 1
          const stem = new THREE.Mesh(stemGeo, stemMat)
          stem.rotation.x = Math.PI / 2
          stem.position.z = (PIN_HEAD_Z - 4) / 2 + 1
          const head = new THREE.Mesh(headGeo, headMat)
          head.position.z = PIN_HEAD_Z
          group.add(ring, stem, head)
          top.add(group)
          return group
        })

        // Camera + sizing.
        let width = 1
        let height = 1
        let distance = 1000
        const resize = () => {
          width = box.clientWidth || 1
          height = box.clientHeight || 1
          renderer.setSize(width, height, false)
          camera.aspect = width / height
          camera.updateProjectionMatrix()
          // Fit the province width exactly when seen from above.
          distance = W / (2 * fovTan * camera.aspect)
          borderMat.resolution.set(width, height)
          dirty = true
        }

        let dirty = true
        invalidateRef.current = () => {
          dirty = true
        }

        const vec = new THREE.Vector3()
        const placeLabels = (topZ: number) => {
          for (let i = 0; i < locations.length; i++) {
            const el = cityRefs.current[i]
            if (!el) continue
            vec.set(tx(locations[i].x), ty(locations[i].y), topZ + PIN_HEAD_Z).project(camera)
            el.style.left = `${(vec.x * 0.5 + 0.5) * width}px`
            el.style.top = `${(-vec.y * 0.5 + 0.5) * height}px`
          }
        }

        // Fixed camera: tilted toward the north, never moving.
        const draw = () => {
          camera.position.set(0, -distance * Math.sin(TILT), distance * Math.cos(TILT))
          camera.lookAt(0, 0, 0)
          pins.forEach((pin, i) => pin.scale.setScalar(hoverRef.current === i ? 1.5 : 1))
          placeLabels(DEPTH)
          renderer.render(scene, camera)
        }

        resize()
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(box)

        let visible = true
        const io = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
          if (visible) dirty = true
        })
        io.observe(box)

        let raf = 0
        let ready = false
        const frame = () => {
          raf = requestAnimationFrame(frame)
          if (!dirty || !visible || document.hidden) return
          dirty = false
          draw()
          if (!ready) {
            ready = true
            canvas.style.opacity = "1"
            figure.dataset.gl = "on"
          }
        }
        raf = requestAnimationFrame(frame)

        cleanup = () => {
          cancelAnimationFrame(raf)
          resizeObserver.disconnect()
          io.disconnect()
          invalidateRef.current = () => {}
          disposables.forEach((item) => item.dispose())
          renderer.dispose()
          renderer.forceContextLoss()
        }
        if (cancelled) cleanup()
      } catch {
        if (!cancelled) figure.dataset.gl = "off"
      }
    })()

    return () => {
      cancelled = true
      cleanup()
      canvas.remove()
    }
  }, [locations])

  return (
    <div ref={boxRef} className="relative mx-auto w-full max-w-[680px]" style={{ aspectRatio: `${W} / ${H * STAGE}` }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="pm-fallback pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <path className="pm-fb-fill" d={punjabMapOutline} />
        <path className="pm-fb-line" d={punjabMapOutline} />
      </svg>

      {locations.map((loc, i) => {
        const label = (
          <span
            className={`absolute whitespace-nowrap text-[9px] font-normal tracking-tight text-black sm:text-[11px] md:text-[13px] [text-shadow:0_0_4px_#F5F5DC,0_0_7px_#F5F5DC] ${labelSide[loc.side]}`}
          >
            {loc.name}
          </span>
        )
        const hit =
          "group relative block h-6 w-6 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#7A5230]"
        return (
          <div
            key={loc.key}
            ref={(el) => {
              cityRefs.current[i] = el
            }}
            className={`pm-city absolute -translate-x-1/2 -translate-y-1/2 ${loc.href ? "pm-link" : ""}`}
            style={{
              left: `${(loc.x / W) * 100}%`,
              top: `${(loc.y / H) * 100}%`,
            }}
            onPointerEnter={() => {
              hoverRef.current = i
              invalidateRef.current()
            }}
            onPointerLeave={() => {
              if (hoverRef.current === i) hoverRef.current = -1
              invalidateRef.current()
            }}
            onFocus={() => {
              hoverRef.current = i
              invalidateRef.current()
            }}
            onBlur={() => {
              if (hoverRef.current === i) hoverRef.current = -1
              invalidateRef.current()
            }}
          >
            {loc.href ? (
              <Link href={loc.href} aria-label={`Home cinema installation in ${loc.name}`} className={hit}>
                {label}
              </Link>
            ) : (
              <button type="button" aria-label={loc.name} className={hit}>
                {label}
              </button>
            )}
            <div className={`pm-card absolute top-full w-[min(270px,72vw)] pt-1 ${cardAlign(loc.x)}`}>
              <div className="rounded-xl bg-white px-4 py-3.5 text-left shadow-[0_18px_40px_rgba(43,29,16,0.22)]">
                <p className="text-base font-light tracking-tight text-black">
                  {loc.href ? (
                    <Link href={loc.href} className="text-[#7A5230] underline underline-offset-2 hover:text-black">
                      {loc.name}
                    </Link>
                  ) : (
                    loc.name
                  )}
                </p>
                {loc.about ? (
                  <p className="mt-1.5 text-sm font-light leading-relaxed text-black/70">{loc.about}</p>
                ) : null}
                <p className="mt-1.5 text-sm font-light leading-relaxed text-black/70">
                  {loc.href ? (
                    <>
                      {loc.note ? `${loc.note} ` : ""}You can{" "}
                      <Link href={loc.contactHref} className="text-[#7A5230] underline underline-offset-2 hover:text-black">
                        contact us
                      </Link>
                      .
                    </>
                  ) : (
                    <Link href={loc.contactHref} className="text-[#7A5230] underline underline-offset-2 hover:text-black">
                      Contact us
                    </Link>
                  )}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
