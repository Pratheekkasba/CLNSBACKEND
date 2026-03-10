"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LucideIcon, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  showAuthButtons?: boolean;
}

export const NavBar = memo(function NavBar({ items, className, showAuthButtons = true }: NavBarProps) {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Determine active tab based on current pathname
  const getActiveTab = () => {
    // Exact match first
    const exactMatch = items.find((item) => item.url === pathname);
    if (exactMatch) return exactMatch.name;

    // For home page, check if pathname is exactly "/"
    if (pathname === "/") {
      const homeItem = items.find((item) => item.url === "/");
      if (homeItem) return homeItem.name;
    }

    // Fallback to first item
    return items[0]?.name ?? "";
  };

  const activeTab = getActiveTab();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!items.length) return null;

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full px-4 sm:px-6 py-2 bg-[#050b16] dark:bg-transparent",
        className
      )}
    >
      <div ref={containerRef} className="relative mx-auto flex w-full max-w-4xl items-center gap-2 sm:gap-3 rounded-2xl border border-white/60 px-2 sm:px-4 py-2 sm:py-2.5 shadow-[0_15px_40px_rgba(15,23,42,0.08)] backdrop-blur-[12px] transition-colors dark:border-white/10 dark:shadow-[0_20px_45px_rgba(2,6,23,0.65)]" style={{ clipPath: "inset(0 round 1rem)" }}>
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <Image
            src="/clns-logo.png"
            alt="CLNS logo"
            width={24}
            height={24}
            className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
          />
          <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-white">CLNS</span>
        </div>

        <div
          className="relative flex flex-1 items-center justify-center gap-0.5 sm:gap-1 min-w-0"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const isHighlighted = hoveredTab === item.name || (hoveredTab === null && isActive);

            return (
              <Link
                key={item.name}
                ref={(el) => {
                  linkRefs.current[item.name] = el;
                }}
                href={item.url}
                prefetch={true}
                onMouseEnter={() => setHoveredTab(item.name)}
                className={cn(
                  "relative z-10 flex items-center justify-center rounded-full px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-colors duration-200 ease-out",
                  "text-slate-600 hover:text-blue-600 dark:text-white/70 dark:hover:text-cyan-100",
                  isHighlighted && "text-blue-600 dark:text-cyan-100",
                  "overflow-hidden"
                )}
                style={{ borderRadius: "9999px" }}
              >
                {isHighlighted && (
                  <motion.span
                    layoutId="tubelight-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_0_20px_rgba(59,130,246,0.1)] dark:bg-cyan-400/15 dark:shadow-[0_0_25px_rgba(34,211,238,0.6),inset_0_0_20px_rgba(34,211,238,0.1)]"
                    style={{ borderRadius: "9999px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30, duration: 0.2 }}
                  />
                )}
                <span className={cn("hidden sm:inline relative z-10", isMobile && "hidden")}>
                  {item.name}
                </span>
                <span className={cn("sm:hidden relative z-10", !isMobile && "hidden")}>
                  <Icon size={16} strokeWidth={2.2} />
                </span>
                {isActive && (
                  <motion.span
                    layoutId="tubelight-bar"
                    className="absolute bottom-0 left-1/2 h-[2px] w-12 sm:w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_12px_rgba(59,130,246,1),0_0_24px_rgba(59,130,246,0.5)] dark:via-cyan-300 dark:shadow-[0_0_15px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.5)]"
                    style={{ borderRadius: "9999px" }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                      duration: 0.2,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {showAuthButtons && (
          <div className="flex items-center gap-2 flex-shrink-0">
            {status === "loading" ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-16 sm:h-9 sm:w-20 rounded-md bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
                <div className="h-8 w-20 sm:h-9 sm:w-24 rounded-md bg-slate-200/50 dark:bg-slate-800/50 animate-pulse" />
              </div>
            ) : session ? (
              <Link href={`/dashboard/${session.user?.role?.toLowerCase() || 'student'}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 text-slate-600 hover:text-blue-600 dark:text-white/70 dark:hover:text-cyan-100"
                >
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 text-slate-600 hover:text-blue-600 dark:text-white/70 dark:hover:text-cyan-100 flex items-center gap-1.5"
                  >
                    <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-500 text-white dark:bg-cyan-500 dark:hover:bg-cyan-400 flex items-center gap-1.5"
                  >
                    <UserPlus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
});


