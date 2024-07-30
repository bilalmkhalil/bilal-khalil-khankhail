import React from "react";
import { DockDemo } from "@/components/dock-menu";

import { Titillium_Web, Space_Grotesk } from "next/font/google";

import HomeSection from "@/components/sections/home";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";

const tilt_web = Titillium_Web({
  subsets: ["latin"],
  weight: "300",
});

export default function Home() {
  return (
    <main className={`overflow-hidden bg-[#07070A] ${tilt_web.className} `}>
      <HomeSection />
      <SkillsSection />
      <ProjectsSection />

      <div className="relative w-full">
        <DockDemo />
      </div>
    </main>
  );
}
