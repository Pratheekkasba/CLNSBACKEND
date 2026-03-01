"use client";

import Demo from "@/components/ui/scroll-expansion-hero-demo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function HeroPage() {
  return (
    <main className="min-h-screen relative bg-black text-white">
      <div className="absolute top-4 right-4 z-20">
        <ThemeToggle />
      </div>
      <Demo />
    </main>
  );
}


