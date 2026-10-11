import type { CSSProperties } from "react";

/** Style that staggers a HUD entrance animation by `ms`. */
export const hudDelay = (ms: number) => ({ "--hud-delay": `${ms}ms` }) as CSSProperties;
