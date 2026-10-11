"use client";

// Isometric "production rig" for the homepage: my dev machine, CI/CD, the
// network, a production node, the data layer, monitoring and the TLS edge,
// with a satellite beaming signals down to them. Press DEPLOY and a commit
// runs through build, test and ship. Drawn with react-isokit.

import { useEffect, useId, useRef, useState } from "react";
import {
  Box,
  Plate,
  Press,
  Ripple,
  Signal,
  frame,
  path,
  project,
  top as onTop,
  type Box3,
  type Vec3,
} from "react-isokit";
import "react-isokit/styles.css";
import { useIsMobile } from "@/lib/hooks";
import { USER_CITIES, WORLD_ROWS, WORLD_SIZE } from "@/lib/world-map";

type Stage = "build" | "test" | "ship" | "live";
const STAGES: Stage[] = ["build", "test", "ship", "live"];
const STAGE_MS = 520;
const UPLINK_MS = 2800;

// World layout on open ground (z = 0). Paint order is back to front.
const ci: Box3 = { x: 60, y: 25, z: 0, w: 44, d: 50, h: 18 };
const tower: Box3 = { x: 128, y: 25, z: 0, w: 50, d: 50, h: 84 };
const db: Box3 = { x: 204, y: 28, z: 0, w: 36, d: 36, h: 40 };
const net: Box3 = { x: 128, y: 84, z: 0, w: 50, d: 14, h: 8 };
const monitor: Box3 = { x: 222, y: 100, z: 0, w: 40, d: 4, h: 32 };
const lid: Box3 = { x: 22, y: 118, z: 0, w: 84, d: 3, h: 46 };
const deck: Box3 = { x: 22, y: 121, z: 0, w: 84, d: 50, h: 4 };
const key: Box3 = { x: 70, y: 151, z: 4, w: 30, d: 14, h: 3 };
const lock: Box3 = { x: 184, y: 124, z: 0, w: 30, d: 24, h: 24 };

// Satellite floating behind and above the rig.
const sat = {
  body: { x: 200, y: -70, z: 112, w: 22, d: 22, h: 16 },
  left: { x: 166, y: -64, z: 118, w: 30, d: 10, h: 2 },
  right: { x: 226, y: -64, z: 118, w: 30, d: 10, h: 2 },
  dish: { x: 205, y: -65, z: 102, w: 12, d: 12, h: 8 },
} satisfies Record<string, Box3>;
const antenna: Vec3 = [211, -59, 102];
// Beam targets: the node's lid and the data layer's top, both in clear view.
const beams: Vec3[] = [
  [153, 50, 84],
  [222, 46, 40],
];

const Z = 0.2;
const cables: Record<"dev" | "node" | "data" | "net" | "edge" | "mon", Vec3[]> = {
  dev: [
    [64, 118, Z],
    [64, 96, Z],
    [82, 96, Z],
    [82, 75, Z],
  ],
  node: [
    [104, 50, Z],
    [128, 50, Z],
  ],
  data: [
    [178, 46, Z],
    [204, 46, Z],
  ],
  net: [
    [153, 75, Z],
    [153, 84, Z],
  ],
  edge: [
    [178, 94, Z],
    [199, 94, Z],
    [199, 124, Z],
  ],
  mon: [
    [178, 88, Z],
    [242, 88, Z],
    [242, 100, Z],
  ],
};

// The rig's footprint, used to frame the figure.
const footprint: Vec3[] = [
  [0, 0, 0],
  [260, 0, 0],
  [260, 180, 0],
  [0, 180, 0],
];

// Dotted world map lying on the ground under the rig. Its size and offset
// keep the user cities (Karachi first) in open ground, clear of the objects.
const CELL = 7.5;
const MAP = {
  x: 130 - (WORLD_SIZE.w * CELL) / 2 + 12,
  y: 85 - (WORLD_SIZE.h * CELL) / 2 - 42,
};
const land = WORLD_ROWS.flatMap((row, j) =>
  [...row].flatMap((c, i) => (c === "#" ? [[i, j] as const] : [])),
);
/** A map cell's centre as a world point on the ground. */
const cityPoint = ([i, j]: [number, number]): Vec3 => [
  MAP.x + (i + 0.5) * CELL,
  MAP.y + (j + 0.5) * CELL,
  0,
];

const ASPECT = 2.3;
// Phones hide the callouts, so they get a tighter frame around the rig.
const NARROW_ASPECT = 1.3;
const fit = [...footprint, tower, lid, ...Object.values(sat)];
const viewBox = frame(fit, ASPECT, 0.04);
const narrowViewBox = frame(fit, NARROW_ASPECT, 0.03);
const [VX, VY, VW, VH] = viewBox.split(" ").map(Number);

// Hero layout: the same right edge and vertical centre as the section frame,
// widened to the left so the hero text can sit over the faded map.
export const HERO_ASPECT = 1.8;
const HERO_TEXT_EDGE = -170; // where the text column ends, in screen units
const HERO_TEXT_SHARE = 0.36;
const heroW = (VX + VW - HERO_TEXT_EDGE) / (1 - HERO_TEXT_SHARE);
const heroH = heroW / HERO_ASPECT;
const heroViewBox = [VX + VW - heroW, VY + VH / 2 - heroH / 2, heroW, heroH]
  .map((n) => Math.round(n * 100) / 100)
  .join(" ");

// The hero photo is HTML, placed over the figure at these shares of its width
// and height; the figure draws the leader line from the laptop screen to it.
export const HERO_PHOTO = { top: 0.06, width: 0.14 };
const screenCentre: Vec3 = [64, 121, 23];

type Callout = {
  n: string;
  title: string;
  sub: string;
  at: Vec3;
  side: "left" | "right";
  // Label height as a share of the frame, so callouts never collide.
  band: number;
  // Left callouts in the hero sit above the laptop, beside the hero text.
  heroBand?: number;
};
const callouts: Callout[] = [
  {
    n: "01",
    title: "Dev machine",
    sub: "next.js · react · typescript",
    at: [22, 160, 4],
    side: "left",
    band: 0.56,
    heroBand: 0.2,
  },
  {
    n: "02",
    title: "CI/CD",
    sub: "github actions · azure devops",
    at: [60, 40, 18],
    side: "left",
    band: 0.14,
    heroBand: 0.06,
  },
  {
    n: "03",
    title: "Network",
    sub: "vpc · load balancing · firewall",
    at: [128, 91, 8],
    side: "left",
    band: 0.35,
    heroBand: 0.13,
  },
  {
    n: "04",
    title: "Production node",
    sub: "aws · gcp · azure · alibaba cloud",
    at: [178, 25, 84],
    side: "right",
    band: 0.26,
  },
  {
    n: "05",
    title: "Data",
    sub: "postgresql · mongodb",
    at: [240, 46, 40],
    side: "right",
    band: 0.42,
  },
  {
    n: "06",
    title: "Edge",
    sub: "caddy · automatic tls",
    at: [214, 136, 24],
    side: "right",
    band: 0.58,
  },
  {
    n: "07",
    title: "Uplink",
    sub: "signal to every node",
    at: [256, -59, 120],
    side: "right",
    band: 0.06,
  },
];

const round = (n: number) => Math.round(n * 10) / 10;
const line = (a: Vec3, b: Vec3) => {
  const [ax, ay] = project(...a);
  const [bx, by] = project(...b);
  return `M${round(ax)} ${round(ay)} L${round(bx)} ${round(by)}`;
};

type Props = {
  /** "hero" frames the rig on the right with room for the hero text, and
   * draws a leader from the laptop to the hero photo. */
  variant?: "section" | "hero";
  /** The hero photo's height / width, to find where the leader meets it. */
  photoRatio?: number;
};

export default function ProductionRig({ variant = "section", photoRatio }: Props) {
  const narrow = useIsMobile(640);
  const belowLg = useIsMobile(1024);
  const hero = variant === "hero" && !belowLg && !narrow;
  // Unique ids so two figures on one page never share masks.
  const uid = useId().replace(/[^\w-]/g, "");
  const [run, setRun] = useState(0);
  const [stage, setStage] = useState<Stage | null>(null);
  const [pressed, setPressed] = useState(false);
  const [beat, setBeat] = useState(0);
  const [live, setLive] = useState({
    users: 60.2,
    p95: 84,
    rps: 1.4,
    dbm: -71,
    history: [84, 80, 88, 82, 79, 86, 90, 83, 81, 85, 87, 84],
  });
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Telemetry drifts a little so the readouts feel live.
  useEffect(() => {
    const id = window.setInterval(() => {
      setLive((v) => {
        const p95 = Math.round(
          Math.min(96, Math.max(68, v.p95 + (Math.random() - 0.5) * 8)),
        );
        return {
          users: round(
            Math.min(61.5, Math.max(59.4, v.users + (Math.random() - 0.45) * 0.3)),
          ),
          p95,
          rps: round(Math.min(2.2, Math.max(0.9, v.rps + (Math.random() - 0.5) * 0.3))),
          dbm: Math.round(Math.min(-64, Math.max(-78, v.dbm + (Math.random() - 0.5) * 4))),
          history: [...v.history.slice(1), p95],
        };
      });
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  // The satellite sends a signal down to the rig on a steady beat.
  useEffect(() => {
    const id = window.setInterval(() => setBeat((b) => b + 1), UPLINK_MS);
    return () => window.clearInterval(id);
  }, []);

  const deploy = () => {
    timers.current.forEach(clearTimeout);
    setPressed(true);
    setRun((r) => r + 1);
    STAGES.forEach((s, i) =>
      timers.current.push(window.setTimeout(() => setStage(s), i * STAGE_MS)),
    );
    timers.current.push(
      window.setTimeout(() => setStage(null), STAGES.length * STAGE_MS + 2200),
    );
  };

  const pinged = USER_CITIES[beat % USER_CITIES.length];
  const frameBox = narrow ? narrowViewBox : hero ? heroViewBox : viewBox;
  const [bx, by, bw, bh] = frameBox.split(" ").map(Number);
  const box = { x: bx, y: by, width: bw, height: bh };

  const status = stage
    ? `deploy #${run} · ${{ build: "building", test: "testing", ship: "shipping", live: "live on node-01" }[stage]}`
    : run
      ? `idle · ${run} ${run === 1 ? "deploy" : "deploys"} shipped`
      : "idle · 0 deploys";

  const reached = (s: Stage) =>
    stage !== null && STAGES.indexOf(stage) >= STAGES.indexOf(s);
  const shipping = reached("ship");
  const bars = Math.round(((live.rps - 0.9) / 1.3) * 11) + 1;

  const screen = stage
    ? {
        build: ["$ git push origin main", "> building..."],
        test: ["$ git push origin main", "> build ok", "> running tests..."],
        ship: ["> build ok", "> tests passed", "> shipping to node-01..."],
        live: ["> tests passed", "> shipped to node-01", "> live ✓"],
      }[stage]
    : ["$ ~/portfolio", run ? `> deploy #${run} live ✓` : "> ready to deploy", "_"];

  // Latency sparkline on the monitoring display (face units: 34 x 18).
  const spark = live.history
    .map((v, i) => `${i ? "L" : "M"}${round(3 + i * 3.1)} ${round(25 - ((v - 66) / 32) * 14)}`)
    .join(" ");

  return (
    <Plate
      className={`pf-rig ${hero ? "pf-hero" : ""}`}
      label="An isometric production rig standing on a dotted world map with users in cities around the globe: a laptop with a deploy key wired to CI/CD, a network switch, a production server, a database, a monitoring display and a TLS edge, with a satellite beaming signals down. Press deploy to ship a commit."
      viewBox={frameBox}
      // The hero draws its status inside the figure, so nothing sits outside
      // the drawing and the page can size it to the viewport exactly.
      fig={variant === "hero" ? undefined : "Fig. 01"}
      name={hero ? undefined : variant === "hero" ? "Operator · Karachi, PK" : "From commit to production"}
      hint={variant === "hero" ? undefined : "Press deploy"}
      readout={hero ? undefined : status}
    >
      <style>{`
        .pf-rig{background:transparent;border:0;padding:0;border-radius:0}
        .pf-rig>svg{aspect-ratio:${ASPECT};height:auto;overflow:hidden}
        .pf-rig .ik-label{font-size:6px}
        .pf-rig .ik-signal{stroke-width:1.5}
        .dark .pf-glow{filter:drop-shadow(0 0 1.5px var(--ik-live)) drop-shadow(0 0 5px color-mix(in srgb,var(--ik-live) 55%,transparent))}
        .dark .pf-rig .ik-signal{filter:drop-shadow(0 0 2px var(--ik-live)) drop-shadow(0 0 6px var(--ik-live))}
        .pf-on{fill:var(--ik-live);stroke:var(--ik-live)}
        .pf-on-text{fill:var(--ik-top)}
        .pf-land{fill:var(--ik-line);opacity:.5}
        .pf-city{font:500 5px/1 var(--ik-mono);letter-spacing:.1em;text-transform:uppercase;fill:var(--ik-ink)}
        .pf-city-home{font-weight:700;fill:var(--ik-ink-hi)}
        .pf-ping{fill:none;stroke:var(--ik-live);stroke-width:1;vector-effect:non-scaling-stroke;transform-box:fill-box;transform-origin:center;animation:pf-ping 2.6s ease-out infinite}
        @keyframes pf-ping{from{transform:scale(.3);opacity:.9}to{transform:scale(1.7);opacity:0}}
        .pf-co-title{font:600 8.5px/1 var(--ik-mono);letter-spacing:.12em;text-transform:uppercase;fill:var(--ik-ink-hi)}
        .pf-co-sub{font:500 6px/1 var(--ik-mono);letter-spacing:.1em;text-transform:uppercase;fill:var(--ik-ink)}
        .pf-big{font:300 34px/1 var(--ik-mono);fill:var(--ik-ink-hi)}
        .pf-screen{font-size:4.6px}
        .pf-tiny{font-size:3.6px}
        .pf-rig.pf-hero>svg{aspect-ratio:${HERO_ASPECT}}
        @media (max-width:639px){.pf-hud{display:none}.pf-rig>svg{aspect-ratio:${NARROW_ASPECT}}}
      `}</style>

      {/* World map on the ground, fading out at the frame's edges. */}
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
            {land.map(([i, j]) => (
              <circle
                key={`${i}-${j}`}
                className="pf-land"
                cx={(i + 0.5) * CELL}
                cy={(j + 0.5) * CELL}
                r={CELL * 0.21}
              />
            ))}
            {USER_CITIES.map(({ name, at: [i, j], home }, k) => {
              const on = pinged.name === name;
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

      {/* Uplink to a user city, drawn under the rig so it passes behind it. */}
      <g key={`city-${beat}`}>
        <Signal points={[antenna, cityPoint(pinged.at)]} duration={900} />
      </g>

      {/* Satellite, floating, with dashed uplink beams to the rig. */}
      {beams.map((to, i) => (
        <path key={i} className="ik-dash" d={line(antenna, to)} />
      ))}
      <g className="ik-float">
        <path
          className="ik-line"
          d={`${line([196, -59, 119], [200, -59, 119])} ${line([222, -59, 119], [226, -59, 119])}`}
        />
        {[sat.left, sat.right].map((panel, i) => (
          <Box
            key={i}
            {...panel}
            r={1}
            top={
              <>
                {[6, 12, 18, 24].map((x) => (
                  <line key={x} className="ik-detail" x1={x} x2={x} y1={1} y2={9} />
                ))}
                <line className="ik-detail" x1={1} x2={29} y1={5} y2={5} />
              </>
            }
          />
        ))}
        <Box
          {...sat.dish}
          r={6}
          top={<circle className="ik-detail" cx={6} cy={6} r={3} />}
        />
        <Box
          {...sat.body}
          r={3}
          top={<rect className="ik-well" x={5} y={5} width={12} height={12} rx={2} />}
          front={
            <>
              <rect className="ik-well" x={4} y={4} width={9} height={6} rx={1} />
              <circle className="ik-dot ik-pulse" cx={17} cy={7} r={1.4} />
            </>
          }
          side={<path className="ik-detail" d="M4 5 H18 M4 9 H18 M4 13 H18" />}
        />
      </g>

      {/* Cables on the ground, under everything that stands on it. */}
      {Object.entries(cables).map(([name, points]) => (
        <path key={name} className="ik-line" d={path(points)} />
      ))}

      {/* The commit's path along the cables, drawn before the objects so they
          hide it where it runs behind them. Keyed by run so each deploy plays. */}
      {run > 0 && (
        <g key={run}>
          <Signal points={cables.dev} duration={STAGE_MS} />
          <Signal points={cables.node} delay={STAGE_MS} duration={STAGE_MS} />
          <Signal points={cables.net} delay={STAGE_MS * 2} duration={STAGE_MS / 2} />
          <Signal points={cables.data} delay={STAGE_MS * 2} duration={STAGE_MS} />
          <Signal points={cables.edge} delay={STAGE_MS * 2.5} duration={STAGE_MS} />
          <Signal points={cables.mon} delay={STAGE_MS * 2.5} duration={STAGE_MS} />
        </g>
      )}

      {/* CI/CD unit: build, test and ship segments light in turn. */}
      <Box
        {...ci}
        r={4}
        top={
          <>
            {(["build", "test", "ship"] as Stage[]).map((s, i) => (
              <g key={s} className={reached(s) ? "pf-glow" : undefined}>
                <rect
                  className={reached(s) ? "pf-on" : "ik-well"}
                  x={6}
                  y={7 + i * 13}
                  width={32}
                  height={9}
                  rx={2}
                />
                <text className={`ik-label ${reached(s) ? "pf-on-text" : ""}`} x={10} y={13.6 + i * 13}>
                  {s.toUpperCase()}
                </text>
              </g>
            ))}
          </>
        }
        front={
          <>
            <text className="ik-label" x={5} y={11}>
              CI/CD
            </text>
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                className={reached((["build", "test", "ship"] as Stage[])[i]) ? "ik-dot pf-glow" : "ik-fill"}
                cx={30 + i * 4.5}
                cy={9}
                r={1.3}
              />
            ))}
          </>
        }
        side={<path className="ik-detail" d="M6 5 H44 M6 9 H44 M6 13 H44" />}
      />

      {/* Production node: drive bays with status lights, vents and a power button. */}
      <Box
        {...tower}
        r={5}
        top={
          <>
            <text className="ik-label" x={6} y={10}>
              NODE-01
            </text>
            {Array.from({ length: 6 }, (_, i) => (
              <line key={i} className="ik-detail" x1={8} x2={42} y1={20 + i * 4.5} y2={20 + i * 4.5} />
            ))}
          </>
        }
        front={
          <>
            {Array.from({ length: 7 }, (_, i) => (
              <g key={i}>
                <rect className="ik-well" x={6} y={8 + i * 9.5} width={38} height={6} rx={1} />
                <line className="ik-detail" x1={9} x2={30} y1={11 + i * 9.5} y2={11 + i * 9.5} />
                <circle
                  className={`ik-dot ${shipping ? "pf-glow" : "ik-pulse"}`}
                  cx={39.5}
                  cy={11 + i * 9.5}
                  r={1.4}
                  style={{ animationDelay: `${(i * 0.37) % 1.8}s` }}
                />
              </g>
            ))}
            <circle className="ik-line" cx={25} cy={77} r={2.6} />
            <path className="ik-line" d="M25 75.4 V77" />
          </>
        }
        side={
          <>
            {Array.from({ length: 18 }, (_, i) => (
              <line key={i} className="ik-detail" x1={8} x2={42} y1={8 + i * 4} y2={8 + i * 4} />
            ))}
          </>
        }
      />

      {/* Data layer. */}
      <Box
        {...db}
        r={18}
        top={
          <>
            <circle className="ik-detail" cx={18} cy={18} r={14} />
            <circle className="ik-detail" cx={18} cy={18} r={9} />
            <circle className={reached("live") ? "ik-dot pf-glow" : "ik-detail"} cx={18} cy={18} r={3.5} />
          </>
        }
        front={<path className="ik-detail" d="M3 10 H33 M3 20 H33 M3 30 H33" />}
      />

      {/* Network switch with blinking ports. */}
      <Box
        {...net}
        r={2}
        top={
          <text className="ik-label pf-tiny" x={4} y={9}>
            SW-01
          </text>
        }
        front={
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <rect className="ik-well" x={4 + i * 5.6} y={2} width={4} height={3.6} rx={0.5} />
                <circle
                  className="ik-dot ik-pulse"
                  cx={6 + i * 5.6}
                  cy={6.6}
                  r={0.6}
                  style={{ animationDelay: `${(i * 0.53) % 1.8}s` }}
                />
              </g>
            ))}
          </>
        }
      />

      {/* Monitoring display: live p95 latency. */}
      <Box
        {...monitor}
        r={2}
        front={
          <>
            <rect className="ik-screen" x={3} y={3} width={34} height={26} rx={1.5} />
            <text className="ik-screen-text pf-tiny" x={5} y={8.5}>
              P95 {live.p95}MS
            </text>
            <path className="ik-screen-line" d={spark} />
          </>
        }
      />

      {/* Laptop: screen first, then the deck and its keys. */}
      <Box
        {...lid}
        r={2}
        front={
          <>
            <rect className="ik-screen" x={4} y={4} width={76} height={36} rx={2} />
            {screen.map((text, i) => (
              <text key={i} className="ik-screen-text pf-screen" x={8} y={12 + i * 7}>
                {text}
              </text>
            ))}
          </>
        }
      />
      <Box
        {...deck}
        r={3}
        top={
          <>
            {Array.from({ length: 4 }, (_, row) =>
              Array.from({ length: 7 }, (_, col) => (
                <rect
                  key={`${row}-${col}`}
                  className="ik-detail"
                  x={6 + col * 6.5}
                  y={6 + row * 6.5}
                  width={5}
                  height={5}
                  rx={1}
                />
              )),
            )}
            <rect className="ik-detail" x={56} y={6} width={22} height={18} rx={2} />
          </>
        }
      />
      {!pressed && <Ripple x={key.x} y={key.y} z={key.z + key.h} w={key.w} d={key.d} r={2} />}
      <Press label="Deploy" onPress={deploy} data-hot={!pressed || undefined}>
        <g>
          <Box
            {...key}
            r={2}
            className={stage ? "pf-glow" : undefined}
            top={
              <text className="ik-label" x={5} y={9.5}>
                DEPLOY
              </text>
            }
          />
        </g>
      </Press>

      {/* Caddy edge: the padlock lights once the deploy is live. */}
      <Box
        {...lock}
        r={4}
        top={
          <text className="ik-label" x={6} y={14}>
            TLS
          </text>
        }
        front={
          <g className={reached("live") ? "pf-glow" : undefined}>
            <path className={reached("live") ? "ik-live" : "ik-line"} d="M12 11 V8 a3 3 0 0 1 6 0 V11" />
            <rect className={reached("live") ? "pf-on" : "ik-well"} x={9.5} y={11} width={11} height={8} rx={1.5} />
          </g>
        }
      />

      {/* Satellite signals, re-keyed on every beat so each one plays. */}
      <g key={`beat-${beat}`}>
        {beams.map((to, i) => (
          <Signal key={i} points={[antenna, to]} delay={i * 180} duration={700} />
        ))}
      </g>

      {/* Callouts and live readouts around the figure. */}
      <g className="pf-hud">
        {callouts
          .map(({ n, title, sub, at, side, band, heroBand }) => {
          const [px, py] = project(...at);
          const ly = by + bh * (hero && heroBand !== undefined ? heroBand : band);
          const lx =
            side === "right" ? bx + bw - 6 : hero ? HERO_TEXT_EDGE + 12 : bx + 6;
          const anchor = side === "left" ? "start" : "end";
          const reach = side === "left" ? lx + 96 : lx - 96;
          return (
            <g
              key={n}
              // Callouts blink on in number order as the page loads, after the
              // hero text in the hero.
              className="hud-blink"
              style={{ "--hud-delay": `${(variant === "hero" ? 1000 : 300) + (Number(n) - 1) * 140}ms` } as React.CSSProperties}
            >
              <path className="ik-line ik-dim" d={`M${lx} ${ly + 4} H${round(px)} V${round(py)}`} />
              <path className="ik-line" d={`M${lx} ${ly + 4} H${reach}`} />
              <circle className="ik-dot pf-glow" cx={round(px)} cy={round(py)} r={1.4} />
              <text className="pf-co-title" x={lx} y={ly - 5} textAnchor={anchor}>
                {n} / {title}
              </text>
              <text className="pf-co-sub" x={lx} y={ly + 12} textAnchor={anchor}>
                {sub}
              </text>
            </g>
          );
        })}

        {/* Telemetry, bottom left (in the hero, just right of the text). */}
        {(
        <g transform={`translate(${hero ? HERO_TEXT_EDGE + 12 : bx + 6} ${by + bh - 87})`}>
          <text className="pf-co-sub">TELEMETRY / LIVE</text>
          {[
            ["USERS", `${live.users.toFixed(1)}K`],
            ["P95", `${live.p95} MS`],
            ["UPLINK", `${live.dbm} DBM`],
            ["PING", pinged.name.toUpperCase()],
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
        )}

        {/* Big throughput readout, bottom right. */}
        <g transform={`translate(${bx + bw - 6} ${by + bh - (hero ? 80 : 64)})`}>
          <text className="pf-co-sub" textAnchor="end">
            REQUESTS / SEC
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
              className={i < bars ? "pf-on" : "ik-well"}
              x={-12 * 6.4 + i * 6.4}
              y={40}
              width={4.4}
              height={9}
              rx={0.6}
            />
          ))}
          <text className="pf-co-sub" y={60} textAnchor="end">
            UPTIME 99.98%
          </text>
          {hero && (
            <text className="pf-co-title" y={74} textAnchor="end" aria-live="polite">
              {status}
            </text>
          )}
        </g>

        {/* Leader from the laptop screen to the hero photo (drawn in HTML). */}
        {hero && photoRatio && (() => {
          const [ax, ay] = project(...screenCentre);
          const px = round(bx + HERO_PHOTO.width * bw);
          const py = round(
            by + (HERO_PHOTO.top + (HERO_PHOTO.width * HERO_ASPECT * photoRatio) / 2) * bh,
          );
          const elbow = HERO_TEXT_EDGE - 5;
          return (
            <g>
              <path className="ik-line ik-dim" d={`M${px + 4} ${py} H${elbow} V${round(ay)} H${round(ax)}`} />
              <circle className="ik-dot pf-glow" cx={px + 4} cy={py} r={1.4} />
              <circle className="ik-dot pf-glow" cx={round(ax)} cy={round(ay)} r={1.4} />
            </g>
          );
        })()}
      </g>
    </Plate>
  );
}
