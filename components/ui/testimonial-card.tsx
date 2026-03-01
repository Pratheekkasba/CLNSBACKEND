"use client";

import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({ author, text, href, className }: TestimonialCardProps) {
  const Card = (href ? "a" : "div") as "a" | "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex max-w-[320px] flex-col rounded-lg p-4 text-start transition-all duration-200 ease-out sm:p-6",
        // Light mode: darker frosted glass style
        "bg-slate-800/40 backdrop-blur-xl border border-slate-700/30",
        "text-white",
        // Dark mode: maintain existing dark styles
        "dark:bg-gradient-to-b dark:from-muted/50 dark:to-muted/10 dark:border-border/50",
        "dark:text-white",
        // Hover effects
        "hover:bg-slate-800/50 dark:hover:from-muted/60 dark:hover:to-muted/20",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-white">{author.name}</h3>
          <p className="text-sm text-white/70 dark:text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/80 dark:text-muted-foreground sm:text-md">{text}</p>
    </Card>
  );
}


