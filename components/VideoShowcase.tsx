// @/components/profile/VideoShowcase.tsx

import { videos } from "@/data/videos";
import { getYoutubeMeta } from "@/lib/youtube";
import { VideoShowcaseClient } from "./VideoShowcaseClient";

export async function VideoShowcase() {
  // Promise.all runs all YouTube API fetches concurrently (at the same time),
  // making it much faster than doing it one by one in a loop.
  const videosWithMeta = await Promise.all(
    videos.map(async (v) => ({
      ...v, // Keep the original id, url, and featured flag
      ...(await getYoutubeMeta(v.id)), // Merge in the fetched title, channel, and thumbnail
    }))
  );

  // Pass the fully populated data into the interactive client component
  return <VideoShowcaseClient videos={videosWithMeta} />;
}