# Image assets

## Real assets in use

- `betta-logo.png` — the supplied Betta Aluminium Solutions logo, 1774 × 887,
  transparent background. Used unmodified in the navbar, footer and the
  Open Graph image. Do not recolour, redraw or crop it.

## Placeholder imagery — replace before launch

Every `*.svg` file in this folder is a generated architectural placeholder, not
a photograph. Each one carries a small `PLACEHOLDER` tag in the bottom-left
corner so it cannot be shipped by accident.

Drop a real photograph in at the same path (any of `.jpg`, `.webp` or `.avif`
is fine) and update the matching `image:` value in `lib/site.ts`. Nothing else
in the codebase needs to change — every image goes through `next/image` with
explicit dimensions and responsive `sizes`.

| File | What to supply | Suggested aspect |
| --- | --- | --- |
| `hero-architecture.svg` | Contemporary building with aluminium-framed glass windows and doors, shot from outside in daylight | 6:5 portrait-ish |
| `about-workshop.svg` | Installed aluminium work or fabrication in progress | 6:5 |
| `service-windows.svg` | Aluminium window system, interior or exterior | 9:7 |
| `service-doors.svg` | Aluminium sliding or entrance door set | 9:7 |
| `service-partitions.svg` | Glass and aluminium office partition run | 9:7 |
| `service-shopfronts.svg` | Retail shopfront frontage | 9:7 |
| `service-fabrication.svg` | Aluminium sections being cut, measured or assembled | 9:7 |
| `project-facade.svg` | Aluminium and glass facade, full height | 9:13 portrait |
| `project-windows-residential.svg` | Residential aluminium windows | 5:4 |
| `project-sliding-door.svg` | Large sliding door onto a terrace | 13:8 landscape |
| `project-office-partition.svg` | Glazed office partitions | 5:4 |
| `project-shopfront.svg` | Shopfront, full height | 9:13 portrait |
| `project-shower.svg` | Glass shower enclosure | 5:4 |
| `project-entrance.svg` | Commercial glazed entrance | 5:4 |
| `project-corner-window.svg` | Corner window detail | 13:8 landscape |
| `project-entrance-door.svg` | Aluminium entrance door set | 5:4 |
| `project-commercial-glazing.svg` | Large commercial glazing | 9:13 portrait |

## Attribution rule

Gallery items in `lib/site.ts` carry a `kind` field. Anything still marked
`"reference"` is labelled on the site as a design reference and is **not**
presented as a Betta Aluminium Solutions installation. Switch an item to
`"project"` only once the business confirms the photograph shows its own work.
