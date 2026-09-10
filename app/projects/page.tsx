import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "@/components/CustomComponents/project-card";
import { projects } from "@/lib/projects";
import { aadilFont, portfolioFont } from "@/lib/fonts";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Projects | Bilal Khalil Khankhail",
  description: "Explore websites and projects built by Bilal Khalil Khankhail.",
};

export default function ProjectsPage() {
  return (
    <main
      className={`${portfolioFont.className} bg-background text-foreground min-h-screen`}
    >
      <div className="mx-auto w-full px-5 pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] sm:w-10/12 sm:px-0 sm:pt-32 sm:pb-24">
        <header className="mb-8 sm:mb-16">
          <Reveal>
            <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-4 border-b-2 pb-4 sm:flex sm:flex-wrap sm:items-baseline sm:gap-x-6 sm:pb-5">
              <h1 className="text-4xl leading-tight sm:text-6xl">Projects</h1>
              <span
                lang="ur"
                dir="rtl"
                className={`${aadilFont.className} text-3xl leading-tight sm:text-6xl`}
              >
                منصوبے
              </span>
              <span className="text-ink/60 col-span-2 text-sm sm:ml-auto">
                {String(projects.length).padStart(2, "0")} / Selected work
              </span>
            </div>
            <p className="text-ink/70 mt-4 max-w-xl text-base leading-relaxed sm:mt-6 sm:text-lg">
              A selection of my work, from concept to live website.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.url ?? project.title}
              {...project}
              featured
            />
          ))}
        </div>

        <footer className="border-ink/15 mt-10 flex flex-col items-center gap-4 border-t pt-6 text-center sm:mt-16 sm:flex-row sm:justify-between sm:gap-5 sm:pt-8 sm:text-left">
          <p className="text-ink/70 text-base sm:text-lg">Have a project in mind?</p>
          <Link
            href="/#contact"
            scroll={false}
            className="border-ink/15 bg-ink/5 text-ink hover:bg-ink/10 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border px-5 py-3 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:min-h-11 sm:w-fit sm:py-2"
          >
            Let’s work together{" "}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
