export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  type: "code" | "video";
  tech?: string[];        // matched against techIconMap in techIcons.ts
  github?: string;        // present if open source / code is public
  live?: string;          // Play Store / demo / production link
  devlog?: string;        // optional devlog video/post link
  featured?: boolean;     // true = renders with the solid accent color treatment

  // Detail page fields (/projects/[id]) — all optional, only "code" type
  // projects get a detail page. Fill in as content becomes available;
  // placeholder empty-states are shown for anything left unset.
  tagline?: string;
  screenshots?: string[]; // filenames under public/projects/<id>/
  features?: { icon: string; title: string; description: string }[];
  stats?: { label: string; value: string }[];
}

export const portfolio: {
  categories: string[];
  projects: Project[];
} = {
  categories: ["All", "Video", "Mobile", "Web", "Open Source"],
  projects: [
    {
      id: "vishram",
      title: "Vishram",
      description:
        "A Flutter movie and show tracking app with TMDB integration, Clean Architecture, BLoC/Cubit state management, and a 47-badge gamification system.",
      category: "Mobile",
      image: "/app_banner/vishram_banner.png",
      type: "code",
      tech: ["Flutter", "Dart", "BLoC","TMDB"],
      github: "https://github.com/ba6ul/vishram",
      live: "https://play.google.com/store/apps/details?id=com.haripin.vishram",
      featured: true,
      tagline: "Your personal movie companion",
      features: [
        {
          icon: "🎬",
          title: "Four watchlist states",
          description: "Saved, watching, done, and liked. Every movie has its place.",
        },
        {
          icon: "🏆",
          title: "Badges & achievements",
          description: "Unlock 47 badges as you track more movies and explore new genres.",
        },
        {
          icon: "🎭",
          title: "Directors & actors",
          description: "Follow your favourite directors and actors to never miss their work.",
        },
      ],
    },
    {
      id: "sudoku",
      title: "Sudoku",
      description:
        "A Sudoku game built in Godot with a win-animation system, streak tracking, and a custom numpad badge counter.",
      category: "Mobile",
      image: "/app_banner/sudoku_banner.png",
      type: "code",
      tech: ["Godot"],
      github: "https://github.com/ba6ul/Sudooku",
      live: "https://play.google.com/store/apps/details?id=com.hapgames.sudoku&pcampaignid=web_share",
    },
    {
      id: "inicons",
      title: "inIcons",
      description:
        "An icon pack / utility app published under HariPin Studio.",
      category: "Mobile",
      image: "/app_banner/inicons_banner.png",
      type: "code",
      tech: ["Flutter", "Dart"],
      github: "https://github.com/ba6ul/inicons",
      live: "https://play.google.com/store/apps/details?id=com.haripin.inicons",
    },
  ],
};