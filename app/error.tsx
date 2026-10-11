"use client";

import { useEffect } from "react";
import Link from "next/link";
import Brackets from "@/components/hud/Brackets";
import HudStatus, { hudPrimaryClass, hudSecondaryClass } from "@/components/hud/HudStatus";
import { hudDelay } from "@/components/hud/hudDelay";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <HudStatus
      code="500"
      label="Error"
      title="Something went wrong"
      message="An unexpected error stopped this page from loading. Try again, or head back home."
      primary={
        <button type="button" onClick={reset} style={hudDelay(550)} className={hudPrimaryClass}>
          Try again
        </button>
      }
      secondary={
        <Link href="/" style={hudDelay(600)} className={hudSecondaryClass}>
          <Brackets />
          Return home
        </Link>
      }
    />
  );
}
