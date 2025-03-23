import Image from "next/image";
import React from "react";
import { BorderBeam } from "../magicui/border-beam";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  image: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  stack,
  image,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
      <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="mb-4 text-white/80">{description}</p>
      <div className="flex flex-wrap gap-2">
        {stack.map((tech, index) => (
          <span
            key={index}
            className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
          >
            {tech}
          </span>
        ))}
      </div>
      <BorderBeam
        size={200}
        duration={10}
        delay={2}
        colorFrom="#ffffff30"
        colorTo="#ffffff15"
      />
    </div>
  );
};

export default ProjectCard;
