"use client";

import { SettingsShell } from "@/components/dashboard/settings/settings-shell";

export default function ClientSettingsPage() {
    return (
        <SettingsShell
            role="client"
            title="Account Settings"
            subtitle="Manage your personal details and case notifications."
            roleColor="text-emerald-400"
        />
    );
}
