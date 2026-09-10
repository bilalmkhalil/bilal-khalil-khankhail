"use client";

import { Moon, Sun } from "lucide-react";
import { useAnimate, useReducedMotion } from "motion/react";

export default function ThemeToggle() {
  const [icon, animate] = useAnimate();
  const reduced = useReducedMotion();
  function toggleTheme() {
    const root = document.documentElement;
    const theme = root.classList.contains("dark") ? "light" : "dark";
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    if (!reduced) {
      void animate(
        icon.current,
        { rotate: [0, 45, 0], scale: [1, 0.85, 1] },
        { duration: 0.28 },
      );
    }
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The toggle still works when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className="border-ink/15 bg-background/95 text-foreground hover:bg-accent focus-visible:outline-foreground fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-6 sm:right-8"
    >
      <span ref={icon} aria-hidden="true">
        <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
        <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      </span>
    </button>
  );
}
