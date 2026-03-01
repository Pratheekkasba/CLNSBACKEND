"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Loader2, Mail, Ban, GraduationCap, CheckCircle, FileText, Download, ExternalLink } from "lucide-react";
import { InternshipApplication, InternshipPosting } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

type ApplicationWithDetails = InternshipApplication & {
    student: {
        id: string;
        name: string | null;
        email: string;
        college?: string | null;
        bio?: string | null;
        resumeUrl?: string | null;
    };
    posting: InternshipPosting;
};

interface HiredInternListProps {
    applications: ApplicationWithDetails[];
}

export function HiredInternList({ applications }: HiredInternListProps) {
    const [processing, setProcessing] = useState<string | null>(null);

    const handleTerminate = async (appId: string) => {
        if (!confirm("Are you sure you want to end this internship? This action cannot be undone.")) return;

        setProcessing(appId);
        try {
            const result = await updateApplicationStatus(appId, "COMPLETED");
            if (result.success) {
                toast.success("Internship marked as completed/terminated.");
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setProcessing(null);
        }
    };

    if (applications.length === 0) {
        return (
            <div className="text-center py-10 text-slate-400 border border-dashed border-white/10 rounded-xl">
                No active hired interns at the moment.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {applications.map((app) => (
                <Card key={app.id} className="bg-white/5 border-white/10 text-white overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12 border border-white/10">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${app.student.email}`} />
                                    <AvatarFallback className="bg-slate-700">{app.student.name?.[0] || "S"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{app.student.name || "Unknown Student"}</h3>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20">
                                            {app.posting.title}
                                        </Badge>
                                        <span className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" /> {app.student.email}
                                        </span>
                                        {app.student.college && (
                                            <span className="flex items-center gap-1">
                                                <GraduationCap className="h-3 w-3" /> {app.student.college}
                                            </span>
                                        )}
                                        {app.student.resumeUrl && (
                                            <Badge variant="secondary" className="bg-teal-500/10 text-teal-400 border-teal-500/20 hover:bg-teal-500/20">
                                                <FileText className="h-3 w-3 mr-1" />
                                                Resume
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                                {app.student.resumeUrl && (
                                    <Button 
                                        className="flex-1 sm:flex-none border-teal-500/20 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400" 
                                        variant="outline" 
                                        size="sm" 
                                        asChild
                                    >
                                        <a href={app.student.resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Resume
                                        </a>
                                    </Button>
                                )}
                                <Button className="flex-1 sm:flex-none border-white/10 bg-white/5 hover:bg-white/10 text-slate-300" variant="outline" size="sm" asChild>
                                    <a href={`mailto:${app.student.email}`}>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Contact
                                    </a>
                                </Button>
                                <Button
                                    className="flex-1 sm:flex-none border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleTerminate(app.id)}
                                    disabled={processing === app.id}
                                >
                                    {processing === app.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <Ban className="mr-2 h-4 w-4" />
                                            End Internship
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
