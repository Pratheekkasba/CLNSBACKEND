"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const logos = [
  { name: "Corporate Legal", src: "/partners/corporate-legal.jpeg" },
  { name: "Policy Think Tanks", src: "/partners/policy-thinktank.jpeg" },
  { name: "United Nations", src: "/partners/united-nations.jpeg" },
  { name: "Federation of Indian Corporate Lawyer", src: "/partners/ficl.jpeg" },
  { name: "Woxen University", src: "/partners/woxen-university.jpeg" },
];

export function MarqueePartners({ className }: { className?: string }) {
  const loopItems = [...logos, ...logos];

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]",
        className
      )}
    >
      <div className="flex items-center gap-10 sm:gap-14 lg:gap-16 animate-scroll-slow hover:[animation-play-state:paused]">
        {loopItems.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex min-w-[120px] flex-col items-center gap-2 text-xs tracking-wide text-gray-300"
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 ease-out hover:scale-105">
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
                className="object-cover object-center"
                draggable={false}
                loading="lazy"
                quality={75}
              />
            </div>
            <span className="text-center text-[11px] uppercase tracking-[0.2em] text-gray-400 leading-tight">
              {logo.name === "Federation of Indian Corporate Lawyer" ? (
                <span className="block">
                  <span className="block">FEDERATION OF INDIAN</span>
                  <span className="block">CORPORATE LAWYER</span>
                </span>
              ) : (
                logo.name
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


