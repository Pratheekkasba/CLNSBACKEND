"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface FullScreenSection {
  id: string;
  background: string;
  leftLabel: string;
  title: ReactNode;
  rightLabel: string;
  content: ReactNode;
}

interface FullScreenScrollFXProps {
  sections: FullScreenSection[];
  className?: string;
}

export function FullScreenScrollFX({ sections, className }: FullScreenScrollFXProps) {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        {
          root: null,
          threshold: 0.55,
        }
      );
      observer.observe(section);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      {sections.map((section, index) => {
        const isActive = activeIndex === index;
        return (
          <section
            key={section.id}
            ref={(el) => {
              sectionRefs.current[index] = el as HTMLDivElement | null;
            }}
            className="relative min-h-[100vh] w-full snap-start overflow-hidden"
          >
            <div className="absolute inset-0">
              <img
                src={section.background}
                alt={section.leftLabel}
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(4,12,24,0.55),rgba(3,9,20,0.9))]" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center gap-10 px-4 py-24 text-white md:gap-12">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-white/60">
                <span>{section.leftLabel}</span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/30 via-white/10 to-transparent mx-6" />
                <span>{section.rightLabel}</span>
              </div>

              <div
                className={cn(
                  "text-center transition-all duration-250 ease-out",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                <div className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                  {section.title}
                </div>
              </div>

              <div
                className={cn(
                  "rounded-[32px] bg-gradient-to-b from-black/30 via-black/20 to-transparent p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] transition-all duration-250 ease-out",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
              >
                {section.content}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}


