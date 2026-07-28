// @/data/team/videos.ts

export interface VideoEntry {
  id: string;
  url: string; // YouTube/Vimeo link
  featured?: boolean; // Optional boolean flag. If true, it gets the big player on the left.
}

// This array holds the raw data. Later, the server component will map over this 
// to fetch the titles and thumbnails automatically!
export const videos: VideoEntry[] = [
  { id: "5-lofWYef9U", url: "https://youtu.be/5-lofWYef9U", featured: true },
  { id: "82RhhSWGnL4", url: "https://youtu.be/82RhhSWGnL4" },
  { id: "CXRPVB1d9l0", url: "https://youtu.be/CXRPVB1d9l0" },
  { id: "pNoVTjTCaYE", url: "https://youtu.be/pNoVTjTCaYE" },
  { id: "pOmeMwMqzTw", url: "https://youtu.be/pOmeMwMqzTw" },
  { id: "6O9DqyGXCpA", url: "https://youtu.be/6O9DqyGXCpA" },
];