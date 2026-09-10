"use client";

import { useEffect } from "react";
import { animate, MotionConfig, useReducedMotion } from "motion/react";

function InteractionFeedback() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    let pressed: HTMLElement | null = null;
    const selector = "button, a[href], [role='button'], [role='tab']";
    const targetFor = (target: EventTarget | null) => {
      const element =
        target instanceof Element
          ? target.closest<HTMLElement>(selector)
          : null;
      return element &&
        !element.matches(":disabled, [aria-disabled='true']") &&
        !element.closest(".maplibregl-map")
        ? element
        : null;
    };
    const move = (element: HTMLElement, scale: number) => {
      animations.get(element)?.stop();
      const animation = animate(
        element,
        { scale },
        {
          type: "spring",
          stiffness: 420,
          damping: 32,
          mass: 0.5,
        },
      );
      animations.set(element, animation);
      void animation.then(() => {
        if (animations.get(element) === animation) animations.delete(element);
      });
    };
    const down = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      pressed = targetFor(event.target);
      if (pressed) move(pressed, 0.97);
    };
    const release = () => {
      if (pressed) move(pressed, 1);
      pressed = null;
    };
    const reset = () => {
      release();
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
      pressed = targetFor(event.target);
      if (pressed) move(pressed, 0.97);
    };
    const keyup = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") release();
    };

    // Delegation also covers links mounted after navigation and portalled dialogs.
    // Native touch scrolling and click handling are left to the browser.
    document.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("pointercancel", reset, { passive: true });
    window.addEventListener("blur", reset);
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);
    return () => {
      document.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("keyup", keyup);
      for (const [element, animation] of animations) {
        animation.stop();
        element.style.transform = "";
      }
      if (pressed) pressed.style.transform = "";
    };
  }, [reduced]);
  return null;
}

export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <InteractionFeedback />
      {children}
    </MotionConfig>
  );
}
