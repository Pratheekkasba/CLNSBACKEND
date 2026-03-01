import { db } from "@/lib/db";
import { DashboardContent } from "./dashboard-content";

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const [
        totalUsers,
        pendingVerificationsCount,
        recentUsers,
        allUsers,
        verificationRequests,
        logs,
        cases,
        postings,
        mentorships
    ] = await Promise.all([
        db.user.count(),
        db.verificationRequest.count({ where: { status: "PENDING" } }),
        db.user.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
        }),
        db.user.findMany({
            orderBy: { createdAt: "desc" },
        }),
        db.verificationRequest.findMany({
            where: { status: "PENDING" },
            include: { user: { select: { name: true, email: true } } },
            orderBy: { createdAt: "asc" }
        }),
        db.systemLog.findMany({
            orderBy: { createdAt: "desc" },
            take: 50,
        }),
        db.case.findMany({
            include: { client: true, advocate: true },
            orderBy: { createdAt: "desc" }
        }),
        db.internshipPosting.findMany({
            include: { _count: { select: { applications: true } } },
            orderBy: { createdAt: "desc" }
        }),
        db.mentorship.findMany({
            include: { mentor: true, student: true, _count: { select: { mentorshipSessions: true } } },
            orderBy: { createdAt: "desc" }
        })
    ]);

    const metrics = {
        totalUsers,
        pendingVerifications: pendingVerificationsCount,
        recentUsers,
    };

    return <DashboardContent
        metrics={metrics}
        users={allUsers}
        verificationRequests={verificationRequests}
        logs={logs}
        cases={cases}
        postings={postings}
        mentorships={mentorships}
    />;
}
