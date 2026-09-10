import { projects } from "@/lib/projects";
import { aadilFont } from "@/lib/fonts";
import ProjectCard from "../CustomComponents/project-card";
import Link from "next/link";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative m-auto flex w-10/12 flex-col justify-center gap-16 pb-40"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-ink text-4xl sm:text-6xl">Projects</h1>
        <h1 className={`text-ink text-4xl sm:text-6xl ${aadilFont.className}`}>
          منصوبے
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((data, index) => (
          <ProjectCard
            key={index}
            title={data.title}
            description={data.description}
            stack={data.stack}
            image={data.image}
            url={data.url}
          />
        ))}
      </div>
      <div className="flex justify-center pt-8">
        <Link
          href="/projects"
          className="text-ink border-ink/10 bg-ink/5 hover:bg-ink/10 group relative inline-flex items-center overflow-hidden rounded-md border px-8 py-3 backdrop-blur-md transition-all duration-300"
        >
          <span className="relative z-10 font-medium">View All Projects</span>
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-purple-500/10 to-pink-500/10 transition-transform duration-300 group-hover:translate-x-0" />
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
