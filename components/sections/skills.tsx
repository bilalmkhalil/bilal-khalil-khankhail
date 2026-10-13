"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "motion/react";

import SectionHeading from "@/components/hud/SectionHeading";
import { useIsMobile } from "@/lib/hooks";
import Brackets from "@/components/hud/Brackets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { skillsData, skillsTabTitles } from "@/lib/constants";

const delay = (ms: number) => ({ "--hud-delay": `${ms}ms` }) as CSSProperties;

const largest = skillsData.reduce((a, b) => (b.skills.length > a.skills.length ? b : a));

/** One tab's heading and skill cards. The ghost copy (used only to reserve
 * height) leaves out the HUD animations. */
function SkillPanel({
  data,
  index,
  ghost = false,
}: {
  data: (typeof skillsData)[number];
  index: number;
  ghost?: boolean;
}) {
  return (
    <div className="mt-6 flex flex-col">
      <p className={`${ghost ? "" : "hud-blink"} text-ink/50 mb-1 text-xs tracking-[0.16em] uppercase`}>
        {String(index + 1).padStart(2, "0")} / Stack
      </p>
      <h3
        style={delay(80)}
        className={`${ghost ? "" : "hud-blink"} text-ink mb-6 text-2xl font-semibold tracking-[0.08em] uppercase sm:text-3xl`}
      >
        {data.title}
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.skills.map((skill, i) => (
          <div
            key={skill.name}
            style={delay(120 + i * 70)}
            className={`${ghost ? "" : "hud-expand"} group border-ink/15 hover:border-ink/40 relative flex items-center gap-3 border px-4 py-3 transition-colors`}
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
    </div>
  );
}

// Skills in the HUD style: square tabs and cards, monospace labels. Cards open
// from their centre and text blinks on as the section scrolls into view (and
// again for each tab's cards as they appear).
const SkillsSection = () => {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [activeTab, setActiveTab] = useState(skillsTabTitles[0]);
  // Auto-rotation only runs while the section is on screen, so visitors
  // always arrive at Frontend (even after a reload that restores the scroll
  // position). It pauses while the user hovers or focuses the tabs, and stops
  // for good once they pick a tab themselves.
  const section = useRef<HTMLDivElement>(null);
  const onScreen = useInView(section, { amount: 0.3 });
  const [paused, setPaused] = useState(false);
  const [userPicked, setUserPicked] = useState(false);

  useEffect(() => {
    if (reduced || paused || userPicked || !onScreen) return;
    const timer = window.setTimeout(() => {
      setActiveTab((currentTab) => {
        const currentIndex = skillsTabTitles.indexOf(currentTab);
        return skillsTabTitles[(currentIndex + 1) % skillsTabTitles.length];
      });
    }, 7000);

    return () => window.clearTimeout(timer);
  }, [activeTab, reduced, paused, userPicked, onScreen]);

  const handleTabChange = (value: string) => {
    setUserPicked(true);
    setActiveTab(value);
  };

  return (
    <div
      ref={section}
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

          {/* Every panel shares one grid cell with an invisible copy of the
              largest one, so the section keeps the same height whichever tab
              is open and nothing below it moves. */}
          <div className="grid flex-1">
            <div aria-hidden="true" inert className="invisible col-start-1 row-start-1">
              <SkillPanel data={largest} index={skillsData.indexOf(largest)} ghost />
            </div>
            {skillsData.map((data, tabIndex) => (
              <TabsContent key={data.title} value={data.title} className="col-start-1 row-start-1">
                <SkillPanel data={data} index={tabIndex} />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillsSection;
