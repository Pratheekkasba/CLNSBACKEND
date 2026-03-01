import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role !== "CLIENT") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;

        const activeCases = await db.case.count({
            where: {
                clientId: userId,
                status: "OPEN",
            },
        });

        const nextHearing = await db.hearing.findFirst({
            where: {
                case: { clientId: userId },
                date: { gt: new Date() },
            },
            orderBy: { date: "asc" },
            include: {
                case: {
                    select: { title: true }
                }
            }
        });

        // Count distinct advocates
        const casesWithAdvocates = await db.case.findMany({
            where: { clientId: userId, advocateId: { not: null } },
            select: { advocateId: true },
            distinct: ['advocateId']
        });

        return NextResponse.json({
            activeCases,
            lawyersConnected: casesWithAdvocates.length,
            nextHearing: nextHearing ? {
                date: nextHearing.date,
                title: nextHearing.title,
                caseTitle: nextHearing.case.title,
            } : null,
        });
    } catch (error) {
        console.error("Client overview error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
