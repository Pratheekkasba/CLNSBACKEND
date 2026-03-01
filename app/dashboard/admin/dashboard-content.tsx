"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Users, FileCheck, Activity, Briefcase, GraduationCap, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserTable } from "@/components/admin/user-table";
import { VerificationQueue } from "@/components/admin/verification-queue";
import { SystemLogs } from "@/components/admin/system-logs";
import { CaseTable } from "@/components/admin/case-table";
import { InternshipTable } from "@/components/admin/internship-table";
import { MentorshipTable } from "@/components/admin/mentorship-table";

interface DashboardContentProps {
    metrics: {
        totalUsers: number;
        pendingVerifications: number;
        recentUsers: any[];
    };
    users: any[];
    verificationRequests: any[];
    logs: any[];
    cases: any[];
    postings: any[];
    mentorships: any[];
}

export function DashboardContent({ metrics, users, verificationRequests, logs, cases, postings, mentorships }: DashboardContentProps) {
    const stats = [
        {
            name: "Total Users",
            value: metrics.totalUsers.toLocaleString(),
            change: "All Roles",
            icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            name: "Pending Requests",
            value: metrics.pendingVerifications.toLocaleString(),
            change: "Action Required",
            icon: FileCheck,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
        },
        {
            name: "System Health",
            value: "99.9%",
            change: "All Systems Operational",
            icon: Activity,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">System Administration</h2>
                    <p className="text-slate-400">Manage users, approvals, and monitor system activity.</p>
                </div>
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
                        </motion.div>
                    );
                })}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 text-slate-400 flex flex-wrap h-auto p-1 gap-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Users</TabsTrigger>
                    <TabsTrigger value="verifications" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Verifications</TabsTrigger>
                    <TabsTrigger value="cases" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Cases</TabsTrigger>
                    <TabsTrigger value="internships" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Internships</TabsTrigger>
                    <TabsTrigger value="mentorships" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Mentorships</TabsTrigger>
                    <TabsTrigger value="logs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                                <SystemLogs logs={logs.slice(0, 5)} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Recent Verifications</h3>
                                <VerificationQueue requests={verificationRequests.slice(0, 3)} />
                            </div>
                        </div>
                    </motion.div>
                </TabsContent>

                <TabsContent value="users" className="space-y-6">
                    <UserTable users={users} />
                </TabsContent>

                <TabsContent value="verifications" className="space-y-6">
                    <VerificationQueue requests={verificationRequests} />
                </TabsContent>

                <TabsContent value="cases" className="space-y-6">
                    <CaseTable cases={cases} />
                </TabsContent>

                <TabsContent value="internships" className="space-y-6">
                    <InternshipTable postings={postings} />
                </TabsContent>

                <TabsContent value="mentorships" className="space-y-6">
                    <MentorshipTable mentorships={mentorships} />
                </TabsContent>

                <TabsContent value="logs" className="space-y-6">
                    <SystemLogs logs={logs} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
