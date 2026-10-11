import HudLoader from "@/components/hud/HudLoader";

/** Full-screen HUD loader shown on every full page load. It covers the whole
 * page (logo and theme button included) and fades out after --boot-delay,
 * driven by CSS alone, so it appears before any JavaScript runs and can never
 * get stuck. The layout keeps it mounted across client navigations, so it
 * only plays on a fresh load. */
export default function BootScreen() {
  return (
    <div className="boot-screen fixed inset-0 z-[1000]" aria-hidden="true">
      <HudLoader />
    </div>
  );
}
