"use client";

import {
  AnimatePresence,
  motion,
  MotionProps,
  useReducedMotion,
  useInView,
} from "motion/react";
import { useEffect, useState, useRef } from "react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  motionProps?: MotionProps;
  className?: string;
}

export function WordRotate({
  words,
  duration = 3500,
  motionProps = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !visible || words.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words.length, duration, reduced, visible]);

  return (
    <div ref={ref} className="overflow-hidden py-2">
      {reduced ? (
        <h1 className={className}>{words[0]}</h1>
      ) : (
        <AnimatePresence mode="wait">
          <motion.h1
            key={words[index]}
            className={cn(className)}
            {...motionProps}
          >
            {words[index]}
          </motion.h1>
        </AnimatePresence>
      )}
    </div>
  );
}
