# Image assets

## Real assets in use

- `betta-logo.png` — the supplied Betta Aluminium Solutions logo, 1774 × 887,
  transparent background. Used unmodified in the navbar, footer and the
  Open Graph image. Do not recolour, redraw or crop it.

## Placeholder photography — replace before launch

Every `*.jpg` file below (everything except `betta-logo.png` and `og.png`) is
a **stock photo standing in for real project photography**, not a picture of
Betta Aluminium Solutions' own work. All of it is licensed for free
commercial use with no attribution required (Pexels License), so nothing
needs crediting on the live site — but none of it may be presented as a
completed Betta installation. Every gallery item's `kind` stays `"reference"`
(see below) until the business supplies a real photograph.

Drop a real photograph in at the same path (`.jpg`, `.webp` or `.avif` all
work) and update the matching `image:` value in `lib/site.ts`. Nothing else in
the codebase needs to change — every image goes through `next/image` with
explicit dimensions and responsive `sizes`, and `ArchImage`/`ProjectGallery`
switch off `unoptimized` automatically once the extension isn't `.svg`.

| File | Depicts (stock, not Betta's work) | Aspect | Source (Pexels photo ID) |
| --- | --- | --- | --- |
| `hero-architecture.jpg` | Stone-and-aluminium-panel building exterior | 6:5 | 23319058 |
| `about-workshop.jpg` | Installing a window frame, seen from behind | 6:5 | 5691531 |
| `service-windows.jpg` | Aluminium-framed window grid on a building facade | 9:7 | 8433046 |
| `service-doors.jpg` | House exterior with large glass sliding doors | 9:7 | 7031607 |
| `service-partitions.jpg` | Ribbed glass partition wall, office interior | 9:7 | 6044814 |
| `service-shopfronts.jpg` | Empty aluminium-framed shopfront glazing | 9:7 | 32367382 |
| `service-fabrication.jpg` | Sparks from cutting a steel section on site | 9:7 | 7461112 |
| `project-facade.jpg` | Curved glass office tower, low angle | 9:13 | 206232 |
| `project-windows-residential.jpg` | Minimalist modern house exterior | 5:4 | 8134820 |
| `project-sliding-door.jpg` | House with glass doors onto a lawn | 13:8 | 35361412 |
| `project-office-partition.jpg` | Office interior with glass wall panels | 5:4 | 3801167 |
| `project-shopfront.jpg` | Same empty shopfront as above, portrait crop | 9:13 | 32367382 |
| `project-shower.jpg` | Framed glass shower enclosure, bathroom | 5:4 | 7005268 |
| `project-entrance.jpg` | Repetitive glass curtain-wall grid | 5:4 | 7078620 |
| `project-corner-window.jpg` | Glass facade detail with sun-shade louvres | 13:8 | 18356512 |
| `project-entrance-door.jpg` | Double aluminium-framed entrance doors | 5:4 | 7638806 |
| `project-commercial-glazing.jpg` | Large-format glass curtain wall, close-up | 9:13 | 35158336 |

Every candidate was checked for legible third-party brand names, logos or
signage before use (several early picks were rejected for exactly that — a
storefront's sign, a company decal on glass, a gallery's name etched into a
door) so none of this imagery identifies a specific real business.

## Attribution rule

Gallery items in `lib/site.ts` carry a `kind` field. Anything still marked
`"reference"` is labelled on the site as a design reference and is **not**
presented as a Betta Aluminium Solutions installation. Switch an item to
`"project"` only once the business confirms the photograph shows its own work.
