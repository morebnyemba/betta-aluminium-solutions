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
- `og.jpg` — the social-share preview image (Open Graph + Twitter card),
  1200 × 630. Composed from `hero-slide-1.jpg` with the same dark scrim
  recipe as the hero carousel, the current (cropped) `betta-logo.png`, and
  the tagline/descriptor rendered as text since the crop removed that text
  from the logo file itself. Regenerate this — same background photo, same
  scrim, current logo — any time the logo or hero photo changes, so it
  doesn't go stale the way the previous version did (it kept the old
  uncropped logo after the crop, and used a plain white background).
- `about-workshop.jpg`, `service-windows.jpg`, `service-doors.jpg`,
  `service-partitions.jpg`, `service-shopfronts.jpg` — real photographs of
  Betta Aluminium Solutions' own completed work, supplied by the business.
  These are **not stock** and each is a plain copy of one of the `project`
  photos in `images/gallery/` (see the table below for which one), reused
  rather than uploaded twice so there's one real source per subject:

  | File | Reused from `images/gallery/` |
  | --- | --- |
  | `about-workshop.jpg` | `doors-project-kitchen-stable-door.jpg` |
  | `service-windows.jpg` | `windows-project-corner-window-installation.jpg` |
  | `service-doors.jpg` | `doors-project-roller-shutter-door.jpg` |
  | `service-partitions.jpg` | `partitions-project-double-shower-enclosure.jpg` |
  | `service-shopfronts.jpg` | `shopfronts-project-glazed-storefront-entrance.jpg` |

  Replacing any of these five means updating both copies — the one here and
  its match in `images/gallery/` — since nothing in code links them; they're
  independent files that happen to start out identical.

## Placeholder photography — still stock, still needs replacing

- `hero-slide-1.jpg` through `hero-slide-4.jpg` (full-bleed carousel
  backgrounds) and `service-fabrication.jpg` are the only images left that
  are still **stock photos standing in for real project photography**, not
  pictures of Betta Aluminium Solutions' own work. They're licensed for free
  commercial use with no attribution required (Pexels License).
  `hero-slide-2.jpg` and `hero-slide-3.jpg` are wider crops of the same
  source photos as `doors-project-glazed-double-door-set.jpg`'s original
  stock predecessor and the old `service-doors.jpg` — kept as-is because a
  full-bleed hero background needs higher resolution than the real site
  photos currently available (all ≤ 2000px on the long edge; hero renders up
  to 1920px wide and would visibly soften if stretched further). Swap these
  once a wide, high-resolution photo of Betta's own work exists.

  | File | Depicts (stock, not Betta's work) | Aspect | Source (Pexels photo ID) |
  | --- | --- | --- | --- |
  | `hero-slide-1.jpg` | Contemporary house with a cantilevered, glazed upper storey | full-bleed | 4744622 |
  | `hero-slide-2.jpg` | Glass-fronted commercial tower, low angle | full-bleed | 206232 |
  | `hero-slide-3.jpg` | House with large aluminium-framed glass doors onto a lawn | full-bleed | 7031607 |
  | `hero-slide-4.jpg` | House with wide sliding glass doors onto a garden | full-bleed | 35361412 |
  | `service-fabrication.jpg` | Sparks from cutting a steel section on site | 9:7 | 7461112 |

  Drop a real photograph in at the same path (`.jpg`, `.webp` or `.avif` all
  work) and nothing else in the codebase needs to change — every image goes
  through `next/image` with explicit dimensions and responsive `sizes`, and
  `ArchImage`/`ProjectGallery` switch off `unoptimized` automatically once
  the extension isn't `.svg`.

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

Current files — all `project`, confirmed by the business as its own
completed work:

| File | Category |
| --- | --- |
| `commercial-project-glass-balustrade-staircase.jpg` | Commercial |
| `commercial-project-glass-curtain-wall-elevation.jpg` | Commercial |
| `commercial-project-mirrored-glass-facade.jpg` | Commercial |
| `commercial-project-modular-glass-room-complete.jpg` | Commercial |
| `commercial-project-modular-room-installation-in-progress.jpg` | Commercial |
| `doors-project-double-entrance-doors.jpg` | Doors |
| `doors-project-glazed-double-door-set.jpg` | Doors |
| `doors-project-kitchen-stable-door.jpg` | Doors |
| `doors-project-pivot-door-interior.jpg` | Doors |
| `doors-project-roller-shutter-door.jpg` | Doors |
| `doors-project-security-door-with-roller-shutter.jpg` | Doors |
| `partitions-project-double-shower-enclosure.jpg` | Partitions |
| `shopfronts-project-glazed-storefront-entrance.jpg` | Shopfronts |
| `windows-project-corner-window-installation.jpg` | Windows |
| `windows-project-residential-facade-gable-window.jpg` | Windows |

The gallery previously held ten `reference` stock photos (screened Pexels
images, one set per category) as a placeholder before any real project
photos existed. They've been removed now that every category has genuine
Betta work — real photos read better than stock once there's a choice, and
mixing the two would have undersold the real ones. If a category ever needs
filling out again before more real photos arrive, a `reference` stock photo
is the fallback, not a re-labelled real one from a different category.

## Attribution rule

Any gallery photo whose filename doesn't carry `project` is labelled on the
site as a design reference and is **not** presented as a Betta Aluminium
Solutions installation. Rename a file to swap `reference` for `project`
only once the business confirms the photograph shows its own work.
