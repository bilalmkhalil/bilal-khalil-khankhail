"use client";

import Image from "next/image";

import { Space_Grotesk } from "next/font/google";
import { aadilFont } from "@/lib/fonts";
import { BorderBeam } from "../magicui/border-beam";
import { useIsMobile } from "@/lib/hooks";
import Reveal from "@/components/motion/Reveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { skillsData, skillsTabTitles } from "@/lib/constants";

const spaceGrostek = Space_Grotesk({
  subsets: ["latin"],
});

const SkillsSection = () => {
  const isMobile = useIsMobile();

  return (
    <div
      id="skills"
      className="text-ink relative mx-auto mt-20 mb-20 w-10/12 pb-20 md:mt-0 md:pb-0"
    >
      <Reveal className="flex justify-between gap-4 border-b-2 pb-4 sm:justify-start">
        <h1 className="text-ink text-4xl sm:text-6xl">Skills</h1>
        <h1 className={`text-ink text-4xl sm:text-6xl ${aadilFont.className}`}>
          مہارت
        </h1>
      </Reveal>
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
                className="data-[state=active]:border-ink/10: border-ink/10 bg-ink/5 text-ink hover:text-ink w-fit border px-4 text-lg hover:cursor-pointer md:px-8"
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
              <h2 className="text-ink mb-4 text-5xl">{data.title}</h2>
              <div className="flex flex-col gap-2 md:flex-row md:flex-wrap">
                {data.skills.map((skill, skillIndex) => (
                  <Reveal
                    key={skillIndex}
                    delay={skillIndex * 0.025}
                    className="border-ink/10 bg-ink/5 hover:bg-ink/10 relative flex flex-row items-center gap-2 rounded-md border px-4 py-3 backdrop-blur-md transition-colors"
                  >
                    <Image
                      src={skill.icon}
                      alt={skill.alt}
                      width={skill.size}
                      height={skill.size}
                      className={`${skill.bgcolor} rounded p-1.25`}
                    />
                    <h3
                      className={`text-ink text-xl ${spaceGrostek.className}`}
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
                  </Reveal>
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
