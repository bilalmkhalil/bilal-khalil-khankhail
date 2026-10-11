import Brackets from "@/components/hud/Brackets";
import { hudDelay } from "@/components/hud/hudDelay";

/** Full-screen HUD status page (404, errors): a bracketed panel that opens
 * from its centre, a big code with a blinking cursor, a short message and
 * two actions. */
export default function HudStatus({
  code,
  label,
  title,
  message,
  primary,
  secondary,
}: {
  code: string;
  label: string;
  title: string;
  message: string;
  /** Solid button, e.g. a Link or button element's contents and props. */
  primary: React.ReactNode;
  secondary: React.ReactNode;
}) {
  return (
    <section className="hud-mono bg-background text-ink flex min-h-screen items-center justify-center px-5 py-24">
      <div className="hud-expand border-ink/20 relative w-full max-w-xl border px-6 py-8 sm:px-10 sm:py-10">
        <Brackets />
        <div className="hud-blink flex items-center justify-between gap-4 text-[10px] tracking-[0.16em] uppercase" style={hudDelay(150)}>
          <span className="text-ink/50">00 / {label}</span>
          <span className="text-ink/50 flex items-center gap-2">
            <span className="bg-ink size-1.5 animate-pulse" />
            Status {code}
          </span>
        </div>

        <p
          aria-hidden="true"
          style={hudDelay(250)}
          className="hud-blink mt-6 text-7xl leading-none font-semibold tracking-[0.06em] sm:text-8xl"
        >
          {code}
          <span className="hud-caret" />
        </p>

        <h1
          style={hudDelay(350)}
          className="hud-blink mt-6 text-lg font-semibold tracking-[0.1em] uppercase sm:text-xl"
        >
          {title}
        </h1>
        <p style={hudDelay(450)} className="hud-blink text-ink/70 mt-3 text-sm leading-relaxed">
          {message}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {primary}
          {secondary}
        </div>
      </div>
    </section>
  );
}

/** Class names for the status page's two action styles. */
export const hudPrimaryClass =
  "hud-blink bg-ink text-background hover:bg-ink/85 inline-flex h-11 items-center justify-center px-6 text-xs tracking-[0.14em] uppercase transition-colors";
export const hudSecondaryClass =
  "hud-expand border-ink/25 text-ink hover:bg-ink hover:text-background relative inline-flex h-11 items-center justify-center gap-2 border px-6 text-xs tracking-[0.14em] uppercase transition-colors";
