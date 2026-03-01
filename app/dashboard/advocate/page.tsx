import { fetchAdvocateStats } from "@/app/actions/advocate";
import { DashboardContent } from "@/app/dashboard/student/dashboard-content"; // Reuse? Or create custom?
// Let's create a custom dashboard view for Advocates since the metrics are different.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, UserPlus, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdvocateDashboardPage() {
    const stats = await fetchAdvocateStats();

    if (!stats) {
        return (
            <div className="p-6 text-center text-slate-400">
                Unauthorized or Failed to load stats.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Advocate Dashboard</h2>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            Pending Applications
                        </CardTitle>
                        <FileText className="h-4 w-4 text-purple-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingApps}</div>
                        <p className="text-xs text-slate-500">Internship reviews needed</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            Mentorship Requests
                        </CardTitle>
                        <UserPlus className="h-4 w-4 text-blue-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingMentorships}</div>
                        <p className="text-xs text-slate-500">Students waiting for approval</p>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-400">
                            Active Mentees
                        </CardTitle>
                        <Users className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeMentees}</div>
                        <p className="text-xs text-slate-500">Currently mentoring</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions / Recent Activity Placeholder */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-white/5 border-white/10 text-white">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        <Link href="/dashboard/advocate/internships">
                            <Button className="bg-purple-600 hover:bg-purple-500">
                                Review Applications
                            </Button>
                        </Link>
                        <Link href="/dashboard/advocate/mentorship">
                            <Button className="bg-blue-600 hover:bg-blue-500">
                                Manage Requests
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
