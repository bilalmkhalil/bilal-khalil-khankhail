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
import Reveal from "@/components/motion/Reveal";

const ExperienceSection = () => {
  return (
    <div
      id="experience"
      className="dark:text-ink relative m-auto w-10/12 pb-0 md:pb-0"
    >
      <Reveal className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-ink text-4xl sm:text-6xl">Experience</h1>
        <h1 className={`text-ink text-4xl sm:text-6xl ${aadilFont.className}`}>
          تجربہ
        </h1>
      </Reveal>

      {/* Timeline Container */}
      <div className="timeline-container relative mt-8 md:mt-12">
        {/* Vertical Timeline Line */}
        <div className="timeline-line from-ink/30 via-ink/20 to-ink/10 absolute top-0 left-0 h-full w-0.5 bg-linear-to-b md:left-1/2 md:-ml-px"></div>

        {experienceData.map((exp, index) => (
          <div
            key={index}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0 ? "md:text-right" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="border-ink bg-card absolute top-0 -left-2 h-4 w-4 rounded-full border-2 md:left-1/2 md:-ml-2"></div>

            {/* Timeline Content */}
            <div
              className={`relative ml-6 md:w-[calc(50%-40px)] ${
                index % 2 === 0
                  ? "md:float-left md:mr-0 md:ml-0 md:pr-10"
                  : "md:float-right md:ml-0 md:pl-10"
              }`}
            >
              <span className="bg-ink/10 text-ink inline-block rounded-full px-3 py-1 text-sm font-medium backdrop-blur-md">
                {exp.period}
              </span>

              <Dialog>
                <DialogTrigger className="w-full">
                  <Reveal className="group border-ink/10 bg-ink/5 hover:bg-ink/10 mt-3 rounded-xl border p-6 backdrop-blur-md transition-colors duration-300">
                    <div className="flex items-start gap-4">
                      <div className="bg-ink/10 rounded-full p-2 md:p-2.5">
                        {exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            // width={24}
                            // height={24}
                            className="h-8 w-8"
                          />
                        ) : (
                          <FaBriefcase className="text-ink/70 h-6 w-6" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-ink truncate text-xl font-semibold tracking-tight md:text-2xl">
                          {exp.title}
                        </h3>
                        <h4 className="text-ink/80 truncate text-lg md:text-xl">
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
                  </Reveal>
                </DialogTrigger>
                <DialogContent
                  className={`${portfolioFont.className} border-ink/15 bg-background text-ink max-h-none max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden rounded-xl border p-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-2xl sm:overflow-y-auto`}
                >
                  <DialogHeader className="gap-2 px-4 py-3 pr-16 text-left sm:gap-3 sm:px-8 sm:py-5 sm:pr-16">
                    <div className="flex items-start gap-2.5 sm:gap-4">
                      <div className="border-ink/10 bg-ink/5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border sm:h-14 sm:w-14">
                        {exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt=""
                            className="h-6 w-6 object-contain sm:h-8 sm:w-8"
                          />
                        ) : (
                          <FaBriefcase
                            className="text-ink/70 h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <DialogTitle className="text-xl leading-tight font-semibold sm:text-3xl">
                          {exp.title}
                        </DialogTitle>
                        <DialogDescription className="text-ink/70 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-tight sm:gap-x-3 sm:text-base">
                          <span>{exp.company}</span>
                          <span className="border-ink/10 bg-ink/5 text-ink/80 rounded-full border px-2.5 py-0.5 text-sm">
                            {exp.period}
                          </span>
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="border-ink/10 bg-ink/5 border-t px-4 py-3 sm:px-8 sm:py-6">
                    <h3 className="mb-2 text-base font-semibold sm:mb-3 sm:text-lg">
                      Work &amp; contributions
                    </h3>
                    <ul className="text-ink/80 space-y-1.5 text-sm leading-snug sm:space-y-2 sm:text-base sm:leading-normal">
                      {exp.description?.map((desc) => (
                        <li key={desc} className="flex items-start gap-2 sm:gap-3">
                          <span
                            aria-hidden="true"
                            className="bg-ink/40 mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                          />
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
