import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/CustomComponents/project-card";
import { projects } from "@/lib/projects";
import { portfolioFont } from "@/lib/fonts";
import SectionHeading from "@/components/hud/SectionHeading";
import { hudDelay } from "@/components/hud/hudDelay";

export const metadata: Metadata = {
  title: "Projects | Bilal Khalil Khankhail",
  description: "Explore websites and projects built by Bilal Khalil Khankhail.",
};

export default function ProjectsPage() {
  return (
    <main className={`${portfolioFont.className} bg-background text-foreground min-h-screen`}>
      <div className="mx-auto w-full px-5 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] sm:w-10/12 sm:px-0 sm:pt-32 sm:pb-24">
        <header className="mb-10 sm:mb-16">
          <SectionHeading
            as="h1"
            title="Projects"
            urdu="منصوبے"
            aside={`${String(projects.length).padStart(2, "0")} / Selected work`}
          />
          <p
            style={hudDelay(150)}
            className="hud-blink hud-mono text-ink/70 mt-5 max-w-xl text-sm leading-relaxed sm:mt-6"
          >
            A selection of my work, from concept to live website.
          </p>
        </header>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.url ?? project.title} {...project} index={index} featured />
          ))}
        </div>

        <footer className="hud-mono border-ink/15 mt-12 flex flex-col items-center gap-4 border-t pt-6 text-center sm:mt-16 sm:flex-row sm:justify-between sm:gap-5 sm:pt-8 sm:text-left">
          <p className="hud-blink text-ink/70 text-xs tracking-[0.14em] uppercase">
            Have a project in mind?
          </p>
          <Link
            href="/#contact"
            scroll={false}
            style={hudDelay(120)}
            className="hud-blink bg-ink text-background hover:bg-ink/85 relative inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 text-xs tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-fit"
          >
            Let’s work together
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
