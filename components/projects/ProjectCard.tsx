"use client";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Cherry_Bomb_One } from "next/font/google";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Project } from "@/data/content/projects";
import { getTechIcon } from "@/data/content/techIcons";

const cherryBomb = Cherry_Bomb_One({ weight: "400", subsets: ["latin"] });

interface ProjectCardProps {
  project: Project;
}

const ACCENT = "#C15F3C";

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  const {
    id,
    title,
    description,
    category,
    image,
    tech,
    github,
    live,
    devlog,
    featured,
  } = project;

  // Every coded project gets a detail page at /projects/[id] now (video
  // items are rendered via VideoCard instead and never reach this
  // component, so there's no type check needed here anymore).
  const detailHref = `/projects/${id}`;

  const handleCardClick = () => {
    router.push(detailHref);
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="h-full"
      >
        <Card
          onClick={handleCardClick}
          className="group flex h-full flex-col rounded-3xl p-2 transition-shadow duration-200 hover:shadow-md cursor-pointer"
          style={
            featured
              ? { backgroundColor: ACCENT }
              : undefined
          }
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={featured}
            />
          </div>

          <CardContent className="flex flex-1 flex-col gap-3 px-2 pt-4 pb-0">
            
            <h3
              className={`${cherryBomb.className} line-clamp-2 min-h-8 text-4xl leading-relaxed sm:text-5xl md:text-6xl lg:text-7xl ${
                featured ? "text-white" : "text-foreground"
              }`}
            >
              {title}
            </h3>

            <p
              className={
                featured
                  ? "line-clamp-2 min-h-10 text-sm leading-relaxed text-white/80"
                  : "line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground"
              }
            >
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">

              <Badge
                variant="secondary"
                className={
                  featured
                    ? "w-fit h-7 border-0 bg-white/15 text-xs text-white px-2.5"
                    : "w-fit h-7 text-xs px-2.5"
                }
              >
                {category}
              </Badge>

              {tech && tech.length > 0 && (
                <TooltipProvider delayDuration={150}>
                  <div className="flex flex-wrap items-center gap-2">
                    {tech.map((name) => {
                      const entry = getTechIcon(name);
                      if (!entry) return null;

                      return (
                        <Tooltip key={name}>
                          <TooltipTrigger asChild onClick={stopPropagation}>
                            <div
                              className={
                                featured
                                  ? "flex h-7 w-7 items-center justify-center rounded-md bg-white/15 p-1.5"
                                  : "flex h-7 w-7 items-center justify-center rounded-md border border-border bg-secondary/50 p-1.5"
                              }
                            >
                              <Image
                                src={entry.icon}
                                alt={entry.label}
                                width={20}
                                height={20}
                                className={
                                  featured
                                    ? "h-full w-full brightness-0 invert"
                                    : "h-full w-full"
                                }
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" onClick={stopPropagation}>
                            <p className="text-xs">{entry.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="gap-2 px-2 pb-2 pt-4">
            {github && (
              <Button
                asChild
                variant={featured ? "secondary" : "outline"}
                size="sm"
                className={
                  featured
                    ? "flex-1 bg-white/15 text-white hover:bg-white/25"
                    : "flex-1"
                }
                onClick={stopPropagation}
              >
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="h-3.5 w-3.5" />
                  Code
                </Link>
              </Button>
            )}

            {live && (
              <Button
                asChild
                size="sm"
                className={
                  featured
                    ? "flex-1 bg-white text-[#2440D6] hover:bg-white/90"
                    : "flex-1"
                }
                onClick={stopPropagation}
              >
                <Link href={live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live
                </Link>
              </Button>
            )}

            {devlog && (
              <Button
                asChild
                variant={featured ? "secondary" : "outline"}
                size="sm"
                className={
                  featured
                    ? "flex-1 bg-white/15 text-white hover:bg-white/25"
                    : "flex-1"
                }
                onClick={stopPropagation}
              >
                <Link href={devlog} target="_blank" rel="noopener noreferrer">
                  Devlog
                </Link>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}