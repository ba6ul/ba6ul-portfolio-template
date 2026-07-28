import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, GitBranch, ArrowLeft } from "lucide-react";
import { portfolio } from "@/data/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTechIcon } from "@/data/content/techIcons";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Videos don't get a detail page — only coded projects do.
const codeProjects = portfolio.projects.filter((p) => p.type === "code");

export async function generateStaticParams() {
  return codeProjects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = codeProjects.find((p) => p.id === id);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline ?? project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = codeProjects.find((p) => p.id === id);
  if (!project) notFound();

  const {
    title,
    tagline,
    description,
    category,
    image,
    tech,
    github,
    live,
    devlog,
    features,
    stats,
    screenshots,
  } = project;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          All Projects
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="flex-1">
            <Badge variant="secondary" className="mb-6 w-fit">
              {category}
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[var(--ink)] mb-4 leading-tight">
              {title}
            </h1>

            {tagline && (
              <p className="text-lg text-[var(--ink-secondary)] mb-3">
                {tagline}
              </p>
            )}

            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              {description}
            </p>

            {tech && tech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tech.map((name) => {
                  const entry = getTechIcon(name);
                  if (!entry) return null;
                  return (
                    <div
                      key={name}
                      className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground"
                    >
                      <Image src={entry.icon} alt="" width={16} height={16} />
                      {entry.label}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {github && (
                <Button asChild variant="outline">
                  <Link href={github} target="_blank" rel="noopener noreferrer">
                    <GitBranch className="h-4 w-4" />
                    Code
                  </Link>
                </Button>
              )}
              {live && (
                <Button asChild>
                  <Link href={live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Live
                  </Link>
                </Button>
              )}
              {devlog && (
                <Button asChild variant="outline">
                  <Link href={devlog} target="_blank" rel="noopener noreferrer">
                    Devlog
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-border">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <section className="border-t border-b border-border py-10">
          <div className="mx-auto max-w-6xl px-6 flex flex-wrap justify-center gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[var(--brand)] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What it does
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-secondary/30 p-6"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots */}
      <section className="mx-auto max-w-6xl px-6 py-20 border-t border-border">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Screenshots
        </h2>
        {screenshots && screenshots.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-6">
            {screenshots.map((src, i) => (
              <div
                key={src}
                className="w-48 rounded-3xl overflow-hidden border border-border shadow-sm"
              >
                <img
                  src={`/projects/${id}/${src}`}
                  alt={`${title} screenshot ${i + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex h-80 w-48 items-center justify-center rounded-3xl border border-dashed border-border bg-secondary/20"
              >
                <span className="text-xs text-muted-foreground">
                  screenshot coming soon
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
