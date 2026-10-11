"use client";

import { Moon, Sun } from "lucide-react";
import { useAnimate, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Brackets from "@/components/hud/Brackets";
import HudTooltip from "@/components/hud/HudTooltip";
import { useShortcut } from "@/components/hud/useShortcut";

export default function ThemeToggle() {
  const changing = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [iconRef, animateIcon] = useAnimate();
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (!theme) {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light",
      );
      return;
    }
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      /* Storage is optional. */
    }
  }, [theme]);

  async function toggleTheme() {
    if (changing.current) return;
    const button = buttonRef.current;
    if (!button) return;
    changing.current = true;
    button.focus({ preventScroll: true });
    const nextTheme = theme === "light" ? "dark" : "light";
    const commitTheme = () => flushSync(() => setTheme(nextTheme));
    const root = document.documentElement;
    const animations: Animation[] = [];
    let transition: ViewTransition | undefined;
    flushSync(() => setTransitioning(true));
    try {
      if (reduced || !document.startViewTransition) {
        commitTheme();
        if (!reduced)
          await animateIcon(
            iconRef.current,
            { rotate: [0, 90, 0] },
            { duration: 0.4 },
          );
        return;
      }
      transition = document.startViewTransition(commitTheme);
      await transition.ready;

      // The new theme opens over the old one like the HUD frames do: a line
      // across the middle of the screen, which then opens up and down. Each
      // phase eases in and out on its own.
      const ease = "cubic-bezier(0.65, 0, 0.35, 1)";
      animations.push(
        root.animate(
          [
            { clipPath: "inset(calc(50% - 1px) 50% calc(50% - 1px) 50%)", easing: ease, zIndex: 2 },
            { clipPath: "inset(calc(50% - 1px) 0% calc(50% - 1px) 0%)", easing: ease, offset: 0.4, zIndex: 2 },
            { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2 },
          ],
          {
            duration: 900,
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      );
      // This separate snapshot keeps the icon visible above the circular wipe.
      animations.push(
        root.animate(
          { rotate: ["0deg", "90deg", "0deg"] },
          {
            duration: 450,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(theme-icon)",
          },
        ),
      );
      await Promise.all(animations.map((animation) => animation.finished));
      await transition.finished;
    } catch {
      transition?.skipTransition();
      commitTheme();
    } finally {
      animations.forEach((animation) => animation.cancel());
      changing.current = false;
      setTransitioning(false);
      if (button.isConnected) button.focus({ preventScroll: true });
    }
  }

  useShortcut("d", () => void toggleTheme());

  return (
    <button
      ref={buttonRef}
      aria-keyshortcuts="D"
      type="button"
      onClick={() => void toggleTheme()}
      data-motion-feedback="none"
      data-transitioning={transitioning}
      aria-busy={transitioning}
      aria-label="Toggle light and dark mode"
      className="hud-expand group border-ink/25 bg-background text-ink hover:bg-ink hover:text-background focus-visible:border-ink data-[transitioning=true]:bg-ink/60 fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center border transition-colors outline-none [view-transition-name:theme-toggle] focus-visible:outline-none data-[transitioning=true]:transition-none sm:top-6 sm:right-8"
    >
      <Brackets />
      <HudTooltip label="Toggle theme" shortcut="D" />
      <span
        ref={iconRef}
        className="flex h-5 w-5 items-center justify-center [view-transition-name:theme-icon]"
        aria-hidden="true"
      >
        <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
        <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      </span>
    </button>
  );
}
