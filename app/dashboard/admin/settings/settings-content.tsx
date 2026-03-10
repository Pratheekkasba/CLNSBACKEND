"use client";

import { useState, useEffect } from "react";
import { updateProfile } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, Settings as SettingsIcon, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface SettingsContentProps {
    user: {
        id: string;
        name: string | null;
        email: string;
        role: string;
    };
}

export function SettingsContent({ user }: SettingsContentProps) {
    const [name, setName] = useState(user.name || "");
    const [loading, setLoading] = useState(false);
    const [savingSystem, setSavingSystem] = useState(false);
    const router = useRouter();
    const { update: updateSession } = useSession();

    // Maintenance mode — persisted via API to SystemLog DB
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [registrationOpen, setRegistrationOpen] = useState(true);

    useEffect(() => {
        fetch("/api/admin/maintenance")
            .then(r => r.json())
            .then(data => setMaintenanceMode(data.maintenanceMode ?? false))
            .catch(() => { });
    }, []);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate name
        if (!name || name.trim().length === 0) {
            toast.error("Name cannot be empty");
            return;
        }

        setLoading(true);
        try {
            const result = await updateProfile({ name: name.trim(), email: user.email });
            if (result.success) {
                toast.success("Profile updated successfully");
                await updateSession();
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update profile");
            }
        } catch (error: any) {
            toast.error(error?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSystemSettingsUpdate = async () => {
        setSavingSystem(true);
        try {
            const res = await fetch("/api/admin/maintenance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ enabled: maintenanceMode }),
            });
            if (!res.ok) throw new Error("Failed");
            toast.success("System settings updated successfully");
            if (maintenanceMode) {
                toast.warning("Maintenance mode is now active. Non-admin users will be redirected.");
            } else {
                toast.info("Maintenance mode disabled. Platform is open to all users.");
            }
        } catch (error) {
            toast.error("Failed to update system settings");
        } finally {
            setSavingSystem(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Settings</h2>
                    <p className="text-slate-400">Manage your profile and system configurations.</p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-white/5 border border-white/10 text-slate-400">
                    <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </TabsTrigger>
                    <TabsTrigger value="system" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        System
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-2xl">
                        <h3 className="text-lg font-medium text-white mb-4">Profile Information</h3>
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-slate-300">Email</Label>
                                <Input id="email" value={user.email} disabled className="bg-black/20 border-white/10 text-slate-400" />
                                <p className="text-xs text-slate-500">Email cannot be changed directly.</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-slate-300">Display Name</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-500 text-white">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-2xl space-y-6">
                        <h3 className="text-lg font-medium text-white mb-4">System Preferences</h3>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">Maintenance Mode</Label>
                                <p className="text-sm text-slate-400">Disable platform access for non-admins.</p>
                            </div>
                            <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base text-white">User Registration</Label>
                                <p className="text-sm text-slate-400">Allow new users to sign up.</p>
                            </div>
                            <Switch checked={registrationOpen} onCheckedChange={setRegistrationOpen} />
                        </div>
                        <Button
                            onClick={handleSystemSettingsUpdate}
                            disabled={savingSystem}
                            className="bg-purple-600 hover:bg-purple-500 text-white w-full sm:w-auto"
                        >
                            {savingSystem && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Save System Settings
                        </Button>
                        {maintenanceMode && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                <Shield className="inline-block mr-2 h-4 w-4" />
                                <strong>Warning:</strong> Maintenance mode is active. Non-admin users will be blocked from accessing the platform.
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function Badge({ variant, className, children }: { variant: "outline", className?: string, children: React.ReactNode }) {
    return <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${className}`}>{children}</span>
}
