import { projects } from "@/lib/projects";
import ProjectCard from "../CustomComponents/project-card";
import Link from "next/link";
import Brackets from "@/components/hud/Brackets";
import SectionHeading from "@/components/hud/SectionHeading";
import { hudDelay } from "@/components/hud/hudDelay";

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative m-auto flex w-10/12 flex-col justify-center gap-12 pb-40"
    >
      <SectionHeading
        title="Projects"
        urdu="منصوبے"
        aside={`${String(projects.length).padStart(2, "0")} / Selected work`}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.url ?? project.title} {...project} index={index} />
        ))}
      </div>
      <div className="flex justify-center pt-4">
        <Link
          href="/projects"
          style={hudDelay(200)}
          className="hud-expand hud-mono border-ink/25 text-ink hover:bg-ink hover:text-background relative inline-flex h-11 items-center gap-2 border px-8 text-xs tracking-[0.14em] uppercase transition-colors"
        >
          <Brackets />
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
