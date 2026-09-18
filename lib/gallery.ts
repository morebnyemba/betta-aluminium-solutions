import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import type { GalleryItem, ProjectCategory } from "./site";

const GALLERY_DIR = path.join(process.cwd(), "public", "images", "gallery");
const PUBLIC_PATH = "/images/gallery";

const CATEGORY_SLUGS: Record<string, ProjectCategory> = {
  window: "Windows",
  windows: "Windows",
  door: "Doors",
  doors: "Doors",
  partition: "Partitions",
  partitions: "Partitions",
  shopfront: "Shopfronts",
  shopfronts: "Shopfronts",
  commercial: "Commercial",
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function titleCase(words: string): string {
  return words
    .split(" ")
    .filter(Boolean)
    .map((word) => (/^[a-z]/.test(word) ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

/**
 * Reads `{category}-{reference|project}-{title}.ext` — hyphen- or
 * underscore-separated, category and kind can appear anywhere, and either
 * (or both) can be missing. Never throws: a filename that matches nothing
 * still gets a Commercial/reference bucket and a title guessed from
 * whatever's left, since a photo the business drops in should always show
 * up rather than vanish for not following the convention exactly.
 */
function parseFilename(base: string): {
  category: ProjectCategory;
  kind: GalleryItem["kind"];
  title: string;
} {
  const tokens = base.split(/[-_]+/).filter(Boolean);
  let category: ProjectCategory | undefined;
  let kind: GalleryItem["kind"] = "reference";
  const titleTokens: string[] = [];

  for (const token of tokens) {
    const lower = token.toLowerCase();
    if (!category && CATEGORY_SLUGS[lower]) {
      category = CATEGORY_SLUGS[lower];
      continue;
    }
    if (lower === "project" || lower === "reference") {
      kind = lower;
      continue;
    }
    titleTokens.push(token);
  }

  const title = titleCase((titleTokens.length > 0 ? titleTokens : tokens).join(" "));

  return { category: category ?? "Commercial", kind, title };
}

async function readSpan(filePath: string): Promise<GalleryItem["span"]> {
  try {
    const { width, height } = await sharp(filePath).metadata();
    if (!width || !height) return undefined;
    const ratio = width / height;
    if (ratio > 1.35) return "wide";
    if (ratio < 0.75) return "tall";
    return undefined;
  } catch {
    // Unreadable dimensions (corrupt file, unsupported format quirk) — fall
    // back to the default masonry ratio rather than failing the build.
    return undefined;
  }
}

/**
 * Builds the projects gallery straight from public/images/gallery/. Drop a
 * photo in there — following the naming convention or not — and it appears
 * on the site with no code change, only a rebuild. See
 * public/images/README.md for the naming convention and what it controls.
 */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  let files: string[];
  try {
    files = await fs.readdir(GALLERY_DIR);
  } catch {
    return [];
  }

  const imageFiles = files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort();

  return Promise.all(
    imageFiles.map(async (file) => {
      const ext = path.extname(file);
      const base = file.slice(0, -ext.length);
      const { category, kind, title } = parseFilename(base);
      const span = await readSpan(path.join(GALLERY_DIR, file));

      const item: GalleryItem = {
        id: base,
        title,
        category,
        image: `${PUBLIC_PATH}/${file}`,
        alt: title,
        kind,
        span,
      };
      return item;
    }),
  );
}

/**
 * Picks up to `count` items spread across as many categories as possible,
 * round-robin. Plain `.slice(0, count)` would just take array order — since
 * items are now sorted alphabetically by filename rather than hand-ordered,
 * that biases toward whichever category's filenames happen to sort first
 * (e.g. every "commercial-*" file before any "windows-*" one) instead of
 * giving the homepage a representative spread.
 */
export function pickDiverse(items: GalleryItem[], count: number): GalleryItem[] {
  const byCategory = new Map<ProjectCategory, GalleryItem[]>();
  for (const item of items) {
    const list = byCategory.get(item.category);
    if (list) list.push(item);
    else byCategory.set(item.category, [item]);
  }
  const categories = [...byCategory.keys()];

  const picked: GalleryItem[] = [];
  for (let round = 0; picked.length < count; round++) {
    const before = picked.length;
    for (const category of categories) {
      if (picked.length >= count) break;
      const item = byCategory.get(category)?.[round];
      if (item) picked.push(item);
    }
    if (picked.length === before) break; // every category exhausted
  }
  return picked;
}
