import React from "react";
import { portfolioFont } from "@/lib/fonts";
import HomeSection from "@/components/sections/home";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import ExperienceSection from "@/components/sections/experience";
import ContactSection from "@/components/sections/contact";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className={`overflow-hidden ${portfolioFont.className} bg-background`}>
      {/* <Navigation /> */}
      <HomeSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <ScrollToTop />
    </main>
  );
}
