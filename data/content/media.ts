// @/data/team/media.ts
//
// Standalone visual content (photo-edit slideshows, art, gifs) — separate
// from `projects.ts` since these aren't coded projects or videos, they're a
// different content shape entirely (a folder of related images rather than
// a single thumbnail + links).

export interface MediaEntry {
  id: string;
  kind: "slideshow"; // "image" | "gif" can join this union once we have those
  images: string[]; // paths under /public, same edit/position across the set
  aspect: "square" | "portrait" | "landscape"; // bento sizing bucket — see ProjectsClient
}

export const media: MediaEntry[] = [
  {
    id: "ba6ul_pe_1",
    kind: "slideshow",
    images: [
      "/ba6ul_images/photo_editing/ba6ul_pe_1/701675137_18116362273800335_31444329372726056_n.webp",
      "/ba6ul_images/photo_editing/ba6ul_pe_1/702611949_18116362255800335_1649999436616002309_n.webp",
      "/ba6ul_images/photo_editing/ba6ul_pe_1/702746116_18116362264800335_4865874119629025664_n.webp",
      "/ba6ul_images/photo_editing/ba6ul_pe_1/703055260_18116362246800335_5236532534649046208_n.webp",
    ],
    // Actual export is 1170x1462 (a "weird magic number"), but that's ~0.8
    // ratio — Instagram's 4:5 portrait bucket (1080x1350). Treat it as that.
    aspect: "portrait",
  },
  {
    id: "ba6ul_pe_2",
    kind: "slideshow",
    images: [
      "/ba6ul_images/photo_editing/ba6ul_pe_2/656290166_18072930314406731_4525323792353171822_n.webp",
      "/ba6ul_images/photo_editing/ba6ul_pe_2/659692305_18578556499026028_7678939669800608990_n.webp",
    ],
    aspect: "portrait",
  },
];
