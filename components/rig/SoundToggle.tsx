"use client";

import { playSound, useSoundEnabled } from "react-isokit";
import Brackets from "@/components/hud/Brackets";
import HudTooltip from "@/components/hud/HudTooltip";
import { useShortcut } from "@/components/hud/useShortcut";

/** Turns the rig's sounds on and off (on by default). S toggles
 * it from anywhere on the page. */
export default function SoundToggle({
  className = "",
}: {
  className?: string;
}) {
  const [on, setOn] = useSoundEnabled();
  const toggle = () => {
    setOn(!on);
    if (!on) playSound("toggle");
  };
  useShortcut("s", toggle);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-keyshortcuts="S"
      className={`group hud-blink hud-mono border-ink/25 text-ink/70 hover:text-ink relative inline-flex h-8 items-center gap-2 border px-2.5 text-[10px] tracking-[0.16em] uppercase transition-colors lg:h-[2.2cqw] lg:gap-[0.5cqw] lg:px-[0.8cqw] lg:text-[0.75cqw] ${on ? "border-ink/60 text-ink" : ""} ${className}`}
    >
      <Brackets />
      <svg
        viewBox="0 0 16 16"
        className="size-3.5 lg:size-[1cqw]"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="square"
      >
        <path d="M2.5 6h2.2L8 3.2v9.6L4.7 10H2.5z" />
        {on ? (
          <path d="M10.6 5.6a3.4 3.4 0 0 1 0 4.8M12.5 3.8a6 6 0 0 1 0 8.4" />
        ) : (
          <path d="M10.5 6l3.5 4M14 6l-3.5 4" />
        )}
      </svg>
      <span>Sound · {on ? "On" : "Off"}</span>
      <HudTooltip label="Toggle sound" shortcut="S" side="above" />
    </button>
  );
}
