"use client";

import { aadilFont, portfolioFont } from "@/lib/fonts";
import { BorderBeam } from "../magicui/border-beam";
import { FaBriefcase } from "react-icons/fa";
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


const ExperienceSection = () => {
  return (
    <div
      id="experience"
      className="relative m-auto w-10/12 pb-0 md:pb-0 dark:text-ink"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-ink sm:text-6xl">Experience</h1>
        <h1
          className={`text-4xl text-ink sm:text-6xl ${aadilFont.className}`}
        >
          تجربہ
        </h1>
      </div>

      {/* Timeline Container */}
      <div className="timeline-container relative mt-8 md:mt-12">
        {/* Vertical Timeline Line */}
        <div className="timeline-line absolute top-0 left-0 h-full w-0.5 bg-linear-to-b from-ink/30 via-ink/20 to-ink/10 md:left-1/2 md:-ml-px"></div>

        {experienceData.map((exp, index) => (
          <div
            key={index}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0 ? "md:text-right" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute top-0 -left-2 h-4 w-4 rounded-full border-2 border-ink bg-card md:left-1/2 md:-ml-2"></div>

            {/* Timeline Content */}
            <div
              className={`relative ml-6 md:w-[calc(50%-40px)] ${
                index % 2 === 0
                  ? "md:float-left md:mr-0 md:ml-0 md:pr-10"
                  : "md:float-right md:ml-0 md:pl-10"
              }`}
            >
              <span className="inline-block rounded-full bg-ink/10 px-3 py-1 text-sm font-medium text-ink backdrop-blur-md">
                {exp.period}
              </span>

              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="group mt-3 rounded-xl border border-ink/10 bg-ink/5 p-6  backdrop-blur-md transition-all duration-300 hover:bg-ink/10">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-ink/10 p-2 md:p-2.5">
                        {exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            // width={24}
                            // height={24}
                            className="h-8 w-8"
                          />
                        ) : (
                          <FaBriefcase className="h-6 w-6 text-ink/70" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="truncate text-xl font-semibold tracking-tight text-ink md:text-2xl">
                          {exp.title}
                        </h3>
                        <h4 className="truncate text-lg text-ink/80 md:text-xl">
                          {exp.company}
                        </h4>
                      </div>
                    </div>
                    <BorderBeam
                      size={100}
                      duration={10}
                      delay={index * 2}
                      colorFrom="#ffffff30"
                      colorTo="#ffffff15"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent
                  className={`${portfolioFont.className} max-h-[calc(100dvh-2rem)] gap-0 overflow-y-auto rounded-xl border border-ink/15 bg-background p-0 text-ink sm:max-w-2xl`}
                >
                  <DialogHeader className="gap-3 px-6 py-5 pr-16 text-left sm:px-8 sm:pr-16">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-ink/5">
                        {exp.icon ? (
                          <Image src={exp.icon} alt="" className="h-8 w-8 object-contain" />
                        ) : (
                          <FaBriefcase className="h-6 w-6 text-ink/70" aria-hidden="true" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <DialogTitle className="text-2xl leading-tight font-semibold sm:text-3xl">
                          {exp.title}
                        </DialogTitle>
                        <DialogDescription className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-base leading-tight text-ink/70">
                          <span>{exp.company}</span>
                          <span className="rounded-full border border-ink/10 bg-ink/5 px-2.5 py-0.5 text-sm text-ink/80">
                            {exp.period}
                          </span>
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="border-t border-ink/10 bg-ink/5 px-6 py-5 sm:px-8 sm:py-6">
                    <h3 className="mb-3 text-lg font-semibold">Work &amp; contributions</h3>
                    <ul className="space-y-2 text-base leading-normal text-ink/80">
                      {exp.description?.map((desc) => (
                        <li key={desc} className="flex items-start gap-3">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/40" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Clear float for alternating layout */}
            <div className="clear-both"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
