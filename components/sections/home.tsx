"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import profile from "@/public/profile.png";
import { WORD_ROTATION_TITLES } from "@/lib/constants";
import ProductionRig, { HERO_ASPECT, HERO_PHOTO } from "@/components/ProductionRig";
import { Download } from "lucide-react";
import Link from "next/link";
import Brackets from "@/components/hud/Brackets";
import { BOOT_MS } from "@/components/hud/boot";

// Photo height / width, so the figure's leader meets the photo's middle.
const PHOTO_RATIO = profile.height / profile.width;
const photoBottom = HERO_PHOTO.top + HERO_PHOTO.width * HERO_ASPECT * PHOTO_RATIO;

// On large screens the photo and details are placed over the figure in the
// figure's own proportions, so they line up with its leader line.
const layout = {
  "--ph-top": `${HERO_PHOTO.top * 100}%`,
  "--ph-w": `${HERO_PHOTO.width * 100}%`,
  "--dt-top": `${(photoBottom + 0.035) * 100}%`,
  // Wide enough to fill the content width, but never taller than the screen
  // leaves room for (minus the header and section padding).
  "--hero-w": `min(83.3333vw, calc((100dvh - 7.5rem) * ${HERO_ASPECT}))`,
} as CSSProperties;

/** Types each word out letter by letter with a blinking block cursor, holds
 * it, erases it and types the next. Starts once the boot screen lifts and the column has blinked in. */
function HudRotate({
  words,
  className,
  style,
  startDelay = BOOT_MS + 700,
}: {
  words: readonly string[];
  className?: string;
  style?: CSSProperties;
  startDelay?: number;
}) {
  const reduced = useReducedMotion();
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const TYPE_MS = 75;
    const ERASE_MS = 40;
    const HOLD_MS = 2600;
    const GAP_MS = 350;
    let word = 0;
    let chars = 0;
    let erasing = false;
    let timer = 0;
    const step = () => {
      const current = words[word];
      chars += erasing ? -1 : 1;
      setText(current.slice(0, chars));
      if (!erasing && chars === current.length) {
        erasing = true;
        timer = window.setTimeout(step, HOLD_MS);
      } else if (erasing && chars === 0) {
        erasing = false;
        word = (word + 1) % words.length;
        timer = window.setTimeout(step, GAP_MS);
      } else {
        timer = window.setTimeout(step, erasing ? ERASE_MS : TYPE_MS);
      }
    };
    // Measured from page start (like the CSS animations), not from when React
    // hydrates, so typing lines up with the rest of the column.
    timer = window.setTimeout(step, Math.max(0, startDelay - performance.now()));
    return () => window.clearTimeout(timer);
  }, [reduced, words, startDelay]);

  return (
    <p className={className} style={style} aria-hidden="true">
      {text}
      <span className="hud-caret" />
    </p>
  );
}

const HomeSection = () => {
  return (
    <section
      id="home"
      className="bg-background relative overflow-hidden pt-24 pb-10 lg:flex lg:min-h-screen lg:items-center lg:pt-20 lg:pb-6"
    >
      <div className="@container hud-mono relative mx-auto w-10/12 lg:w-(--hero-w)" style={layout}>
        <div className="relative z-10 flex flex-col items-center text-center lg:pointer-events-none lg:absolute lg:inset-0 lg:block lg:text-left">
          {/* Photo, wired to the laptop in the figure. */}
          <div style={{ "--hud-delay": "100ms" } as CSSProperties} className="hud-expand border-ink/20 relative mb-8 w-44 border p-1.5 sm:w-52 lg:pointer-events-auto lg:absolute lg:top-(--ph-top) lg:left-0 lg:mb-0 lg:w-(--ph-w)">
            <Brackets />
            <Image
              src={profile}
              alt="Bilal Khalil Khankhail"
              width={350}
              height={376}
              sizes="(min-width: 1024px) 14vw, 13rem"
              className="h-auto w-full object-cover grayscale"
              priority
            />
            <span style={{ "--hud-delay": "650ms" } as CSSProperties} className="hud-blink bg-background/80 text-ink/70 absolute right-1.5 bottom-1.5 left-1.5 px-1.5 py-1 text-[10px] tracking-[0.14em] uppercase lg:text-[0.85cqw]">
              00 / Operator
            </span>
          </div>

          {/* Details, in the same HUD style as the figure. On large screens
              sizes are in cqw (shares of the figure's width) so the column
              scales with the figure and never runs past it. */}
          <div className="flex flex-col items-center lg:pointer-events-auto lg:absolute lg:top-(--dt-top) lg:left-0 lg:w-[35%] lg:items-start">
            <div style={{ "--hud-delay": "300ms" } as CSSProperties} className="hud-expand border-ink/20 text-ink relative mb-5 inline-flex items-center gap-2.5 border px-3 py-1.5 text-[11px] tracking-[0.08em] whitespace-nowrap uppercase sm:text-xs sm:tracking-[0.14em] lg:mb-[1.6cqw] lg:gap-[0.8cqw] lg:px-[1cqw] lg:py-[0.5cqw] lg:text-[1cqw]">
              <Brackets />
              <span className="relative flex size-2">
                <span className="bg-ink absolute inline-flex size-full animate-ping rounded-full opacity-60" />
                <span className="bg-ink relative inline-flex size-2 rounded-full shadow-[0_0_6px_var(--color-ink)]" />
              </span>
              Available for freelance work
            </div>

            <h1 className="sr-only">Bilal Khalil Khankhail, Software Engineer</h1>
            <p style={{ "--hud-delay": "500ms" } as CSSProperties} className="hud-blink text-ink/60 mb-1 text-xs tracking-[0.14em] uppercase lg:mb-[0.5cqw] lg:text-[1cqw]" aria-hidden="true">
              Hi there! I&apos;m
            </p>

            <HudRotate
              words={WORD_ROTATION_TITLES}
              style={{ "--hud-delay": "620ms" } as CSSProperties}
              className="hud-blink text-ink mb-3 text-2xl leading-tight font-semibold tracking-[0.06em] uppercase lg:mb-[1.3cqw] lg:text-[2.05cqw]"
            />

            <p style={{ "--hud-delay": "740ms" } as CSSProperties} className="hud-blink text-ink/70 mb-7 max-w-xl text-sm leading-relaxed lg:mb-[2.2cqw] lg:max-w-none lg:text-[1.2cqw]">
              Full-stack engineer in Karachi. I build Next.js products and the
              pipelines that ship them.
              <br />
              Most recently I moved Sofject&apos;s production from Azure to
              Hetzner for ~60K users.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:gap-[1cqw]">
              <Link
                href="#contact"
                style={{ "--hud-delay": "900ms" } as CSSProperties}
                className="hud-blink bg-ink text-background hover:bg-ink/85 relative inline-flex h-11 items-center justify-center px-6 text-xs tracking-[0.14em] uppercase transition-colors lg:h-[3.8cqw] lg:px-[2cqw] lg:text-[1cqw]"
              >
                Hire me
              </Link>
              <a
                href="/Bilal.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--hud-delay": "900ms" } as CSSProperties}
                className="hud-expand border-ink/25 text-ink hover:bg-ink hover:text-background relative inline-flex h-11 items-center justify-center gap-2 border px-6 text-xs tracking-[0.14em] uppercase transition-colors lg:h-[3.8cqw] lg:gap-[0.6cqw] lg:px-[2cqw] lg:text-[1cqw]"
              >
                <Brackets />
                <Download className="h-4 w-4 lg:size-[1.3cqw]" aria-hidden="true" />
                Download resume
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <ProductionRig variant="hero" photoRatio={PHOTO_RATIO} />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
