"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyCommand({ lines }: { lines: string[] }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="border-ink/15 bg-background relative rounded-xl border">
      <pre className="overflow-x-auto p-4 pr-14 font-mono text-[12px] leading-6 sm:text-[13px]">
        <code>
          {lines.map((line) => (
            <span key={line} className="block">
              <span className="text-ink/40 select-none">$ </span>
              {line}
            </span>
          ))}
        </code>
      </pre>
      <button
        onClick={() => void copy()}
        className="border-ink/15 hover:bg-ink/5 absolute top-2.5 right-2.5 inline-flex size-9 items-center justify-center rounded-lg border transition-colors"
        aria-label={copied ? "Copied" : "Copy install commands"}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
      <span className="sr-only" role="status">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
