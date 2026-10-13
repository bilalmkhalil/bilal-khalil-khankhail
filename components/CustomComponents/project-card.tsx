import Image from "next/image";
import Link from "next/link";
import React from "react";
import Brackets from "@/components/hud/Brackets";
import { hudDelay } from "@/components/hud/hudDelay";

import type { Project } from "@/types/types";

/** A square HUD-style link button with corner brackets. */
const buttonClass =
  "bg-ink text-background hover:bg-ink/85 focus-visible:outline-foreground relative inline-flex min-h-11 w-full items-center justify-center gap-2 px-6 py-2 text-xs tracking-[0.14em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-fit";

// A project in the HUD style: a bracketed card that opens from its centre,
// with a grayscale image that comes to colour on hover.
const ProjectCard: React.FC<Project & { featured?: boolean; index?: number }> = ({
  title,
  description,
  stack,
  image,
  url,
  featured = false,
  index = 0,
}) => {
  return (
    <article
      style={hudDelay(index * 120)}
      className={`hud-expand hud-mono group border-ink/15 hover:border-ink/40 relative flex flex-col border transition-colors ${featured ? "md:grid md:grid-cols-2" : ""}`}
    >
      <Brackets />
      <div
        className={`border-ink/15 aspect-video overflow-hidden border-b ${featured ? "md:aspect-auto md:min-h-80 md:border-r md:border-b-0" : ""}`}
      >
        <Image
          src={image}
          alt={title}
          width={500}
          height={300}
          className="h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
        />
      </div>
      <div className={`flex flex-1 flex-col gap-4 ${featured ? "justify-center p-6 sm:p-10" : "p-5"}`}>
        <p className="text-ink/50 text-[10px] tracking-[0.16em] uppercase">
          {String(index + 1).padStart(2, "0")} / Project
        </p>
        <h3 className="text-ink -mt-2 text-base font-semibold tracking-[0.08em] uppercase sm:text-lg">
          {title}
        </h3>
        <p className="text-ink/70 flex-1 text-sm leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span
              key={tech}
              className="border-ink/15 text-ink/80 border px-2.5 py-1 text-[10px] tracking-[0.14em] uppercase"
            >
              {tech}
            </span>
          ))}
        </div>
        {url?.startsWith("/") ? (
          <Link href={url} aria-label={`View the ${title} project page`} className={buttonClass}>
            View project <span aria-hidden="true">→</span>
          </Link>
        ) : (
          url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${title} (opens in a new tab)`}
              className={buttonClass}
            >
              Visit website <span aria-hidden="true">↗</span>
            </a>
          )
        )}
      </div>
    </article>
  );
};

export default ProjectCard;
