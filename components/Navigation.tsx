"use client";

import { useState, useEffect } from "react";
import { NavItem } from "@/types/types";
import Home from "@/public/home.png";
import Image from "next/image";
import Skills from "@/public/skills.png";
import Projects from "@/public/projects.png";
import Experience from "@/public/experience.png";
import Contact from "@/public/contact.png";

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "skills", label: "Skills", icon: Skills },
  { id: "experience", label: "Experience", icon: Experience },
  { id: "projects", label: "Projects", icon: Projects },
  { id: "contact", label: "Contact", icon: Contact },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="animate-fade-in fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="flex flex-row gap-3 rounded-full border border-white/10 bg-black/20 p-3 backdrop-blur-md">
        {navItems.map((item) => {
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "scale-110 bg-white/20 text-white"
                  : "text-white/60 hover:scale-105 hover:bg-white/10 hover:text-white"
              }`}
              title={item.label}
            >
              <Image src={item.icon} alt={item.label} width={24} height={24} className="h-6 w-6 object-contain" />

              {/* Tooltip */}
              <div className="absolute bottom-full mb-3 hidden group-hover:block">
                <div className="rounded-lg bg-black/80 px-3 py-1 text-sm whitespace-nowrap text-white backdrop-blur-sm">
                  {item.label}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
