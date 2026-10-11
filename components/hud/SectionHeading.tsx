import { aadilFont } from "@/lib/fonts";

/** A section's title with its Urdu word, blinking on as it scrolls in. */
export default function SectionHeading({
  title,
  urdu,
  as: Tag = "h2",
  aside,
}: {
  title: string;
  urdu: string;
  as?: "h1" | "h2";
  /** Optional mono label at the far end of the rule, e.g. a count. */
  aside?: React.ReactNode;
}) {
  return (
    <div className="hud-blink flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-b-2 pb-4 sm:justify-start">
      <Tag className="text-ink text-4xl leading-tight sm:text-6xl">{title}</Tag>
      <span
        lang="ur"
        dir="rtl"
        aria-hidden="true"
        className={`text-ink text-4xl leading-tight sm:text-6xl ${aadilFont.className}`}
      >
        {urdu}
      </span>
      {aside && (
        <span className="hud-mono text-ink/50 w-full text-xs tracking-[0.16em] uppercase sm:ml-auto sm:w-auto">
          {aside}
        </span>
      )}
    </div>
  );
}
