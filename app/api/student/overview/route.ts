import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role !== "STUDENT") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;

        const [applicationsSent, mentorships] = await Promise.all([
            db.internshipApplication.count({
                where: { studentId: userId },
            }),
            db.mentorship.findMany({
                where: { studentId: userId },
                include: {
                    mentor: {
                        select: { name: true, email: true }
                    }
                },
                take: 5
            }),
        ]);

        return NextResponse.json({
            applicationsSent,
            mentorships: mentorships.map((m: any) => ({
                id: m.id,
                mentorName: m.mentor.name,
                mentorEmail: m.mentor.email,
                status: m.status
            })),
        });
    } catch (error) {
        console.error("Student overview error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
