"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function fetchClientCases() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "CLIENT") {
            return [];
        }

        const cases = await db.case.findMany({
            where: {
                clientId: session.user.id
            },
            include: {
                advocate: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                hearings: {
                    orderBy: { date: "asc" },
                    where: {
                        date: {
                            gte: new Date()
                        }
                    },
                    take: 1
                }
            },
            orderBy: { updatedAt: "desc" }
        });

        // Transform for UI consumption if needed, or return as is.
        // The UI needs: 
        // id, title, caseNumber (we don't have this in schema yet, use ID or add field?), 
        // type (not in schema, maybe use title or add field?), 
        // court (in Hearing, not Case directly, but maybe Case has it?), 
        // status, nextHearing, lawyer, progress (mock for now).

        // Let's return the raw data and let the component format it, 
        // or map it here to match the UI interface exactly.
        // For "caseNumber", "type", "court", we might need schema updates later.
        // For now, we'll map what we have.

        return cases.map(c => ({
            id: c.id,
            title: c.title,
            status: c.status,
            lawyer: c.advocate ? c.advocate.name : "Unassigned",
            lawyerEmail: c.advocate?.email,
            nextHearing: c.hearings[0]?.date || null,
            updatedAt: c.updatedAt
        }));

    } catch (error) {
        console.error("Failed to fetch client cases:", error);
        return [];
    }
}

export async function fetchClientStats() {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "CLIENT") {
            return null;
        }

        const activeCases = await db.case.count({
            where: {
                clientId: session.user.id,
                status: "OPEN"
            }
        });

        // Add more stats as needed (e.g. pending documents, next hearing)
        return {
            activeCases
        };
    } catch (error) {
        console.error("Failed to fetch client stats:", error);
        return null;
    }
}

export async function fetchCaseDetails(caseId: string) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "CLIENT") {
            return null;
        }

        const caseItem = await db.case.findFirst({
            where: {
                id: caseId,
                clientId: session.user.id
            },
            include: {
                advocate: {
                    select: {
                        name: true,
                        email: true,
                        // phone?
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

export async function fetchAvailableAdvocates() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return [];
        }

        // Fetch all active and verified advocates
        const advocates = await db.user.findMany({
            where: {
                role: "ADVOCATE",
            },
            select: {
                id: true,
                name: true,
                email: true,
                bio: true,
                barId: true,
                imageUrl: true,
                status: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return advocates.map(adv => ({
            id: adv.id,
            name: adv.name || "Advocate",
            email: adv.email,
            specialization: adv.barId ? "Verified Advocate" : "General Practice",
            bio: adv.bio || "Experienced legal professional ready to assist you.",
            verified: adv.status === "VERIFIED" || !!adv.barId,
            imageUrl: adv.imageUrl || null,
        }));
    } catch (error) {
        console.error("Failed to fetch advocates:", error);
        return [];
    }
}

export async function bookConsultation(advocateId: string, data: {
    title: string;
    description: string;
    type?: string;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id || session.user.role !== "CLIENT") {
            return { success: false, error: "Unauthorized" };
        }

        // Check if advocate exists and is active
        const advocate = await db.user.findUnique({
            where: { id: advocateId },
            select: { id: true, role: true, status: true }
        });

        if (!advocate || advocate.role !== "ADVOCATE") {
            return { success: false, error: "Advocate not found" };
        }

        // Create a new case for the consultation
        const newCase = await db.case.create({
            data: {
                title: data.title,
                description: data.description,
                type: data.type || "Consultation",
                status: "OPEN",
                clientId: session.user.id,
                advocateId: advocateId,
            }
        });

        revalidatePath("/dashboard/client");
        revalidatePath("/dashboard/client/cases");
        revalidatePath("/dashboard/advocate/cases");

        return { success: true, caseId: newCase.id };
    } catch (error) {
        console.error("Failed to book consultation:", error);
        return { success: false, error: "Failed to book consultation" };
    }
}
