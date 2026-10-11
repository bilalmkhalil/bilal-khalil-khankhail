// PanelMate brand marks, from the extension's own icon set.

/** The app icon, in its light or dark version to match the site theme. */
export function AppIcon({
  className = "inline-block size-8",
}: {
  className?: string;
}) {
  return (
    <span className={`relative shrink-0 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG */}
      <img
        src="/panelmate/brand/panelmate-light.svg"
        alt=""
        className="size-full dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG */}
      <img
        src="/panelmate/brand/panelmate-dark.svg"
        alt=""
        className="hidden size-full dark:block"
      />
    </span>
  );
}

/** The symbolic top-bar glyph: two of four Pomodoro rounds done. Uses currentColor. */
export function PanelMateGlyph({
  className = "size-4",
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M8.853 1.052 A7 7 0 0 1 14.948 7.147 L12.963 7.390 A5 5 0 0 0 8.610 3.037 Z" />
        <path d="M14.948 8.853 A7 7 0 0 1 8.853 14.948 L8.610 12.963 A5 5 0 0 0 12.963 8.610 Z" />
        <path
          d="M7.147 14.948 A7 7 0 0 1 1.052 8.853 L3.037 8.610 A5 5 0 0 0 7.390 12.963 Z"
          opacity="0.35"
        />
        <path
          d="M1.052 7.147 A7 7 0 0 1 7.147 1.052 L7.390 3.037 A5 5 0 0 0 3.037 7.390 Z"
          opacity="0.35"
        />
        <rect x="7.25" y="4.5" width="1.5" height="4" rx="0.75" />
        <circle cx="8" cy="8" r="1.5" />
      </g>
    </svg>
  );
}
