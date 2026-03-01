"use client";

import { SettingsShell } from "@/components/dashboard/settings/settings-shell";

export default function StudentSettingsPage() {
    return (
        <SettingsShell
            role="student"
            title="Student Settings"
            subtitle="Manage your academic profile and preferences."
            roleColor="text-teal-400"
        />
    );
}
