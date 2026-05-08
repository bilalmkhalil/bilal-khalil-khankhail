"use client";

import Image from "next/image";

import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { BorderBeam } from "../magicui/border-beam";
import { useInView, useIsMobile } from "@/lib/hooks";
import { SkillCategory } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { skillsData, skillsTabTitles } from "@/lib/constants";

const spaceGrostek = Space_Grotesk({
  subsets: ["latin"],
});

const aadilFont = localFont({
  src: "../../public/fonts/Aadil.ttf",
});

const SkillsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const isMobile = useIsMobile();

  return (
    <div
      ref={ref}
      id="skills"
      className="relative mx-auto mt-20 w-10/12 pb-20 text-white md:mt-0 mb-20 md:pb-0"
    >
      <div className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-4xl text-white sm:text-6xl">Skills</h1>
        <h1
          className={`text-4xl text-white sm:text-6xl ${aadilFont.className}`}
        >
          مہارت
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <Tabs
          defaultValue="Frontend"
          orientation={isMobile ? "horizontal" : "vertical"}
        >
          <TabsList className="scrollbar-hide mt-4 mr-4 w-full justify-center-safe gap-3 overflow-x-scroll bg-transparent md:w-fit">
            {skillsTabTitles.map((title) => (
              <TabsTrigger
                key={title}
                value={title}
                className="data-[state=active]:border-white/10: w-fit border border-white/10 bg-white/5 px-4 text-lg text-white hover:cursor-pointer hover:text-white md:px-8"
              >
                {title}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillsData.map((data, index) => (
            <TabsContent
              key={index}
              value={data.title}
              className="mt-4 flex flex-col gap-1"
            >
              <h2 className="mb-4 text-5xl text-white">{data.title}</h2>
              <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
                {data.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`relative flex flex-row items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/10 ${
                      inView
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: inView
                        ? `${(index * data.skills.length + skillIndex) * 100}ms`
                        : "0ms",
                    }}
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.alt}
                      width={skill.size}
                      height={skill.size}
                      className={`${skill.bgcolor} rounded p-1.25`}
                    />
                    <h3
                      className={`text-xl text-white ${spaceGrostek.className}`}
                    >
                      {skill.name}
                    </h3>
                    <BorderBeam
                      size={40}
                      duration={10}
                      delay={5}
                      colorFrom={skill.bgcolor.split("[")[1].split("]")[0]}
                      colorTo={skill.bgcolor.split("[")[1].split("]")[0]}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsSection;
