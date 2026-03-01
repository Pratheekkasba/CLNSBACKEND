"use client";

import { MagicText } from "@/components/ui/magic-text";

export function MagicTextDemo() {
  return (
    <section className="relative flex min-h-[120vh] items-center justify-center bg-slate-50 py-24">
      <p className="absolute top-12 left-1/2 -translate-x-1/2 text-sm uppercase tracking-[0.4em] text-slate-400">
        Scroll Down 👇
      </p>
      <div className="mt-[40vh] flex max-w-4xl items-center justify-center px-4">
        <MagicText
          text="Hi there! I'm Preet, creator of HextaUI. Thank you so much for all the support and love you've shown me. I hope you enjoy using HextaUI as much as I enjoyed creating it."
          className="text-center text-3xl font-semibold text-slate-900"
        />
      </div>
    </section>
  );
}


