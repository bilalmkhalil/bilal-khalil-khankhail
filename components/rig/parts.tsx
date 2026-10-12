"use client";

// The rig's machines, each built from small solids that sit on one another
// inside its footprint in geometry.ts. Every part is drawn back to front, so
// what is nearer hides what is behind. Only the part the reader should watch
// glows (pf-glow): the running CI stage, the shipping node, the live database
// and padlock, and the node's status light while idle.

import { memo, type CSSProperties } from "react";
import { Box, top as onTop, type Box3, type Vec3 } from "react-isokit";
import {
  STAGES,
  ci,
  db,
  deck,
  lid,
  lock,
  monitor,
  net,
  round,
  sat,
  tower,
  type Stage,
} from "./geometry";

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Soft contact shadow on the ground under a unit. */
function Halo({
  x,
  y,
  w,
  d,
  r = 6,
  spread = 4,
}: Pick<Box3, "x" | "y" | "w" | "d"> & { r?: number; spread?: number }) {
  return (
    <g transform={onTop(x - spread, y - spread, 0)}>
      <rect
        className="pf-halo"
        width={w + spread * 2}
        height={d + spread * 2}
        rx={r + spread}
      />
    </g>
  );
}

/** Every unit's ground shadow, drawn before the cables so they stay crisp. */
export const Halos = memo(function Halos() {
  return (
    <>
      <Halo {...ci} />
      <Halo {...tower} spread={6} />
      <Halo {...db} r={db.w / 2} />
      <Halo {...net} r={3} spread={3} />
      <Halo
        x={monitor.x + 6}
        y={monitor.y - 3}
        w={28}
        d={11}
        r={2}
        spread={3}
      />
      <Halo x={deck.x} y={lid.y} w={deck.w} d={deck.d + lid.d} r={4} />
      <Halo {...lock} />
    </>
  );
});

/* ------------------------------------------------------------------ CI/CD */

// Three stage keys sit in a base; each one presses down as its stage runs.
const CI_BASE_H = 10;
const CI_KEYS = (["build", "test", "ship"] as const).map((s, i) => ({
  stage: s,
  box: { x: ci.x + 6, y: ci.y + 7 + i * 13, z: CI_BASE_H, w: 32, d: 9, h: 4 },
}));

export const CiUnit = memo(function CiUnit({ stage }: { stage: Stage | null }) {
  const at = stage ? STAGES.indexOf(stage) : -1;
  return (
    <>
      <Box
        {...ci}
        h={CI_BASE_H}
        r={4}
        front={
          <>
            <text className="ik-label pf-tiny" x={5} y={6.4}>
              CI/CD
            </text>
            {CI_KEYS.map(({ stage: s }, i) => (
              <circle
                key={s}
                className={
                  at === i ? "ik-dot pf-glow" : at > i ? "ik-dot" : "ik-fill"
                }
                cx={30 + i * 4.5}
                cy={5}
                r={1.3}
              />
            ))}
          </>
        }
        side={<path className="ik-detail" d="M6 3 H44 M6 5.5 H44 M6 8 H44" />}
      />
      {/* Wells the keys sit in. */}
      <g transform={onTop(ci.x, ci.y, CI_BASE_H)}>
        {CI_KEYS.map(({ stage: s, box }) => (
          <rect
            key={s}
            className="ik-well"
            x={box.x - ci.x - 1}
            y={box.y - ci.y - 1}
            width={box.w + 2}
            height={box.d + 2}
            rx={2}
          />
        ))}
      </g>
      {CI_KEYS.map(({ stage: s, box }, i) => {
        const running = at === i;
        const done = at > i;
        return (
          <Box
            key={s}
            {...box}
            z={box.z - (running || done ? 2.4 : 0)}
            r={1.5}
            className={
              running ? "pf-key-on pf-glow" : done ? "pf-key-done" : undefined
            }
            top={
              <text className="ik-label" x={4} y={6.6}>
                {s.toUpperCase()}
              </text>
            }
          />
        );
      })}
    </>
  );
});

/* ------------------------------------------------------- production node */

// A plinth, a recessed rack frame, seven 1U chassis and a vented cap.
const PLINTH_H = 4;
const U_H = 10;
const U_GAP = 1.4;
const UNITS = 7;
const CAP_Z = PLINTH_H + UNITS * (U_H + U_GAP) - U_GAP;

export const NodeUnit = memo(function NodeUnit({
  stage,
}: {
  stage: Stage | null;
}) {
  const shipping = stage === "ship" || stage === "live";
  return (
    <>
      <Box
        x={tower.x - 2}
        y={tower.y - 2}
        z={0}
        w={tower.w + 4}
        d={tower.d + 4}
        h={PLINTH_H}
        r={3}
        front={<circle className="ik-line" cx={48} cy={2} r={1.1} />}
      />
      <Box
        x={tower.x + 2}
        y={tower.y + 2}
        z={PLINTH_H}
        w={tower.w - 4}
        d={tower.d - 4}
        h={CAP_Z - PLINTH_H}
        r={3}
        className="pf-core"
      />
      {Array.from({ length: UNITS }, (_, i) => {
        // Top unit first in the sweep, so the deploy reads top to bottom.
        const fromTop = UNITS - 1 - i;
        const status = i === UNITS - 1 && !stage;
        return (
          <Box
            key={i}
            x={tower.x}
            y={tower.y}
            z={PLINTH_H + i * (U_H + U_GAP)}
            w={tower.w}
            d={tower.d}
            h={U_H}
            r={2}
            front={
              <>
                <rect
                  className="ik-well"
                  x={4}
                  y={2}
                  width={32}
                  height={6}
                  rx={1}
                />
                <path
                  className="ik-detail"
                  d="M7 4 H20 M7 6 H16 M24 4 V6 M27 4 V6 M30 4 V6"
                />
                <rect
                  className="ik-detail"
                  x={1.4}
                  y={1.6}
                  width={1.4}
                  height={6.8}
                  rx={0.6}
                />
                <rect
                  className="ik-detail"
                  x={47.2}
                  y={1.6}
                  width={1.4}
                  height={6.8}
                  rx={0.6}
                />
                <circle
                  className={
                    shipping
                      ? "ik-dot pf-glow pf-sweep ik-loop"
                      : status
                        ? "ik-dot pf-glow"
                        : "ik-dot ik-pulse"
                  }
                  cx={42}
                  cy={5}
                  r={1.4}
                  style={delay(shipping ? fromTop * 80 : (i * 370) % 1800)}
                />
              </>
            }
            side={<path className="ik-detail" d="M8 3 H42 M8 5 H42 M8 7 H42" />}
          />
        );
      })}
      <Box
        x={tower.x}
        y={tower.y}
        z={CAP_Z}
        w={tower.w}
        d={tower.d}
        h={tower.h - CAP_Z}
        r={5}
        top={
          <>
            <text className="ik-label" x={6} y={10}>
              NODE-01
            </text>
            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={i}
                className="ik-detail"
                x1={8}
                x2={42}
                y1={20 + i * 4.5}
                y2={20 + i * 4.5}
              />
            ))}
          </>
        }
      />
    </>
  );
});

/* ------------------------------------------------------------ data layer */

// Three platters on a spindle. The top platter's marker turns with the load.
const DISC_H = 11;
const DISC_STEP = (db.h - DISC_H) / 2;

export const DbUnit = memo(function DbUnit({
  live,
  busy,
}: {
  live: boolean;
  busy: boolean;
}) {
  const c = db.w / 2;
  return (
    <>
      <Box
        x={db.x + 10}
        y={db.y + 10}
        z={0}
        w={db.w - 20}
        d={db.d - 20}
        h={db.h}
        r={(db.w - 20) / 2}
        className="pf-core"
      />
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          {...db}
          z={i * DISC_STEP}
          h={DISC_H}
          r={c}
          front={
            <circle
              className="ik-dot ik-pulse"
              cx={c}
              cy={DISC_H / 2}
              r={1.1}
              style={delay(i * 600)}
            />
          }
          top={
            i === 2 ? (
              <>
                <circle className="ik-detail" cx={c} cy={c} r={14} />
                <circle className="ik-detail" cx={c} cy={c} r={9} />
                <g
                  className="pf-spin ik-loop"
                  style={{ animationDuration: busy ? "1.6s" : "7s" }}
                >
                  <circle cx={c} cy={c} r={12} fill="none" />
                  <path className="ik-line" d={`M${c} ${c - 4.5} V${c - 12}`} />
                </g>
                <circle
                  className={live ? "ik-dot pf-glow" : "ik-detail"}
                  cx={c}
                  cy={c}
                  r={3.5}
                />
              </>
            ) : undefined
          }
        />
      ))}
    </>
  );
});

/* --------------------------------------------------------- network switch */

export const SwitchUnit = memo(function SwitchUnit({
  ports,
}: {
  ports: number;
}) {
  const feet: Vec3[] = [
    [net.x + 2, net.y + 1, 0],
    [net.x + 2, net.y + net.d - 4, 0],
    [net.x + net.w - 6, net.y + 1, 0],
    [net.x + net.w - 6, net.y + net.d - 4, 0],
  ];
  return (
    <>
      {feet.map(([x, y], i) => (
        <Box key={i} x={x} y={y} z={0} w={4} d={3} h={1.2} r={1} />
      ))}
      <Box
        {...net}
        z={1.2}
        h={net.h - 1.2}
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
                <rect
                  className="ik-well"
                  x={4 + i * 5.6}
                  y={1.3}
                  width={4}
                  height={3.2}
                  rx={0.5}
                />
                <circle
                  className={i < ports ? "ik-dot ik-pulse" : "ik-fill"}
                  cx={6 + i * 5.6}
                  cy={5.6}
                  r={0.6}
                  style={delay((i * 530) % 1800)}
                />
              </g>
            ))}
          </>
        }
      />
    </>
  );
});

/* ------------------------------------------------------------- monitoring */

const SCREEN_Z = 6;
const SCREEN = { x: 3, y: 3, w: 34, h: 20 };

export const MonitorUnit = memo(function MonitorUnit({
  p95,
  history,
}: {
  p95: number;
  history: number[];
}) {
  const spark = history
    .map((v, i) => {
      const y =
        SCREEN.y + SCREEN.h - 2 - (Math.min(Math.max(v - 66, 0), 40) / 40) * 12;
      return `${i ? "L" : "M"}${round(SCREEN.x + i * 3.1)} ${round(y)}`;
    })
    .join(" ");
  return (
    <>
      <Box
        x={monitor.x + 8}
        y={monitor.y - 2}
        z={0}
        w={24}
        d={10}
        h={1.4}
        r={2}
      />
      <Box
        x={monitor.x + 17}
        y={monitor.y + 1}
        z={1.4}
        w={6}
        d={2}
        h={SCREEN_Z - 1.4}
      />
      <Box
        {...monitor}
        z={SCREEN_Z}
        h={monitor.h - SCREEN_Z}
        r={2}
        front={
          <>
            <rect
              className="ik-screen"
              x={SCREEN.x}
              y={SCREEN.y}
              width={SCREEN.w}
              height={SCREEN.h}
              rx={1.5}
            />
            <text className="ik-screen-text pf-tiny" x={5} y={8.5}>
              P95 {p95}MS
            </text>
            <path className="ik-screen-line" d={spark} />
          </>
        }
      />
    </>
  );
});

/* ----------------------------------------------------------------- laptop */

export const Laptop = memo(function Laptop({
  stage,
  run,
}: {
  stage: Stage | null;
  run: number;
}) {
  const screen = stage
    ? {
        build: ["$ git push origin main", "> building..."],
        test: ["$ git push origin main", "> build ok", "> running tests..."],
        ship: ["> build ok", "> tests passed", "> shipping to node-01..."],
        live: ["> tests passed", "> shipped to node-01", "> live ✓"],
      }[stage]
    : [
        "$ ~/portfolio",
        run ? `> deploy #${run} live ✓` : "> ready to deploy",
        "_",
      ];
  return (
    <>
      <Box
        {...lid}
        r={2}
        front={
          <>
            <circle className="ik-fill" cx={lid.w / 2} cy={2} r={0.8} />
            <rect
              className="ik-screen"
              x={4}
              y={4}
              width={76}
              height={36}
              rx={2}
            />
            {screen.map((text, i) => (
              <text
                key={i}
                className="ik-screen-text pf-screen"
                x={8}
                y={12 + i * 7}
              >
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
          <rect
            className="ik-well"
            x={56}
            y={6}
            width={22}
            height={18}
            rx={2}
          />
        }
      />
      {/* Hinge along the back of the deck. */}
      <Box
        x={deck.x + 4}
        y={lid.y + 1}
        z={deck.h}
        w={deck.w - 8}
        d={2.4}
        h={1.8}
        r={1}
      />
      {/* Keycaps, back row first. */}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 7 }, (_, col) => (
          <Box
            key={`${row}-${col}`}
            x={deck.x + 6 + col * 6.5}
            y={deck.y + 6 + row * 6.5}
            z={deck.h}
            w={5}
            d={5}
            h={0.9}
            r={1}
          />
        )),
      )}
    </>
  );
});

/* ------------------------------------------------------------- TLS edge */

// A padlock: the shackle stands open until the deploy is live, then closes.
const LOCK_BODY_H = 17;

export const EdgeUnit = memo(function EdgeUnit({ live }: { live: boolean }) {
  const post = live ? 5 : 9;
  const sx = lock.x + 6;
  const sy = lock.y + 9;
  return (
    <>
      <Box
        {...lock}
        h={LOCK_BODY_H}
        r={4}
        front={
          <>
            <g className={live ? "pf-glow" : undefined}>
              <circle
                className={live ? "pf-on" : "ik-well"}
                cx={20}
                cy={6.5}
                r={2.2}
              />
              <rect
                className={live ? "pf-on" : "ik-well"}
                x={19.2}
                y={7.5}
                width={1.6}
                height={4.4}
                rx={0.6}
              />
            </g>
            <text className="ik-label pf-tiny" x={3} y={15}>
              TLS
            </text>
          </>
        }
      />
      <Box x={sx} y={sy} z={LOCK_BODY_H} w={3} d={6} h={post} r={1} />
      <Box x={sx + 15} y={sy} z={LOCK_BODY_H} w={3} d={6} h={post} r={1} />
      <Box x={sx} y={sy} z={LOCK_BODY_H + post} w={18} d={6} h={2.5} r={1.4} />
    </>
  );
});

/* -------------------------------------------------------------- satellite */

export const Satellite = memo(function Satellite() {
  return (
    <g className="ik-float">
      {[sat.left, sat.right].map((panel, i) => (
        <Box
          key={i}
          {...panel}
          r={1}
          top={
            <>
              {[6, 12, 18, 24].map((x) => (
                <line
                  key={x}
                  className="ik-detail"
                  x1={x}
                  x2={x}
                  y1={1}
                  y2={9}
                />
              ))}
              <line className="ik-detail" x1={1} x2={29} y1={5} y2={5} />
            </>
          }
        />
      ))}
      {/* Booms from the body to each panel. */}
      <Box
        x={sat.left.x + sat.left.w}
        y={sat.body.y + 9}
        z={sat.left.z}
        w={sat.body.x - sat.left.x - sat.left.w}
        d={3}
        h={1.4}
      />
      <Box
        x={sat.body.x + sat.body.w}
        y={sat.body.y + 9}
        z={sat.right.z}
        w={sat.right.x - sat.body.x - sat.body.w}
        d={3}
        h={1.4}
      />
      <Box
        {...sat.dish}
        r={6}
        top={
          <>
            <circle className="ik-detail" cx={6} cy={6} r={4.6} />
            <circle className="ik-detail" cx={6} cy={6} r={2.4} />
          </>
        }
      />
      <Box
        {...sat.body}
        r={3}
        top={
          <rect className="ik-well" x={5} y={5} width={12} height={12} rx={2} />
        }
        front={
          <>
            <rect className="ik-well" x={4} y={4} width={9} height={6} rx={1} />
            <circle className="ik-dot ik-pulse" cx={17} cy={7} r={1.4} />
          </>
        }
        side={<path className="ik-detail" d="M4 5 H18 M4 9 H18 M4 13 H18" />}
      />
    </g>
  );
});
