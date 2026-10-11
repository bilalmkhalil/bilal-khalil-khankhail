import type { CSSProperties } from "react";
import Brackets from "@/components/hud/Brackets";

/** The HUD loading card: a bracketed frame that opens from its centre, a
 * line with a blinking cursor and a sweeping segmented meter. CSS only; it
 * animates straight away (hud-now) rather than waiting like page content. */
export default function HudLoader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="hud-mono bg-background flex min-h-screen items-center justify-center"
    >
      <div
        className="hud-expand hud-now border-ink/20 text-ink relative w-64 border px-5 py-4"
        style={{ "--hud-delay": "80ms" } as CSSProperties}
      >
        <Brackets />
        <p className="text-ink/50 text-[10px] tracking-[0.16em] uppercase">00 / Loading</p>
        <p className="mt-2 text-sm font-semibold tracking-[0.08em] uppercase">
          Loading portfolio
          <span className="hud-caret" />
        </p>
        <div className="mt-4 flex gap-1" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="hud-meter bg-ink h-2.5 flex-1"
              style={{ "--hud-delay": `${i * 90}ms` } as CSSProperties}
            />
          ))}
        </div>
        <p className="text-ink/40 mt-3 text-[10px] tracking-[0.16em] uppercase">
          Khankhail · Karachi, PK
        </p>
      </div>
    </div>
  );
}
