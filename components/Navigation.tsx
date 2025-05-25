"use client";

import { useState, useEffect } from "react";
import { Home, Wrench, Briefcase, Rocket, Mail } from "lucide-react";
import { NavItem } from "@/types/types";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  const navItems: NavItem[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Rocket },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
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
  }, [navItems]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isVisible) return null;

  return (
    <nav 
      className="fixed right-6 top-1/2 z-50 -translate-y-1/2 transform animate-fade-in"
    >
      <div className="flex flex-col gap-3 rounded-full border border-white/10 bg-black/20 p-3 backdrop-blur-md">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-white/20 text-white scale-110"
                  : "text-white/60 hover:bg-white/10 hover:text-white hover:scale-105"
              }`}
              title={item.label}
            >
              <IconComponent className="w-5 h-5" />
              
              {/* Active indicator */}
              {activeSection === item.id && (
                <div
                  className="absolute -right-1 h-6 w-1 bg-white rounded-full"
                />
              )}
              
              {/* Tooltip */}
              <div className="absolute right-full mr-3 hidden group-hover:block">
                <div className="rounded-lg bg-black/80 px-3 py-1 text-sm text-white backdrop-blur-sm whitespace-nowrap">
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
