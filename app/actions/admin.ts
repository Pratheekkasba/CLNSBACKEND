import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function logSystemEvent(action: string, description: string, userId?: string) {
    try {
        await db.systemLog.create({
            data: {
                action,
                description,
                userId,
            },
        });
    } catch (error) {
        console.error("Failed to log system event:", error);
    }
}

// --- User Management ---

export async function fetchUsers() {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return [];
        }

        const users = await db.user.findMany({
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
            }
        });

        return users.map(user => ({
            ...user,
            status: user.status as string // Ensure string type compatibility
        }));
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

export async function updateUserStatus(userId: string, status: "ACTIVE" | "SUSPENDED" | "PENDING" | "VERIFIED" | "REJECTED") {
    try {
        const user = await db.user.update({
            where: { id: userId },
            data: { status: status as any }, // casting because Prisma enum might mismatch with string literal if not imported exact
        });

        await logSystemEvent("USER_UPDATE", `User ${user.email} status updated to ${status}`, "ADMIN_ACTION");
        revalidatePath("/dashboard/admin");
        revalidatePath("/dashboard/client"); // Ensure clients see status changes if relevant
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to update user status" };
    }
}

export async function approveVerification(requestId: string) {
    try {
        const request = await db.verificationRequest.findUnique({
            where: { id: requestId },
            include: { user: true },
        });

        if (!request) return { success: false, error: "Request not found" };

        await db.$transaction([
            db.verificationRequest.update({
                where: { id: requestId },
                data: { status: "APPROVED" },
            }),
            db.user.update({
                where: { id: request.userId },
                data: { status: "ACTIVE" }, // Assuming APPROVED verification makes them ACTIVE or VERIFIED. Let's use ACTIVE or VERIFIED. Detailed plan said ACTIVE.
            }),
            db.systemLog.create({
                data: {
                    action: "VERIFICATION_APPROVED",
                    description: `Verification approved for ${request.user.email}`,
                    userId: "ADMIN_ACTION",
                },
            }),
        ]);

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to approve verification" };
    }
}

export async function rejectVerification(requestId: string) {
    try {
        const request = await db.verificationRequest.findUnique({
            where: { id: requestId },
            include: { user: true },
        });

        if (!request) return { success: false, error: "Request not found" };

        await db.$transaction([
            db.verificationRequest.update({
                where: { id: requestId },
                data: { status: "REJECTED" },
            }),
            // Optionally suspend the user or just leave them pending/rejected
            db.user.update({
                where: { id: request.userId },
                data: { status: "REJECTED" },
            }),
            db.systemLog.create({
                data: {
                    action: "VERIFICATION_REJECTED",
                    description: `Verification rejected for ${request.user.email}`,
                    userId: "ADMIN_ACTION",
                },
            }),
        ]);

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to reject verification" };
    }
}

export async function updateUserRole(userId: string, newRole: UserRole) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Unauthorized" };
        }

        const currentUser = await db.user.findUnique({ where: { id: userId } });
        if (!currentUser) {
            return { success: false, error: "User not found" };
        }

        await db.user.update({
            where: { id: userId },
            data: { role: newRole },
        });

        await db.systemLog.create({
            data: {
                action: "USER_ROLE_UPDATE",
                description: `Updated role for ${currentUser.email} to ${newRole}`,
                userId: session.user.id,
            },
        });

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update user role:", error);
        return { success: false, error: "Failed to update role" };
    }
}

export async function updateProfile(data: { name: string; email: string }) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        // Validate name is not empty
        if (!data.name || data.name.trim().length === 0) {
            return { success: false, error: "Name cannot be empty" };
        }

        await db.user.update({
            where: { id: session.user.id },
            data: {
                name: data.name.trim(),
                // email: data.email // Email update usually requires verification, skipping for now or keeping it simple
            },
        });

        revalidatePath("/dashboard/admin/settings");
        revalidatePath("/dashboard");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update profile:", error);
        return { success: false, error: error?.message || "Failed to update profile" };
    }
}

export async function createUser(data: { name: string; email: string; role: UserRole; password?: string }) {
    try {
        const session = await auth();
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Unauthorized" };
        }

        const existingUser = await db.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            return { success: false, error: "User already exists" };
        }

        const password = data.password || "password123"; // Default or provided
        // Note: In a real app, hash this. For this demo/setup, we store plain or need bcrypt.
        // Assuming bcrypt is used elsewhere, we should probably hash it.
        // However, looking at auth.ts (not shown fully but usually relies on bcrypt compare), 
        // and seed.js used a hash. Let's assume we need to hash it.
        // BUT, for now, to keep it simple and consistent with potential plain text dev setup or reliance on existing libs:
        // Wait, seed.js used `const password = await bcrypt.hash("password123", 10);` (implied or shown in prev logs).
        // I should import bcrypt.

        // Since I can't easily add imports without seeing the top, I'll rely on the fact that I can edit the top or use dynamic import if needed.
        // Or better, just store it and assume the auth logic handles it or I'll add the import in a separate step if bcrypt is not imported.
        // Actually, looking at imports in admin.ts, bcrypt is NOT imported.

        // Let's do a separate edit to add bcrypt import first or assume I can do it here if I edit top too. 
        // I will just create the user without hashing for now if I can't check auth.ts, OR I'll add the import in this call implicitly if I can span the file.
        // `admin.ts` view showed lines 1-159. I can see the top.

        // I will strictly just add the function for now and use a placeholder or plain text if the system tolerates it, 
        // OR better, I should implement it correctly.
        // Let's add the import to the top in a separate step to be safe, or just do it in one go if I can.
        // I'll stick to adding the function at the bottom and then I will add the import at the top.

        // const bcrypt = require("bcryptjs"); // Already imported at top
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: data.role,
                password: hashedPassword,
                status: "ACTIVE", // Admins create active users by default
            },
        });

        await db.systemLog.create({
            data: {
                action: "USER_CREATE",
                description: `Created user ${data.email} as ${data.role}`,
                userId: session.user.id,
            },
        });

        revalidatePath("/dashboard/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to create user:", error);
        return { success: false, error: "Failed to create user" };
    }
}
