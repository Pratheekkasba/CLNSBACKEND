"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Users, Briefcase } from "lucide-react";

const stats = [
    {
        name: "Active Cases",
        value: "12",
        change: "+2 this week",
        icon: Briefcase,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    {
        name: "Pending Tasks",
        value: "25",
        change: "+5 today",
        icon: Clock,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    {
        name: "Total Clients",
        value: "48",
        change: "+12% month over month",
        icon: Users,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
    },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Overview</h2>
                    <p className="text-slate-400">Welcome back, here's what's happening today.</p>
                </div>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500">
                    New Case
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
                        >
                            <div className="relative z-10 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                                    <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
                                </div>
                                <div className={`rounded-xl p-3 ${stat.bg} ${stat.border} border`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="relative z-10 mt-4 flex items-center gap-2 text-sm">
                                <span className="flex items-center gap-1 font-medium text-emerald-400">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {stat.change}
                                </span>
                                <span className="text-slate-500">vs last week</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                    <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 rounded-lg bg-white/5 p-3">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-slate-700/50" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-white">Case #2024-{100 + i} Updated</p>
                                    <p className="truncate text-xs text-slate-400">Document uploaded by Client</p>
                                </div>
                                <span className="text-xs text-slate-500">2h ago</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                    <h3 className="mb-4 text-lg font-semibold text-white">Upcoming Hearings</h3>
                    <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5 text-slate-400">
                        Calendar Placeholder
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
