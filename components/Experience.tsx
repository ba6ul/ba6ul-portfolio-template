"use client";

import Image from "next/image";
import {ExperienceItem} from "@/data/types"
import { Briefcase } from "lucide-react";

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return "—";

  const parts = dateStr.split("-");
  const year = parts[0];

  if (parts.length >= 2) {
    const monthIndex = parseInt(parts[1], 10) - 1;
    const monthLabel = MONTHS[monthIndex];
    if (monthLabel) return `${monthLabel} ${year}`;
  }

  return year;
}

interface ExperienceProps {
  items: ExperienceItem[];
}

export default function Experience({ items }: ExperienceProps) {
  // Only display core company/main roles
  const mainRoles = items.filter((item) => item.type !== "product");

  return (
    <section className="container py-24 md:py-32">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[var(--brand)]/20 pb-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--ink)] mb-4 flex items-center gap-3">
            <Briefcase 
              className="w-8 h-8 md:w-10 md:h-10 shrink-0" 
              stroke="#C15F3C" 
              fill="#C15F3C"
              fillOpacity={0.15} 
              strokeWidth={1.75}
            />
            <span>Experience</span>
          </h2>

          <p className="text-[var(--ink-secondary)] leading-relaxed max-w-2xl">
            Building products across mobile, web, backend systems, and creative tooling.
          </p>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="space-y-16 md:space-y-20">
        {mainRoles.map((item) => (
          <article
            key={item.id}
            className="border-t border-[var(--brand)]/30 pt-10 first:border-t-0 first:pt-0"
          >
            {/* 
              Updated Grid (3 Columns): 
              Col 1: Logo & Date Stack (100px)
              Col 2: Content (1fr)
              Col 3: Tech Stack (220px)
            */}
            <div className="grid items-start gap-8 lg:grid-cols-[100px_1fr_220px]">
              
              {/* LOGO & DATE COLUMN (Desktop) */}
              <div className="hidden lg:flex flex-col items-center gap-6 pt-1">
                <Image
                  src="/nextjsLogo.svg"
                  alt={`${item.org} logo`}
                  width={64}
                  height={64}
                  className="rounded-lg object-contain"
                />
                
                <div className="flex flex-col items-center gap-1.5 font-black text-center">
                  <span className="text-lg uppercase text-[var(--ink)] leading-none tracking-tight">
                    {formatDate(item.startDate)}
                  </span>
                  <div className="h-4 w-px bg-[var(--ink-secondary)] opacity-50 my-1"></div>
                  <span className="text-lg uppercase text-[var(--ink-secondary)] leading-none tracking-tight">
                    {item.endDate === "present"
                      ? "NOW"
                      : formatDate(item.endDate)}
                  </span>
                </div>
              </div>

              {/* MOBILE LOGO & DATE ROW */}
              <div className="flex lg:hidden items-center gap-4 mb-4">
                <Image
                  src="/nextjsLogo.svg"
                  alt={`${item.org} logo`}
                  width={48}
                  height={48}
                  className="rounded object-contain shrink-0"
                />
                <div className="flex items-baseline gap-2 font-black text-[var(--ink)]">
                  <span className="text-xl uppercase">
                    {formatDate(item.startDate)}
                  </span>
                  <span className="text-[var(--ink-secondary)]">—</span>
                  <span className="text-lg uppercase text-[var(--ink-secondary)]">
                    {item.endDate === "present"
                      ? "NOW"
                      : formatDate(item.endDate)}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div>
                <h3 className="text-3xl md:text-5xl font-black uppercase leading-none text-[var(--ink)]">
                  {item.role}
                </h3>

                <p className="mt-2 text-lg md:text-2xl italic text-[var(--ink-secondary)]">
                  {item.org}
                  {item.location && ` · ${item.location}`}
                </p>

                {item.summary && (
                  <p className="mt-6 text-lg text-[var(--ink)] leading-relaxed">
                    {item.summary}
                  </p>
                )}

                {item.details && (
                  <div className="mt-8">
                    {typeof item.details === "string" ? (
                      <ul className="space-y-2">
                        {item.details
                          .split("\n")
                          .filter(Boolean)
                          .map((point, index) => (
                            <li
                              key={index}
                              className="text-lg italic leading-relaxed text-[var(--ink)]"
                            >
                              {point}
                            </li>
                          ))}
                      </ul>
                    ) : (
                      // Safely render the React Node instead of trying to .split() it
                      <div className="text-lg italic leading-relaxed text-[var(--ink)]">
                        {item.details}
                      </div>
                    )}
                  </div>
                )}

                {item.links && item.links.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-5">
                    {item.links
                      .filter((link) => link.href)
                      .map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-[var(--brand)] hover:underline"
                        >
                          {link.label} →
                        </a>
                      ))}
                  </div>
                )}
              </div>

              {/* TECH STACK */}
              <div>
                {item.techStack && item.techStack.length > 0 && (
                  <>
                    <p className="mb-5 text-xs uppercase tracking-[0.18em] text-[#C15F3C]">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {item.techStack.map((tech) => (
                        <div
                          key={tech.label}
                          className="flex items-center gap-2 rounded-xl border border-[#C15F3C]/30 bg-[#C15F3C]/8 px-4 py-2 transition-colors hover:border-[#C15F3C] hover:bg-[#C15F3C]/12"
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.label}
                            width={18}
                            height={18}
                          />
                          <span className="text-sm text-[var(--ink)]">
                            {tech.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

            </div>
          </article>
        ))}
      </div>
    </section>
  );
}