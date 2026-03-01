"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";
import { getUserNotificationSettings, updateNotificationSettings } from "@/app/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function NotificationsForm() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        caseUpdates: true,
        hearingReminders: true,
        mentorshipRequests: true,
        internshipApplications: true,
        systemAnnouncements: true,
    });

    useEffect(() => {
        async function loadSettings() {
            try {
                const userSettings = await getUserNotificationSettings();
                if (userSettings) {
                    setSettings(userSettings);
                }
            } catch (error) {
                console.error("Failed to load notification settings:", error);
            } finally {
                setFetching(false);
            }
        }
        loadSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await updateNotificationSettings(settings);
            if (result.success) {
                toast.success("Notification settings updated successfully");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update settings");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="animate-spin text-white" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="space-y-0.5">
                        <Label htmlFor="emailNotifications" className="text-white cursor-pointer">
                            Email Notifications
                        </Label>
                        <p className="text-sm text-slate-400">Receive notifications via email</p>
                    </div>
                    <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                            setSettings({ ...settings, emailNotifications: checked })
                        }
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="space-y-0.5">
                        <Label htmlFor="caseUpdates" className="text-white cursor-pointer">
                            Case Updates
                        </Label>
                        <p className="text-sm text-slate-400">Get notified about case status changes</p>
                    </div>
                    <Switch
                        id="caseUpdates"
                        checked={settings.caseUpdates}
                        onCheckedChange={(checked) =>
                            setSettings({ ...settings, caseUpdates: checked })
                        }
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="space-y-0.5">
                        <Label htmlFor="hearingReminders" className="text-white cursor-pointer">
                            Hearing Reminders
                        </Label>
                        <p className="text-sm text-slate-400">Reminders for upcoming court hearings</p>
                    </div>
                    <Switch
                        id="hearingReminders"
                        checked={settings.hearingReminders}
                        onCheckedChange={(checked) =>
                            setSettings({ ...settings, hearingReminders: checked })
                        }
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="space-y-0.5">
                        <Label htmlFor="mentorshipRequests" className="text-white cursor-pointer">
                            Mentorship Requests
                        </Label>
                        <p className="text-sm text-slate-400">Notifications for mentorship requests</p>
                    </div>
                    <Switch
                        id="mentorshipRequests"
                        checked={settings.mentorshipRequests}
                        onCheckedChange={(checked) =>
                            setSettings({ ...settings, mentorshipRequests: checked })
                        }
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="space-y-0.5">
                        <Label htmlFor="internshipApplications" className="text-white cursor-pointer">
                            Internship Applications
                        </Label>
                        <p className="text-sm text-slate-400">Updates on internship applications</p>
                    </div>
                    <Switch
                        id="internshipApplications"
                        checked={settings.internshipApplications}
                        onCheckedChange={(checked) =>
                            setSettings({ ...settings, internshipApplications: checked })
                        }
                    />
                </div>

                <div className="flex items-center justify-between py-3">
                    <div className="space-y-0.5">
                        <Label htmlFor="systemAnnouncements" className="text-white cursor-pointer">
                            System Announcements
                        </Label>
                        <p className="text-sm text-slate-400">Important system updates and announcements</p>
                    </div>
                    <Switch
                        id="systemAnnouncements"
                        checked={settings.systemAnnouncements}
                        onCheckedChange={(checked) =>
                            setSettings({ ...settings, systemAnnouncements: checked })
                        }
                    />
                </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-white/10">
                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                </Button>
            </div>
        </form>
    );
}
