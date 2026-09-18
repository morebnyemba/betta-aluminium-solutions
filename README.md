# Betta Aluminium Solutions

Marketing site for Betta Aluminium Solutions — aluminium windows, doors,
partitions, shopfronts and custom fabrication, Harare, Zimbabwe.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Structure

```
app/
  layout.tsx            root layout, metadata, JSON-LD, fonts
  page.tsx              home
  about|services|projects|contact/
  services/[slug]/      one page per service, statically generated
  api/quote/route.ts    quote enquiry endpoint
  sitemap.ts robots.ts  generated at build
  icon.png apple-icon.png
components/
  layout/               Navbar, Footer, Logo, MobileActionBar
  ui/                   Container, Button, SectionHeading, Eyebrow, ArchImage, Reveal, PageHeader
  home/                 Hero, TrustStrip, ServicesGrid, FeaturedProjects, AboutPreview, WhyBetta, CtaBand
  projects/             ProjectGallery (filters + lightbox)
  contact/              QuoteForm
lib/
  site.ts               all business content — the single source of truth
  gallery.ts            reads public/images/gallery/ at build time — see below
  quote.ts              form validation shared by the client and the API route
  utils.ts
styles/brand.css        brand tokens (@theme)
public/images/          logo, Open Graph card, placeholder imagery + README
public/images/gallery/  the projects gallery — drop a photo in, no code change
```

## Content

Everything the site says about the business lives in `lib/site.ts`. Contact
details and service copy are edited there, not in components. Gallery photos
are the one exception — see "The projects gallery" below.

Nothing in that file may be extended with invented history, certifications,
awards, client names, project counts, guarantees, a street address, extra email
addresses, social profiles or a website domain. Only material the business
supplies goes in.

Gallery photos are read from `public/images/gallery/` (`lib/gallery.ts`), not
listed in `lib/site.ts`. Their filename encodes a `reference`/`project` flag;
anything not explicitly `project` is labelled on the site as a design
reference and is **not** presented as a completed installation. See
`public/images/README.md` for the naming convention.

## Brand

Red `#BE0101` and orange `#FD7A00` are sampled from the supplied logo artwork.
Tokens live in `styles/brand.css`.

The orange reaches only 2.6:1 against white, so it is never used for text or as
a fill behind light text. It appears as rules, frames, icons and accents. The
red carries brand-weight text and buttons at 6.6:1. The CTA band runs deep red
to a dark ember rather than to the bright orange, which keeps white text above
6:1; the bright orange sits on top as the accent.

The logo mark is never recoloured, redrawn or distorted. It is cropped in one
deliberate, requested way: `public/images/betta-logo.png` is the house icon
and "Betta Aluminium Solutions" wordmark only — the tagline and service-list
rows from the original supplied lockup are removed at the asset level, not
hidden with CSS. The untouched original is kept at
`public/images/betta-logo-full.png` for reference. The cropped artwork still
carries a white outline around every shape and letter, which is what keeps it
legible directly on the charcoal footer with no extra background plate
needed.

## Images

Every photographic slot currently holds a stock photo standing in for real
project photography (previously these were generated placeholder SVGs).
`public/images/README.md` lists every file, what it currently depicts, its
source and the aspect it is laid out for. Drop a real `.jpg`, `.webp` or
`.avif` in at the same path and update `lib/site.ts` when the business
supplies its own photography — nothing else needs to change.

Raster photographs are optimized automatically by `next/image`;
`components/ui/ArchImage.tsx` and `ProjectGallery` only skip optimization for
`.svg` sources (the optimizer can't process SVG without
`dangerouslyAllowSVG`), so no config change was needed for this swap.

## Quote form

`components/contact/QuoteForm.tsx` posts to `/api/quote`. Validation lives in
`lib/quote.ts` and runs in both places, so the browser and the server cannot
disagree. A hidden honeypot field is accepted silently.

No email provider is wired up. Set `QUOTE_WEBHOOK_URL` to any endpoint that
accepts a JSON POST, or replace `deliver()` in `app/api/quote/route.ts` with a
Resend / SendGrid / Postmark / SMTP call. Three outcomes are already handled by
the form:

| Response | Form behaviour |
| --- | --- |
| `200 {ok:true}` | Success panel |
| `400 validation_failed` | Server errors rendered per field |
| `503 not_configured` / network failure | Notice plus a prefilled `mailto:` fallback, so an enquiry is never silently lost |

## Deployment

Set `NEXT_PUBLIC_SITE_URL` before building. Canonical URLs, Open Graph tags,
`sitemap.xml` and `robots.txt` all read it; without it they fall back to
`http://localhost:3000`.

## Mobile enquiry bar

Below `lg`, `components/layout/MobileActionBar.tsx` renders a persistent
bottom bar with "Call Now" and "WhatsApp" actions, built from the first
Zimbabwe number in `phones`. It exists because the desktop "Get a Quote"
button is hidden inside the collapsed mobile menu, so without it there is no
one-tap contact path while a phone visitor is just browsing.

## CI

`.github/workflows/ci.yml` runs `npm run lint`, `tsc --noEmit` and
`npm run build` on every push and pull request.

## Accessibility

Audited at 320, 390, 768, 1024 and 1440 px across every page: no horizontal
scroll, exactly one `h1` per page, alt text on every image, no unnamed controls,
and no text below WCAG AA contrast. Phone numbers are `tel:` links and the email
is a `mailto:` link. Reveal animations are gated behind a `.js` class added
before first paint, so content is never stuck invisible without scripting, and
they are disabled under `prefers-reduced-motion`.

The home hero is an auto-advancing carousel (`components/home/Hero.tsx`), which
needs its own accessibility handling beyond the rest of the site: autoplay
pauses on hover, on keyboard focus inside it, and permanently under
`prefers-reduced-motion`; a visible pause/play button gives everyone else a way
to stop it (WCAG 2.2.2); only the first slide loads with `priority` so the
other three don't compete with it for LCP; and the heading/subtext/CTAs stay
fixed while only the background photo rotates, so the page keeps exactly one
`h1` and never mid-sentence swaps text under a screen reader or a keyboard
user's focus.
