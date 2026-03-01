"use client";

import { useEffect, useState } from "react";

const stats = [
  { label: "Users", value: "10,177+", icon: "users" },
  { label: "Consultations", value: "6,675+", icon: "chat" },
  { label: "Clients", value: "454", icon: "briefcase" },
  { label: "Active Cases", value: "25", icon: "scales" },
  { label: "Internships", value: "16", icon: "book" },
];

const icons = {
  users: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 13h20" />
    </svg>
  ),
  scales: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="m3 7 4 9 4-9" />
      <path d="m13 7 4 9 4-9" />
      <path d="M2 7h6" />
      <path d="M16 7h6" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5V4.5A2.5 2.5 0 0 1 6.5 2H20v20Z" />
    </svg>
  ),
};

export default function HeroSection() {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const offset = Math.min(window.scrollY * 0.15, 60);
      setParallaxOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden bg-[#003f73] text-white"
      style={{ fontFamily: "Inter, Manrope, system-ui, -apple-system, sans-serif" }}
    >
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          src="/videos/legal-hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/legal-hero-poster.jpg"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <div
          className="flex w-full flex-col items-center text-center"
          style={{ transform: `translateY(${parallaxOffset * -0.5}px)` }}
        >
          <div className="mb-8 flex flex-col items-center gap-4">
            <div className="h-24 w-24 rounded-full border border-white/20 bg-white/5 shadow-[0_0_35px_rgba(255,204,102,0.4)] backdrop-blur-md transition-transform duration-700 ease-out sm:h-28 sm:w-28">
              <div className="flex h-full w-full items-center justify-center text-amber-200">
                <svg viewBox="0 0 64 64" className="h-16 w-16">
                  <path
                    d="M32 10c6 0 10.5 5.5 10.5 11.5v6.5h6v7h-6v3.5c0 6-4.5 11.5-10.5 11.5S21.5 44.5 21.5 38.5V35h-6v-7h6v-6.5C21.5 15.5 26 10 32 10Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path d="M18 51h28" stroke="currentColor" strokeWidth="3" />
                </svg>
              </div>
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">State Emblem</p>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Centralised Legal Network Solutions
            </h1>
            <h2 className="text-lg font-medium text-white/85 sm:text-xl lg:text-2xl">
              Transforming legal services with accessibility, transparency & technology.
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-[#003f73] shadow-[0_0_25px_rgba(255,255,255,0.35)] transition duration-200 ease-out hover:bg-white hover:shadow-[0_0_35px_rgba(0,191,255,0.45)]">
              Book Consultation Starts at ₹1
            </button>
            <button className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:border-white hover:bg-white/10">
              For Students
            </button>
            <button className="rounded-full border border-white/30 px-6 py-3 text-base font-semibold text-white backdrop-blur hover:border-white hover:bg-white/10">
              For Advocates
            </button>
          </div>

          <div
            className="mt-12 grid w-full gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            style={{ transform: `translateY(${parallaxOffset * 0.15}px)` }}
          >
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group flex flex-col items-center rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-5 text-center transition duration-200 ease-out hover:bg-white/[0.08]"
                >
                  <div className="mb-3 text-teal-200/90 transition duration-200 ease-out group-hover:text-white">
                    {icons[stat.icon]}
                  </div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm uppercase tracking-wide text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/70">
          <span className="text-xs uppercase tracking-[0.5em]">Scroll</span>
          <div className="h-12 w-0.5 overflow-hidden rounded-full bg-white/30">
            <div className="scroll-indicator h-full w-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}


