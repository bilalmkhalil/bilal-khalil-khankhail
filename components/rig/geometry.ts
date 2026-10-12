// World layout for the homepage production rig, in isokit world units on open
// ground (z = 0). Paint order is back to front. The footprints here are what
// the callouts, cables and the world map are laid out around, so the parts in
// parts.tsx stay inside them.

import { frame, project, type Box3, type Vec3 } from "react-isokit";
import { WORLD_ROWS, WORLD_SIZE } from "@/lib/world-map";

export type Stage = "build" | "test" | "ship" | "live";
export const STAGES: Stage[] = ["build", "test", "ship", "live"];
export const STAGE_MS = 520;

// Unit footprints.
export const ci: Box3 = { x: 60, y: 25, z: 0, w: 44, d: 50, h: 18 };
export const tower: Box3 = { x: 128, y: 25, z: 0, w: 50, d: 50, h: 84 };
export const db: Box3 = { x: 204, y: 28, z: 0, w: 36, d: 36, h: 40 };
export const net: Box3 = { x: 128, y: 84, z: 0, w: 50, d: 14, h: 8 };
export const monitor: Box3 = { x: 222, y: 100, z: 0, w: 40, d: 4, h: 32 };
export const lid: Box3 = { x: 22, y: 118, z: 0, w: 84, d: 3, h: 46 };
export const deck: Box3 = { x: 22, y: 121, z: 0, w: 84, d: 50, h: 4 };
export const key: Box3 = { x: 70, y: 151, z: 4, w: 30, d: 14, h: 3 };
export const lock: Box3 = { x: 184, y: 124, z: 0, w: 30, d: 24, h: 24 };

/** Centre of the deploy key's top, where the demo cursor presses. */
export const keyTop: Vec3 = [
  key.x + key.w / 2,
  key.y + key.d / 2,
  key.z + key.h,
];
/** Where the commit packet lands: the CI unit's keys, then the node's lid. */
export const ciTop: Vec3 = [ci.x + ci.w / 2, ci.y + ci.d / 2, ci.h];
export const nodeTop: Vec3 = [
  tower.x + tower.w / 2,
  tower.y + tower.d / 2,
  tower.h,
];

// Satellite floating behind and above the rig.
export const sat = {
  body: { x: 200, y: -70, z: 112, w: 22, d: 22, h: 16 },
  left: { x: 166, y: -64, z: 118, w: 30, d: 10, h: 2 },
  right: { x: 226, y: -64, z: 118, w: 30, d: 10, h: 2 },
  dish: { x: 205, y: -65, z: 102, w: 12, d: 12, h: 8 },
} satisfies Record<string, Box3>;
export const antenna: Vec3 = [211, -59, 102];
// Beam targets: the node's lid and the data layer's top, both in clear view.
export const beams: Vec3[] = [
  [153, 50, 84],
  [222, 46, 40],
];

const Z = 0.2;
export const cables: Record<
  "dev" | "node" | "data" | "net" | "edge" | "mon",
  Vec3[]
> = {
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
export const CELL = 7.5;
export const MAP = {
  x: 130 - (WORLD_SIZE.w * CELL) / 2 + 12,
  y: 85 - (WORLD_SIZE.h * CELL) / 2 - 42,
};
export const land = WORLD_ROWS.flatMap((row, j) =>
  [...row].flatMap((c, i) => (c === "#" ? [[i, j] as const] : [])),
);
/** A map cell's centre as a world point on the ground. */
export const cityPoint = ([i, j]: [number, number]): Vec3 => [
  MAP.x + (i + 0.5) * CELL,
  MAP.y + (j + 0.5) * CELL,
  0,
];

export const ASPECT = 2.3;
// Phones hide the callouts, so they get a tighter frame around the rig.
export const NARROW_ASPECT = 1.3;
const fit = [...footprint, tower, lid, ...Object.values(sat)];
export const viewBox = frame(fit, ASPECT, 0.04);
export const narrowViewBox = frame(fit, NARROW_ASPECT, 0.03);
const [VX, VY, VW, VH] = viewBox.split(" ").map(Number);

// Hero layout: the same right edge and vertical centre as the section frame,
// widened to the left so the hero text can sit over the faded map.
export const HERO_ASPECT = 1.8;
export const HERO_TEXT_EDGE = -170; // where the text column ends, in screen units
const HERO_TEXT_SHARE = 0.36;
const heroW = (VX + VW - HERO_TEXT_EDGE) / (1 - HERO_TEXT_SHARE);
const heroH = heroW / HERO_ASPECT;
export const heroViewBox = [
  VX + VW - heroW,
  VY + VH / 2 - heroH / 2,
  heroW,
  heroH,
]
  .map((n) => Math.round(n * 100) / 100)
  .join(" ");

// The hero photo is HTML, placed over the figure at these shares of its width
// and height; the figure draws the leader line from the laptop screen to it.
export const HERO_PHOTO = { top: 0.06, width: 0.14 };
export const screenCentre: Vec3 = [64, 121, 23];

export type Callout = {
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
export const callouts: Callout[] = [
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

export const round = (n: number) => Math.round(n * 10) / 10;
export const line = (a: Vec3, b: Vec3) => {
  const [ax, ay] = project(...a);
  const [bx, by] = project(...b);
  return `M${round(ax)} ${round(ay)} L${round(bx)} ${round(by)}`;
};
