"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<HTMLButtonElement, InteractiveHoverButtonProps>(
  ({ text = "Button", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex w-48 cursor-pointer overflow-hidden rounded-full border border-white/20 bg-white/10 p-3 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          className
        )}
        {...props}
      >
        <span className="inline-flex translate-x-0 items-center justify-center transition-all duration-200 ease-out group-hover:-translate-x-10 group-hover:opacity-0">
          {text}
        </span>
        <div className="pointer-events-none absolute inset-0 z-10 flex translate-x-10 items-center justify-center gap-2 text-[#030914] opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100">
          <span>{text}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 transition-all duration-200 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.9]" />
      </button>
    );
  }
);

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };


