"use client";

import { useState, useEffect } from "react";
import Brackets from "@/components/hud/Brackets";
import HudTooltip from "@/components/hud/HudTooltip";
import { useShortcut } from "@/components/hud/useShortcut";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useShortcut("t", () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
  });

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="hud-expand group border-ink/25 bg-background text-ink hover:bg-ink hover:text-background fixed right-8 bottom-8 z-50 hidden h-11 w-11 items-center justify-center border transition-colors sm:flex"
      aria-label="Scroll to top"
      aria-keyshortcuts="T"
    >
      <Brackets />
      <HudTooltip label="Back to top" shortcut="T" side="above" />
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollToTop;
