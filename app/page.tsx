import React from "react";
import { DockDemo } from "@/components/dock-menu";

import { Titillium_Web } from "next/font/google";

import HomeSection from "@/components/sections/home";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";

const tilt_web = Titillium_Web({
  subsets: ["latin"],
  weight: "300",
});

export default function Home() {
  // bg-[#07070A]
  return (
    <main className={`overflow-hidden ${tilt_web.className} `}>
      <div className="relative">
        <DockDemo />
      </div>
      <HomeSection />
      <SkillsSection />
      <ProjectsSection />
    </main>
  );
}
