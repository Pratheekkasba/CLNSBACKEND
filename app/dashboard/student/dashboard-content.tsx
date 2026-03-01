"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Briefcase, Users, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { applyForInternship } from "@/app/actions/student";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface StudentMetrics {
    applicationsSent: number;
    upcomingSessions: number;
    mentorshipHours: number;
}

interface InternshipPosting {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
}

interface Mentor {
    id: string;
    name: string | null;
    email: string;
    status: string;
}

interface DashboardContentProps {
    metrics: StudentMetrics;
    postings: InternshipPosting[];
    mentorships: Mentor[];
}

export function DashboardContent({ metrics, postings, mentorships }: DashboardContentProps) {
    const [applying, setApplying] = useState<string | null>(null);

    const handleApply = async (id: string) => {
        setApplying(id);
        const res = await applyForInternship(id);
        if (res.success) {
            toast.success("Application submitted successfully!");
        } else {
            toast.error(res.error || "Failed to apply");
        }
        setApplying(null);
    };

    const stats = [
        {
            name: "Applications Sent",
            value: metrics.applicationsSent.toString(),
            change: "Pending Review",
            icon: FileText,
            color: "text-teal-400",
            bg: "bg-teal-500/10",
            border: "border-teal-500/20",
        },
        {
            name: "Upcoming Sessions",
            value: metrics.upcomingSessions.toString(),
            change: "On Schedule",
            icon: Calendar,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            name: "Mentorship Hours",
            value: `${metrics.mentorshipHours}h`,
            change: "Tracked",
            icon: Users,
            color: "text-sky-400",
            bg: "bg-sky-500/10",
            border: "border-sky-500/20",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Student Overview</h2>
                    <p className="text-slate-400">Track your internships, mentorships, and learning progress.</p>
                </div>
                <Link href="/dashboard/student/internships" className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-500">
                    Find Internship
                </Link>
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
                                <span className="flex items-center gap-1 font-medium text-teal-400">
                                    <ArrowUpRight className="h-4 w-4" />
                                    {stat.change}
                                </span>
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
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Recommended Internships</h3>
                        <Link href="/dashboard/student/internships" className="text-sm text-teal-400 hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {postings.map((posting) => (
                            <div key={posting.id} className="flex items-center justify-between rounded-lg bg-white/5 p-4 border border-white/5 hover:border-white/10 transition-colors">
                                <div>
                                    <h4 className="font-medium text-white">{posting.title}</h4>
                                    <p className="text-xs text-slate-400">{posting.company} • {posting.location}</p>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-teal-600/20 text-teal-400 hover:bg-teal-600/30 hover:text-teal-300"
                                    onClick={() => handleApply(posting.id)}
                                    disabled={!!applying}
                                >
                                    {applying === posting.id ? "Applying..." : "Apply"}
                                </Button>
                            </div>
                        ))}
                        {postings.length === 0 && (
                            <div className="p-8 text-center text-slate-500 text-sm">
                                No recommended internships found.
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">My Mentors</h3>
                        <Link href="/dashboard/student/mentorship" className="text-sm text-teal-400 hover:underline">Find Mentor</Link>
                    </div>
                    <div className="space-y-4">
                        {mentorships.map((m, i) => (
                            <div key={i} className="flex items-center gap-4 rounded-lg bg-white/5 p-3">
                                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-white">{m.name || "Mentor"}</p>
                                    <p className="truncate text-xs text-slate-400">{m.email}</p>
                                </div>
                                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded">{m.status}</span>
                            </div>
                        ))}
                        {mentorships.length === 0 && (
                            <div className="p-4 border border-dashed border-white/10 rounded-lg text-center">
                                <p className="text-sm text-slate-500 mb-2">Want expert guidance?</p>
                                <Link href="/dashboard/student/mentorship">
                                    <Button className="text-sm text-white bg-teal-600 hover:bg-teal-500 px-4 py-2 rounded-lg transition-colors">
                                        Connect with Advocate
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
