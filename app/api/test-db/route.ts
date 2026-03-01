import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const userCount = await db.user.count();
        return NextResponse.json({
            status: "success",
            message: "Database connected successfully",
            userCount
        });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json(
            { status: "error", message: "Failed to connect to database" },
            { status: 500 }
        );
    }
}
