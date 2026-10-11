"use client";

// Animated, clickable isometric illustrations for the PanelMate feature cards.

import { useId, useState } from "react";

// Face colours for light and dark themes, set on each figure. Neutral greys
// taken from the PanelMate app icon: accent blocks are charcoal in light mode
// and off-white in dark mode, like the icon's completed rounds.
const tokens = [
  "[--iso-top:#f7f7f7] [--iso-left:#c9c9c9] [--iso-right:#dedede] [--iso-edge:#b0b0b0] [--iso-inset:#ebebeb]",
  "[--iso-a-top:#2b2b2b] [--iso-a-left:#0d0d0d] [--iso-a-right:#1a1a1a] [--iso-a-inset:#474747] [--iso-on-accent:#f2f2f2]",
  "dark:[--iso-top:#2b2b2b] dark:[--iso-left:#111111] dark:[--iso-right:#1c1c1c] dark:[--iso-edge:#474747] dark:[--iso-inset:#333333]",
  "dark:[--iso-a-top:#f2f2f2] dark:[--iso-a-left:#a6a6a6] dark:[--iso-a-right:#c9c9c9] dark:[--iso-a-inset:#d6d6d6] dark:[--iso-on-accent:#1a1a1a]",
].join(" ");

// Keyframes live inside each SVG so the figures carry their own motion.
const motion = `
.iso-float{animation:iso-float 4s ease-in-out infinite}
@keyframes iso-float{50%{transform:translateY(-6px)}}
.iso-press{animation:iso-press 3s ease-in-out infinite}
@keyframes iso-press{0%,40%,100%{transform:none}48%,62%{transform:translateY(3px)}}
@keyframes iso-press2{0%,40%,100%{transform:none}48%,62%{transform:translateY(3px)}}
.iso-travel{animation:iso-travel var(--t,8s) linear infinite}
@keyframes iso-travel{0%{transform:none;opacity:0}6%,94%{opacity:1}100%{transform:translate(var(--dx),var(--dy));opacity:0}}
.iso-slide{animation:iso-slide 6s ease-in-out infinite}
@keyframes iso-slide{0%,8%{transform:translate(var(--dx),var(--dy));opacity:0}22%,78%{transform:none;opacity:1}92%,100%{transform:translate(var(--dx),var(--dy));opacity:0}}
.iso-blink{animation:iso-blink 2s ease-in-out infinite}
@keyframes iso-blink{50%{opacity:.3}}
.iso-spin{transform-origin:0 0;animation:iso-spin 13s linear infinite}
@keyframes iso-spin{to{transform:rotate(360deg)}}
.iso-beat{opacity:0;animation:iso-beat 13s ease-out infinite}
@keyframes iso-beat{0%{opacity:.55}10%,100%{opacity:0}}
.iso-hit{cursor:pointer;outline:none}
.iso-hit>g{transition:transform .2s ease}
.iso-hit:hover>g,.iso-hit:focus-visible>g{transform:translateY(-3px)}
.iso-hit:focus-visible polygon{stroke:var(--iso-a-top)}
.iso-still:hover>g,.iso-still:focus-visible>g{transform:none}
.iso-still:hover ellipse,.iso-still:focus-visible ellipse{stroke:var(--iso-a-top);stroke-width:1.4}
.iso-paused *{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){svg.iso *{animation:none!important}svg.iso .iso-travel{display:none}}
`;

type V = [number, number, number];
type Tone = "base" | "accent" | "ink";
type Ink = "text" | "muted" | "onAccent";
type Style = React.CSSProperties & Record<`--${string}`, string>;

const C = Math.cos(Math.PI / 6);
const round = (n: number) => Math.round(n * 100) / 100;
const project = ([x, y, z]: V): [number, number] => [
  (x - y) * C,
  (x + y) / 2 - z,
];
const points = (vs: V[]) =>
  vs.map((v) => project(v).map(round).join(",")).join(" ");
const topFace = (
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
): V[] => [
  [x, y, z],
  [x + w, y, z],
  [x + w, y + d, z],
  [x, y + d, z],
];
/** Screen offset between two points, for CSS translate animations. */
const offset = (from: V, to: V, t?: string): Style => {
  const [a, b] = [project(from), project(to)];
  return {
    "--dx": `${round(b[0] - a[0])}px`,
    "--dy": `${round(b[1] - a[1])}px`,
    ...(t && { "--t": t }),
  };
};

const faces: Record<Tone, [string, string, string, string]> = {
  base: [
    "var(--iso-top)",
    "var(--iso-left)",
    "var(--iso-right)",
    "var(--iso-inset)",
  ],
  accent: [
    "var(--iso-a-top)",
    "var(--iso-a-left)",
    "var(--iso-a-right)",
    "var(--iso-a-inset)",
  ],
  ink: ["#2b2b31", "#0b0b0e", "#16161a", "#232329"],
};
const inks: Record<Ink, string> = {
  text: "var(--foreground)",
  muted: "color-mix(in oklab, var(--foreground) 55%, transparent)",
  onAccent: "var(--iso-on-accent)",
};
// Text drawn flat on a top, front-left or front-right face.
const skew = {
  top: [C, 0.5, -C, 0.5],
  left: [C, 0.5, 0, 1],
  right: [C, -0.5, 0, 1],
};
// Semi-axes of a circle of radius 1 lying on the ground plane.
const RX = Math.SQRT2 * C;
const RY = Math.SQRT1_2;

class Scene {
  private stack: React.ReactNode[][] = [[]];
  private key = 0;
  private xs: number[] = [];
  private ys: number[] = [];

  private add(node: (key: number | string) => React.ReactNode, key?: string) {
    this.stack[this.stack.length - 1].push(node(key ?? this.key++));
  }

  private track(...pairs: [number, number][]) {
    for (const [x, y] of pairs) {
      this.xs.push(x);
      this.ys.push(y);
    }
  }

  /** Wrap everything drawn inside `draw` in one animated group. */
  group(className: string, style: Style | undefined, draw: () => void) {
    this.stack.push([]);
    draw();
    const children = this.stack.pop();
    this.add((key) => (
      <g key={key} className={className} style={style}>
        {children}
      </g>
    ));
  }

  box(
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number,
    tone: Tone = "base",
    inset = 0,
  ) {
    const top = topFace(x, y, z + h, w, d);
    const left: V[] = [
      [x, y + d, z + h],
      [x + w, y + d, z + h],
      [x + w, y + d, z],
      [x, y + d, z],
    ];
    const right: V[] = [
      [x + w, y, z + h],
      [x + w, y + d, z + h],
      [x + w, y + d, z],
      [x + w, y, z],
    ];
    this.track(
      ...[...top, [x, y + d, z], [x + w, y + d, z], [x + w, y, z]].map((v) =>
        project(v as V),
      ),
    );
    const [t, l, r, i] = faces[tone];
    this.add((key) => (
      <g
        key={key}
        stroke="var(--iso-edge)"
        strokeWidth="0.75"
        strokeLinejoin="round"
      >
        <polygon points={points(left)} fill={l} />
        <polygon points={points(right)} fill={r} />
        <polygon points={points(top)} fill={t} />
        {inset > 0 && (
          <polygon
            points={points(
              topFace(
                x + inset,
                y + inset,
                z + h,
                w - 2 * inset,
                d - 2 * inset,
              ),
            )}
            fill={i}
            strokeOpacity="0.6"
          />
        )}
      </g>
    ));
  }

  quad(vs: V[], fill: string, opacity = 1, className?: string, style?: Style) {
    this.add((key) => (
      <polygon
        key={key}
        points={points(vs)}
        fill={fill}
        fillOpacity={opacity}
        className={className}
        style={style}
      />
    ));
  }

  seg(
    from: V,
    to: V,
    stroke = "var(--iso-edge)",
    width = 1,
    className?: string,
    dash?: string,
  ) {
    const [a, b] = [project(from), project(to)];
    this.track(a, b);
    this.add((key) => (
      <line
        key={key}
        x1={round(a[0])}
        y1={round(a[1])}
        x2={round(b[0])}
        y2={round(b[1])}
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={dash}
        strokeLinecap="round"
        className={className}
      />
    ));
  }

  dot(at: V, r: number, fill: string, className?: string, style?: Style) {
    const [x, y] = project(at);
    this.add((key) => (
      <circle
        key={key}
        cx={round(x)}
        cy={round(y)}
        r={r}
        fill={fill}
        className={className}
        style={style}
      />
    ));
  }

  text(
    label: string,
    at: V,
    face: keyof typeof skew,
    size = 9,
    ink: Ink = "text",
    extra?: React.SVGProps<SVGTextElement>,
  ) {
    const [x, y] = project(at);
    const half = (label.length * size) / 3;
    this.track([x - half, y - size], [x + half, y + size]);
    this.add((key) => (
      <text
        key={key}
        transform={`matrix(${skew[face].map(round).join(" ")} ${round(x)} ${round(y)})`}
        fontSize={size}
        textAnchor="middle"
        dominantBaseline="central"
        fill={inks[ink]}
        {...extra}
      >
        {label}
      </text>
    ));
  }

  cylinder(
    cx: number,
    cy: number,
    z: number,
    r: number,
    h: number,
    bands: number,
  ) {
    const [x, bottom] = project([cx, cy, z]);
    const top = bottom - h;
    const rx = round(r * RX);
    const ry = round(r * RY);
    const front = (y: number) =>
      `M${round(x - rx)} ${round(y)} A${rx} ${ry} 0 0 0 ${round(x + rx)} ${round(y)}`;
    this.track([x - rx, top - ry], [x + rx, bottom + ry]);
    this.add((key) => (
      <g key={key} stroke="var(--iso-edge)" strokeWidth="0.75">
        <path
          d={`${front(bottom)} L${round(x + rx)} ${round(top)} L${round(x - rx)} ${round(top)} Z`}
          fill="var(--iso-right)"
        />
        {Array.from({ length: bands }, (_, i) => (
          <path
            key={i}
            d={front(bottom - (h * (i + 1)) / (bands + 1))}
            fill="none"
          />
        ))}
        <ellipse
          cx={round(x)}
          cy={round(top)}
          rx={rx}
          ry={ry}
          fill="var(--iso-a-top)"
        />
        <ellipse
          cx={round(x)}
          cy={round(top)}
          rx={round(rx * 0.55)}
          ry={round(ry * 0.55)}
          fill="var(--iso-a-inset)"
          strokeOpacity="0.5"
        />
      </g>
    ));
  }

  /** A focusable control: a click, Enter or Space runs `onPress`. */
  button(
    label: string,
    onPress: () => void,
    draw: () => void,
    pressed?: boolean,
    lift = true,
  ) {
    this.stack.push([]);
    draw();
    const children = this.stack.pop();
    this.add((key) => (
      <g
        key={key}
        role="button"
        tabIndex={0}
        aria-label={label}
        aria-pressed={pressed}
        className={lift ? "iso-hit" : "iso-hit iso-still"}
        onClick={onPress}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          onPress();
        }}
      >
        <g>{children}</g>
      </g>
    ));
  }

  /** Flat content drawn in ground-plane units, positioned at `at`. */
  flat(at: V, className: string, children: React.ReactNode, clip?: string) {
    const [x, y] = project(at);
    // A clipped copy keeps a fixed key, so re-renders never restart its
    // animation out of step with its twin.
    this.add(
      (key) => (
        <g key={key} clipPath={clip && `url(#${clip})`}>
          <g
            transform={`matrix(${skew.top.map(round).join(" ")} ${round(x)} ${round(y)})`}
          >
            <g className={className}>{children}</g>
          </g>
        </g>
      ),
      clip && `flat-${clip}`,
    );
  }

  /** Any SVG node, drawn as is. */
  raw(node: React.ReactNode) {
    this.add((key) => <g key={key}>{node}</g>);
  }

  /** Count a box's space in the frame without drawing it, so the figure
   * doesn't rescale when something rises, shrinks or disappears. */
  reserve(x: number, y: number, z: number, w: number, d: number, h: number) {
    this.track(
      ...[...topFace(x, y, z + h, w, d), ...topFace(x, y, z, w, d)].map(
        project,
      ),
    );
  }

  /** A ground-plane circle outline (or filled disc) at height z. */
  ellipse(
    cx: number,
    cy: number,
    z: number,
    r: number,
    stroke: string,
    width = 1,
    fill = "none",
    dash?: string,
  ) {
    const [x, y] = project([cx, cy, z]);
    this.track([x - r * RX, y - r * RY], [x + r * RX, y + r * RY]);
    this.add((key) => (
      <ellipse
        key={key}
        cx={round(x)}
        cy={round(y)}
        rx={round(r * RX)}
        ry={round(r * RY)}
        fill={fill}
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={dash}
      />
    ));
  }

  /** An extruded ring sector (a full disc when r0 is 0 and the arc is 2π). */
  sector(
    cx: number,
    cy: number,
    z: number,
    r0: number,
    r1: number,
    a0: number,
    a1: number,
    h: number,
    tone: Tone = "base",
  ) {
    const steps = Math.max(2, Math.ceil((a1 - a0) / (Math.PI / 36)));
    const angle = (i: number) => a0 + ((a1 - a0) * i) / steps;
    const at = (r: number, a: number, zz: number): V => [
      cx + r * Math.cos(a),
      cy + r * Math.sin(a),
      zz,
    ];
    const [t, l, r] = faces[tone];
    // Blend the left and right face colours by which way a wall faces.
    const shade = (nx: number, ny: number) =>
      `color-mix(in oklab, ${l} ${Math.round(((ny - nx) / Math.SQRT2 + 1) * 50)}%, ${r})`;
    const walls: [V[], string][] = [];
    for (let i = 0; i < steps; i++) {
      const [p, q] = [angle(i), angle(i + 1)];
      const m = (p + q) / 2;
      const [nx, ny] = [Math.cos(m), Math.sin(m)];
      if (r0 > 0 && nx + ny < 0)
        walls.push([
          [at(r0, p, z), at(r0, q, z), at(r0, q, z + h), at(r0, p, z + h)],
          shade(-nx, -ny),
        ]);
    }
    const full = a1 - a0 > 2 * Math.PI - 0.01;
    if (!full) {
      const caps: [number, number, number][] = [
        [a0, Math.sin(a0), -Math.cos(a0)],
        [a1, -Math.sin(a1), Math.cos(a1)],
      ];
      for (const [a, nx, ny] of caps)
        if (nx + ny > 0)
          walls.push([
            [at(r0, a, z), at(r1, a, z), at(r1, a, z + h), at(r0, a, z + h)],
            shade(nx, ny),
          ]);
    }
    for (let i = 0; i < steps; i++) {
      const [p, q] = [angle(i), angle(i + 1)];
      const m = (p + q) / 2;
      const [nx, ny] = [Math.cos(m), Math.sin(m)];
      if (nx + ny > 0)
        walls.push([
          [at(r1, p, z), at(r1, q, z), at(r1, q, z + h), at(r1, p, z + h)],
          shade(nx, ny),
        ]);
    }
    const top: V[] = [];
    for (let i = 0; i <= steps; i++) top.push(at(r1, angle(i), z + h));
    if (r0 > 0)
      for (let i = steps; i >= 0; i--) top.push(at(r0, angle(i), z + h));
    else top.push([cx, cy, z + h]);
    const rim: V[] = [];
    for (let i = 0; i <= steps; i++) rim.push(at(r1, angle(i), z));
    this.track(...top.map(project), ...rim.map(project));
    this.add((key) => (
      <g key={key} strokeLinejoin="round">
        {walls.map(([vs, fill], i) => (
          <polygon
            key={i}
            points={points(vs)}
            style={{ fill, stroke: fill }}
            strokeWidth="0.6"
          />
        ))}
        <polygon
          points={points(full ? top.slice(0, -1) : top)}
          fill={t}
          stroke="var(--iso-edge)"
          strokeWidth="0.75"
        />
      </g>
    ));
  }

  render(label: string, caption: string, paused = false) {
    const pad = 8;
    const minX = Math.min(...this.xs) - pad;
    const minY = Math.min(...this.ys) - pad - 6;
    const width = Math.max(...this.xs) + pad - minX;
    const height = Math.max(...this.ys) + pad - minY;
    return (
      <figure>
        <svg
          viewBox={`${round(minX)} ${round(minY)} ${round(width)} ${round(height)}`}
          role="group"
          aria-label={label}
          className={`iso mx-auto block h-48 w-full select-none sm:h-52 ${paused ? "iso-paused" : ""} ${tokens}`}
        >
          <style>{motion}</style>
          {this.stack[0]}
        </svg>
        <figcaption
          aria-live="polite"
          className="text-ink/55 mt-3 min-h-8 text-center text-xs text-balance"
        >
          {caption}
        </figcaption>
      </figure>
    );
  }
}

export function PomodoroFigure() {
  const id = useId().replace(/[^\w-]/g, "");
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const s = new Scene();
  const [cx, cy] = [70, 70];
  // Four focus blocks with short breaks, then a long break: 130 minutes.
  const cycle = [25, 5, 25, 5, 25, 5, 25, 15];
  const names = cycle.map((length, i) =>
    length === 25
      ? `Focus ${i / 2 + 1} of 4`
      : length === 5
        ? "Short break"
        : "Long break",
  );
  const gap = 0.05;
  const start = -0.75 * Math.PI;
  const toAngle = (minute: number) => start + (minute / 130) * 2 * Math.PI;
  s.sector(cx, cy, 0, 0, 68, 0, 2 * Math.PI, 7);
  s.ellipse(cx, cy, 7, 64, "var(--iso-edge)", 0.6);
  for (let m = 0; m < 130; m += 5) {
    const a = toAngle(m);
    const major = m % 25 === 0;
    const at = (r: number): V => [
      cx + r * Math.cos(a),
      cy + r * Math.sin(a),
      7,
    ];
    s.seg(at(60), at(major ? 66 : 63.5), "var(--iso-edge)", major ? 1.4 : 0.8);
  }
  s.ellipse(cx, cy, 7, 35, "var(--iso-edge)", 0.8, "var(--iso-inset)", "2 3");
  // Playhead running round the rim. The back half is drawn before the
  // blocks so they hide it, the front half after them so it stays on top.
  const [, horizon] = project([cx, cy, 7]);
  const playhead = (
    <>
      <path
        d={`M${round(65 * Math.cos(-0.5))} ${round(65 * Math.sin(-0.5))} A65 65 0 0 1 65 0`}
        fill="none"
        stroke="var(--iso-a-top)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle cx="65" cy="0" r="2.6" fill="var(--iso-a-top)" />
      <circle cx="65" cy="0" r="1.1" fill="var(--iso-on-accent)" />
    </>
  );
  s.raw(
    <defs>
      <clipPath id={`${id}-back`}>
        <rect x={-500} y={round(horizon) - 500} width={1000} height={500} />
      </clipPath>
      <clipPath id={`${id}-front`}>
        <rect x={-500} y={round(horizon)} width={1000} height={500} />
      </clipPath>
    </defs>,
  );
  s.flat([cx, cy, 7], "iso-spin", playhead, `${id}-back`);
  // Room for a selected block to rise.
  s.reserve(cx - 57, cy - 57, 7, 114, 114, 22);
  // Draw sectors back to front so taller ones in front overlap correctly.
  let minute = 0;
  const pieces = cycle.map((length, i) => {
    const from = minute;
    minute += length;
    const [a0, a1] = [toAngle(from) + gap, toAngle(minute) - gap];
    const mid = (a0 + a1) / 2;
    return {
      i,
      length,
      from,
      a0,
      a1,
      mid,
      // Rounded so equal depths sort the same on the server and the client.
      depth: round(Math.cos(mid) + Math.sin(mid)),
    };
  });
  // Hub showing the running session; it pauses and resumes the cycle.
  const hub = () =>
    s.button(
      paused ? "Resume" : "Pause",
      () => setPaused(!paused),
      () => {
        s.sector(cx, cy, 7, 0, 25, 0, 2 * Math.PI, 12);
        s.ellipse(cx, cy, 19, 21, "var(--iso-edge)", 0.6, "var(--iso-inset)");
        s.text(
          `${selected === null ? 25 : cycle[selected]}:00`,
          [cx - 2, cy - 2, 19],
          "top",
          10,
          "text",
          { fontWeight: 600 },
        );
        if (paused)
          s.text("PAUSED", [cx - 2, cy - 12, 19], "top", 4.5, "muted");
        for (let k = 0; k < 4; k++)
          s.dot(
            [cx - 7 + k * 4.6, cy + 9, 19],
            1.5,
            k < 2 ? "var(--iso-a-top)" : "var(--iso-edge)",
            k === 1 ? "iso-blink" : undefined,
          );
      },
      undefined,
      // The hub stays put on hover so it never overlaps the blocks.
      false,
    );
  const block = ({ i, length, from, a0, a1, mid }: (typeof pieces)[0]) => {
    const focus = length === 25;
    const active = selected === i;
    const h = (focus ? 14 : length === 15 ? 9 : 4) + (active ? 8 : 0);
    const z = 7 + h;
    s.button(
      `${names[i]}, ${length} minutes`,
      () => setSelected(active ? null : i),
      () => {
        s.sector(
          cx,
          cy,
          7,
          40,
          57,
          a0,
          a1,
          h,
          focus || active ? "accent" : "base",
        );
        const arc: V[] = [];
        for (let k = 0; k <= 12; k++) {
          const a = a0 + ((a1 - a0) * k) / 12;
          arc.push([cx + 57 * Math.cos(a), cy + 57 * Math.sin(a), z]);
        }
        for (let k = 12; k >= 0; k--) {
          const a = a0 + ((a1 - a0) * k) / 12;
          arc.push([cx + 40 * Math.cos(a), cy + 40 * Math.sin(a), z]);
        }
        s.quad(arc, "var(--iso-on-accent)", 1, "iso-beat", {
          animationDelay: `${round(from / 10)}s`,
        });
        s.text(
          String(length),
          [cx + 48.5 * Math.cos(mid), cy + 48.5 * Math.sin(mid), z],
          "top",
          focus ? 8 : 6,
          focus || active ? "onAccent" : "muted",
          { fontWeight: 600 },
        );
      },
      active,
    );
  };
  const sorted = [...pieces].sort((a, b) => a.depth - b.depth || a.i - b.i);
  // Blocks behind the hub, then the hub, then the blocks in front of it.
  sorted.filter((p) => p.depth < 0).forEach(block);
  hub();
  sorted.filter((p) => p.depth >= 0).forEach(block);
  s.flat([cx, cy, 7], "iso-spin", playhead, `${id}-front`);
  return s.render(
    "A Pomodoro dial: four 25-minute focus blocks with 5-minute breaks and a 15-minute long break, with a playhead going round",
    selected !== null
      ? `${names[selected]} · ${cycle[selected]} minutes`
      : paused
        ? "Paused. Tap the centre to resume."
        : "Tap a block to inspect it, or the centre to pause.",
    paused,
  );
}

const shortcuts = [
  ["T", "opens the Timer"],
  ["S", "opens the Stopwatch"],
  ["H", "opens History"],
  ["Space", "starts or pauses"],
] as const;

export function KeyboardFigure() {
  const [chosen, setChosen] = useState(0);
  const [presses, setPresses] = useState(0);
  const s = new Scene();
  s.reserve(8, 8, 6, 180, 18, 5);
  const [letter, action] = shortcuts[chosen];
  s.box(0, 0, 0, 196, 84, 6, "base", 3);
  // Back row: plain keys, then T, S and H, then a wide Space key.
  const row: [string | null, number][] = [
    [null, 18],
    [null, 18],
    ["T", 18],
    ["S", 18],
    ["H", 18],
    [null, 18],
    ["Space", 41],
  ];
  let bx = 8;
  row.forEach(([label, w]) => {
    const x = bx;
    bx += w + 5;
    if (!label) return s.box(x, 8, 6, w, 18, 5, "base", 3);
    const i = shortcuts.findIndex(([key]) => key === label);
    const active = i === chosen;
    s.button(
      `Super + Alt + ${label}`,
      () => {
        setChosen(i);
        setPresses(presses + 1);
      },
      () => {
        s.box(x, 8, 6, w, 18, active ? 3 : 5, active ? "accent" : "base", 3);
        s.text(
          label,
          [x + w / 2, 17, active ? 9 : 11],
          "top",
          label.length > 1 ? 6 : 8,
          active ? "onAccent" : "text",
        );
      },
      active,
    );
  });
  let x = 8;
  (
    [
      ["Super", 66],
      ["Alt", 48],
      [letter, 50],
    ] as const
  ).forEach(([label, w], i) => {
    const accent = i === 2;
    s.button(
      `Press Super + Alt + ${letter}`,
      () => setPresses(presses + 1),
      () =>
        s.group(
          "iso-press",
          // Restart the press sequence whenever a key is chosen or pressed.
          {
            animationDelay: `${i * 0.25}s`,
            animationName: presses % 2 ? "iso-press2" : "iso-press",
          },
          () => {
            s.box(x, 36, 6, w, 38, 10, accent ? "accent" : "base", 4);
            s.text(
              label,
              [x + w / 2, 55, 16],
              "top",
              11,
              accent ? "onAccent" : "text",
            );
          },
        ),
    );
    x += w + 8;
  });
  return s.render(
    `A keyboard pressing Super, Alt and ${letter} in sequence`,
    `Super + Alt + ${letter} ${action}. Tap a key in the top row.`,
  );
}

export function GnomeFigure() {
  const [open, setOpen] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const s = new Scene();
  // The popover and the notification can be closed; keep their space.
  s.reserve(100, 14, 18, 70, 66, 5);
  s.reserve(26, 50, 30, 70, 30, 4);
  s.box(0, 0, 0, 180, 120, 6, "base", 3);
  s.button(
    open ? "Close PanelMate" : "Open PanelMate",
    () => setOpen(!open),
    () => {
      s.box(0, 0, 6, 180, 10, 3, "ink");
      s.text("Sat 18:52", [90, 5, 9], "top", 6, "text", { fill: "#fff" });
      for (let i = 0; i < 3; i++)
        s.dot([8 + i * 4, 5, 9], i ? 0.9 : 1.3, "#fff");
      s.group(open ? "" : "iso-blink", undefined, () =>
        // The PanelMate indicator: a white chip, brighter while open.
        s.quad(topFace(150, 2, 9, 14, 6), "#fff", open ? 0.9 : 0.45),
      );
    },
    open,
  );
  for (let i = 0; i < 4; i++)
    s.box(6, 22 + i * 20, 6, 12, 14, 4, i ? "base" : "accent", 2);
  if (open)
    s.button(
      "Start a timer",
      () => setDismissed(false),
      () => {
        s.box(100, 14, 18, 70, 66, 5, "base", 3);
        for (let i = 0; i < 4; i++)
          s.quad(
            topFace(106 + i * 15, 18, 23, 12, 6),
            i ? "var(--iso-edge)" : "var(--iso-a-top)",
            i ? 0.5 : 1,
          );
        s.text("25:00", [135, 48, 23], "top", 13);
        s.seg([106, 70, 23], [164, 70, 23], "var(--iso-a-top)", 2.4);
      },
    );
  if (!dismissed)
    s.button(
      "Dismiss the notification",
      () => setDismissed(true),
      () =>
        s.group("iso-slide", offset([0, 0, 0], [-28, 0, 0]), () => {
          s.box(26, 50, 30, 70, 30, 4, "accent", 3);
          s.text("Timer complete", [61, 61, 34], "top", 8, "onAccent");
          s.quad(topFace(32, 70, 34, 26, 5), "var(--iso-on-accent)", 0.35);
          s.quad(topFace(64, 70, 34, 26, 5), "var(--iso-on-accent)", 0.35);
        }),
    );
  return s.render(
    "A GNOME desktop with the top bar, the PanelMate popover and a notification sliding in",
    dismissed
      ? open
        ? "Notification dismissed. Tap the popover to run another timer."
        : "Tap the top bar to open PanelMate."
      : open
        ? "Tap the top bar to close the popover, or the notification to dismiss it."
        : "Popover closed. Tap the top bar to open it again.",
  );
}

export function DataFigure() {
  const [target, setTarget] = useState<"csv" | "json">("json");
  const s = new Scene();
  s.cylinder(28, 28, 0, 24, 50, 2);
  [12, 28].forEach((h, i) =>
    s.dot(
      [28 + 24 * Math.SQRT1_2, 28 + 24 * Math.SQRT1_2, h],
      1.6,
      "var(--iso-a-top)",
      "iso-blink",
      { animationDelay: `${i * 0.6}s` },
    ),
  );
  const csv = target === "csv";
  s.button(
    "Export to CSV",
    () => setTarget("csv"),
    () => {
      s.box(70, -24, 0, 58, 40, 5, csv ? "accent" : "base", 3);
      [
        [-16, 30],
        [-8, 40],
        [0, 24],
      ].forEach(([y, w]) =>
        s.quad(
          topFace(78, y, 5, w, 3),
          csv ? "var(--iso-on-accent)" : "var(--iso-edge)",
          csv ? 0.5 : 0.7,
        ),
      );
      s.text("CSV", [114, -4, 5], "top", 10, csv ? "onAccent" : "muted");
    },
    csv,
  );
  const goal: V = csv ? [99, -4, 5] : [110, 58, 26];
  for (let i = 0; i < 3; i++)
    s.dot([28, 28, 54], 2.4, "var(--iso-a-top)", "iso-travel", {
      ...offset([28, 28, 54], goal, "3s"),
      animationDelay: `${i}s`,
    });
  s.button(
    "Back up to JSON",
    () => setTarget("json"),
    () =>
      s.group("iso-float", undefined, () => {
        s.box(84, 40, 14, 58, 40, 5, csv ? "base" : "accent", 3);
        s.quad(
          [
            [130, 40, 19],
            [142, 40, 19],
            [142, 52, 19],
          ],
          csv ? "var(--iso-left)" : "var(--iso-a-left)",
        );
        s.text("JSON", [113, 60, 19], "top", 12, csv ? "muted" : "onAccent");
      }),
    !csv,
  );
  return s.render(
    "Local data flowing into a CSV export or a JSON backup",
    csv
      ? "Exporting sessions to a CSV file for spreadsheets."
      : "Backing up everything to a JSON file you can restore. Tap CSV to export instead.",
  );
}
