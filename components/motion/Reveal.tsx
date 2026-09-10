"use client";

import { useEffect } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";

export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [scope, animate] = useAnimate();
  const visible = useInView(scope, { once: true, amount: 0.08 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!visible || reduced) return;
    // Keep server-rendered content readable, even before JavaScript loads.
    const animation = animate(
      scope.current,
      { opacity: [0.45, 1], y: [12, 0] },
      {
        duration: 0.4,
        delay: Math.min(delay, 0.16),
        ease: [0.22, 1, 0.36, 1],
      },
    );
    const element = scope.current;
    return () => {
      animation.stop();
      element.style.opacity = "";
      element.style.transform = "";
    };
  }, [visible, reduced, animate, scope, delay]);

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
