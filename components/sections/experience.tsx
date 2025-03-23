import React from "react";
import localFont from "next/font/local";
import { BorderBeam } from "../magicui/border-beam";

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const experienceData = [
  {
    period: "2024 - 2025",
    title: "Frontend Engineer",
    company: "MOD Ventures",
    responsibilities: [
      "Next.js for server-side rendering and optimal performance",
      "TailwindCSS for responsive and maintainable styling",
      "React Query for efficient data fetching and caching",
      "Zustand for state management",
    ],
  },
  {
    period: "2022 - 2024",
    title: "Web Developer",
    company: "Freelance",
    responsibilities: [
      "Developed responsive websites for clients",
      "Implemented modern UI/UX designs",
      "Managed client relationships and project timelines",
      "Utilized various frontend technologies",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <div className="relative m-auto w-10/12 pb-20 dark:text-white md:h-screen md:pb-0">
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Experience</h1>
        <h1
          className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
        >
          تجربہ
        </h1>
      </div>

      {/* Timeline Container */}
      <div className="relative mt-16">
        {/* Vertical Timeline Line */}
        <div className="absolute left-0 top-0 h-full w-0.5 bg-white/20 md:left-1/2 md:-ml-0.5"></div>

        {experienceData.map((exp, index) => (
          <div
            key={index}
            className={`relative mb-16 md:mb-24 ${
              index % 2 === 0 ? "md:text-right" : ""
            }`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full border-2 border-white bg-[#1a1a1a] md:left-1/2 md:-ml-2"></div>

            {/* Timeline Content - Alternating sides on larger screens */}
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
              <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10">
                <h3 className="text-2xl font-semibold tracking-tight text-white">{exp.title}</h3>
                <h4 className="mb-4 text-xl text-white/80">{exp.company}</h4>
                <ul className="list-inside list-disc space-y-2 text-white/90">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="transition-all duration-300 hover:text-white">
                      {resp}
                    </li>
                  ))}
                </ul>
                <BorderBeam
                  size={300}
                  duration={10}
                  delay={index * 2}
                  borderWidth={1.5}
                  colorFrom="#ffffff30"
                  colorTo="#ffffff15"
                />
              </div>
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
