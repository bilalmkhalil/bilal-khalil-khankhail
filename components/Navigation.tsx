"use client";

import { useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Briefcase01Icon,
  DashboardSquare01Icon,
  Home01Icon,
  Mail01Icon,
  SourceCodeIcon,
} from "@hugeicons/core-free-icons";
import { NavItem } from "@/types/types";
import Brackets from "@/components/hud/Brackets";
import { useShortcuts } from "@/components/hud/useShortcut";

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home01Icon },
  { id: "skills", label: "Skills", icon: SourceCodeIcon },
  { id: "experience", label: "Experience", icon: Briefcase01Icon },
  { id: "projects", label: "Projects", icon: DashboardSquare01Icon },
  { id: "contact", label: "Contact", icon: Mail01Icon },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    // A section counts as active once it crosses the middle of the viewport.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    // Show the nav once the hero has mostly scrolled away.
    const home = document.getElementById("home");
    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio < 0.4),
      { threshold: 0.4 },
    );
    if (home) heroObserver.observe(home);

    return () => {
      sectionObserver.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      element.scrollIntoView({ behavior: reduced ? "instant" : "smooth" });
    }
  };

  // Number keys jump to sections, in the order the bar lists them (1 = Home).
  useShortcuts(
    Object.fromEntries(navItems.map((item, i) => [String(i + 1), () => scrollToSection(item.id)])),
  );

  if (!isVisible) return null;

  return (
    <nav
      aria-label="Sections"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform"
    >
      <div className="hud-expand hud-mono border-ink/25 bg-background/90 relative flex flex-row gap-1.5 border p-1.5 backdrop-blur-md sm:gap-2 sm:p-2">
        <Brackets />
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              aria-label={item.label}
              aria-keyshortcuts={String(index + 1)}
              aria-current={isActive ? "true" : undefined}
              className={`group relative flex h-11 w-11 items-center justify-center transition-colors duration-200 sm:h-12 sm:w-12 ${
                isActive
                  ? "bg-ink text-background"
                  : "text-ink/60 hover:bg-ink/10 hover:text-ink"
              }`}
            >
              <HugeiconsIcon icon={item.icon} size={20} aria-hidden="true" />

              {/* Tooltip */}
              <div
                aria-hidden="true"
                className="absolute bottom-full mb-3 hidden group-hover:block group-focus-visible:block"
              >
                <div className="border-ink/25 bg-background text-ink flex items-center gap-2 border px-2.5 py-1.5 text-[10px] tracking-[0.16em] whitespace-nowrap uppercase">
                  {String(index + 1).padStart(2, "0")} / {item.label}
                  <kbd className="border-ink/40 min-w-5 border px-1.5 py-0.5 text-center font-semibold">
                    {index + 1}
                  </kbd>
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
