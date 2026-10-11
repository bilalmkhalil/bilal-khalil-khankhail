/** HUD tooltip with a keyboard hint, shown when its `group` parent is hovered
 * or keyboard-focused. `side` puts it above or below the parent. */
export default function HudTooltip({
  label,
  shortcut,
  side = "below",
}: {
  label: string;
  shortcut: string;
  side?: "above" | "below";
}) {
  return (
    <span
      aria-hidden="true"
      className={`hud-mono border-ink/25 bg-background text-ink pointer-events-none absolute right-0 z-50 hidden items-center gap-2 border px-2.5 py-1.5 text-[10px] tracking-[0.16em] whitespace-nowrap uppercase group-hover:flex group-focus-visible:flex ${
        side === "below" ? "top-full mt-3" : "bottom-full mb-3"
      }`}
    >
      {label}
      <kbd className="border-ink/40 text-ink min-w-5 border px-1.5 py-0.5 text-center text-[10px] font-semibold">
        {shortcut}
      </kbd>
    </span>
  );
}
