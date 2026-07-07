"use client";

import Image, { type StaticImageData } from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Wrench } from "lucide-react";

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

import javascritLogo from "@/assets/svg/javascriptLogo.svg";
import awsLogo from "@/assets/svg/awsLogo.svg";
import blocLogo from "@/assets/svg/blocLogo.svg";
import gitLogo from "@/assets/svg/gitLogo.svg";
import mysqlLogo from "@/assets/svg/mysqlLogo.svg";
import postgresqlLogo from "@/assets/svg/postgresqlLogo.svg";
import pythonLogo from "@/assets/svg/pythonLogo.svg";

type TechIcon = {
  src: StaticImageData;
  name: string;
};

type TechStack = {
  label: string;
  subtitle: string;
  icons: TechIcon[];
};

const techStacks: TechStack[] = [
  {
    label: "Mobile Development",
    subtitle: "Flutter • Kotlin • Compose",
    icons: [
      { src: flutterLogo, name: "Flutter" },
      { src: dartLogo, name: "Dart" },
      { src: nextLogo, name: "Kotlin" },
      { src: nextLogo, name: "Jetpack Compose" },
      { src: nextLogo, name: "Material 3" },
      { src: androidStudioLogo, name: "Android Studio" },
    ],
  },
  {
    label: "Architecture",
    subtitle: "BLoC • Cubit • Clean Architecture",
    icons: [
      { src: blocLogo, name: "BLoC" },
      { src: nextLogo, name: "Cubit" },
      { src: nextLogo, name: "Clean Architecture" },
      { src: nextLogo, name: "MVC" },
      { src: nextLogo, name: "Feature-First Design" },
    ],
  },
  {
    label: "Backend Development",
    subtitle: "Laravel • PHP • REST APIs",
    icons: [
      { src: laravelLogo, name: "Laravel" },
      { src: phpLogo, name: "PHP" },
      { src: nextLogo, name: "REST APIs" },
    ],
  },
  {
    label: "Frontend Development",
    subtitle: "Next.js • Vue • Tailwind",
    icons: [
      { src: nextLogo, name: "Next.js" },
      { src: vueLogo, name: "Vue.js" },
      { src: tailwindLogo, name: "Tailwind CSS" },
      { src: javascritLogo, name: "JavaScript" },
    ],
  },
  {
    label: "Database",
    subtitle: "Supabase • Firebase • SQL",
    icons: [
      { src: supabaseLogo, name: "Supabase" },
      { src: firebaseLogo, name: "Firebase" },
      { src: postgresqlLogo, name: "PostgreSQL" },
      { src: mysqlLogo, name: "MySQL" },
    ],
  },
  {
    label: "Cloud & DevOps",
    subtitle: "AWS • Git",
    icons: [
      { src: awsLogo, name: "AWS" },
      { src: gitLogo, name: "Git" },
    ],
  },
  {
    label: "Programming Languages",
    subtitle: "Dart • Java • Python",
    icons: [
      { src: dartLogo, name: "Dart" },
      { src: nextLogo, name: "Java" },
      { src: pythonLogo, name: "Python" },
      { src: javascritLogo, name: "JavaScript" },
      { src: godotLogo, name: "GDScript" },
    ],
  },
  {
    label: "Game Development",
    subtitle: "Godot Engine",
    icons: [{ src: godotLogo, name: "Godot Engine" }],
  },
  {
    label: "Services & APIs",
    subtitle: "Google Maps API",
    icons: [{ src: nextLogo, name: "Google Maps API" }],
  },
];

export function TechStackTicker() {
  const items = [...techStacks, ...techStacks];

  return (
    <section className="bg-white py-14">
      <div className="container">
        {/* Heading - Updated to match "Selected Work" style */}
        <div className="mb-8 md:mb-10 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 sm:h-5 w-4 sm:w-5 shrink-0 fill-[#C15F3C] text-[#C15F3C]" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              My Toolkit
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Technologies and frameworks I use to build apps, platforms and
            interactive experiences.
          </p>
        </div>

        <div
          className="group overflow-hidden pt-12 -mt-12 pb-4 -mb-4"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="animate-ticker flex w-max flex-none gap-6 pr-6 hover:[animation-play-state:paused]">
            {items.map((stack, index) => (
              <div
                key={`${stack.label}-${index}`}
                className="group/card flex flex-none items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm transition-all duration-500 hover:shadow-lg"
              >
                {/* Icons */}
                <div className="flex items-center">
                  <TooltipProvider delayDuration={200}>
                    {stack.icons.map((icon, iconIndex) => (
                      <Tooltip key={iconIndex}>
                        <TooltipTrigger asChild>
                          <div
                            className={`group/icon relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-stone-200/60 bg-gradient-to-b from-white to-stone-50 shadow-sm ring-2 ring-white transition-all duration-500 ease-in-out hover:!scale-110 hover:shadow-md ${
                              iconIndex === 0
                                ? "ml-0"
                                : "-ml-3.5 group-hover/card:ml-2"
                            }`}
                            style={{
                              zIndex: stack.icons.length - iconIndex,
                            }}
                          >
                            <Image
                              src={icon.src}
                              alt={icon.name}
                              width={24}
                              height={24}
                              className="object-contain"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          sideOffset={8}
                          className="bg-stone-900 text-white"
                        >
                          <p className="text-xs font-medium">{icon.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>

                {/* Text */}
                <div className="ml-2 transition-all duration-500">
                  <p className="text-sm font-bold text-stone-900">
                    {stack.label}
                  </p>
                  <p className="text-xs text-stone-500">{stack.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
