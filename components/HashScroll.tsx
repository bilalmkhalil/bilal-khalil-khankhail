"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Scroll after the destination route and its fonts have settled. */
export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let frame = 0;

    async function scrollToHash() {
      const hash = window.location.hash;
      if (!hash) return;
      await document.fonts.ready;
      if (cancelled) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (cancelled || window.location.hash !== hash) return;
          const section = document.getElementById(hash.slice(1));
          if (!section) return;
          const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
          window.scrollTo({
            top: Math.max(0, window.scrollY + section.getBoundingClientRect().top - offset),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          });
        });
      });
    }

    void scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
