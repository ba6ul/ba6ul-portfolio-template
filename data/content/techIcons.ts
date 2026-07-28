import flutterLogo from "@/assets/svg/flutterLogo.svg";
import dartLogo from "@/assets/svg/dartLogo.svg";
import androidStudioLogo from "@/assets/svg/androidstudioLogo.svg";
import laravelLogo from "@/assets/svg/laravelLogo.svg";
import phpLogo from "@/assets/svg/phpLogo.svg";
import vueLogo from "@/assets/svg/vuejsLogo.svg";
import tailwindLogo from "@/assets/svg/tailwindcssLogo.svg";
import nextLogo from "@/assets/svg/nextjsLogo.svg";
import firebaseLogo from "@/assets/svg/firebaseLogo.svg";
import supabaseLogo from "@/assets/svg/supabaseLogo.svg";
import godotLogo from "@/assets/svg/godotLogo.svg";
import javascriptLogo from "@/assets/svg/javascriptLogo.svg";
import awsLogo from "@/assets/svg/awsLogo.svg";
import blocLogo from "@/assets/svg/blocLogo.svg";
import gitLogo from "@/assets/svg/gitLogo.svg";
import mysqlLogo from "@/assets/svg/mysqlLogo.svg";
import postgresqlLogo from "@/assets/svg/postgresqlLogo.svg";
import pythonLogo from "@/assets/svg/pythonLogo.svg";
import type { StaticImageData } from "next/image";

// Maps a tech name (as used in project data) to its icon and display label.
// Keys are matched case-insensitively when looked up via getTechIcon().
export const techIconMap: Record<string, { icon: StaticImageData; label: string }> = {
  flutter: { icon: flutterLogo, label: "Flutter" },
  dart: { icon: dartLogo, label: "Dart" },
  "android studio": { icon: androidStudioLogo, label: "Android Studio" },
  laravel: { icon: laravelLogo, label: "Laravel" },
  php: { icon: phpLogo, label: "PHP" },
  vue: { icon: vueLogo, label: "Vue.js" },
  "vue.js": { icon: vueLogo, label: "Vue.js" },
  tailwind: { icon: tailwindLogo, label: "Tailwind CSS" },
  tailwindcss: { icon: tailwindLogo, label: "Tailwind CSS" },
  next: { icon: nextLogo, label: "Next.js" },
  "next.js": { icon: nextLogo, label: "Next.js" },
  firebase: { icon: firebaseLogo, label: "Firebase" },
  supabase: { icon: supabaseLogo, label: "Supabase" },
  godot: { icon: godotLogo, label: "Godot" },
  gdscript: { icon: godotLogo, label: "GDScript" },
  javascript: { icon: javascriptLogo, label: "JavaScript" },
  js: { icon: javascriptLogo, label: "JavaScript" },
  aws: { icon: awsLogo, label: "AWS" },
  bloc: { icon: blocLogo, label: "BLoC" },
  git: { icon: gitLogo, label: "Git" },
  mysql: { icon: mysqlLogo, label: "MySQL" },
  postgresql: { icon: postgresqlLogo, label: "PostgreSQL" },
  postgres: { icon: postgresqlLogo, label: "PostgreSQL" },
  python: { icon: pythonLogo, label: "Python" },
};

/**
 * Look up icon + label for a tech name. Returns null if not found,
 * so the caller can decide how to render unknown tech (e.g. skip or show as text).
 */
export function getTechIcon(name: string) {
  return techIconMap[name.trim().toLowerCase()] ?? null;
}