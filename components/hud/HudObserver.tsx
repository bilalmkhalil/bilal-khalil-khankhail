"use client";

import { useEffect } from "react";
import { BOOT_MS } from "@/components/hud/boot";

const SELECTOR = ".hud-expand:not(.hud-now), .hud-blink:not(.hud-now)";
const NAMES = new Set(["hud-expand", "hud-blink"]);

/** Starts HUD entrance animations as elements scroll into view, anywhere on
 * the site, including elements added later (a new tab's cards, say). Elements
 * on screen at load wait for the boot screen to lift first.
 *
 * The CSS animations start paused; this plays them through the Web Animations
 * API instead of changing attributes, so it never touches what React rendered
 * and can't cause hydration mismatches. */
export default function HudObserver() {
  useEffect(() => {
    const seen = new WeakSet<Element>();
    const timers: number[] = [];
    const play = (el: Element) => {
      for (const animation of el.getAnimations())
        if (animation instanceof CSSAnimation && NAMES.has(animation.animationName))
          animation.play();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target;
          io.unobserve(el);
          const wait = Math.max(0, BOOT_MS - performance.now());
          if (wait) timers.push(window.setTimeout(() => play(el), wait));
          else play(el);
        }
      },
      { threshold: 0.1 },
    );
    const watch = (el: Element) => {
      if (seen.has(el)) return;
      seen.add(el);
      io.observe(el);
    };
    document.querySelectorAll(SELECTOR).forEach(watch);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations)
        for (const node of m.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches(SELECTOR)) watch(node);
          node.querySelectorAll(SELECTOR).forEach(watch);
        }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);
  return null;
}
