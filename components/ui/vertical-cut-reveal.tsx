"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type SplitMode = "words" | "chars";

interface VerticalCutRevealProps {
  children: string | ReactNode;
  splitBy?: SplitMode;
  staggerDuration?: number;
  staggerFrom?: "first" | "last";
  transition?: {
    type?: "spring" | "tween";
    stiffness?: number;
    damping?: number;
    duration?: number;
  };
}

export function VerticalCutReveal({
  children,
  splitBy = "words",
  staggerDuration = 0.08,
  staggerFrom = "first",
  transition = { type: "spring", stiffness: 220, damping: 20 },
}: VerticalCutRevealProps) {
  const content =
    typeof children === "string"
      ? children
      : (children as ReactNode)?.toString?.() ?? "";

  const segments = splitBy === "words" ? content.split(" ") : content.split("");
  const baseDelay = staggerFrom === "first" ? 0 : segments.length * staggerDuration;

  return (
    <span className="inline-flex flex-wrap justify-center text-balance">
      {segments.map((segment, index) => {
        const delay =
          staggerFrom === "first"
            ? index * staggerDuration
            : baseDelay - index * staggerDuration;

        return (
          <motion.span
            key={`${segment}-${index}`}
            className="relative inline-block overflow-hidden"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay, ...transition }}
          >
            <span className="inline-block">
              {segment}
              {splitBy === "words" ? "\u00A0" : ""}
            </span>
          </motion.span>
        );
      })}
    </span>
  );
}


