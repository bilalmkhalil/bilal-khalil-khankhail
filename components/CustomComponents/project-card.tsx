import Image from "next/image";
import React from "react";

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
    <div className="group relative flex flex-col rounded-md border border-white/10 bg-white/5 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10 overflow-hidden">
      <div className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-white/80 text-sm leading-relaxed flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {stack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs border border-white/10 bg-white/5 text-white rounded-md backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
