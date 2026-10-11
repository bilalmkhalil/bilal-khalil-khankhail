"use client";

import { useEffect, useRef } from "react";

/** Calls the handler for a key pressed on its own, unless the user is typing
 * in a field or holding Ctrl, Cmd or Alt (so browser shortcuts still work).
 * Keys are matched case-insensitively. */
export function useShortcuts(handlers: Record<string, () => void>) {
  const latest = useRef(handlers);
  latest.current = handlers;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.repeat) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      const handler = Object.entries(latest.current).find(
        ([key]) => key.toLowerCase() === event.key.toLowerCase(),
      )?.[1];
      if (!handler) return;
      event.preventDefault();
      handler();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}

/** A single-key shortcut. See useShortcuts. */
export function useShortcut(key: string, handler: () => void) {
  useShortcuts({ [key]: handler });
}
