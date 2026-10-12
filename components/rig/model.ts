"use client";

// The rig's one source of truth: a small traffic simulation. Every number the
// figure shows is computed here rather than written in, and the readouts,
// sparkline, throughput bars, busy switch ports and the satellite's ping
// rhythm all read from it, so they can never disagree.
//
//  - Users online drift over time; requests/sec is users × requests per user.
//  - p95 latency rises with load. Deploying loads the node, and the rolling
//    restart while shipping drops a few requests.
//  - Availability is served ÷ (served + failed) requests over the last five
//    simulated minutes, so a deploy really does cost a little of it.
//  - Ping is the round-trip time from the node to the city being pinged,
//    from great-circle distance over fibre.

import { useEffect, useRef, useState } from "react";
import { USER_CITIES } from "@/lib/world-map";
import type { Stage } from "./geometry";

const TICK_MS = 500;
const DT = TICK_MS / 1000;
const HISTORY = 12;
/** Seconds for the load to close most of the gap to its target. */
const SETTLE_S = 1.2;
/** The satellite pings once per this many seconds at the baseline rate. */
const UPLINK_S = 2.8;

/** Requests per second each online user makes. */
const REQ_PER_USER = 0.026;
/** Share of requests that fail on a normal day. */
const BASE_ERRORS = 0.00018;
/** Extra share that fails at full deploy load (workers restarting). */
const RESTART_ERRORS = 0.02;
/** Availability is measured over this many ticks (five minutes). */
const WINDOW = (5 * 60) / DT;

/** The simulated production node: a Hetzner box in Nuremberg. */
const NODE_GEO: [number, number] = [49.45, 11.08];
/** Light in fibre covers ~200 km per ms; real routes run ~1.4× the great circle. */
const KM_PER_MS = 200;
const ROUTE = 1.4;

// How hard each deploy stage loads the node, from 0 to 1.
const LOAD: Record<Stage, number> = { build: 0.15, test: 0.25, ship: 1, live: 0.55 };

export type Reading = {
  /** Users online, in thousands. */
  users: number;
  /** Requests per second, in thousands. */
  rps: number;
  /** p95 latency in ms. */
  p95: number;
  /** Uplink signal strength in dBm. */
  dbm: number;
  /** Availability over the window, in percent. */
  availability: number;
  /** The last ping: the city's short code and its round-trip time in ms. */
  ping: { code: string; ms: number };
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
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const rad = (deg: number) => (deg * Math.PI) / 180;

/** Great-circle distance in km. */
function distanceKm([lat1, lon1]: [number, number], [lat2, lon2]: [number, number]) {
  const a =
    Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

/** Round-trip time from the node to a city, with a little jitter. */
function pingFor(beat: number, t: number) {
  const city = USER_CITIES[beat % USER_CITIES.length];
  const flight = (2 * distanceKm(NODE_GEO, city.geo) * ROUTE) / KM_PER_MS;
  return { code: city.code, ms: Math.round(flight + 3 + 3 * Math.sin(t * 7.3 + beat)) };
}

/** Traffic at time t (seconds) under a given load. */
function traffic(t: number, load: number) {
  const users = 60 + 0.9 * Math.sin(t / 45) + 0.35 * Math.sin(t / 11);
  const rps = (users * REQ_PER_USER * (1 + 0.06 * Math.sin(t / 2.3)) + 0.25 * load);
  const p95 = 74 + 5 * Math.sin(t / 5.1 + 1) + 3 * Math.sin(t / 1.7) + 24 * load;
  const errors = BASE_ERRORS * (1 + 0.5 * Math.sin(t / 13)) + RESTART_ERRORS * load * load;
  return { users, rps, p95, errors };
}

/** The readings shown for a moment of traffic. */
function readout(t: number, load: number) {
  const { users, rps, p95 } = traffic(t, load);
  return {
    users: round1(users),
    rps: round1(rps),
    p95: Math.round(p95),
    dbm: Math.round(-70 + 3 * Math.sin(t / 3.3)),
    ports: clamp(Math.round(rps * 3.4), 0, 8),
    bars: clamp(Math.round(((rps - 1.3) / 1.1) * 11) + 1, 1, 12),
  };
}

type Sim = {
  t: number;
  load: number;
  uplink: number;
  sinceSample: number;
  /** Requests served and failed per tick, over the availability window. */
  served: number[];
  failed: number[];
  totalServed: number;
  totalFailed: number;
};

/** Advances the request counters by one tick. */
function count(sim: Sim) {
  const { rps, errors } = traffic(sim.t, sim.load);
  const requests = rps * 1000 * DT;
  const lost = requests * errors;
  sim.served.push(requests - lost);
  sim.failed.push(lost);
  sim.totalServed += requests - lost;
  sim.totalFailed += lost;
  if (sim.served.length > WINDOW) {
    sim.totalServed -= sim.served.shift()!;
    sim.totalFailed -= sim.failed.shift()!;
  }
}

const availability = (sim: Sim) =>
  (100 * sim.totalServed) / (sim.totalServed + sim.totalFailed);

/** A simulation that has already run for one window, so it starts settled. */
function warmSim(): Sim {
  const sim: Sim = { t: -WINDOW * DT, load: 0, uplink: 0, sinceSample: 0, served: [], failed: [], totalServed: 0, totalFailed: 0 };
  for (let i = 0; i < WINDOW; i++) {
    count(sim);
    sim.t += DT;
  }
  sim.t = 0;
  return sim;
}

function initial(sim: Sim): Reading {
  return {
    ...readout(0, 0),
    availability: availability(sim),
    ping: pingFor(0, 0),
    history: Array.from({ length: HISTORY }, (_, i) => readout(i - HISTORY, 0).p95),
    beat: 0,
    load: 0,
  };
}

/**
 * Runs the simulation while `running` is true (the figure is on screen, the
 * tab is visible and motion is allowed). When it is not, time stands still,
 * but the readings still follow the deploy stage so a press shows its effect.
 */
export function useRigModel(stage: Stage | null, running: boolean): Reading {
  const sim = useRef<Sim | null>(null);
  sim.current ??= warmSim();
  const [reading, setReading] = useState(() => initial(sim.current!));
  const target = stage ? LOAD[stage] : 0;
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      const s = sim.current!;
      s.t += DT;
      s.load += (targetRef.current - s.load) * (1 - Math.exp((-DT * 3) / SETTLE_S));
      count(s);
      const now = readout(s.t, s.load);
      // The uplink speeds up with traffic.
      s.uplink += (DT * (now.rps / 1.56)) / UPLINK_S;
      const pinged = s.uplink >= 1;
      if (pinged) s.uplink -= 1;
      s.sinceSample += DT;
      const sampled = s.sinceSample >= 1;
      if (sampled) s.sinceSample -= 1;
      const avail = availability(s);
      setReading((r) => {
        const beat = pinged ? r.beat + 1 : r.beat;
        return {
          ...now,
          availability: avail,
          ping: pinged ? pingFor(beat, s.t) : r.ping,
          load: s.load,
          beat,
          history: sampled ? [...r.history.slice(1), now.p95] : r.history,
        };
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  // Standing still: jump straight to the stage's load so readouts still move.
  useEffect(() => {
    if (running) return;
    const s = sim.current!;
    s.load = target;
    const now = readout(s.t, target);
    setReading((r) => ({ ...r, ...now, load: target }));
  }, [running, target]);

  return reading;
}
