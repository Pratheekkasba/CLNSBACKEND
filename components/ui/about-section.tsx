"use client";

import { useId } from "react";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";

export default function AboutSection() {
  const clipPathId = useId();
  const gradientId = `${clipPathId}-gradient`;

  return (
    <section className="bg-gradient-to-b from-[#030914] via-[#040f1d] to-[#030914] px-4 py-24">
      <div className="relative mx-auto max-w-5xl rounded-[40px] bg-white/95 px-6 pb-16 pt-12 text-center shadow-[0_60px_120px_rgba(4,12,24,0.35)] ring-1 ring-white/10 sm:px-12">
        <div className="pointer-events-none absolute inset-8 -z-10 rounded-[50px] bg-[radial-gradient(circle_at_top,rgba(4,12,24,0.45),transparent_70%)]" />
        <div className="mb-12 w-full rounded-[48px] bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
          <svg className="h-full w-full" viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <clipPath id={clipPathId} clipPathUnits="objectBoundingBox">
                <path
                  d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                  fill="currentColor"
                />
              </clipPath>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(10,39,58,0.45)" />
                <stop offset="100%" stopColor="rgba(10,39,58,0)" />
              </linearGradient>
            </defs>

            <g clipPath={`url(#${clipPathId})`}>
              <image
                href="/video-hero/image_for_supremcort.jpg?v=2"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect width="100%" height="100%" fill={`url(#${gradientId})`} />
            </g>
          </svg>
        </div>


        <div className="mt-4 space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.12}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
            >
              Centralised Legal Network Solutions
            </VerticalCutReveal>
          </h2>

          <div className="space-y-5 text-lg leading-relaxed text-gray-700">
            <p>
              CLNS is the first complete legal-tech ecosystem built to simplify and modernize how the
              nation accesses justice. It connects clients, law students, and advocates through a unified
              digital platform making legal help fast, transparent, and accessible to everyone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


