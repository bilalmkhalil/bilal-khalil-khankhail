"use client";

import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useRef } from "react";
import { transitionTheme } from "@/lib/theme-transition";

export default function ThemeToggle() {
  const changing = useRef(false);
  const reduced = useReducedMotion();
  async function toggleTheme(button: HTMLButtonElement) {
    if (changing.current) return;
    changing.current = true;
    try {
      await transitionTheme(button, reduced ?? false);
    } finally {
      changing.current = false;
    }
  }

  return (
    <button
      type="button"
      onClick={(event) => void toggleTheme(event.currentTarget)}
      aria-label="Toggle light and dark mode"
      title="Toggle light and dark mode"
      className="border-ink/15 bg-background/95 text-foreground hover:bg-accent focus-visible:outline-foreground fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-6 sm:right-8"
    >
      <span aria-hidden="true">
        <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
        <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      </span>
    </button>
  );
}
