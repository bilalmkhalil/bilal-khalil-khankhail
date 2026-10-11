import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlarmClock,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BatteryFull,
  BellRing,
  ChartNoAxesCombined,
  DatabaseBackup,
  Folder,
  History,
  ImagePlus,
  Keyboard,
  PenLine,
  Play,
  Timer,
  Volume2,
  Wifi,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import CopyCommand from "@/components/panelmate/CopyCommand";
import { AppIcon, PanelMateGlyph } from "@/components/panelmate/PanelMateIcon";
import {
  DataFigure,
  GnomeFigure,
  KeyboardFigure,
  PomodoroFigure,
} from "@/components/panelmate/IsoFigures";
import { portfolioFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "PanelMate: focus timer for the GNOME top bar",
  description:
    "PanelMate is a native GNOME Shell extension with countdowns, Pomodoro, stopwatch laps, searchable history and focus statistics, one click from your top bar. For GNOME Shell 46 and 50.",
  alternates: { canonical: "/panelmate" },
  icons: {
    icon: [
      { url: "/panelmate/brand/favicon.svg", type: "image/svg+xml" },
      {
        url: "/panelmate/brand/favicon-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/panelmate/brand/favicon-16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: "/panelmate/brand/apple-touch-icon.png",
  },
  openGraph: {
    title: "PanelMate: focus lives in your top bar",
    description:
      "Countdowns, Pomodoro, stopwatch laps, history and stats. A native GNOME Shell extension for GNOME 46 and 50.",
    url: "/panelmate",
    type: "website",
  },
};

const download = "/downloads/panelmate-gnome.zip";
const commands = [
  "unzip panelmate-gnome.zip -d panelmate",
  "cd panelmate && ./install.sh",
  "gnome-extensions enable panelmate@local.widget",
];
// Screenshots live in public/panelmate as <name>-dark.png and, optionally,
// <name>-light.png; the page shows the one matching the site theme. Replace
// a file to update it. Sizes are read from the PNG header at build time.
function png(file: string) {
  const path = join(process.cwd(), "public/panelmate", file);
  if (!existsSync(path)) return null;
  const header = readFileSync(path).subarray(16, 24);
  return {
    src: `/panelmate/${file}`,
    width: header.readUInt32BE(0),
    height: header.readUInt32BE(4),
  };
}
function screenshot(name: string) {
  const dark = png(`${name}-dark.png`);
  const light = png(`${name}-light.png`);
  return dark || light ? { dark: dark ?? light!, light } : null;
}
type Screenshot = NonNullable<ReturnType<typeof screenshot>>;

/** A screenshot in the variant that matches the site's light or dark theme. */
function Shot({
  shot,
  alt,
  sizes,
  className = "h-auto w-full",
  priority,
}: {
  shot: Screenshot;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!shot.light)
    return (
      <Image
        {...shot.dark}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  return (
    <>
      <Image
        {...shot.light}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`${className} dark:hidden`}
      />
      <Image
        {...shot.dark}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={`${className} hidden dark:block`}
      />
    </>
  );
}

const tabShots = [
  {
    name: "timer",
    title: "Timer",
    text: "Countdown or Pomodoro, presets, and the task you’re working on.",
  },
  {
    name: "stopwatch",
    title: "Stopwatch",
    text: "Elapsed time with laps. Reset saves the session to History.",
  },
  {
    name: "history",
    title: "History",
    text: "Every timer and stopwatch session, searchable and filterable by project, with laps you can expand.",
  },
  {
    name: "stats",
    title: "Stats",
    text: "Cumulative time from a day to a year, with longest and average session and your daily goal.",
  },
].map((shot) => ({ ...shot, image: screenshot(shot.name) }));
const moreShots = [
  {
    name: "pomodoro",
    title: "Pomodoro",
    text: "Focus rounds with a skip button and progress dots.",
  },
  {
    name: "projects",
    title: "Projects",
    text: "Make a project in one line and file sessions under it.",
  },
  {
    name: "preferences",
    title: "Preferences",
    text: "Alerts, presets, Pomodoro lengths, shortcuts and data.",
  },
]
  .map((shot) => ({ ...shot, image: screenshot(shot.name) }))
  .filter((shot) => shot.image);
// Clock-face crops (face-<style>-dark/light.png) are cut from the style
// screenshots so each face sits centred with even padding.
const faceShots = [
  ["classic", "Classic"],
  ["ring", "Tick ring"],
  ["recessed", "Recessed"],
  ["digital", "Digital"],
  ["dots", "Dot matrix"],
  ["pixel", "Pixel"],
  ["nixie", "Nixie"],
  ["outline", "Outline"],
  ["dial", "Dial"],
  ["headline", "Headline"],
]
  .map(([name, title]) => ({ title, image: screenshot(`face-${name}`) }))
  .filter((shot) => shot.image);
const heroShot = screenshot("timer");
const steps = [
  {
    icon: PenLine,
    title: "Name it",
    text: "Type what you’re working on and file it under a project.",
  },
  {
    icon: Play,
    title: "Start it",
    text: "Press play, or Super + Alt + Space from any tab.",
  },
  {
    icon: BellRing,
    title: "Finish it",
    text: "A notification and sound tell you it’s done. Nothing starts until you say so.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Look back",
    text: "Every session lands in History and Stats, filterable by project.",
  },
];
const faqs = [
  [
    "Which systems does PanelMate support?",
    "GNOME Shell 46 (Ubuntu 24.04 LTS) and GNOME Shell 50 (Ubuntu 26.04 LTS). It’s a native extension. There’s no separate app to install or keep running.",
  ],
  [
    "Where is my data stored?",
    "On your machine, in GNOME settings. PanelMate has no account and makes no network requests. Fonts are bundled, too. You can export history as CSV or save a JSON backup from Preferences → Data.",
  ],
  [
    "Do Pomodoro breaks start automatically?",
    "No. When a phase ends, the next one is loaded and waits for you to press play. You can also start it from the completion notification, or skip a phase entirely.",
  ],
  [
    "What counts towards Stats and the daily goal?",
    "Completed countdowns and saved stopwatch sessions. Sessions still running aren’t counted. The daily goal also leaves out Pomodoro breaks. Records are kept for up to two years or 20,000 sessions.",
  ],
  [
    "Why do I need to log out after installing or updating?",
    "On Wayland, GNOME Shell caches extension code for the whole session. Turning the extension off and on doesn’t reliably load new code, so log out and back in. The installer never restarts your desktop.",
  ],
  [
    "I used an earlier version. Will I lose anything?",
    "No. The installer migrates your previous settings and history once, then disables the old copy. To remove PanelMate, run ./uninstall.sh from the same folder.",
  ],
];

function Feature({
  icon: Icon,
  title,
  children,
  visual,
  className = "",
}: {
  icon: typeof Timer;
  title: string;
  children: React.ReactNode;
  visual?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={`border-ink/15 bg-card flex flex-col overflow-hidden rounded-2xl border ${className}`}
    >
      <div className="p-6 sm:p-7">
        <Icon className="mb-5 size-5 text-[var(--pm-ink)]" aria-hidden="true" />
        <h3 className="text-2xl tracking-tight">{title}</h3>
        <div className="text-ink/65 mt-2 max-w-md leading-relaxed">
          {children}
        </div>
      </div>
      {visual && (
        <div className="mt-auto px-6 pb-6 sm:px-7 sm:pb-7">{visual}</div>
      )}
    </Reveal>
  );
}

export default function PanelMatePage() {
  return (
    <main
      className={`${portfolioFont.className} bg-background text-foreground min-h-dvh [--pm-accent:#1a1a1a] [--pm-ink:#1a1a1a] [--pm-on-accent:#f2f2f2] dark:[--pm-accent:#f2f2f2] dark:[--pm-ink:#f2f2f2] dark:[--pm-on-accent:#1a1a1a]`}
    >
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:px-10 sm:pt-28">
        <nav
          aria-label="PanelMate"
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <Link href="/panelmate" className="flex items-center gap-2.5 text-lg">
            <AppIcon className="inline-block size-8" />
            PanelMate
          </Link>
          <div className="text-ink/65 flex items-center gap-5 text-sm sm:gap-7">
            <a
              href="#features"
              className="hover:text-ink hidden transition-colors sm:inline"
            >
              Features
            </a>
            <a
              href="#install"
              className="hover:text-ink hidden transition-colors sm:inline"
            >
              Install
            </a>
            <a
              href="#faq"
              className="hover:text-ink hidden transition-colors sm:inline"
            >
              FAQ
            </a>
            <a
              href={download}
              download
              className="bg-foreground text-background inline-flex min-h-10 items-center gap-2 rounded-lg px-4 transition-opacity hover:opacity-85"
            >
              Download <ArrowDownToLine className="size-4" aria-hidden="true" />
            </a>
          </div>
        </nav>

        <section
          aria-labelledby="hero-title"
          className="pt-16 pb-12 text-center sm:pt-24 sm:pb-16"
        >
          <Reveal>
            <AppIcon className="mx-auto mb-8 block size-20 sm:size-24" />
            <a
              href="#install"
              className="border-ink/15 bg-card hover:border-ink/30 inline-flex items-center gap-2 rounded-full border py-1 pr-3 pl-1 text-xs transition-colors sm:text-sm"
            >
              <span className="rounded-full bg-[var(--pm-accent)] px-2 py-0.5 text-[var(--pm-on-accent)]">
                v1
              </span>
              Now on GNOME 50 and Ubuntu 26.04 LTS
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
            <h1
              id="hero-title"
              className="mx-auto mt-7 max-w-4xl text-[clamp(2.75rem,7.5vw,5.75rem)] leading-[0.98] tracking-[-0.045em]"
            >
              Focus lives in your <span className="text-ink/45">top bar.</span>
            </h1>
            <p className="text-ink/65 mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
              PanelMate is a native GNOME Shell extension for countdowns,
              Pomodoro, stopwatch laps and an honest record of where your time
              went. One click away, never in your way.
            </p>
            <div className="mt-9 flex justify-center">
              <a
                href={download}
                download
                className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[var(--pm-accent)] px-6 text-[var(--pm-on-accent)] transition-opacity hover:opacity-85 min-[420px]:w-auto"
              >
                Download for GNOME
                <ArrowDownToLine className="size-4" aria-hidden="true" />
              </a>
            </div>
            <p className="text-ink/50 mt-5 text-sm">
              Free · GNOME Shell 46 &amp; 50 · No account · Works offline
            </p>
          </Reveal>
        </section>

        <Reveal delay={0.1}>
          <figure className="border-ink/15 overflow-hidden rounded-2xl border bg-[radial-gradient(90%_70%_at_15%_100%,color-mix(in_oklab,var(--pm-accent)_14%,transparent),transparent_70%),linear-gradient(155deg,var(--secondary),var(--background)_70%)]">
            <div
              aria-hidden="true"
              className="relative flex h-8 items-center justify-between bg-black px-2 text-[12px] text-white/90"
            >
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-1.5">
                <span className="h-1.5 w-4 rounded-full bg-white" />
                <span className="size-1.5 rounded-full bg-white/45" />
                <span className="size-1.5 rounded-full bg-white/45" />
              </span>
              <span className="absolute left-1/2 hidden -translate-x-1/2 sm:block">
                Sat Oct 10 6:52 PM
              </span>
              <span className="flex items-center gap-1">
                <span className="rounded-full bg-white/20 px-2.5 py-1">
                  <PanelMateGlyph className="size-3.5" />
                </span>
                <span className="flex items-center gap-2 px-2">
                  <Wifi className="size-3.5" />
                  <Volume2 className="size-3.5" />
                  <BatteryFull className="size-3.5" />
                </span>
              </span>
            </div>
            <div className="relative flex justify-end px-3 pt-2 pb-6 sm:px-6 sm:pb-12">
              <div
                aria-hidden="true"
                className="absolute top-6 left-6 hidden flex-col gap-3 rounded-2xl bg-black/25 p-2.5 lg:flex"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`size-9 rounded-xl ${i === 0 ? "bg-[var(--pm-accent)]/80" : "bg-white/20"}`}
                  />
                ))}
              </div>
              <div
                aria-hidden="true"
                className="border-ink/10 bg-card/60 absolute top-10 right-[590px] left-28 hidden overflow-hidden rounded-xl border lg:block"
              >
                <div className="border-ink/10 text-ink/55 flex items-center gap-2 border-b px-3 py-2 text-[11px]">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="bg-ink/20 size-2.5 rounded-full"
                      />
                    ))}
                  </span>
                  <span className="mx-auto">landing-copy.md</span>
                </div>
                <div className="space-y-2.5 p-5">
                  {[70, 92, 84, 40, 0, 88, 76, 95, 60].map((width, i) => (
                    <span
                      key={i}
                      className={`block h-2 rounded-full ${width ? "bg-ink/[0.09]" : ""}`}
                      style={{ width: `${width}%` }}
                    />
                  ))}
                </div>
              </div>
              {heroShot && (
                <div className="w-full max-w-[560px]">
                  <Shot
                    shot={heroShot}
                    priority
                    sizes="(min-width: 640px) 560px, 100vw"
                    alt="PanelMate open from the GNOME top bar on the Timer tab"
                  />
                </div>
              )}
            </div>
          </figure>
        </Reveal>

        <dl className="border-ink/15 mt-16 grid grid-cols-2 border-y sm:grid-cols-4">
          {[
            ["15", "clock styles"],
            ["6", "custom presets, 1–99 min"],
            ["20,000", "sessions kept, up to 2 years"],
            ["0", "accounts or servers"],
          ].map(([value, label], i) => (
            <div
              key={label}
              className={`border-ink/15 flex flex-col-reverse px-2 py-6 sm:px-6 ${i % 2 ? "border-l" : ""} ${i === 2 ? "sm:border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""}`}
            >
              <dt className="text-ink/60 mt-1 text-sm">{label}</dt>
              <dd className="text-3xl tracking-tight sm:text-4xl">{value}</dd>
            </div>
          ))}
        </dl>

        <section
          id="tabs"
          aria-labelledby="tabs-title"
          className="scroll-mt-24 pt-20 sm:pt-28"
        >
          <Reveal>
            <h2
              id="tabs-title"
              className="max-w-xl text-4xl tracking-tight sm:text-5xl"
            >
              Four tabs. One popover.
            </h2>
            <p className="text-ink/65 mt-4 max-w-xl text-lg leading-relaxed">
              Everything opens from the PanelMate icon in your top bar and
              closes the moment you click away.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {tabShots.map((shot) => (
              <Reveal key={shot.title}>
                <figure>
                  <div className="border-ink/15 bg-card flex items-center justify-center rounded-2xl border p-4 sm:p-6">
                    {shot.image ? (
                      <Shot
                        shot={shot.image}
                        sizes="(min-width: 768px) 520px, 100vw"
                        alt={`The PanelMate ${shot.title} tab`}
                      />
                    ) : (
                      <div className="text-ink/50 flex aspect-[554/512] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed text-sm">
                        <ImagePlus className="size-5" aria-hidden="true" />
                        {shot.title} screenshot coming soon
                      </div>
                    )}
                  </div>
                  <figcaption className="mt-4">
                    <h3 className="text-xl">{shot.title}</h3>
                    <p className="text-ink/65 mt-1 leading-relaxed">
                      {shot.text}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {moreShots.length > 0 && (
          <section aria-labelledby="more-title" className="pt-20 sm:pt-28">
            <Reveal>
              <h2
                id="more-title"
                className="max-w-xl text-3xl tracking-tight sm:text-4xl"
              >
                And a little more inside.
              </h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {moreShots.map((shot) => (
                <Reveal key={shot.title}>
                  <figure>
                    <div className="border-ink/15 bg-card rounded-2xl border p-3">
                      {/* Same height for every shot; taller ones get narrower. */}
                      <div className="flex aspect-[1100/1021] items-center justify-center">
                        <Shot
                          shot={shot.image!}
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                          alt={`The PanelMate ${shot.title} view`}
                          className="h-full w-auto"
                        />
                      </div>
                    </div>
                    <figcaption className="mt-3">
                      <h3 className="text-lg">{shot.title}</h3>
                      <p className="text-ink/65 mt-1 text-sm leading-relaxed">
                        {shot.text}
                      </p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {faceShots.length > 0 && (
          <section aria-labelledby="faces-title" className="pt-20 sm:pt-28">
            <Reveal>
              <h2
                id="faces-title"
                className="max-w-xl text-3xl tracking-tight sm:text-4xl"
              >
                Fifteen clock faces. Here are ten.
              </h2>
              <p className="text-ink/65 mt-3 max-w-xl leading-relaxed">
                Every style follows your accent color and switches with your
                light or dark appearance.
              </p>
            </Reveal>
            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {faceShots.map((shot) => (
                <li key={shot.title}>
                  <Reveal>
                    <figure>
                      <div className="border-ink/15 overflow-hidden rounded-xl border">
                        <Shot
                          shot={shot.image!}
                          sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                          alt={`The ${shot.title} clock style`}
                        />
                      </div>
                      <figcaption className="text-ink/70 mt-2 text-center text-sm">
                        {shot.title}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="how-title" className="py-20 sm:py-28">
          <Reveal>
            <h2
              id="how-title"
              className="max-w-xl text-4xl tracking-tight sm:text-5xl"
            >
              One session, start to finish.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal className="border-ink/15 border-t pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-ink/45 font-mono text-xs">
                      0{i + 1}
                    </span>
                    <Icon
                      className="size-5 text-[var(--pm-ink)]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-6 text-2xl tracking-tight">{title}</h3>
                  <p className="text-ink/65 mt-2 leading-relaxed">{text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="features"
          aria-labelledby="features-title"
          className="scroll-mt-24 pb-20 sm:pb-28"
        >
          <Reveal>
            <h2
              id="features-title"
              className="max-w-2xl text-4xl tracking-tight sm:text-5xl"
            >
              Everything a focus session needs. Nothing it doesn’t.
            </h2>
          </Reveal>
          {/* Figures explain what a screenshot can't show; the cards below
              them cover features the screenshots above already show. */}
          <div className="mt-12 grid gap-4 lg:grid-cols-6">
            <Feature
              icon={Timer}
              title="Pomodoro, without the nagging"
              className="lg:col-span-4"
              visual={<PomodoroFigure />}
            >
              Switch the Timer tab to Pomodoro: 25 minutes of focus, a 5-minute
              break, and a long break after every fourth round. Each phase waits
              for you, and you can skip any of them. Lengths are yours to
              change.
            </Feature>
            <Feature
              icon={Keyboard}
              title="Keyboard first"
              className="lg:col-span-2"
              visual={<KeyboardFigure />}
            >
              Super + Alt + T, S or H opens a tab, and Super + Alt + Space
              starts or pauses. Rebind any of them in Preferences. PanelMate
              warns you about clashes with GNOME and Ubuntu Dock first.
            </Feature>
            <Feature
              icon={BellRing}
              title="At home in GNOME"
              className="lg:col-span-3"
              visual={<GnomeFigure />}
            >
              System icons, Yaru colors, and notifications that respect Do Not
              Disturb. The completion sound follows your system volume.
            </Feature>
            <Feature
              icon={DatabaseBackup}
              title="Your data, your files"
              className="lg:col-span-3"
              visual={<DataFigure />}
            >
              Export to CSV for spreadsheets. Save a JSON backup and restore it
              on another machine. Restore checks the whole file first and asks
              before changing anything.
            </Feature>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Feature icon={AlarmClock} title="Countdowns on your terms">
              Up to six presets. Click the digits to type an exact time. The
              time left shows next to the top-bar icon.
            </Feature>
            <Feature icon={History} title="History you can act on">
              Search, rename and filter by project. Re-run any timer with its
              task and project in one click. Deleted something by mistake? You
              have ten seconds to undo it.
            </Feature>
            <Feature
              icon={ChartNoAxesCombined}
              title="Stats that don’t round you down"
            >
              Cumulative time from a day to a year, plus longest and average
              session. Set a daily goal and see today’s progress. A 40-second
              session shows as seconds, not zero hours.
            </Feature>
            <Feature icon={Folder} title="Tasks and projects">
              Give every session a name and a project. Projects filter History
              and Stats, so you can see where each project’s hours went.
            </Feature>
          </div>
        </section>

        <section
          id="install"
          aria-labelledby="install-title"
          className="border-ink/15 bg-card scroll-mt-24 rounded-3xl border"
        >
          <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:p-14">
            <Reveal>
              <h2
                id="install-title"
                className="text-4xl leading-tight tracking-tight sm:text-5xl"
              >
                Install in under a minute.
              </h2>
              <p className="text-ink/65 mt-4 max-w-md text-lg leading-relaxed">
                Download the bundle, run the installer, and the PanelMate icon
                appears in your top bar.
              </p>
              <a
                href={download}
                download
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[var(--pm-accent)] px-6 text-[var(--pm-on-accent)] transition-opacity hover:opacity-85"
              >
                Download PanelMate
                <ArrowDownToLine className="size-4" aria-hidden="true" />
              </a>
              <p className="text-ink/50 mt-3 text-sm">
                Version 1 · ZIP, 474 KB · Free
              </p>
              <table className="mt-8 w-full max-w-sm text-left text-sm">
                <caption className="sr-only">Supported systems</caption>
                <thead className="text-ink/50 text-xs">
                  <tr>
                    <th className="pb-2 font-normal">Ubuntu</th>
                    <th className="pb-2 font-normal">GNOME Shell</th>
                  </tr>
                </thead>
                <tbody className="divide-ink/10 border-ink/10 divide-y border-t">
                  {[
                    ["24.04 LTS", "46"],
                    ["26.04 LTS", "50"],
                  ].map(([ubuntu, gnome]) => (
                    <tr key={ubuntu}>
                      <td className="py-2.5">{ubuntu}</td>
                      <td className="py-2.5">{gnome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
            <Reveal className="self-center">
              <ol className="space-y-5">
                {[
                  [
                    "Unzip the bundle",
                    "Extract it into a folder called panelmate.",
                  ],
                  [
                    "Run the installer",
                    "It installs the extension, its settings and bundled fonts for your user only.",
                  ],
                  [
                    "Enable and log back in",
                    "Enable PanelMate, then log out and in once so GNOME loads it.",
                  ],
                ].map(([title, text], i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[var(--pm-accent)] font-mono text-xs text-[var(--pm-on-accent)]">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg">{title}</h3>
                      <p className="text-ink/60 mt-0.5 leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7">
                <CopyCommand lines={commands} />
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-title"
          className="grid scroll-mt-24 gap-8 py-20 sm:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"
        >
          <h2 id="faq-title" className="text-4xl tracking-tight sm:text-5xl">
            Questions, answered.
          </h2>
          <div>
            {faqs.map(([question, answer]) => (
              <details
                key={question}
                className="group border-ink/15 border-b first:border-t"
              >
                <summary className="flex list-none items-center justify-between gap-4 py-5 text-lg [&::-webkit-details-marker]:hidden">
                  {question}
                  <ArrowRight
                    className="text-ink/45 size-4 shrink-0 transition-transform group-open:rotate-90"
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-ink/65 max-w-2xl pb-5 leading-relaxed">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <footer className="border-ink/15 flex flex-col gap-5 border-t py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="flex items-center gap-2 text-base">
              <AppIcon className="inline-block size-5" />
              PanelMate
            </span>
            <p className="text-ink/55 mt-1">
              Made by{" "}
              <Link
                href="/"
                className="text-ink/80 decoration-ink/25 hover:text-ink underline underline-offset-4"
              >
                Bilal
              </Link>
              .
            </p>
          </div>
          <Link
            href="/#contact"
            scroll={false}
            className="text-ink/70 hover:text-ink inline-flex min-h-11 items-center gap-2 transition-colors"
          >
            Let’s build something useful
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
