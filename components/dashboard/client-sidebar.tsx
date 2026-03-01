"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    Search,
    FileText,
    CreditCard,
    LogOut,
    ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Client-specific navigation items - Messages removed
const sidebarItems = [
    { name: "Overview", url: "/dashboard/client", icon: LayoutDashboard },
    { name: "Find a Lawyer", url: "/dashboard/client/find-lawyer", icon: Search },
    { name: "My Cases", url: "/dashboard/client/cases", icon: ShieldAlert },
    // { name: "Documents", url: "/dashboard/client/documents", icon: FileText },
    // { name: "Payments", url: "/dashboard/client/payments", icon: CreditCard },
];

export function ClientSidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-[#020817]/95 backdrop-blur-md hidden md:flex md:flex-col">
            <div className="flex h-16 items-center border-b border-white/10 px-6">
                <div className="flex items-center gap-2">
                    <Image
                        src="/clns-logo.png"
                        alt="CLNS logo"
                        width={32}
                        height={32}
                        className="h-8 w-8 object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-lg font-bold tracking-tight text-white leading-none">CLNS</span>
                        <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Client</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3">
                <nav className="space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = item.url === "/dashboard/client"
                            ? pathname === item.url
                            : pathname.startsWith(item.url);

                        return (
                            <Link
                                key={item.url}
                                href={item.url}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "text-white"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-client-sidebar-item"
                                        className="absolute inset-0 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                                        initial={false}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <Icon className={cn("relative z-10 h-5 w-5", isActive ? "text-emerald-400" : "group-hover:text-white")} />
                                <span className="relative z-10">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="border-t border-white/10 p-4">
                <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-red-400"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
