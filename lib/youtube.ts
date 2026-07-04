// @/lib/youtube.ts

export interface YoutubeMeta {
  title: string;
  channel: string;
  thumbnail: string;
}

export async function getYoutubeMeta(videoId: string): Promise<YoutubeMeta> {
  try {
    // We use YouTube's oEmbed endpoint. It's a public API that returns basic metadata
    // without needing an API key. 
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://youtu.be/${videoId}&format=json`,
      // NEXT.JS MAGIC: This caches the result for 24 hours (86,400 seconds).
      // This means your portfolio won't spam YouTube's servers on every page visit,
      // making your site load incredibly fast after the first visit.
      { next: { revalidate: 60 * 60 * 24 } } 
    );
    
    if (!res.ok) throw new Error("oEmbed fetch failed");
    
    const data = await res.json();
    return {
      title: data.title,
      channel: data.author_name,
      // maxresdefault is the highest quality thumbnail available for a video.
      thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    };
  } catch {
    // FALLBACK: If the YouTube API fails (or gets rate limited), the site won't break.
    // It falls back to a lower-quality default image URL that YouTube always hosts.
    return {
      title: "Untitled",
      channel: "",
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    };
  }
}