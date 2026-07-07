// data/types.ts
import { StaticImageData } from "next/image"
import { ReactNode } from "react";

export type ExperienceTag = "tech" | "creative"

export interface TechStackIcon {
  icon: StaticImageData
  label: string // shown as a tooltip on hover, also used as alt text
}


export interface ExperienceItem {
  id: string                 // stable key, also used for popup deep-linking if you ever want that
  tag: ExperienceTag
  role: string
  org: string
  location?: string
  yearRange: string          // e.g. "2024-2025", drives the grouping/heading in the timeline
  startDate: string          // ISO string, e.g. "2024-03"
  endDate: string | "present"
  summary: ReactNode;           // shown on the card, short
  details: ReactNode;            // shown in the popup, longer
  type?: "job" | "product"
  techStack?: TechStackIcon[] // shown as an overlapping circle cluster on the card
  image?: string             // path under /public, optional
  links?: { label: string; href: string }[]   // e.g. "View on Play Store", "Case study"
}

// Same shape reused for tech stack, since both are "logo/image + label + popup with detail" cards.
// If a field only makes sense on one side (e.g. "proficiency" for tech, "tools mastered" for creative),
// keep it optional here rather than forking the type. Only fork the type if more than ~1-2 fields diverge.
export interface StackItem {
  id: string
  tag: ExperienceTag
  name: string
  icon: string                // path under /public or an imported asset
  summary: string
  details?: string
  proficiency?: "learning" | "comfortable" | "daily-driver"  // tech-only, optional, fine to leave undefined on creative items
}