"use client";

import * as React from "react";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export function ModeToggle() {
  const [status, setStatus] = useState(false);
  const { setTheme } = useTheme();

  return (
    <Button variant="ghost" size="icon" className="rounded-full border-none">
      {status ? (
        <SunIcon
          className="size-6"
          onClick={() => {
            setTheme("light");
            setStatus(false);
          }}
        />
      ) : (
        <MoonIcon
          className="size-6"
          onClick={() => {
            setTheme("dark");
            setStatus(true);
          }}
        />
      )}
    </Button>
  );
}
