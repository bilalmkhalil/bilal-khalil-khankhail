"use client";

// The rig's one source of truth. Every number the figure shows (telemetry,
// the monitor's sparkline, the throughput bars, the switch's busy ports) and
// the satellite's uplink rhythm are read from this model, so the picture and
// the readouts can never disagree. Deploying raises the load: requests climb
// and p95 spikes while shipping, then settle once the deploy is live.

import { useEffect, useRef, useState } from "react";
import type { Stage } from "./geometry";

const TICK_MS = 500;
const HISTORY = 12;
/** Seconds for the load to close most of the gap to its target. */
const SETTLE_S = 1.2;
/** The satellite pings once per this many seconds at the baseline rate. */
const UPLINK_S = 2.8;
const BASE_RPS = 1.4;

// How hard each deploy stage loads the node, from 0 to 1.
const LOAD: Record<Stage, number> = {
  build: 0.15,
  test: 0.25,
  ship: 1,
  live: 0.55,
};

export type Reading = {
  /** Active users, in thousands. */
  users: number;
  /** p95 latency in ms. */
  p95: number;
  /** Requests per second, in thousands. */
  rps: number;
  /** Uplink signal strength in dBm. */
  dbm: number;
  /** Recent p95 samples, oldest first, one per second. */
  history: number[];
  /** Switch ports carrying traffic, 0 to 8. */
  ports: number;
  /** Throughput bars lit, 1 to 12. */
  bars: number;
  /** Increments on every uplink ping. */
  beat: number;
  /** Load on the node, 0 to 1. */
  load: number;
};

const round1 = (n: number) => Math.round(n * 10) / 10;
const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

/** The readings at time t (seconds) under a given load. */
function sample(t: number, load: number) {
  const rps =
    BASE_RPS + 0.22 * Math.sin(t / 7) + 0.1 * Math.sin(t / 2.3) + 1.1 * load;
  const p95 =
    74 + 5 * Math.sin(t / 5.1 + 1) + 3 * Math.sin(t / 1.7) + 24 * load;
  return {
    users: round1(60.2 + t * 0.004 + 0.5 * load),
    p95: Math.round(p95),
    rps: round1(rps),
    dbm: Math.round(-70 + 3 * Math.sin(t / 3.3)),
    ports: clamp(Math.round(rps * 2.6), 0, 8),
    bars: clamp(Math.round(((rps - 0.9) / 2.4) * 11) + 1, 1, 12),
  };
}

function initial(): Reading {
  const now = sample(0, 0);
  return {
    ...now,
    history: Array.from(
      { length: HISTORY },
      (_, i) => sample(i - HISTORY, 0).p95,
    ),
    beat: 0,
    load: 0,
  };
}

/**
 * Runs the model while `running` is true (the figure is on screen, the tab is
 * visible and motion is allowed). When it is not, time stands still, but the
 * readings still follow the deploy stage so a press always shows its effect.
 */
export function useRigModel(stage: Stage | null, running: boolean): Reading {
  const [reading, setReading] = useState(initial);
  const state = useRef({ t: 0, load: 0, uplink: 0, sinceSample: 0 });
  const target = stage ? LOAD[stage] : 0;
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const s = state.current;
      const dt = TICK_MS / 1000;
      s.t += dt;
      s.load +=
        (targetRef.current - s.load) * (1 - Math.exp((-dt * 3) / SETTLE_S));
      const now = sample(s.t, s.load);
      // The uplink speeds up with traffic.
      s.uplink += (dt * (now.rps / BASE_RPS)) / UPLINK_S;
      const pinged = s.uplink >= 1;
      if (pinged) s.uplink -= 1;
      s.sinceSample += dt;
      const sampled = s.sinceSample >= 1;
      if (sampled) s.sinceSample -= 1;
      setReading((r) => ({
        ...now,
        load: s.load,
        beat: pinged ? r.beat + 1 : r.beat,
        history: sampled ? [...r.history.slice(1), now.p95] : r.history,
      }));
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  // Standing still: jump straight to the stage's load so readouts still move.
  useEffect(() => {
    if (running) return;
    const s = state.current;
    s.load = target;
    const now = sample(s.t, target);
    setReading((r) => ({ ...r, ...now, load: target }));
  }, [running, target]);

  return reading;
}
