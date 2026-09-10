"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Map, MapMarker, MarkerContent, useMap } from "@/components/ui/map";

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
      className="border-ink/10 bg-background relative col-span-4 h-[220px] overflow-hidden rounded-lg border"
    >
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
              <div className="absolute h-5 w-5 rounded-full bg-emerald-500/20" />
              <div className="border-background relative h-2.5 w-2.5 rounded-full border bg-emerald-500" />
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>
      <div className="border-ink/10 bg-background/90 pointer-events-none absolute bottom-3 left-3 z-20 rounded-md border px-3 py-1.5 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-ink text-xs font-medium">
            Karachi, Pakistan
          </span>
        </div>
      </div>
    </div>
  );
}
