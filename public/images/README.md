# Image assets

## Real assets in use

- `betta-logo.png` — the Betta Aluminium Solutions house mark and wordmark,
  1774 × 728, transparent background. Used in the navbar and footer. Cropped
  from the originally supplied lockup to remove the tagline and service-list
  rows below the wordmark (a deliberate, requested change — see
  `betta-logo-full.png` below). Do not recolour, redraw or crop it further.
- `betta-logo-full.png` — the original, uncropped lockup as supplied
  (1774 × 887, includes the tagline and service list). Not referenced by any
  page; kept only as the source of record if the full lockup is needed again.

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
| `hero-slide-1.jpg` | Contemporary house with a cantilevered, glazed upper storey | full-bleed | 4744622 |
| `hero-slide-2.jpg` | Glass-fronted commercial tower, low angle | full-bleed | 206232 |
| `hero-slide-3.jpg` | House with large aluminium-framed glass doors onto a lawn | full-bleed | 7031607 |
| `hero-slide-4.jpg` | House with wide sliding glass doors onto a garden | full-bleed | 35361412 |
| `about-workshop.jpg` | Installing a window frame, seen from behind | 6:5 | 5691531 |
| `service-windows.jpg` | Aluminium-framed window grid on a building facade | 9:7 | 8433046 |
| `service-doors.jpg` | House exterior with large glass sliding doors | 9:7 | 7031607 |
| `service-partitions.jpg` | Ribbed glass partition wall, office interior | 9:7 | 6044814 |
| `service-shopfronts.jpg` | Empty aluminium-framed shopfront glazing | 9:7 | 32367382 |
| `service-fabrication.jpg` | Sparks from cutting a steel section on site | 9:7 | 7461112 |

Every candidate was checked for legible third-party brand names, logos or
signage before use (several early picks were rejected for exactly that — a
storefront's sign, a company decal on glass, a gallery's name etched into a
door) so none of this imagery identifies a specific real business. The
gallery photos below (`images/gallery/`) went through the same screening.

`hero-slide-2.jpg` and `hero-slide-3.jpg` are wider crops of the same source
photos as `gallery/commercial-reference-aluminium-glass-facade.jpg` and
`service-doors.jpg` — reusing already-vetted images rather than re-sourcing
and re-screening new ones for two slides. Worth swapping for something
distinct once real photography replaces either set.

## The projects gallery — `images/gallery/`

The `/projects` page, its homepage preview, and each service page's "related
work" strip all read directly from this folder (`lib/gallery.ts`, at build
time) — nothing in code lists individual gallery photos. **Drop a photo in
here and rebuild/redeploy; it appears with no code change.**

Name it `{category}-{reference|project}-{title}.ext` — hyphens or
underscores both work as separators, and the category and kind tokens can
appear anywhere in the name:

- **category** — `windows`, `doors`, `partitions`, `shopfronts` or
  `commercial`. Missing or unrecognised → filed under Commercial rather than
  dropped, so a photo never silently vanishes for not following the
  convention.
- **kind** — `reference` (default, shown as a design reference, not
  Betta's own installation) or `project` (a confirmed real Betta job — use
  this **only** once the business confirms the photo is its own work, per
  the rule below). Missing → `reference`.
- **title** — everything else, hyphen/underscore-separated; becomes the
  display title and the alt text, so name it descriptively
  (`windows-project-harare-office-corner-glazing.jpg`, not `IMG_4821.jpg`).

The masonry layout's tall/wide spans are read from the photo's actual
dimensions (`lib/gallery.ts`, via `sharp`) — no manual span flag needed.

Current files, all still `reference`:

| File | Category |
| --- | --- |
| `commercial-reference-aluminium-glass-facade.jpg` | Commercial |
| `commercial-reference-commercial-glazed-entrance.jpg` | Commercial |
| `commercial-reference-large-commercial-glazing.jpg` | Commercial |
| `doors-reference-entrance-door-set.jpg` | Doors |
| `doors-reference-sliding-door-opening.jpg` | Doors |
| `partitions-reference-office-partition-run.jpg` | Partitions |
| `partitions-reference-shower-enclosure.jpg` | Partitions |
| `shopfronts-reference-retail-shopfront.jpg` | Shopfronts |
| `windows-reference-corner-window-detail.jpg` | Windows |
| `windows-reference-residential-window-set.jpg` | Windows |

## Attribution rule

Any gallery photo whose filename doesn't carry `project` is labelled on the
site as a design reference and is **not** presented as a Betta Aluminium
Solutions installation. Rename a file to swap `reference` for `project`
only once the business confirms the photograph shows its own work.
