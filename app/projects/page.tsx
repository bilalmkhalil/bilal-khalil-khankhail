import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/CustomComponents/project-card";
import { projects } from "@/lib/projects";
import { aadilFont, portfolioFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Projects | Bilal Khalil Khankhail",
  description: "Explore websites and projects built by Bilal Khalil Khankhail.",
};

export default function ProjectsPage() {
  return (
    <main className={`${portfolioFont.className} min-h-screen bg-background text-foreground`}>
      <div className="mx-auto w-10/12 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 border-b-2 pb-5">
            <h1 className="text-4xl sm:text-6xl">Projects</h1>
            <span lang="ur" dir="rtl" className={`${aadilFont.className} text-4xl sm:text-6xl`}>منصوبے</span>
            <span className="ml-auto text-sm text-ink/60">{String(projects.length).padStart(2, "0")} / Selected work</span>
          </div>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            A selection of my work, from concept to live website.
          </p>
        </header>

        <div className="grid gap-8">
          {projects.map((project) => <ProjectCard key={project.url ?? project.title} {...project} featured />)}
        </div>

        <footer className="mt-16 flex flex-col gap-5 border-t border-ink/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg text-ink/70">Have a project in mind?</p>
          <Link href="/#contact" scroll={false} className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-ink/15 bg-ink/5 px-5 py-2 text-ink transition-colors hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-4">
            Let’s work together <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
