"use client";

import localFont from "next/font/local";
import { BorderBeam } from "../magicui/border-beam";
import { FaBriefcase } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { experienceData } from "@/lib/constants";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const ExperienceSection = () => {
  return (
    <div
      id="experience"
      className="relative m-auto w-10/12 pb-0 md:pb-0 dark:text-white"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Experience</h1>
        <h1
          className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
        >
          تجربہ
        </h1>
      </div>

      {/* Timeline Container */}
      <div className="timeline-container relative mt-8 md:mt-12">
        {/* Vertical Timeline Line */}
        <div className="timeline-line absolute top-0 left-0 h-full w-0.5 bg-linear-to-b from-white/30 via-white/20 to-white/10 md:left-1/2 md:-ml-px"></div>

        {experienceData.map((exp, index) => (
          <div
            key={index}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0 ? "md:text-right" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute top-0 -left-2 h-4 w-4 rounded-full border-2 border-white bg-[#1a1a1a] md:left-1/2 md:-ml-2"></div>

            {/* Timeline Content */}
            <div
              className={`relative ml-6 md:w-[calc(50%-40px)] ${
                index % 2 === 0
                  ? "md:float-left md:mr-0 md:ml-0 md:pr-10"
                  : "md:float-right md:ml-0 md:pl-10"
              }`}
            >
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
                {exp.period}
              </span>

              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="group mt-3 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-white/10 p-2 md:p-2.5">
                        {exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            // width={24}
                            // height={24}
                            className="h-8 w-8"
                          />
                        ) : (
                          <FaBriefcase className="h-6 w-6 text-white/70" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="truncate text-xl font-semibold tracking-tight text-white md:text-2xl">
                          {exp.title}
                        </h3>
                        <h4 className="truncate text-lg text-white/80 md:text-xl">
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
                <DialogContent className="border border-white/10 bg-[#1a1a1a]/95 text-white backdrop-blur-md md:max-w-200 md:p-8">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-4">
                      <div className="rounded-full bg-white/10 p-3">
                        {exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            // width={24}
                            // height={24}
                            className="h-8 w-8"
                          />
                        ) : (
                          <FaBriefcase className="h-6 w-6 text-white/70" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h2 className="text-xl font-semibold md:text-2xl">
                          {exp.title}
                        </h2>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-white/80 md:text-lg">
                            {exp.company}
                          </span>
                          <span className="text-xs text-white/60 md:text-sm">
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 md:mt-6">
                    <div className="text-sm text-white/90 md:text-base">
                      {exp.description?.map((desc, idx) => (
                        <li key={idx} className="ml-3 list-disc md:ml-6">
                          {desc}
                        </li>
                      ))}
                    </div>
                  </div>
                  <BorderBeam
                    size={200}
                    duration={10}
                    colorFrom="#ffffff30"
                    colorTo="#ffffff15"
                  />
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
