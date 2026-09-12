"use client";

import { Moon, Sun } from "lucide-react";
import { useAnimate, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

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
    setTransitioning(true);
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

      // Measure the actual icon after React commits and the browser captures
      // the new viewport. Percentage coordinates keep mobile snapshots aligned.
      const icon = iconRef.current.getBoundingClientRect();
      const width = root.clientWidth;
      const height = root.clientHeight;
      const x = icon.left + icon.width / 2;
      const y = icon.top + icon.height / 2;
      const origin = `${(x / width) * 100}% ${(y / height) * 100}%`;
      const radius = Math.ceil(
        Math.hypot(Math.max(x, width - x), Math.max(y, height - y)),
      );
      const closed = `circle(0px at ${origin})`;
      const expanded = `circle(${radius}px at ${origin})`;
      animations.push(
        root.animate(
          {
            clipPath:
              nextTheme === "light" ? [closed, expanded] : [expanded, closed],
            zIndex: [2, 2],
          },
          {
            duration: 550,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            fill: "forwards",
            pseudoElement:
              nextTheme === "light"
                ? "::view-transition-new(root)"
                : "::view-transition-old(root)",
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

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => void toggleTheme()}
      data-motion-feedback="none"
      data-transitioning={transitioning}
      aria-busy={transitioning}
      aria-label="Toggle light and dark mode"
      className="border-ink/15 bg-background text-foreground hover:bg-accent fixed top-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border outline-none transition-colors [view-transition-name:theme-toggle] sm:top-6 sm:right-8"
    >
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
