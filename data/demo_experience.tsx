// data/experience.ts
import flutterLogo from "@/assets/svg/flutterLogo.svg"
import dartLogo from "@/assets/svg/dartLogo.svg"
import laravelLogo from "@/assets/svg/laravelLogo.svg"
import phpLogo from "@/assets/svg/phpLogo.svg"
import mysqlLogo from "@/assets/svg/mysqlLogo.svg"
import awsLogo from "@/assets/svg/awsLogo.svg"
import gitLogo from "@/assets/svg/gitLogo.svg"
import godotLogo from "@/assets/svg/godotLogo.svg"
import firebaseLogo from "@/assets/svg/firebaseLogo.svg"
import blocLogo from "@/assets/svg/blocLogo.svg"


import { ExperienceItem } from "./types"

export const techExperience: ExperienceItem[] = [
  {
    id: "company-one-lead",
    tag: "tech",
    role: "Lead Mobile & Full-Stack Developer",
    org: "TechCorp Solutions",
    location: "Mumbai, India",
    yearRange: "2025-present",
    startDate: "2025-11",
    endDate: "present",
    summary: (
      <>
        Led a <span className="font-semibold bg-orange-500/20 border-b-2 border-orange-500 px-1 rounded-sm">team of 5 developers</span> in building a Flutter mobile app and Laravel/Vue.js e-commerce platform.
      </>
    ),
    details: (
      <>
        <span className="font-semibold border-b-2 border-dotted border-orange-500">Reduced operational overhead by 50-70%</span> by automating backend workflows, implementing payment integrations, and managing database synchronization. Built comprehensive admin dashboards and optimized API performance.
      </>
    ),
    techStack: [
      { icon: flutterLogo, label: "Flutter" },
      { icon: dartLogo, label: "Dart" },
      { icon: laravelLogo, label: "Laravel" },
      { icon: phpLogo, label: "PHP" },
      { icon: mysqlLogo, label: "MySQL" },
    ],
    links: [],
  },
  {
    id: "startup-lead",
    tag: "tech",
    role: "Flutter Engineer & Team Lead",
    org: "InnovateTech Labs",
    yearRange: "2025",
    startDate: "2025-06",
    endDate: "2025-09",
    summary: (
      <>
        Led a <span className="font-semibold bg-orange-500/20 border-b-2 border-orange-500 px-1 rounded-sm">team of 8 interns</span> to architect and ship a multi-platform ecosystem application in Flutter.
      </>
    ),
    details: (
      <>
        Architected modular apps using <span className="font-semibold border-b-2 border-dotted border-orange-500">Clean Architecture</span> with feature-first structuring. Coordinated development sprints, code reviews, and maintained architectural consistency. Integrated third-party APIs and cloud storage solutions for secure data management.
      </>
    ),
    techStack: [
      { icon: flutterLogo, label: "Flutter" },
      { icon: blocLogo, label: "BLoC" },
      { icon: firebaseLogo, label: "Firebase" },
      { icon: awsLogo, label: "AWS" },
      { icon: gitLogo, label: "Git" },
    ],
    links: [],
  },
  {
    id: "independent-studio",
    tag: "tech",
    role: "Founder & Software Engineer",
    org: "PixelForge Studios",
    yearRange: "2023-present",
    startDate: "2023-01", 
    endDate: "present",
    summary: (
      <>
        Independent studio shipping{" "}
        <span className="font-semibold border-b-2 border-dotted border-orange-500">
          5+ production applications
        </span>{" "}
        across multiple platforms.
      </>
    ),
    details: (
      <>
        <span className="font-semibold bg-orange-500/20 border-b-2 border-orange-500 px-1 rounded-sm">Managed full product lifecycle</span> from concept and architecture to deployment and user support. Shipped multiple consumer-facing applications with strong user ratings and engagement metrics.
      </>
    ),
    techStack: [
      { icon: flutterLogo, label: "Flutter" },
      { icon: dartLogo, label: "Dart" },
      { icon: godotLogo, label: "Godot" },
      { icon: firebaseLogo, label: "Firebase" },
    ],
    links: [{ label: "Portfolio", href: "" }],
  },
  {
    id: "project-content-app",
    tag: "tech",
    type: "product",
    role: "Product Developer",
    org: "PixelForge Studios",
    location: "Independent",
    yearRange: "2025-2026",
    startDate: "2025-01",
    endDate: "present",
    summary: (
      <>
        Built a cross-platform companion application using modern architecture patterns, achieving <span className="font-semibold bg-orange-500/20 border-b-2 border-orange-500 px-1 rounded-sm">1000+ active users</span>.
      </>
    ),
    details: (
      <>
        Implemented advanced state management for complex features, search functionality, and filtering systems. Designed <span className="font-semibold border-b-2 border-dotted border-orange-500">offline-first architecture</span> for data persistence and seamless user experience using cloud backend integrations.
      </>
    ),
    techStack: [
      { icon: flutterLogo, label: "Flutter" },
      { icon: dartLogo, label: "Dart" },
      { icon: blocLogo, label: "BLoC" },
      { icon: firebaseLogo, label: "Firebase" },
    ],
    links: [
      { label: "Live App", href: "/apps/project-one" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
  {
    id: "project-game",
    tag: "tech",
    type: "product",
    role: "Game Developer",
    org: "PixelForge Studios",
    location: "Independent",
    yearRange: "2025-2026",
    startDate: "2025-03",
    endDate: "present",
    summary: (
      <>
        Developed a cross-platform puzzle game featuring <span className="font-semibold border-b-2 border-dotted border-orange-500">advanced algorithmic game mechanics</span> and optimized performance.
      </>
    ),
    details: (
      <>
        Built with modern game engine, <span className="font-semibold bg-orange-500/20 border-b-2 border-orange-500 px-1 rounded-sm">optimizing for mobile devices</span> with efficient rendering and responsive input handling systems.
      </>
    ),
    techStack: [
      { icon: godotLogo, label: "Godot" },
      { icon: gitLogo, label: "Git" },
    ],
    links: [
      { label: "Devlog", href: "/apps/project-game" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
  {
    id: "project-design-tool",
    tag: "tech",
    type: "product",
    role: "Founder & Product Designer",
    org: "PixelForge Studios",
    location: "Independent",
    yearRange: "2024-2025",
    startDate: "2024-08",
    endDate: "2025-01",
    summary: (
      <>
        Created a specialized utility application for creators, <span className="font-semibold bg-orange-500/20 border-b-2 border-orange-500 px-1 rounded-sm">gaining strong user feedback</span> and consistent engagement.
      </>
    ),
    details: (
      <>
        Handled product design, branding, asset management, and distribution strategy. Focused on user experience and building a sustainable product ecosystem.
      </>
    ),
    techStack: [
      { icon: flutterLogo, label: "Flutter" },
      { icon: gitLogo, label: "Git" },
    ],
    links: [
      { label: "Website", href: "/apps/project-tool" },
    ],
  }
];