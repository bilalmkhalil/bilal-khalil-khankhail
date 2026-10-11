import type { Project } from "@/types/types";

export const projects: Project[] = [
  {
    title: "PanelMate — GNOME Shell Extension",
    description:
      "A focus timer that lives in the GNOME top bar: countdowns, Pomodoro, stopwatch laps, searchable history and stats, all stored on your machine.",
    stack: ["GNOME Shell", "GJS", "JavaScript"],
    image: "/projects/panelmate.svg",
    url: "/panelmate",
  },
  {
    title: "M. M. De Voe — Author Website",
    description:
      "A website for author M. M. De Voe, bringing together her books, publications, events, blog, and Pen Parentis community work.",
    stack: ["Wix Studio"],
    image: "/projects/mmdevoe.svg",
    url: "https://www.mmdevoe.com/",
  },
];
