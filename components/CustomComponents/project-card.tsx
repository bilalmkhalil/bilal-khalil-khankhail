import Image from "next/image";
import React from "react";

import type { Project } from "@/types/types";

const ProjectCard: React.FC<Project & { featured?: boolean }> = ({
  title,
  description,
  stack,
  image,
  url,
  featured = false,
}) => {
  return (
    <div className={`group relative flex flex-col ${featured ? "md:grid md:grid-cols-2" : ""} rounded-md border border-ink/10 bg-ink/5  backdrop-blur-md transition-all duration-300 hover:bg-ink/10 overflow-hidden`}>
      <div className={`aspect-video overflow-hidden ${featured ? "md:aspect-auto md:min-h-80" : ""}`}>
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className={`space-y-4 flex-1 flex flex-col ${featured ? "p-6 sm:p-10 justify-center" : "p-5"}`}>
        <h3 className="text-xl font-semibold text-ink">{title}</h3>
        <p className="text-ink/80 text-base leading-relaxed flex-1">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {stack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm border border-ink/10 bg-ink/5 text-ink rounded-md backdrop-blur-md"
            >
              {tech}
            </span>
          ))}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${title} (opens in a new tab)`}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-md border border-ink/20 px-4 py-2 text-sm text-ink transition-colors hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            Visit Website <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
