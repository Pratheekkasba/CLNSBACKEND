import { fetchClientStats, fetchAvailableAdvocates } from "@/app/actions/client";
import { ShieldAlert, MessageSquare, Clock, ArrowUpRight, Scale, BadgeCheck, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ClientDashboardPage() {
    const [data, advocates] = await Promise.all([
        fetchClientStats(),
        fetchAvailableAdvocates(),
    ]);

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
        {
            name: "Available Advocates",
            value: advocates.length.toString(),
            change: "Ready to Help",
            icon: Users,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            name: "Next Hearing",
            value: "None",
            change: "No updates",
            icon: Clock,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
        },
    ];

    const featuredAdvocates = advocates.slice(0, 4);

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

            {/* Featured Advocates Preview */}
            {featuredAdvocates.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-lg font-semibold text-white">Find an Advocate</h3>
                            <p className="text-sm text-slate-400 mt-0.5">{advocates.length} legal experts available for consultation</p>
                        </div>
                        <Link
                            href="/dashboard/client/find-lawyer"
                            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                        >
                            View All <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {featuredAdvocates.map((adv, i) => {
                            const colorClasses = ["bg-blue-600", "bg-purple-600", "bg-teal-600", "bg-emerald-600"];
                            const initials = adv.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);
                            return (
                                <div
                                    key={adv.id}
                                    className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3.5 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
                                >
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${colorClasses[i % colorClasses.length]}`}>
                                        {initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <p className="text-sm font-semibold text-white truncate">{adv.name}</p>
                                            {adv.verified && <BadgeCheck className="h-3.5 w-3.5 text-blue-400 shrink-0" />}
                                        </div>
                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            <Scale className="h-3 w-3" />
                                            {adv.specialization}
                                        </p>
                                    </div>
                                    <Link
                                        href="/dashboard/client/find-lawyer"
                                        className="shrink-0 rounded-md bg-emerald-600/20 px-2.5 py-1 text-xs font-medium text-emerald-400 hover:bg-emerald-600/30 transition-colors"
                                    >
                                        Book
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-1">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Case Timeline</h3>
                        <Link href="/dashboard/client/cases" className="text-sm text-emerald-400 hover:underline">View Details</Link>
                    </div>
                    <div className="relative pl-4 border-l border-white/10 space-y-6">
                        <div className="text-sm text-slate-500">View 'My Cases' for detailed timeline.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
