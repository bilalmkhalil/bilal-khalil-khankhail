"use client";

import Image from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import SectionHeading from "@/components/hud/SectionHeading";
import { useIsMobile } from "@/lib/hooks";
import Brackets from "@/components/hud/Brackets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { skillsData, skillsTabTitles } from "@/lib/constants";

const delay = (ms: number) => ({ "--hud-delay": `${ms}ms` }) as CSSProperties;

// Skills in the HUD style: square tabs and cards, monospace labels. Cards open
// from their centre and text blinks on as the section scrolls into view (and
// again for each tab's cards as they appear).
const SkillsSection = () => {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(skillsTabTitles[0]);
  // Auto-rotation pauses while the user hovers or focuses the tabs, and stops
  // for good once they pick a tab themselves.
  const [paused, setPaused] = useState(false);
  const [userPicked, setUserPicked] = useState(false);

  useEffect(() => {
    if (reduced || paused || userPicked) return;
    const timer = window.setTimeout(() => {
      setActiveTab((currentTab) => {
        const currentIndex = skillsTabTitles.indexOf(currentTab);
        return skillsTabTitles[(currentIndex + 1) % skillsTabTitles.length];
      });
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [activeTab, reduced, paused, userPicked]);

  const handleTabChange = (value: string) => {
    setUserPicked(true);
    setActiveTab(value);
  };

  return (
    <div
      id="skills"
      className="text-ink relative mx-auto mt-20 mb-20 w-10/12 pb-20 md:mt-0 md:pb-0"
    >
      <SectionHeading title="Skills" urdu="مہارت" />
      <div
        className="hud-mono flex flex-col gap-2"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setPaused(false);
          }
        }}
      >
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          orientation={isMobile ? "horizontal" : "vertical"}
          className="gap-6 md:gap-10"
        >
          <TabsList className="mt-6 grid h-auto! w-full grid-cols-2 gap-3 rounded-none bg-transparent p-1 md:flex md:w-fit md:flex-col md:self-start">
            {skillsTabTitles.map((title, i) => (
              <TabsTrigger
                key={title}
                value={title}
                onClick={() => setUserPicked(true)}
                style={delay(i * 90)}
                className="hud-blink border-ink/15 text-ink/60 hover:text-ink data-[state=active]:bg-ink data-[state=active]:text-background dark:data-[state=active]:bg-ink dark:data-[state=active]:text-background dark:data-[state=active]:border-ink data-[state=active]:border-ink h-11 w-full justify-start rounded-none border px-3 text-[11px] tracking-[0.1em] uppercase hover:cursor-pointer sm:px-5 sm:text-xs sm:tracking-[0.14em] md:min-w-44 md:flex-none md:px-6"
              >
                {activeTab === title && <Brackets />}
                <span className="text-current/60 mr-2">{String(i + 1).padStart(2, "0")} /</span>
                {title}
              </TabsTrigger>
            ))}
          </TabsList>

          {skillsData.map((data, tabIndex) => (
            <TabsContent key={data.title} value={data.title} className="mt-6 flex flex-col">
              <p className="hud-blink text-ink/50 mb-1 text-xs tracking-[0.16em] uppercase">
                {String(tabIndex + 1).padStart(2, "0")} / Stack
              </p>
              <h3
                style={delay(80)}
                className="hud-blink text-ink mb-6 text-2xl font-semibold tracking-[0.08em] uppercase sm:text-3xl"
              >
                {data.title}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.skills.map((skill, i) => (
                  <div
                    key={skill.name}
                    style={delay(120 + i * 70)}
                    className="hud-expand group border-ink/15 hover:border-ink/40 relative flex items-center gap-3 border px-4 py-3 transition-colors"
                  >
                    <Brackets />
                    <span className="flex size-9 shrink-0 items-center justify-center bg-white/90 p-1.5">
                      <Image
                        src={skill.icon}
                        alt=""
                        width={skill.size}
                        height={skill.size}
                        className="h-auto w-full grayscale transition-[filter] duration-300 group-hover:grayscale-0"
                      />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-ink/40 text-[10px] tracking-[0.16em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink text-sm tracking-[0.1em] uppercase">
                        {skill.name}
                      </span>
                    </span>
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
