"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Briefcase01Icon } from "@hugeicons/core-free-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { experienceData } from "@/lib/constants";
import Brackets from "@/components/hud/Brackets";
import SectionHeading from "@/components/hud/SectionHeading";
import { hudDelay } from "@/components/hud/hudDelay";

const pad = (n: number) => String(n).padStart(2, "0");

/** Company logo on a small white tile, grayscale until hovered. */
function Logo({ icon, size = "size-10" }: { icon?: (typeof experienceData)[number]["icon"]; size?: string }) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center bg-white/90 p-1.5`}>
      {icon ? (
        <Image
          src={icon}
          alt=""
          className="h-auto w-full object-contain grayscale transition-[filter] duration-300 group-hover:grayscale-0"
        />
      ) : (
        <HugeiconsIcon icon={Briefcase01Icon} size={20} className="text-black/70" aria-hidden="true" />
      )}
    </span>
  );
}

// Experience in the HUD style: a straight timeline with square markers and
// bracketed cards that open from their centre as they scroll into view.
const ExperienceSection = () => {
  return (
    <div id="experience" className="dark:text-ink relative m-auto w-10/12 pb-0 md:pb-0">
      <SectionHeading title="Experience" urdu="تجربہ" />

      <div className="hud-mono relative mt-10 md:mt-14">
        {/* Timeline rule */}
        <div className="bg-ink/20 absolute top-0 left-0 h-full w-px md:left-1/2" />

        {experienceData.map((exp, index) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className={`relative mb-16 md:mb-24 ${index % 2 === 0 ? "md:text-right" : ""}`}
          >
            {/* Square marker on the rule */}
            <div className="border-ink bg-background absolute top-1 -left-[5px] size-[11px] border md:left-1/2 md:-ml-[5px]">
              <span className="bg-ink absolute inset-[2px]" />
            </div>

            <div
              className={`relative ml-6 md:w-[calc(50%-40px)] ${
                index % 2 === 0 ? "md:float-left md:mr-0 md:ml-0 md:pr-10" : "md:float-right md:ml-0 md:pl-10"
              }`}
            >
              <p className="hud-blink text-ink/50 text-xs tracking-[0.16em] uppercase">
                {pad(index + 1)} / {exp.period}
              </p>

              <Dialog>
                <DialogTrigger className="w-full text-left">
                  <div
                    style={hudDelay(120)}
                    className="hud-expand group border-ink/15 hover:border-ink/40 relative mt-3 flex items-center gap-4 border p-5 transition-colors"
                  >
                    <Brackets />
                    <Logo icon={exp.icon} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-ink truncate text-base font-semibold tracking-[0.08em] uppercase md:text-lg">
                        {exp.title}
                      </h3>
                      <p className="text-ink/60 truncate text-sm tracking-[0.06em] uppercase">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-ink/40 group-hover:text-ink hidden text-[10px] tracking-[0.16em] uppercase transition-colors sm:block">
                      Details →
                    </span>
                  </div>
                </DialogTrigger>

                {/* The dialog's shell keeps its own open animation; the HUD
                    panel inside opens from its centre. */}
                <DialogContent className="hud-mono text-ink max-h-none max-w-[calc(100%-2rem)] gap-0 rounded-none border-0 bg-transparent p-0 sm:max-w-2xl">
                  {/* Sized to fit a phone screen without scrolling: compact
                      header, tight padding, and readable 12.5px body text
                      (11.5px only on very short screens). */}
                  <div className="hud-expand border-ink/20 bg-background relative flex flex-col border">
                    <Brackets />
                    <DialogHeader className="shrink-0 gap-2 px-4 py-3.5 pr-14 text-left sm:px-8 sm:py-6 sm:pr-16">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Logo icon={exp.icon} size="size-9 sm:size-12" />
                        <div className="min-w-0 flex-1">
                          <p className="text-ink/50 text-[10px] tracking-[0.16em] uppercase">
                            {pad(index + 1)} / Experience
                          </p>
                          <DialogTitle className="mt-1 text-base leading-tight font-semibold tracking-[0.06em] uppercase sm:text-2xl sm:tracking-[0.08em]">
                            {exp.title}
                          </DialogTitle>
                          <DialogDescription className="text-ink/60 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-[0.1em] uppercase sm:text-sm">
                            <span>{exp.company}</span>
                            <span className="border-ink/20 border px-2 py-0.5">{exp.period}</span>
                          </DialogDescription>
                        </div>
                      </div>
                    </DialogHeader>
                    <div className="border-ink/15 border-t px-4 py-3.5 sm:px-8 sm:py-6">
                      <p className="text-ink/50 mb-2.5 text-[10px] tracking-[0.16em] uppercase sm:mb-3">
                        Work &amp; contributions
                      </p>
                      <ul className="text-ink/80 space-y-2 text-[12.5px] leading-[1.55] sm:space-y-2.5 sm:text-sm sm:leading-relaxed [@media(max-height:700px)]:space-y-1.5 [@media(max-height:700px)]:text-[11.5px] [@media(max-height:700px)]:leading-[1.5]">
                        {exp.description?.map((desc, i) => (
                          <li
                            key={desc}
                            style={hudDelay(250 + i * 70)}
                            className="hud-blink flex items-start gap-2.5 sm:gap-3"
                          >
                            <span aria-hidden="true" className="text-ink/40 w-4 shrink-0 text-[10px] leading-[1.9] sm:w-5 sm:text-xs">
                              {pad(i + 1)}
                            </span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="clear-both" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
