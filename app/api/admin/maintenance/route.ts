import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET() {
    try {
        const log = await db.systemLog.findFirst({
            where: { action: "MAINTENANCE_MODE" },
            orderBy: { createdAt: "desc" },
        });
        const isEnabled = log?.description === "true";
        return NextResponse.json({ maintenanceMode: isEnabled });
    } catch {
        return NextResponse.json({ maintenanceMode: false });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { enabled } = await req.json();

        await db.systemLog.create({
            data: {
                action: "MAINTENANCE_MODE",
                description: String(enabled),
                userId: session.user.id,
            },
        });

        return NextResponse.json({ success: true, maintenanceMode: enabled });
    } catch (error) {
        console.error("Failed to update maintenance mode:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
