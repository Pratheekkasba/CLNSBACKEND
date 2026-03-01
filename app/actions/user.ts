"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            bio: true,
            college: true,
            barId: true,
            resumeUrl: true,
            imageUrl: true,
        }
    });

    return user;
}

export async function updateUserProfile(data: {
    firstName: string;
    lastName: string;
    email: string; // usually read-only
    bio?: string;
    college?: string;
    barId?: string;
    resumeUrl?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const fullName = `${data.firstName} ${data.lastName}`.trim();

        await db.user.update({
            where: { id: session.user.id },
            data: {
                name: fullName,
                bio: data.bio,
                college: data.college,
                barId: data.barId,
                resumeUrl: data.resumeUrl,
            }
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update profile", error);
        return { success: false, error: "Failed to update profile" };
    }
}

export async function uploadResume(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const file = formData.get("resume") as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        // Validate file type
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!allowedTypes.includes(file.type)) {
            return { success: false, error: "Only PDF and Word documents are allowed" };
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return { success: false, error: "File size must be less than 5MB" };
        }

        // Convert file to base64 data URL for storage
        // In production, you'd upload to S3/Cloudinary/etc. and store the URL
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Update user's resumeUrl
        await db.user.update({
            where: { id: session.user.id },
            data: { resumeUrl: dataUrl }
        });

        revalidatePath("/dashboard");
        revalidatePath("/dashboard/student/applications");
        return { success: true, resumeUrl: dataUrl };
    } catch (error) {
        console.error("Failed to upload resume", error);
        return { success: false, error: "Failed to upload resume" };
    }
}

export async function uploadProfilePhoto(formData: FormData) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const file = formData.get("photo") as File;
        if (!file) {
            return { success: false, error: "No file provided" };
        }

        // Validate file type - only images
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            return { success: false, error: "Only image files (JPEG, PNG, WebP, GIF) are allowed" };
        }

        // Validate file size (max 2MB for images)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            return { success: false, error: "Image size must be less than 2MB" };
        }

        // Convert file to base64 data URL for storage
        // In production, you'd upload to S3/Cloudinary/etc. and store the URL
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Update user's image URL (we'll store it in a new field or use existing image field)
        // For now, we'll add it to the User model's image field if it exists, or store as base64
        // Since we don't have an image field in schema, we'll store it temporarily
        // In production, upload to cloud storage and store the URL
        
        // Store image URL in database
        // In production, upload to cloud storage (S3/Cloudinary) and store the URL
        await db.user.update({
            where: { id: session.user.id },
            data: { imageUrl: dataUrl }
        });
        
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/*/settings");
        return { success: true, imageUrl: dataUrl };
    } catch (error) {
        console.error("Failed to upload profile photo", error);
        return { success: false, error: "Failed to upload profile photo" };
    }
}

export async function updatePassword(data: {
    currentPassword: string;
    newPassword: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { password: true }
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        // Verify current password
        const bcrypt = require("bcryptjs");
        const isCurrentPasswordValid = await bcrypt.compare(data.currentPassword, user.password);
        
        if (!isCurrentPasswordValid) {
            return { success: false, error: "Current password is incorrect" };
        }

        // Hash new password
        const hashedNewPassword = await bcrypt.hash(data.newPassword, 10);

        // Update password
        await db.user.update({
            where: { id: session.user.id },
            data: { password: hashedNewPassword }
        });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update password", error);
        return { success: false, error: "Failed to update password" };
    }
}

export async function getUserNotificationSettings() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return null;
        }

        // For now, return default settings since we don't have a notification settings table
        // In a real app, you'd fetch from a user_settings or notification_preferences table
        return {
            emailNotifications: true,
            caseUpdates: true,
            hearingReminders: true,
            mentorshipRequests: true,
            internshipApplications: true,
            systemAnnouncements: true,
        };
    } catch (error) {
        console.error("Failed to get notification settings", error);
        return null;
    }
}

export async function updateNotificationSettings(settings: {
    emailNotifications: boolean;
    caseUpdates: boolean;
    hearingReminders: boolean;
    mentorshipRequests: boolean;
    internshipApplications: boolean;
    systemAnnouncements: boolean;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        // For now, just return success since we don't have a notification settings table
        // In a real app, you'd save to a user_settings or notification_preferences table
        // await db.userSettings.upsert({
        //     where: { userId: session.user.id },
        //     update: settings,
        //     create: { userId: session.user.id, ...settings }
        // });

        revalidatePath("/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to update notification settings", error);
        return { success: false, error: "Failed to update notification settings" };
    }
}