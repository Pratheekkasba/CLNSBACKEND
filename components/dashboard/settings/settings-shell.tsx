"use client";

import { motion } from "framer-motion";
import { User, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ProfileForm } from "./profile-form";
import { SecurityForm } from "./security-form";

interface SettingsShellProps {
    role: "student" | "client" | "advocate" | "admin";
    title: string;
    subtitle: string;
    roleColor?: string; // e.g., "text-teal-400"
}

const tabs = [
    { name: "Profile", icon: User },
    { name: "Security", icon: Shield },
    // { name: "Notifications", icon: Bell }, // Removed
    // { name: "Billing", icon: CreditCard }, // Verified Roles only?
];

export function SettingsShell({ role, title, subtitle, roleColor = "text-blue-400" }: SettingsShellProps) {
    const [activeTab, setActiveTab] = useState("Profile");

    const renderContent = () => {
        switch (activeTab) {
            case "Profile":
                return <ProfileForm role={role} />;
            case "Security":
                return <SecurityForm />;
            default:
                return <ProfileForm role={role} />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
                <p className="text-slate-400">{subtitle}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Tabs */}
                <aside className="w-full md:w-64 shrink-0">
                    <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.name;
                            return (
                                <button
                                    key={tab.name}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                                        isActive
                                            ? `bg-white/10 text-white`
                                            : "text-slate-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Icon className={cn("h-4 w-4", isActive ? roleColor : "text-slate-500")} />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 min-w-0"
                >
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                        <div className="mb-6 pb-6 border-b border-white/10">
                            <h3 className="text-lg font-medium text-white">{activeTab} Settings</h3>
                            <p className="text-sm text-slate-400">Manage your {activeTab.toLowerCase()} details and preferences.</p>
                        </div>
                        {renderContent()}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
