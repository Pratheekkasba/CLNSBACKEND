import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role !== "ADVOCATE") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;

        const [totalCases, upcomingHearings] = await Promise.all([
            db.case.count({
                where: { advocateId: userId },
            }),
            db.hearing.count({
                where: {
                    case: { advocateId: userId },
                    date: { gt: new Date() },
                },
            }),
        ]);

        return NextResponse.json({
            totalCases,
            upcomingHearings,
        });
    } catch (error) {
        console.error("Advocate overview error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
