"use client";

// The contact map itself: a MapLibre globe that turns to Pakistan and flies
// down to Karachi. Split out of ContactMap so maplibre-gl (and its CSS) load
// only when the contact section is close, not with the homepage.

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
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

export default function ContactMapCanvas({ visible }: { visible: boolean }) {
  return (
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
  );
}
