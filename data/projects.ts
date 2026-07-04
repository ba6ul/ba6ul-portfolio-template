export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  type: "code" | "video";
  routeType: "apps" | "games" | "web"; // determines internal detail page prefix
  tech?: string[];        // matched against techIconMap in techIcons.ts
  github?: string;        // present if open source / code is public
  live?: string;          // Play Store / demo / production link
  devlog?: string;        // optional devlog video/post link
  featured?: boolean;     // true = renders with the solid accent color treatment
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
      routeType: "apps",
      tech: ["Flutter", "Dart", "BLoC","TMDB"],
      github: "https://github.com/ba6ul/vishram",
      live: "https://play.google.com/store/apps/details?id=com.haripin.vishram",
      featured: true,
    },
    {
      id: "sudoku",
      title: "Sudoku",
      description:
        "A Sudoku game built in Godot with a win-animation system, streak tracking, and a custom numpad badge counter.",
      category: "Mobile",
      image: "/app_banner/sudoku_banner.png",
      type: "code",
      routeType: "games",
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
      routeType: "apps",
      tech: ["Flutter", "Dart"],
      github: "https://github.com/ba6ul/inicons",
      live: "https://play.google.com/store/apps/details?id=com.haripin.inicons",
    },
  ],
};