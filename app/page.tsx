import React from "react";
import { Titillium_Web } from "next/font/google";
import HomeSection from "@/components/sections/home";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ExperienceSection from "@/components/sections/experience";
import ContactSection from "@/components/sections/contact";

const tilt_web = Titillium_Web({
  subsets: ["latin"],
  weight: "300",
});

export default function Home() {
  return (
    <main className={`overflow-hidden ${tilt_web.className} bg-[#07070A]`}>
      {/* <div className="relative">
        <DockDemo />
      </div> */}
      <HomeSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
