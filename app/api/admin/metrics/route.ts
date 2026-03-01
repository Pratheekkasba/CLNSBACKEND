import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const session = await auth();

        // Authorization check
        if (!session?.user || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [
            totalUsers,
            pendingVerifications,
            recentUsers
        ] = await Promise.all([
            db.user.count(),
            db.user.count({ where: { status: "PENDING" } }), // Assuming 'PENDING' status implies verification needed
            db.user.findMany({
                take: 5,
                orderBy: { createdAt: "desc" },
                select: {
                    name: true,
                    email: true,
                    role: true,
                    status: true,
                    createdAt: true,
                },
            }),
        ]);

        return NextResponse.json({
            totalUsers,
            pendingVerifications,
            recentUsers,
        });
    } catch (error) {
        console.error("Admin metrics error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
