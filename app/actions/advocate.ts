"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// --- Stats & Overview ---

export async function fetchAdvocateStats() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return null;
        }

        const [pendingApps, pendingMentorships, activeMentees] = await Promise.all([
            // Pending applications for internships posted by THIS advocate (or system-wide if advocates view all?)
            // Assumption: Advocates view all applications for now, or we need to know which postings are "theirs".
            // For V1, let's assume Advocates review ALL pending applications (like an admin/staff role) 
            // OR we filter by postings created by them. 
            // The prompt says "View internships assigned to them (or posted by Admin)". 
            // Let's check if 'InternshipPosting' has an 'authorId'. It doesn't in the schema I saw earlier.
            // So we might need to just fetch ALL pending applications for V1 or assume they are "assigned" implicitly.
            // Let's fetch ALL pending applications for now as a "Decision Maker".
            db.internshipApplication.count({
                where: { status: "PENDING" }
            }),
            db.mentorship.count({
                where: {
                    mentorId: session.user.id,
                    status: "PENDING"
                }
            }),
            db.mentorship.count({
                where: {
                    mentorId: session.user.id,
                    status: "ACTIVE"
                }
            })
        ]);

        return {
            pendingApps,
            pendingMentorships,
            activeMentees
        };
    } catch (error) {
        console.error("Failed to fetch advocate stats:", error);
        return null;
    }
}

// --- Internship Management ---

export async function fetchPendingApplications() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        // Fetching ALL pending applications. 
        // In a real app, you might only want applications for postings *managed* by this advocate.
        const apps = await db.internshipApplication.findMany({
            where: { status: "PENDING" },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        college: true,
                        bio: true,
                        resumeUrl: true,
                    }
                },
                posting: true
            },
            orderBy: { createdAt: "asc" }
        });
        return apps;
    } catch (error) {
        console.error("Failed to fetch pending applications:", error);
        return [];
    }
}

export async function updateApplicationStatus(applicationId: string, status: "ACCEPTED" | "REJECTED" | "COMPLETED") {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        await db.internshipApplication.update({
            where: { id: applicationId },
            data: { status }
        });

        revalidatePath("/dashboard/advocate");
        revalidatePath("/dashboard/advocate/internships");
        return { success: true };
    } catch (error) {
        console.error("Failed to update application status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

// --- Mentorship Management ---

export async function fetchMentorshipRequests() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        const requests = await db.mentorship.findMany({
            where: {
                mentorId: session.user.id,
                status: "PENDING"
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        college: true,
                        bio: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return requests;
    } catch (error) {
        console.error("Failed to fetch mentorship requests:", error);
        return [];
    }
}

export async function updateMentorshipStatus(mentorshipId: string, status: "ACTIVE" | "REJECTED" | "COMPLETED") {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // status "ACTIVE" means Accepted.
        await db.mentorship.update({
            where: { id: mentorshipId },
            data: { status }
        });

        revalidatePath("/dashboard/advocate");
        revalidatePath("/dashboard/advocate/mentorship");
        return { success: true };
    } catch (error) {
        console.error("Failed to update mentorship status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

// --- My Mentees ---

export async function fetchMentees() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        const mentorships = await db.mentorship.findMany({
            where: {
                mentorId: session.user.id,
                status: "ACTIVE"
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        college: true,
                        status: true,
                        bio: true,
                        resumeUrl: true
                    }
                }
            }
        });

        return mentorships.map(m => ({
            ...m.student,
            mentorshipId: m.id,
            startedAt: m.createdAt
        }));
    } catch (error) {
        console.error("Failed to fetch mentees:", error);
        return [];
    }
}

// --- Internship Creation ---

export async function createInternship(data: {
    title: string;
    description: string;
    company: string;
    location: string;
    type: string;
    stipend?: string;
    duration?: string;
    deadline?: Date;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        await db.internshipPosting.create({
            data: {
                title: data.title,
                description: data.description,
                company: data.company,
                location: data.location,
                type: data.type,
                stipend: data.stipend,
                duration: data.duration,
                deadline: data.deadline,
                authorId: session.user.id
            }
        });

        revalidatePath("/dashboard/student"); // Update student dashboard
        revalidatePath("/dashboard/advocate"); // Update likely advocate lists
        return { success: true };
    } catch (error) {
        console.error("Failed to create internship:", error);
        return { success: false, error: "Failed to create internship" };
    }
}

export async function updateInternship(id: string, data: {
    title: string;
    description: string;
    company: string;
    location: string;
    type: string;
    stipend?: string;
    duration?: string;
    deadline?: Date;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // Check ownership
        const existing = await db.internshipPosting.findUnique({
            where: { id },
            select: { authorId: true }
        });

        if (!existing || existing.authorId !== session.user.id) {
            return { success: false, error: "Unauthorized or not found" };
        }

        await db.internshipPosting.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                company: data.company,
                location: data.location,
                type: data.type,
                stipend: data.stipend,
                duration: data.duration,
                deadline: data.deadline,
            }
        });

        revalidatePath("/dashboard/student");
        revalidatePath("/dashboard/advocate/internships");
        return { success: true };
    } catch (error) {
        console.error("Failed to update internship:", error);
        return { success: false, error: "Failed to update internship" };
    }
}

export async function toggleInternshipStatus(id: string, status: "OPEN" | "CLOSED" | "PAUSED") {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // Check ownership
        const existing = await db.internshipPosting.findUnique({
            where: { id },
            select: { authorId: true }
        });

        if (!existing || existing.authorId !== session.user.id) {
            return { success: false, error: "Unauthorized or not found" };
        }

        await db.internshipPosting.update({
            where: { id },
            data: { status }
        });

        revalidatePath("/dashboard/student");
        revalidatePath("/dashboard/advocate/internships");
        return { success: true };
    } catch (error) {
        console.error("Failed to toggle internship status:", error);
        return { success: false, error: "Failed to update status" };
    }
}

// --- New Actions for Dashboard Restructure (Sprint 3) ---

export async function fetchAdvocateInternships() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        const internships = await db.internshipPosting.findMany({
            where: {
                authorId: session.user.id
            },
            include: {
                _count: {
                    select: { applications: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return internships;
    } catch (error) {
        console.error("Failed to fetch advocate internships:", error);
        return [];
    }
}

export async function fetchAdvocateHearings() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        const hearings = await db.hearing.findMany({
            where: {
                case: {
                    advocateId: session.user.id
                }
            },
            include: {
                case: {
                    select: {
                        title: true,
                        client: {
                            select: { name: true }
                        }
                    }
                }
            },
            orderBy: { date: "asc" }
        });
        return hearings;
    } catch (error) {
        console.error("Failed to fetch advocate hearings:", error);
        return [];
    }
}

export async function fetchAdvocateClients() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        // Fetch clients who have cases assigned to this advocate
        const clients = await db.user.findMany({
            where: {
                role: "CLIENT",
                cases: {
                    some: {
                        advocateId: session.user.id
                    }
                }
            },
            include: {
                _count: {
                    select: { cases: { where: { advocateId: session.user.id } } }
                }
            }
        });

        // Map to a friendlier structure if needed, or return as is
        return clients.map(client => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: "N/A", // Schema doesn't have phone yet
            activeCases: client._count.cases,
            lastActive: client.updatedAt
        }));
    } catch (error) {
        console.error("Failed to fetch advocate clients:", error);
        return [];
    }
}

export async function fetchAdvocateCases() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        const cases = await db.case.findMany({
            where: {
                advocateId: session.user.id
            },
            include: {
                client: {
                    select: { name: true, email: true }
                },
                hearings: {
                    orderBy: { date: "asc" },
                    take: 1
                }
            },
            orderBy: { updatedAt: "desc" }
        });
        return cases;
    } catch (error) {
        console.error("Failed to fetch advocate cases:", error);
        return [];
    }
}

// --- Sprint 4: CRUD Actions ---

export async function fetchClientsForSelect() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        // For now, fetch ALL clients? Or just assigned ones?
        // User said "Select Client (Dropdown)". If creating a new case, maybe for a NEW client?
        // Let's fetch all users with role CLIENT for now to be safe.
        const clients = await db.user.findMany({
            where: { role: "CLIENT" },
            select: { id: true, name: true, email: true },
            orderBy: { name: "asc" }
        });
        return clients;
    } catch (error) {
        console.error("Failed to fetch clients for select:", error);
        return [];
    }
}

export async function createCase(data: {
    title: string;
    type: string;
    description?: string;
    clientId: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        await db.case.create({
            data: {
                title: data.title,
                type: data.type,
                description: data.description,
                clientId: data.clientId,
                advocateId: session.user.id,
                status: "OPEN"
            }
        });

        revalidatePath("/dashboard/advocate/cases");
        revalidatePath("/dashboard/advocate/clients");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to create case:", error);
        return { success: false, error: error.message || "Failed to create case" };
    }
}

export async function createHearing(data: {
    caseId: string;
    date: Date;
    title: string; // Purpose
    court?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // Verify case ownership? Or assume dropdown filters it?
        // Better to check.
        const existingCase = await db.case.findUnique({
            where: { id: data.caseId },
            select: { advocateId: true }
        });

        if (!existingCase || existingCase.advocateId !== session.user.id) {
            return { success: false, error: "Unauthorized or Invalid Case" };
        }

        await db.hearing.create({
            data: {
                caseId: data.caseId,
                date: data.date,
                title: data.title,
                court: data.court
            }
        });

        revalidatePath("/dashboard/advocate/hearings");
        revalidatePath("/dashboard/advocate/cases"); // Hearings list inside case details might update
        return { success: true };
    } catch (error: any) {
        console.error("Failed to create hearing:", error);
        return { success: false, error: error.message || "Failed to create hearing" };
    }
}

export async function fetchAcceptedApplications() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") return [];

        const apps = await db.internshipApplication.findMany({
            where: {
                status: "ACCEPTED",
                posting: {
                    authorId: session.user.id
                }
            },
            include: {
                student: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        college: true,
                        bio: true,
                        resumeUrl: true,
                    }
                },
                posting: true
            },
            orderBy: { updatedAt: "desc" }
        });
        return apps;
    } catch (error) {
        console.error("Failed to fetch accepted applications:", error);
        return [];
    }
}

export async function updateHearing(hearingId: string, data: {
    date: Date;
    title: string;
    court?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // Verify hearing ownership through case
        const existingHearing = await db.hearing.findUnique({
            where: { id: hearingId },
            include: {
                case: {
                    select: { advocateId: true }
                }
            }
        });

        if (!existingHearing || existingHearing.case.advocateId !== session.user.id) {
            return { success: false, error: "Unauthorized or hearing not found" };
        }

        await db.hearing.update({
            where: { id: hearingId },
            data: {
                date: data.date,
                title: data.title,
                court: data.court
            }
        });

        revalidatePath("/dashboard/advocate/hearings");
        revalidatePath("/dashboard/advocate/cases");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update hearing:", error);
        return { success: false, error: error.message || "Failed to update hearing" };
    }
}

export async function deleteHearing(hearingId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // Verify hearing ownership through case
        const existingHearing = await db.hearing.findUnique({
            where: { id: hearingId },
            include: {
                case: {
                    select: { advocateId: true }
                }
            }
        });

        if (!existingHearing || existingHearing.case.advocateId !== session.user.id) {
            return { success: false, error: "Unauthorized or hearing not found" };
        }

        await db.hearing.delete({
            where: { id: hearingId }
        });

        revalidatePath("/dashboard/advocate/hearings");
        revalidatePath("/dashboard/advocate/cases");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to delete hearing:", error);
        return { success: false, error: error.message || "Failed to delete hearing" };
    }
}

export async function fetchHearingDetails(hearingId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return null;
        }

        const hearing = await db.hearing.findFirst({
            where: {
                id: hearingId,
                case: {
                    advocateId: session.user.id
                }
            },
            include: {
                case: {
                    select: {
                        id: true,
                        title: true,
                        client: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        return hearing;
    } catch (error) {
        console.error("Failed to fetch hearing details:", error);
        return null;
    }
}

export async function fetchCaseDetails(caseId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return null;
        }

        const caseItem = await db.case.findFirst({
            where: {
                id: caseId,
                advocateId: session.user.id
            },
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                },
                hearings: {
                    orderBy: { date: "desc" }
                }
            }
        });

        return caseItem;
    } catch (error) {
        console.error("Failed to fetch case details:", error);
        return null;
    }
}

export async function updateCaseStatus(caseId: string, status: "OPEN" | "CLOSED" | "PENDING") {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "ADVOCATE") {
            return { success: false, error: "Unauthorized" };
        }

        // Verify case ownership
        const existingCase = await db.case.findUnique({
            where: { id: caseId },
            select: { advocateId: true }
        });

        if (!existingCase || existingCase.advocateId !== session.user.id) {
            return { success: false, error: "Unauthorized or case not found" };
        }

        await db.case.update({
            where: { id: caseId },
            data: { status: status as any }
        });

        revalidatePath("/dashboard/advocate/cases");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update case status:", error);
        return { success: false, error: error.message || "Failed to update case status" };
    }
}