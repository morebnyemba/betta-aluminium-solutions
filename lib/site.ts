/**
 * Single source of truth for everything the site says about the business.
 *
 * Every fact here was supplied by Betta Aluminium Solutions. Nothing in this
 * file may be extended with invented history, certifications, awards, client
 * names, project counts, guarantees, street addresses, extra email addresses,
 * social profiles or a website domain. Add to it only from supplied material.
 */

export const site = {
  name: "Betta Aluminium Solutions",
  shortName: "Betta Aluminium",
  tagline: "Quality Spaces. Brighter Living.",
  description:
    "Betta Aluminium Solutions provides quality aluminium windows, doors, partitions, shopfronts and custom aluminium fabrication solutions in Zimbabwe.",
  location: "Harare, Zimbabwe",
  // No public domain has been supplied. Set NEXT_PUBLIC_SITE_URL at deploy time
  // and canonical URLs, sitemap and Open Graph tags pick it up automatically.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const phones = [
  { label: "Zimbabwe", number: "+263 776 596 851" },
  { label: "Zimbabwe", number: "+263 714 475 360" },
  { label: "International", number: "+44 7947 129 539" },
] as const;

export const email = "bnayasha57@gmail.com";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
] as const;

export type ServiceSlug =
  | "windows"
  | "doors"
  | "partitions"
  | "shopfronts"
  | "aluminium-fabrication";

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Used in the services grid and on the detail page lead. */
  summary: string;
  /** Longer body for the detail page. Descriptive only — no claims. */
  body: string[];
  /** Capability bullets. Descriptions of the work, not promises. */
  points: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "windows",
    name: "Windows",
    summary:
      "Modern aluminium windows designed for functionality and style.",
    body: [
      "We design, fabricate and install aluminium window systems for residential and commercial buildings, working from your openings and the way each room is used.",
      "Frames are cut, assembled and glazed to the measurements of the project, so sightlines stay consistent across an elevation and the finished window sits square in the opening.",
    ],
    points: [
      "Sliding, top-hung, side-hung and fixed configurations",
      "Frames fabricated to measured openings",
      "Glazing specified around light, privacy and ventilation",
      "Finishes selected to suit the building",
    ],
    image: "/images/service-windows.svg",
    imageAlt:
      "Aluminium-framed window system in a contemporary room, seen from inside",
  },
  {
    slug: "doors",
    name: "Doors",
    summary: "Aluminium entrance, hinged and sliding doors.",
    body: [
      "Aluminium doors for entrances, patios and internal openings, from single hinged doors through to wide sliding and stacking sets.",
      "Each set is fabricated around the opening and the traffic it carries, with the frame, glazing and hardware chosen together so the door runs cleanly and closes the same way on the last day as the first.",
    ],
    points: [
      "Hinged, sliding, stacking and entrance sets",
      "Commercial entrance doors for higher traffic",
      "Glazing and hardware matched to the opening",
      "Frames squared and levelled on installation",
    ],
    image: "/images/service-doors.svg",
    imageAlt:
      "Wide aluminium sliding door set opening from a living space onto a terrace",
  },
  {
    slug: "partitions",
    name: "Partitions",
    summary: "Modern glass and aluminium partition systems.",
    body: [
      "Glass and aluminium partitions divide a floor plate without closing it in, keeping daylight moving through the space while giving each area its own boundary.",
      "We set out the partition run against the ceiling grid and floor finish, fabricate the framing to that setting-out, and glaze it on site.",
    ],
    points: [
      "Office and retail partition runs",
      "Full-height and part-height configurations",
      "Framed and slim-framed glazed panels",
      "Shower and bathroom enclosures",
    ],
    image: "/images/service-partitions.svg",
    imageAlt:
      "Glazed aluminium partition dividing an open-plan office interior",
  },
  {
    slug: "shopfronts",
    name: "Shopfronts",
    summary: "Professional aluminium and glass shopfront solutions.",
    body: [
      "Shopfronts are the first thing a customer reads about a business, so the framing, the glass line and the entrance need to work together.",
      "We fabricate and install aluminium and glass shopfronts for retail units and commercial frontages, setting the entrance, fixed glazing and framing out as one elevation.",
    ],
    points: [
      "Retail and commercial frontages",
      "Entrance doors integrated into the glazed line",
      "Large-format fixed glazing",
      "Framing set out across the full elevation",
    ],
    image: "/images/service-shopfronts.svg",
    imageAlt:
      "Aluminium and glass shopfront on a commercial street frontage",
  },
  {
    slug: "aluminium-fabrication",
    name: "Aluminium Fabrication",
    summary: "Custom aluminium fabrication for unique requirements.",
    body: [
      "Not every opening has a standard answer. Where a project needs something made rather than selected, we fabricate it.",
      "Work is measured, cut and assembled to the drawing or to the site condition, which makes it suited to alterations, non-standard openings and one-off elements.",
    ],
    points: [
      "Custom frames and non-standard openings",
      "Fabrication to drawing or to site measurement",
      "Alterations and replacement sections",
      "One-off aluminium elements",
    ],
    image: "/images/service-fabrication.svg",
    imageAlt: "Aluminium sections being measured and assembled in fabrication",
  },
];

export const valueProps = [
  {
    title: "Quality Fabrication",
    body: "Precision-focused aluminium work.",
    icon: "ruler",
  },
  {
    title: "Modern Designs",
    body: "Contemporary solutions for modern spaces.",
    icon: "layout",
  },
  {
    title: "Custom Solutions",
    body: "Designed around each project's requirements.",
    icon: "pencil",
  },
  {
    title: "Professional Installation",
    body: "Clean and reliable installation.",
    icon: "wrench",
  },
] as const;

export const whyBetta = [
  {
    index: "01",
    title: "Quality",
    body: "Materials and workmanship judged on how the finished installation looks and works, not on how fast it went up.",
  },
  {
    index: "02",
    title: "Precision",
    body: "Openings measured on site and sections cut to those measurements, so frames sit square and sightlines stay consistent.",
  },
  {
    index: "03",
    title: "Custom Design",
    body: "Each system set out around the space it belongs to, rather than forcing a standard unit into a non-standard opening.",
  },
  {
    index: "04",
    title: "Professional Installation",
    body: "Installation handled as part of the job — set out, fitted, adjusted and left clean.",
  },
] as const;

export type ProjectCategory =
  | "Windows"
  | "Doors"
  | "Partitions"
  | "Shopfronts"
  | "Commercial";

export type GalleryItem = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  alt: string;
  /**
   * `reference` marks imagery used to show the type of work only. It is not
   * presented as a completed Betta Aluminium Solutions installation.
   * Switch to "project" only for work the business confirms as its own.
   */
  kind: "reference" | "project";
  /** Controls the masonry span so the grid reads as architectural, not uniform. */
  span?: "tall" | "wide";
};

export const gallery: GalleryItem[] = [
  {
    id: "g1",
    title: "Aluminium glass facade",
    category: "Commercial",
    image: "/images/project-facade.svg",
    alt: "Multi-storey aluminium and glass facade on a commercial building",
    kind: "reference",
    span: "tall",
  },
  {
    id: "g2",
    title: "Residential window set",
    category: "Windows",
    image: "/images/project-windows-residential.svg",
    alt: "Aluminium windows in a contemporary residential elevation",
    kind: "reference",
  },
  {
    id: "g3",
    title: "Sliding door opening",
    category: "Doors",
    image: "/images/project-sliding-door.svg",
    alt: "Aluminium sliding door opening onto an outdoor terrace",
    kind: "reference",
    span: "wide",
  },
  {
    id: "g4",
    title: "Office partition run",
    category: "Partitions",
    image: "/images/project-office-partition.svg",
    alt: "Glazed aluminium partitions dividing an office floor",
    kind: "reference",
  },
  {
    id: "g5",
    title: "Retail shopfront",
    category: "Shopfronts",
    image: "/images/project-shopfront.svg",
    alt: "Aluminium and glass retail shopfront with a glazed entrance door",
    kind: "reference",
    span: "tall",
  },
  {
    id: "g6",
    title: "Shower enclosure",
    category: "Partitions",
    image: "/images/project-shower.svg",
    alt: "Framed glass shower enclosure in a tiled bathroom",
    kind: "reference",
  },
  {
    id: "g7",
    title: "Commercial glazed entrance",
    category: "Commercial",
    image: "/images/project-entrance.svg",
    alt: "Glazed aluminium entrance to a commercial building",
    kind: "reference",
  },
  {
    id: "g8",
    title: "Corner window detail",
    category: "Windows",
    image: "/images/project-corner-window.svg",
    alt: "Corner aluminium window detail against a rendered wall",
    kind: "reference",
    span: "wide",
  },
  {
    id: "g9",
    title: "Entrance door set",
    category: "Doors",
    image: "/images/project-entrance-door.svg",
    alt: "Aluminium entrance door set with a glazed side panel",
    kind: "reference",
  },
  {
    id: "g10",
    title: "Large commercial glazing",
    category: "Commercial",
    image: "/images/project-commercial-glazing.svg",
    alt: "Large-format aluminium glazing across a commercial frontage",
    kind: "reference",
    span: "tall",
  },
];

export const projectCategories: Array<ProjectCategory | "All"> = [
  "All",
  "Windows",
  "Doors",
  "Partitions",
  "Shopfronts",
  "Commercial",
];

export const projectTypeOptions = [
  "Windows",
  "Doors",
  "Partitions",
  "Shopfronts",
  "Aluminium Fabrication",
  "Other",
] as const;

export type ProjectTypeOption = (typeof projectTypeOptions)[number];
