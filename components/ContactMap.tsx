"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "motion/react";
import Brackets from "@/components/hud/Brackets";
import { hudDelay } from "@/components/hud/hudDelay";

// maplibre-gl is large, so the map loads in its own chunk, and only once the
// frame is within 800px of the screen. The frame itself renders right away,
// so nothing moves when the map arrives.
const ContactMapCanvas = dynamic(() => import("@/components/ContactMapCanvas"), { ssr: false });

export default function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const near = useInView(ref, { margin: "800px 0px", once: true });
  const visible = useInView(ref, { amount: 0.4 });

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Map showing Karachi, Pakistan"
      style={hudDelay(400)}
      className="hud-expand border-ink/15 bg-background relative min-h-60 flex-1 border"
    >
      <Brackets />
      {/* Grayscale tiles keep the map in the site's black-and-white style. */}
      <div className="absolute inset-0 overflow-hidden [&_canvas]:grayscale">
        {near && <ContactMapCanvas visible={visible} />}
      </div>
      <div className="hud-mono border-ink/20 bg-background/90 pointer-events-none absolute top-3 left-3 z-20 border px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="bg-ink h-2 w-2" />
          <span className="text-ink text-[10px] tracking-[0.16em] uppercase">07 / Karachi, Pakistan</span>
        </div>
      </div>
    </div>
  );
}
