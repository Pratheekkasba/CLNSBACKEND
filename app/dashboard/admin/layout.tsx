import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AdminSidebar } from "@/components/dashboard/admin-sidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#020817]">
            <AdminSidebar />
            <div className="md:pl-64">
                <DashboardHeader />
                <main className="p-6">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
