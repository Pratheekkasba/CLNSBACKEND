import { fetchClientStats } from "@/app/actions/client";
import { ShieldAlert, MessageSquare, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
    const data = await fetchClientStats();

    const stats = [
        {
            name: "Active Cases",
            value: data?.activeCases?.toString() || "0",
            change: "Ongoing Matters",
            icon: ShieldAlert,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
        // We can add more real stats here as we expand functionality
        {
            name: "Lawyers Connected",
            value: "1", // Placeholder or fetch real count if available in stats
            change: "My Legal Team",
            icon: MessageSquare,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            name: "Next Hearing",
            value: "None", // Placeholder or fetch real hearing
            change: "No updates",
            icon: Clock,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">My Legal Hub</h2>
                    <p className="text-slate-400">Track your ongoing cases and connect with experts.</p>
                </div>
                <Link href="/dashboard/client/find-lawyer" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500">
                    Find a Lawyer
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
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
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Case Timeline</h3>
                        <Link href="/dashboard/client/cases" className="text-sm text-emerald-400 hover:underline">View Details</Link>
                    </div>

                    <div className="relative pl-4 border-l border-white/10 space-y-6">
                        <div className="text-sm text-slate-500">View 'My Cases' for detailed timeline.</div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Documents Vault</h3>
                        <Link href="#" className="text-sm text-emerald-400 hover:underline">Upload</Link>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 text-center text-slate-500 text-sm">
                            Document integration coming soon.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
