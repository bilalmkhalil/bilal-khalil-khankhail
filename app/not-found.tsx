import Link from "next/link";
import Brackets from "@/components/hud/Brackets";
import HudStatus, { hudPrimaryClass, hudSecondaryClass } from "@/components/hud/HudStatus";
import { hudDelay } from "@/components/hud/hudDelay";

export default function NotFound() {
  return (
    <HudStatus
      code="404"
      label="Not found"
      title="Page not found"
      message="This page doesn't exist or has moved. Head back home or have a look at my projects."
      primary={
        <Link href="/" style={hudDelay(550)} className={hudPrimaryClass}>
          Return home
        </Link>
      }
      secondary={
        <Link href="/projects" style={hudDelay(600)} className={hudSecondaryClass}>
          <Brackets />
          Explore projects <span aria-hidden="true">→</span>
        </Link>
      }
    />
  );
}
