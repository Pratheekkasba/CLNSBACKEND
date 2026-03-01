"use client";

import { SettingsShell } from "@/components/dashboard/settings/settings-shell";

export default function AdvocateSettingsPage() {
    return (
        <SettingsShell
            role="advocate"
            title="Advocate Settings"
            subtitle="Manage your professional profile and account settings."
            roleColor="text-purple-400"
        />
    );
}
