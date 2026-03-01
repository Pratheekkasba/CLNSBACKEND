import { db } from "@/lib/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardContent } from "./dashboard-content";

export const dynamic = 'force-dynamic';

export default async function StudentDashboardPage() {
  const session = await auth();

  if (!session || !session.user || !session.user.id || session.user.role !== "STUDENT") {
    // In a real app this might redirect to login or 403, 
    // but middleware usually handles role checks.
    // For safety we redirect if role mismatch.
    if (session?.user) {
      return redirect(`/dashboard/${session.user.role.toLowerCase()}`);
    }
    return redirect("/login");
  }

  const userId = session.user.id;

  const [applicationsCount, upcomingSessionsCount, mentorshipHoursQuote, postings, mentorships] = await Promise.all([
    db.internshipApplication.count({ where: { studentId: userId } }),
    db.mentorshipSession.count({
      where: {
        mentorship: { studentId: userId },
        date: { gte: new Date() }
      }
    }),
    db.mentorshipSession.aggregate({
      where: { mentorship: { studentId: userId } },
      _sum: { duration: true }
    }),
    db.internshipPosting.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    }),
    db.mentorship.findMany({
      where: { studentId: userId },
      include: { mentor: { select: { name: true, email: true } } }
    })
  ]);

  const metrics = {
    applicationsSent: applicationsCount,
    upcomingSessions: upcomingSessionsCount,
    mentorshipHours: (mentorshipHoursQuote._sum.duration || 0) / 60, // Assuming duration is in minutes
  };

  const formattedMentorships = mentorships.map(m => ({
    id: m.id,
    name: m.mentor.name,
    email: m.mentor.email,
    status: m.status
  }));

  return <DashboardContent
    metrics={metrics}
    postings={postings}
    mentorships={formattedMentorships}
  />;
}
