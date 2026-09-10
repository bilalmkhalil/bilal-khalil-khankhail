import { projects } from "@/lib/projects";
import { aadilFont } from "@/lib/fonts";
import ProjectCard from "../CustomComponents/project-card";
import Link from 'next/link';


const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative m-auto flex w-10/12 flex-col justify-center gap-16 pb-40"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-ink sm:text-6xl">Projects</h1>
        <h1
          className={`text-4xl text-ink sm:text-6xl ${aadilFont.className}`}
        >
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
          className="relative inline-flex items-center px-8 py-3 text-ink border border-ink/10 bg-ink/5 backdrop-blur-md rounded-md hover:bg-ink/10 transition-all duration-300 group overflow-hidden"
        >
          <span className="relative z-10 font-medium">View All Projects</span>
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
          <svg 
            className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
