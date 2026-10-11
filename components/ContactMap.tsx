"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Map, MapMarker, MarkerContent, useMap } from "@/components/ui/map";
import Brackets from "@/components/hud/Brackets";
import { hudDelay } from "@/components/hud/hudDelay";

const KARACHI: [number, number] = [67.00994, 24.86146];
const GLOBE_CENTER: [number, number] = [15, 20];
const GLOBE = { type: "globe" as const };

function GlobeToKarachi({ visible }: { visible: boolean }) {
  const { map, isLoaded } = useMap();
  const reduced = useReducedMotion();
  const arrived = useRef(false);

  useEffect(() => {
    if (!map || !isLoaded || !visible || arrived.current) return;
    const destination = { center: KARACHI, zoom: 9, bearing: 0, pitch: 0 };
    if (reduced) {
      map.jumpTo(destination);
      arrived.current = true;
      return;
    }

    let cancelled = false;
    const finish = () => {
      arrived.current = true;
    };
    // Rotate toward Pakistan at globe scale before descending to the city.
    map.easeTo({ center: KARACHI, zoom: 0.6, duration: 900 });
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      map.once("moveend", finish);
      map.flyTo({ ...destination, duration: 3000, curve: 1.2 });
    }, 1000);

    const interrupt = () => {
      cancelled = true;
      arrived.current = true;
      window.clearTimeout(timer);
      map.off("moveend", finish);
      map.stop();
    };
    const userZoom = (event: { originalEvent?: Event }) => {
      if (event.originalEvent) interrupt();
    };
    // A deliberate drag/zoom takes control; ordinary page scrolling stays native.
    map.on("dragstart", interrupt);
    map.on("zoomstart", userZoom);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      map.off("moveend", finish);
      map.off("dragstart", interrupt);
      map.off("zoomstart", userZoom);
      if (!arrived.current) map.stop();
    };
  }, [map, isLoaded, visible, reduced]);

  return null;
}

export default function ContactMap() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.4 });

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Map showing Karachi, Pakistan"
      style={hudDelay(400)}
      className="hud-expand border-ink/15 bg-background relative min-h-60 flex-1 border"
    >
      <Brackets />
      {/* Grayscale tiles keep the map in the site's black-and-white style. */}
      <div className="absolute inset-0 overflow-hidden [&_canvas]:grayscale">
      <Map
        center={GLOBE_CENTER}
        zoom={0.6}
        projection={GLOBE}
        scrollZoom={false}
        cooperativeGestures
      >
        <GlobeToKarachi visible={visible} />
        <MapMarker longitude={KARACHI[0]} latitude={KARACHI[1]}>
          <MarkerContent>
            <div className="relative flex h-5 w-5 items-center justify-center">
              <div className="bg-ink/25 absolute h-5 w-5 animate-ping" />
              <div className="border-background bg-ink relative h-2.5 w-2.5 border" />
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>
      </div>
      <div className="hud-mono border-ink/20 bg-background/90 pointer-events-none absolute top-3 left-3 z-20 border px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="bg-ink h-2 w-2" />
          <span className="text-ink text-[10px] tracking-[0.16em] uppercase">07 / Karachi, Pakistan</span>
        </div>
      </div>
    </div>
  );
}
