"use client";

// Isometric "production rig" for the homepage: my dev machine, CI/CD, the
// network, a production node, the data layer, monitoring and the TLS edge,
// with a satellite beaming signals down to them. Press DEPLOY and a commit
// flies through build, test and ship to the node. Drawn with react-isokit;
// the machines live in components/rig, and every number comes from the rig's
// model (components/rig/model.ts).

import { memo, useEffect, useId, useRef, useState } from "react";
import {
  Box,
  Cursor,
  Flight,
  Plate,
  Press,
  Signal,
  configureSound,
  path,
  playSound,
  project,
  top as onTop,
  useDemoTap,
  type Vec3,
} from "react-isokit";
import "react-isokit/styles.css";
import { useReducedMotion } from "motion/react";
import { useIsMobile } from "@/lib/hooks";
import { USER_CITIES } from "@/lib/world-map";
import { BOOT_MS } from "@/components/hud/boot";
import {
  ASPECT,
  CELL,
  HERO_ASPECT,
  HERO_PHOTO,
  HERO_TEXT_EDGE,
  MAP,
  NARROW_ASPECT,
  STAGES,
  STAGE_MS,
  antenna,
  beams,
  cables,
  callouts,
  ciTop,
  cityPoint,
  heroViewBox,
  key,
  keyTop,
  land,
  line,
  narrowViewBox,
  nodeTop,
  round,
  screenCentre,
  viewBox,
  type Stage,
} from "@/components/rig/geometry";
import {
  CiUnit,
  DbUnit,
  EdgeUnit,
  Halos,
  Laptop,
  MonitorUnit,
  NodeUnit,
  Satellite,
  SwitchUnit,
} from "@/components/rig/parts";
import { useRigModel } from "@/components/rig/model";
import SoundToggle from "@/components/rig/SoundToggle";

export { HERO_ASPECT, HERO_PHOTO };

// Sound stays off until the visitor turns it on.
configureSound({ defaultOn: false });

/** The demo cursor presses DEPLOY once the boot screen and hero intro are done. */
const DEMO_AFTER_INTRO_MS = 3200;

type Props = {
  /** "hero" frames the rig on the right with room for the hero text, and
   * draws a leader from the laptop to the hero photo. */
  variant?: "section" | "hero";
  /** The hero photo's height / width, to find where the leader meets it. */
  photoRatio?: number;
};

/** The commit, a small lit block, flying from one machine to the next. */
function Packet({ from, to, delay }: { from: Vec3; to: Vec3; delay: number }) {
  return (
    <Flight
      from={from}
      to={to}
      delay={delay}
      duration={STAGE_MS - 40}
      lift={34}
    >
      <Box
        x={from[0] - 3}
        y={from[1] - 3}
        z={from[2]}
        w={6}
        d={6}
        h={4}
        r={1}
        className="pf-packet pf-glow"
      />
    </Flight>
  );
}

// All land dots as one path of small circles (two arcs each): one element
// instead of ~1,400, which keeps the page's DOM small.
const DOT_R = CELL * 0.21;
const LAND_DOTS = land
  .map(([i, j]) => {
    const x = Math.round(((i + 0.5) * CELL - DOT_R) * 100) / 100;
    const y = Math.round((j + 0.5) * CELL * 100) / 100;
    return `M${x} ${y}a${DOT_R} ${DOT_R} 0 1 0 ${DOT_R * 2} 0a${DOT_R} ${DOT_R} 0 1 0 ${-DOT_R * 2} 0`;
  })
  .join("");

/** The dotted world map on the ground, fading out at the frame's edges, with
 * the user cities. Memoized: it only changes when another city is pinged. */
const WorldMap = memo(function WorldMap({
  uid,
  frameBox,
  pinged,
}: {
  uid: string;
  frameBox: string;
  pinged: string;
}) {
  const [bx, by, bw, bh] = frameBox.split(" ").map(Number);
  const box = { x: bx, y: by, width: bw, height: bh };
  return (
    <>
      <defs>
        <linearGradient id={`pf-fade-x-${uid}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.08" stopColor="#fff" />
          <stop offset="0.92" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`pf-fade-y-${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.12" stopColor="#fff" />
          <stop offset="0.88" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`pf-mask-x-${uid}`} maskUnits="userSpaceOnUse" {...box}>
          <rect {...box} fill={`url(#pf-fade-x-${uid})`} />
        </mask>
        <mask id={`pf-mask-y-${uid}`} maskUnits="userSpaceOnUse" {...box}>
          <rect {...box} fill={`url(#pf-fade-y-${uid})`} />
        </mask>
      </defs>
      <g mask={`url(#pf-mask-x-${uid})`}>
        <g mask={`url(#pf-mask-y-${uid})`}>
          <g transform={onTop(MAP.x, MAP.y, 0)}>
            <path className="pf-land" d={LAND_DOTS} />
            {USER_CITIES.map(({ name, at: [i, j], home }, k) => {
              const on = pinged === name;
              return (
                <g key={name}>
                  <circle
                    className="pf-ping ik-loop"
                    cx={(i + 0.5) * CELL}
                    cy={(j + 0.5) * CELL}
                    r={CELL * 0.85}
                    style={{ animationDelay: `${(k * 0.41) % 2.6}s` }}
                  />
                  <circle
                    className={`ik-dot ${on || home ? "pf-glow" : ""}`}
                    cx={(i + 0.5) * CELL}
                    cy={(j + 0.5) * CELL}
                    r={CELL * (on || home ? 0.36 : 0.27)}
                  />
                </g>
              );
            })}
          </g>
          {/* City names stay upright, next to each dot. */}
          {USER_CITIES.map(({ name, at, label, home }) => {
            const [x, y] = project(...cityPoint(at));
            const [dx, dy, anchor] = {
              right: [5, 2, "start"],
              left: [-5, 2, "end"],
              below: [0, 10, "middle"],
            }[label] as [number, number, "start" | "end" | "middle"];
            return (
              <text
                key={name}
                className={`pf-city ${home ? "pf-city-home" : ""}`}
                x={round(x + dx)}
                y={round(y + dy)}
                textAnchor={anchor}
              >
                {home ? `${name} · home` : name}
              </text>
            );
          })}
        </g>
      </g>
    </>
  );
});

/** "Simulation · not real metrics" in a bordered tag. The box is sized from
 * the rendered text, so the padding is the same on both sides whatever font
 * the browser uses. */
function SimTag({ centre, left, top, delay }: { centre?: number; left: number; top: number; delay: number }) {
  const PAD = 7;
  const MARK = 5;
  const GAP = 5;
  const text = useRef<SVGTextElement>(null);
  const [textW, setTextW] = useState(165);
  useEffect(() => {
    const measure = () => {
      const w = text.current?.getComputedTextLength();
      if (w) setTextW(w);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, []);
  const w = round(PAD + MARK + GAP + textW + PAD);
  const x = centre === undefined ? left : round(centre - w / 2);
  return (
    <g
      className="hud-blink pf-sim"
      transform={`translate(${x} ${top})`}
      style={{ "--hud-delay": `${delay}ms` } as React.CSSProperties}
    >
      <rect className="pf-sim-box" width={w} height={17} />
      <rect className="ik-dot ik-pulse" x={PAD} y={6} width={MARK} height={MARK} />
      <text ref={text} className="pf-co-title" x={PAD + MARK + GAP} y={11.6}>
        SIMULATION · NOT REAL METRICS
      </text>
    </g>
  );
}

export default function ProductionRig({
  variant = "section",
  photoRatio,
}: Props) {
  const narrow = useIsMobile(640);
  const belowLg = useIsMobile(1024);
  const hero = variant === "hero" && !belowLg && !narrow;
  // Unique ids so two figures on one page never share masks.
  const uid = useId().replace(/[^\w-]/g, "");
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState<Stage | null>(null);
  const [pressed, setPressed] = useState(false);
  const timers = useRef<number[]>([]);

  // The model only runs while the figure is on screen, the tab is visible and
  // motion is allowed; otherwise it stands still.
  const reduced = useReducedMotion();
  const probe = useRef<SVGGElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const svg = probe.current?.ownerSVGElement;
    if (!svg) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      {
        rootMargin: "80px",
      },
    );
    observer.observe(svg);
    const onVisibility = () =>
      setTabVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const live = useRigModel(stage, inView && tabVisible && !reduced);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const deploy = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPressed(true);
    setRun((r) => r + 1);
    STAGES.forEach((s, i) =>
      timers.current.push(
        window.setTimeout(() => {
          setStage(s);
          playSound(s === "live" ? "success" : "process");
        }, i * STAGE_MS),
      ),
    );
    timers.current.push(
      window.setTimeout(() => setStage(null), STAGES.length * STAGE_MS + 2200),
    );
  };

  // Once the intro has played, a cursor shows that the key can be pressed.
  const [demoDelay] = useState(() =>
    typeof performance === "undefined"
      ? DEMO_AFTER_INTRO_MS
      : Math.max(0, BOOT_MS - performance.now()) + DEMO_AFTER_INTRO_MS,
  );
  const demo = useDemoTap(deploy, { delay: demoDelay, threshold: 0.5 });

  const pinged = USER_CITIES[live.beat % USER_CITIES.length];
  const frameBox = narrow ? narrowViewBox : hero ? heroViewBox : viewBox;
  const [bx, by, bw, bh] = frameBox.split(" ").map(Number);

  const status = stage
    ? `deploy #${run} · ${{ build: "building", test: "testing", ship: "shipping", live: "live on node-01" }[stage]}`
    : run
      ? `idle · ${run} ${run === 1 ? "deploy" : "deploys"} shipped`
      : "idle · 0 deploys";

  const isLive = stage === "live";

  return (
    <div className="relative">
      <Plate
        className={`pf-rig ${hero ? "pf-hero" : ""}`}
        label="An isometric production rig standing on a dotted world map with users in cities around the globe: a laptop with a deploy key wired to CI/CD, a network switch, a production server, a database, a monitoring display and a TLS edge, with a satellite beaming signals down. Press deploy to ship a commit. Its traffic, latency, availability and ping readouts come from a simulation."
        viewBox={frameBox}
        // The hero draws its status inside the figure, so nothing sits outside
        // the drawing and the page can size it to the viewport exactly.
        fig={variant === "hero" ? undefined : "Fig. 01"}
        name={
          hero
            ? undefined
            : variant === "hero"
              ? "Operator · Karachi, PK"
              : "From commit to production"
        }
        hint={variant === "hero" ? undefined : "Press deploy"}
        readout={hero ? undefined : status}
        {...demo.plate}
      >
        <style>{`
          .pf-rig{background:transparent;border:0;padding:0;border-radius:0;
            --ik-top:#fdfdfc;--ik-front:#ececea;--ik-side:#dddcd8;--ik-well:#d6d5d1;
            --ik-ink:#55554f}
          .dark .pf-rig{--ik-top:#2d2d31;--ik-front:#202023;--ik-side:#17171a;--ik-well:#111113;--ik-ink:#b1b1b7}
          .pf-rig>svg{aspect-ratio:${ASPECT};height:auto;overflow:hidden}
          .pf-rig .ik-label{font-size:6px}
          .pf-rig .ik-signal{stroke-width:1.5}
          .dark .pf-glow{filter:drop-shadow(0 0 1.5px var(--ik-live)) drop-shadow(0 0 5px color-mix(in srgb,var(--ik-live) 55%,transparent))}
          .dark .pf-rig .ik-signal{filter:drop-shadow(0 0 2px var(--ik-live)) drop-shadow(0 0 6px var(--ik-live))}
          .pf-on{fill:var(--ik-live);stroke:var(--ik-live)}
          .pf-core .ik-face,.pf-core .ik-top,.pf-core .ik-tint{fill:var(--ik-well)}
          .pf-halo{fill:#000;opacity:.07}
          .dark .pf-halo{opacity:.45}
          .pf-key-on .ik-top{fill:var(--ik-live);stroke:var(--ik-live)}
          .pf-key-on .ik-label{fill:#fff;font-weight:700}
          .dark .pf-key-on .ik-label{fill:#0b0b0d}
          .pf-key-done .ik-top{stroke:var(--ik-live)}
          .pf-key-done .ik-label{fill:var(--ik-ink-hi)}
          .pf-packet .ik-face{stroke:var(--ik-live)}
          .pf-packet .ik-top{fill:var(--ik-live)}
          .pf-spin{transform-box:fill-box;transform-origin:center;animation:pf-spin 7s linear infinite}
          @keyframes pf-spin{to{transform:rotate(360deg)}}
          .pf-sweep{animation:pf-sweep .56s ease-in-out infinite}
          @keyframes pf-sweep{50%{opacity:.25}}
          .pf-land{fill:var(--ik-line);opacity:.5}
          .pf-city{font:500 5.8px/1 var(--ik-mono);letter-spacing:.1em;text-transform:uppercase;fill:var(--ik-ink)}
          .pf-city-home{font-weight:700;fill:var(--ik-ink-hi)}
          .pf-ping{fill:none;stroke:var(--ik-live);stroke-width:1;vector-effect:non-scaling-stroke;transform-box:fill-box;transform-origin:center;animation:pf-ping 2.6s ease-out infinite}
          @keyframes pf-ping{from{transform:scale(.3);opacity:.9}to{transform:scale(1.7);opacity:0}}
          .pf-co-title{font:600 8.5px/1 var(--ik-mono);letter-spacing:.12em;text-transform:uppercase;fill:var(--ik-ink-hi)}
          .pf-co-sub{font:500 6.6px/1 var(--ik-mono);letter-spacing:.1em;text-transform:uppercase;fill:var(--ik-ink)}
          .pf-big{font:300 34px/1 var(--ik-mono);fill:var(--ik-ink-hi)}
          .pf-screen{font-size:4.6px}
          .pf-tiny{font-size:3.6px}
          .pf-sim-box{fill:var(--ik-panel);fill-opacity:.85;stroke:var(--ik-ink);stroke-width:1;vector-effect:non-scaling-stroke}
          .pf-rig.pf-hero>svg{aspect-ratio:${HERO_ASPECT}}
          @media (max-width:639px){.pf-hud{display:none}.pf-rig>svg{aspect-ratio:${NARROW_ASPECT}}}
        `}</style>
        <g ref={probe} />

        <WorldMap uid={uid} frameBox={frameBox} pinged={pinged.name} />

        {/* Uplink to a user city, drawn under the rig so it passes behind it. */}
        {live.beat > 0 && (
          <g key={`city-${live.beat}`}>
            <Signal points={[antenna, cityPoint(pinged.at)]} duration={900} />
          </g>
        )}

        {/* Satellite, floating, with dashed uplink beams to the rig. */}
        {beams.map((to, i) => (
          <path key={i} className="ik-dash" d={line(antenna, to)} />
        ))}
        <Satellite />

        <Halos />

        {/* Cables on the ground, under everything that stands on it. */}
        {Object.entries(cables).map(([name, points]) => (
          <path key={name} className="ik-line" d={path(points)} />
        ))}

        {/* The commit's path along the cables, drawn before the machines so
            they hide it where it runs behind them. Keyed by run so each
            deploy plays. */}
        {run > 0 && (
          <g key={run}>
            <Signal points={cables.dev} duration={STAGE_MS} />
            <Signal points={cables.node} delay={STAGE_MS} duration={STAGE_MS} />
            <Signal
              points={cables.net}
              delay={STAGE_MS * 2}
              duration={STAGE_MS / 2}
            />
            <Signal
              points={cables.data}
              delay={STAGE_MS * 2}
              duration={STAGE_MS}
            />
            <Signal
              points={cables.edge}
              delay={STAGE_MS * 2.5}
              duration={STAGE_MS}
            />
            <Signal
              points={cables.mon}
              delay={STAGE_MS * 2.5}
              duration={STAGE_MS}
            />
          </g>
        )}

        {/* Machines, back to front. */}
        <CiUnit stage={stage} />
        <NodeUnit stage={stage} />
        <DbUnit live={isLive} busy={live.load > 0.5} />
        <SwitchUnit ports={live.ports} />
        <MonitorUnit p95={live.p95} history={live.history} />
        <Laptop stage={stage} run={run} />
        <Press label="Deploy" onPress={deploy} data-hot={!pressed || undefined}>
          <g ref={demo.ref}>
            <Box
              {...key}
              r={2}
              top={
                <text className="ik-label" x={5} y={9.5}>
                  DEPLOY
                </text>
              }
            />
          </g>
        </Press>
        <EdgeUnit live={isLive} />

        {/* The commit flies to CI, then on to the node as it ships. */}
        {run > 0 && !reduced && (
          <g key={`packet-${run}`}>
            <Packet from={keyTop} to={ciTop} delay={0} />
            <Packet from={ciTop} to={nodeTop} delay={STAGE_MS * 2} />
          </g>
        )}

        {/* Satellite signals, one per uplink ping. */}
        {live.beat > 0 && (
          <g key={`beat-${live.beat}`}>
            {beams.map((to, i) => (
              <Signal
                key={i}
                points={[antenna, to]}
                delay={i * 180}
                duration={700}
              />
            ))}
          </g>
        )}

        {/* Callouts and live readouts around the figure. */}
        <g className="pf-hud">
          {callouts.map(({ n, title, sub, at, side, band, heroBand }) => {
            const [px, py] = project(...at);
            const ly =
              by + bh * (hero && heroBand !== undefined ? heroBand : band);
            const lx =
              side === "right"
                ? bx + bw - 6
                : hero
                  ? HERO_TEXT_EDGE + 12
                  : bx + 6;
            const anchor = side === "left" ? "start" : "end";
            const reach = side === "left" ? lx + 96 : lx - 96;
            return (
              <g
                key={n}
                // Callouts blink on in number order as the page loads, after
                // the hero text in the hero.
                className="hud-blink"
                style={
                  {
                    "--hud-delay": `${(variant === "hero" ? 1000 : 300) + (Number(n) - 1) * 140}ms`,
                  } as React.CSSProperties
                }
              >
                <path
                  className="ik-line ik-dim"
                  d={`M${lx} ${ly + 4} H${round(px)} V${round(py)}`}
                />
                <path className="ik-line" d={`M${lx} ${ly + 4} H${reach}`} />
                <circle
                  className="ik-dot"
                  cx={round(px)}
                  cy={round(py)}
                  r={1.4}
                />
                <text
                  className="pf-co-title"
                  x={lx}
                  y={ly - 5}
                  textAnchor={anchor}
                >
                  {n} / {title}
                </text>
                <text
                  className="pf-co-sub"
                  x={lx}
                  y={ly + 12}
                  textAnchor={anchor}
                >
                  {sub}
                </text>
              </g>
            );
          })}

          {/* Telemetry, bottom left (in the hero, just right of the text). */}
          <g
            transform={`translate(${hero ? HERO_TEXT_EDGE + 12 : bx + 6} ${by + bh - 87})`}
          >
            <text className="pf-co-sub">TELEMETRY / SIMULATED</text>
            {[
              ["USERS", `${live.users.toFixed(1)}K`],
              ["P95", `${live.p95} MS`],
              ["UPLINK", `${live.dbm} DBM`],
              ["PING", `${live.ping.code} ${live.ping.ms} MS`],
              ["DEPLOYS", String(run).padStart(2, "0")],
            ].map(([k, v], i) => (
              <g key={k} transform={`translate(0 ${16 + i * 13})`}>
                <text className="pf-co-sub">{k}</text>
                <text className="pf-co-title" x={46}>
                  {v}
                </text>
              </g>
            ))}
          </g>

          {/* Big throughput readout, bottom right. The hero leaves room under
              it for the sound toggle. */}
          <g
            transform={`translate(${bx + bw - 6} ${by + bh - (hero ? 100 : 64)})`}
          >
            <text className="pf-co-sub" textAnchor="end">
              REQUESTS / SEC · SIM
            </text>
            <text className="pf-big" y={32} textAnchor="end">
              {live.rps.toFixed(1)}
              <tspan className="pf-co-sub" dx={2}>
                K
              </tspan>
            </text>
            {Array.from({ length: 12 }, (_, i) => (
              <rect
                key={i}
                className={i < live.bars ? "pf-on" : "ik-well"}
                x={-12 * 6.4 + i * 6.4}
                y={40}
                width={4.4}
                height={9}
                rx={0.6}
              />
            ))}
            <text className="pf-co-sub" y={60} textAnchor="end">
              AVAILABILITY {live.availability.toFixed(2)}% · 5 MIN
            </text>
            {hero && (
              <text
                className="pf-co-title"
                y={74}
                textAnchor="end"
                aria-live="polite"
              >
                {status}
              </text>
            )}
          </g>

          {/* Leader from the laptop screen to the hero photo (drawn in HTML). */}
          {hero &&
            photoRatio &&
            (() => {
              const [ax, ay] = project(...screenCentre);
              const px = round(bx + HERO_PHOTO.width * bw);
              const py = round(
                by +
                  (HERO_PHOTO.top +
                    (HERO_PHOTO.width * HERO_ASPECT * photoRatio) / 2) *
                    bh,
              );
              const elbow = HERO_TEXT_EDGE - 5;
              return (
                <g>
                  <path
                    className="ik-line ik-dim"
                    d={`M${px + 4} ${py} H${elbow} V${round(ay)} H${round(ax)}`}
                  />
                  <circle className="ik-dot" cx={px + 4} cy={py} r={1.4} />
                  <circle
                    className="ik-dot"
                    cx={round(ax)}
                    cy={round(ay)}
                    r={1.4}
                  />
                </g>
              );
            })()}
        </g>

        {/* Says plainly that the numbers are made up: centred over the figure in
            the hero, top left elsewhere. Shown at every size. */}
        <SimTag
          // Centred over the figure in the hero, top left elsewhere.
          centre={hero ? (HERO_TEXT_EDGE + 200 + bx + bw - 190) / 2 : undefined}
          left={bx + 6}
          top={hero ? round(by + bh * 0.06 - 17) : by + 6}
          delay={variant === "hero" ? 900 : 300}
        />

        <Cursor at={keyTop} phase={demo.phase} size={0.9} />
      </Plate>

      <div
        style={{ "--hud-delay": "2000ms" } as React.CSSProperties}
        className={
          hero
            ? "absolute right-[0.35%] bottom-[1.2%]"
            : "mt-3 flex justify-end"
        }
      >
        <SoundToggle />
      </div>
    </div>
  );
}
