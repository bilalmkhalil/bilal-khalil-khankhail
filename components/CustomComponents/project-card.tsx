"use client";

import Image from "next/image";
import { motion } from "motion/react";
import React from "react";
import Reveal from "@/components/motion/Reveal";

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
    <Reveal
      className={`group relative flex flex-col ${featured ? "md:grid md:grid-cols-2" : ""} border-ink/10 bg-ink/5 hover:bg-ink/10 overflow-hidden rounded-md border backdrop-blur-md transition-colors duration-300`}
    >
      <div
        className={`aspect-video overflow-hidden ${featured ? "md:aspect-auto md:min-h-80" : ""}`}
      >
        <motion.div
          className="h-full w-full"
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
      <div
        className={`flex flex-1 flex-col space-y-4 ${featured ? "justify-center p-6 sm:p-10" : "p-5"}`}
      >
        <h3 className="text-ink text-xl font-semibold">{title}</h3>
        <p className="text-ink/80 flex-1 text-base leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {stack.map((tech, index) => (
            <span
              key={index}
              className="border-ink/10 bg-ink/5 text-ink rounded-md border px-3 py-1 text-sm backdrop-blur-md"
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
            className="border-ink/20 text-ink hover:bg-ink/10 focus-visible:outline-foreground inline-flex min-h-11 w-fit items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Visit Website <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </Reveal>
  );
};

export default ProjectCard;
