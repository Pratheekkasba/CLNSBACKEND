"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function applyForInternship(postingId: string, coverNote?: string) {
    try {
        const session = await auth();
        if (!session || !session.user || !session.user.id || session.user.role !== "STUDENT") {
            return { success: false, error: "Unauthorized" };
        }

        const existingApplication = await db.internshipApplication.findFirst({
            where: {
                studentId: session.user.id,
                postingId: postingId,
            },
        });

        if (existingApplication) {
            return { success: false, error: "Already applied" };
        }

        await db.internshipApplication.create({
            data: {
                studentId: session.user.id,
                postingId: postingId,
                status: "PENDING",
                coverNote: coverNote,
            },
        });

        revalidatePath("/dashboard/student");
        return { success: true };
    } catch (error) {
        console.error("Failed to apply for internship:", error);
        return { success: false, error: "Failed to submit application" };
    }
}

export async function fetchInternships() {
    try {
        const internships = await db.internshipPosting.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { applications: true }
                }
            }
        });
        return internships;
    } catch (error) {
        console.error("Failed to fetch internships:", error);
        return [];
    }
}

export async function getStudentApplications() {
    try {
        const session = await auth();
        if (!session?.user?.id) return [];

        const applications = await db.internshipApplication.findMany({
            where: { studentId: session.user.id },
            include: {
                posting: true
            },
            orderBy: { createdAt: "desc" }
        });
        return applications;
    } catch (error) {
        console.error("Failed to fetch applications:", error);
        return [];
    }
}

export async function fetchMentors() {
    try {
        const mentors = await db.user.findMany({
            where: {
                role: "ADVOCATE", // Only Advocates can be mentors
                status: { in: ["ACTIVE", "VERIFIED"] } // Active or verified only
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                bio: true,
                createdAt: true, // using as proxy for experience/join date
            }
        });
        return mentors;
    } catch (error) {
        console.error("Failed to fetch mentors:", error);
        return [];
    }
}

export async function requestMentorship(mentorId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const existing = await db.mentorship.findFirst({
            where: {
                studentId: session.user.id,
                mentorId: mentorId,
                status: { in: ["ACTIVE", "PENDING"] }
            }
        });

        if (existing) {
            return { success: false, error: "Mentorship already active or requested" };
        }

        await db.mentorship.create({
            data: {
                studentId: session.user.id,
                mentorId: mentorId,
                status: "PENDING" // Advocate must approve
            }
        });

        revalidatePath("/dashboard/student/mentorship");
        return { success: true };
    } catch (error) {
        console.error("Failed to request mentorship:", error);
        return { success: false, error: "Failed to request mentorship" };
    }
}

export async function fetchMyMentors() {
    try {
        const session = await auth();
        if (!session?.user?.id) return [];

        const mentorships = await db.mentorship.findMany({
            where: {
                studentId: session.user.id,
            },
            include: {
                mentor: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        bio: true,
                        imageUrl: true,
                        barId: true,
                    }
                }
            },
            orderBy: { updatedAt: "desc" }
        });
        return mentorships;
    } catch (error) {
        console.error("Failed to fetch my mentors:", error);
        return [];
    }
}
