import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const role = (session.user as any).role?.toLowerCase();

    if (!role) {
        redirect("/login"); // Fallback if no role
    }

    redirect(`/dashboard/${role}`);
}
