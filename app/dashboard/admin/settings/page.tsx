import { auth } from "@/auth";
import { db } from "@/lib/db";
import { SettingsContent } from "./settings-content";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { id: true, name: true, email: true, role: true } // Select minimal fields
    });

    if (!user) {
        redirect("/login");
    }

    // Convert role to string if needed, or ensure SettingsContent accepts simplified user object
    return <SettingsContent user={{ ...user, role: user.role as string }} />;
}
