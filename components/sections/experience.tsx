"use client";

import React from "react";
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
import { Experience } from "@/types/types";
import modIcon from "@/public/mod.png";
import sofjectIcon from "@/public/sofject.png";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const experienceData: Experience[] = [
  {
    period: "2025 - Present",
    title: "Frontend Developer",
    company: "Sofject",
    icon: sofjectIcon,
    description: [
      "Developed scalable web apps with complex admin panels.",
      "Built custom dashboards, chat widgets, and bot integrations.",
      "Used React, Next.js, Tailwind, ShadCN, Redux, Zustand, Axios, React Query.",
      "Integrated Socket.IO for real-time features.",
      "Ensured pixel-perfect UI and consistent design from Figma.",
      "Worked on RBAC, Stripe payments.",
      "Optimized performance and SEO, achieving 90+ scores.",
      "Focused on clean, maintainable, and efficient code.",
    ],
  },
  {
    period: "2024 - 2025",
    title: "Frontend Engineer",
    company: "MOD Ventures",
    icon: modIcon,
    description: [
      "Developed scalable web apps with complex admin panels.",
      "Built custom dashboards, chat widgets, and bot integrations.",
      "Used React, Next.js, Tailwind, ShadCN, Redux, Zustand, Axios, React Query.",
      "Integrated Socket.IO for real-time features.",
      "Ensured pixel-perfect UI and consistent design from Figma.",
      "Worked on RBAC, Stripe payments.",
      "Optimized performance and SEO, achieving 90+ scores.",
      "Focused on clean, maintainable, and efficient code.",
    ],
  },
  {
    period: "2022 - 2024",
    title: "Web Developer",
    company: "Freelance",
    icon: null,
    description: [
      "Led frontend development for multiple client projects.",
      "Built responsive and performant web applications.",
      "Implemented modern UI/UX designs using React and Next.js.",
      "Utilized TailwindCSS for responsive and maintainable styling.",
      "Integrated RESTful APIs and managed state with Redux/Zustand.",
      "Optimized applications for maximum speed and scalability.",
      "Collaborated with clients to gather requirements and deliver solutions.",
      "Maintained clean and well-documented code bases.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <div id="experience" className="relative m-auto w-10/12 pb-0 dark:text-white md:pb-0">
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
        <div className="timeline-line absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-white/30 via-white/20 to-white/10 md:left-1/2 md:-ml-px"></div>

        {experienceData.map((exp, index) => (
          <div
            key={index}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0 ? "md:text-right" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full border-2 border-white bg-[#1a1a1a] md:left-1/2 md:-ml-2"></div>

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
                      <div className="rounded-full bg-white/10 p-3">
                        {exp.icon && typeof exp.icon === 'object' && 'src' in exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                        ) : exp.icon && React.isValidElement(exp.icon) ? (
                          exp.icon
                        ) : (
                          <FaBriefcase className="h-6 w-6 text-white/70" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="truncate text-2xl font-semibold tracking-tight text-white">
                          {exp.title}
                        </h3>
                        <h4 className="truncate text-xl text-white/80">{exp.company}</h4>
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
                <DialogContent className="max-w-[800px] border border-white/10 bg-[#1a1a1a]/95 p-8 text-white backdrop-blur-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-4">
                      <div className="rounded-full bg-white/10 p-3">
                        {exp.icon && typeof exp.icon === 'object' && 'src' in exp.icon ? (
                          <Image
                            src={exp.icon}
                            alt={exp.company}
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain"
                          />
                        ) : exp.icon && React.isValidElement(exp.icon) ? (
                          exp.icon
                        ) : (
                          <FaBriefcase className="h-6 w-6 text-white/70" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-semibold">{exp.title}</h2>
                        <div className="flex items-center gap-4">
                          <span className="text-lg text-white/80">{exp.company}</span>
                          <span className="text-sm text-white/60">{exp.period}</span>
                        </div>
                      </div>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-6">
                    <div className=" text-white/90 ">
                        {exp.description?.map((desc, idx) => (
                        <li
                          key={idx}
                          className="ml-6 list-disc"
                        >
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
