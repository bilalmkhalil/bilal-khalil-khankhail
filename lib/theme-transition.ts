export async function transitionTheme(
  button: HTMLElement,
  reducedMotion: boolean,
) {
  const root = document.documentElement;
  const theme = root.classList.contains("dark") ? "light" : "dark";
  const applyTheme = () => {
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.style.colorScheme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme changes still work when browser storage is unavailable.
    }
  };

  if (reducedMotion || !document.startViewTransition) {
    applyTheme();
    return;
  }

  // Use the control's center for mouse, touch, and keyboard activation alike.
  const { left, top, width, height } = button.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.ceil(
    Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    ),
  );
  const closed = `circle(0px at ${x}px ${y}px)`;
  const expanded = `circle(${radius}px at ${x}px ${y}px)`;
  let transition: ViewTransition | undefined;
  let animation: Animation | undefined;

  try {
    transition = document.startViewTransition(applyTheme);
    await transition.ready;
    animation = root.animate(
      {
        clipPath: theme === "light" ? [closed, expanded] : [expanded, closed],
        // The light snapshot stays above the dark page in both directions.
        zIndex: [2, 2],
      },
      {
        duration: 550,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
        pseudoElement:
          theme === "light"
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
      },
    );
    await animation.finished;
    await transition.finished;
  } catch {
    // A hidden tab or an unsupported pseudo-element must not break the toggle.
    transition?.skipTransition();
    applyTheme();
  } finally {
    // Do not leave a filled pseudo-element animation on the next transition.
    animation?.cancel();
  }
}
