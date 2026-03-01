"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, X, Loader2, User, Building, Clock, FileText, Download } from "lucide-react";
import { InternshipApplication, InternshipPosting } from "@prisma/client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define a type that includes the student relation
type ApplicationWithDetails = InternshipApplication & {
    coverNote?: string | null;
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

interface ApplicationReviewListProps {
    applications: ApplicationWithDetails[];
}

export function ApplicationReviewList({ applications }: ApplicationReviewListProps) {
    const [processing, setProcessing] = useState<string | null>(null);
    const [selectedApp, setSelectedApp] = useState<ApplicationWithDetails | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const openReviewDialog = (app: ApplicationWithDetails) => {
        setSelectedApp(app);
        setIsDialogOpen(true);
    };

    const handleAction = async (appId: string, status: "ACCEPTED" | "REJECTED") => {
        setProcessing(appId);
        try {
            const result = await updateApplicationStatus(appId, status);
            if (result.success) {
                toast.success(`Application ${status.toLowerCase()} successfully`);
                setIsDialogOpen(false);
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
            <div className="text-center py-10 text-slate-400">
                No pending applications to review.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {applications.map((app) => (
                <Card
                    key={app.id}
                    className="bg-white/5 border-white/10 text-white hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => openReviewDialog(app)}
                >
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-lg">{app.student.name || app.student.email}</h3>
                                <p className="text-sm text-slate-400">{app.student.college || "No college listed"}</p>
                            </div>
                            <Badge variant="outline" className="border-purple-500/20 text-purple-400 bg-purple-500/10">
                                {app.posting.title}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                        <div className="space-y-2 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <Building className="h-3 w-3 text-slate-500" />
                                <span className="text-slate-400">Applied for:</span>
                                {app.posting.company}
                            </div>
                            {app.coverNote ? (
                                <p className="italic text-slate-400 border-l-2 border-white/10 pl-2 mt-2 line-clamp-2">
                                    "{app.coverNote}"
                                </p>
                            ) : app.student.bio && (
                                <p className="italic text-slate-400 border-l-2 border-white/10 pl-2 mt-2 line-clamp-2">
                                    "{app.student.bio}"
                                </p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-2 text-xs text-slate-500 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span>Click to review details</span>
                            {app.student.resumeUrl && (
                                <span className="flex items-center gap-1 text-teal-400">
                                    <FileText className="h-3 w-3" />
                                    Resume Available
                                </span>
                            )}
                        </div>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Pending</span>
                    </CardFooter>
                </Card>
            ))}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-slate-900 border border-slate-700 text-white shadow-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Applicant Review</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Review application details for {selectedApp?.student.name}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedApp && (
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-6 py-4">
                                {/* Student Profile */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <User className="h-4 w-4" /> Student Profile
                                    </h4>
                                    <div className="bg-white/5 rounded-lg p-3 text-sm space-y-2 border border-white/10">
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-slate-500">Name:</span>
                                            <span className="col-span-2 text-white font-medium">{selectedApp.student.name || "Not provided"}</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-slate-500">Email:</span>
                                            <span className="col-span-2 text-white break-all">
                                                <a href={`mailto:${selectedApp.student.email}`} className="text-blue-400 hover:text-blue-300 hover:underline">
                                                    {selectedApp.student.email}
                                                </a>
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <span className="text-slate-500">College:</span>
                                            <span className="col-span-2 text-white">{selectedApp.student.college || "Not provided"}</span>
                                        </div>
                                        {selectedApp.student.bio && (
                                            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                                                <span className="text-slate-500">Bio:</span>
                                                <span className="col-span-2 text-slate-300 text-xs">{selectedApp.student.bio}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cover Note */}
                                {selectedApp.coverNote && (
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                            <FileText className="h-4 w-4" /> Cover Note
                                        </h4>
                                        <div className="bg-white/5 rounded-lg p-3 text-sm italic text-slate-300 border-l-2 border-teal-500/50">
                                            "{selectedApp.coverNote}"
                                        </div>
                                    </div>
                                )}

                                {/* Bio */}
                                {selectedApp.student.bio && (
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium text-slate-300">Bio</h4>
                                        <p className="text-sm text-slate-400 bg-white/5 p-3 rounded-lg">
                                            {selectedApp.student.bio}
                                        </p>
                                    </div>
                                )}

                                {/* Resume / CV */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                                        <Download className="h-4 w-4" /> Resume / CV
                                    </h4>
                                    {selectedApp.student.resumeUrl ? (
                                        <div className="space-y-2">
                                            <div className="bg-white/5 rounded-lg p-3 text-sm border border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-teal-400" />
                                                        <span className="text-white">
                                                            {selectedApp.student.resumeUrl.split('/').pop() || 'Resume.pdf'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="outline"
                                                    className="flex-1 border-teal-500/30 text-teal-400 hover:bg-teal-500/10 hover:text-teal-300 group"
                                                    asChild
                                                >
                                                    <a href={selectedApp.student.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                                                        Download PDF
                                                    </a>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="flex-1 border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
                                                    asChild
                                                >
                                                    <a href={selectedApp.student.resumeUrl} target="_blank" rel="noopener noreferrer">
                                                        View in New Tab
                                                    </a>
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-500 italic p-4 border border-dashed border-white/10 rounded-lg text-center bg-white/5">
                                            <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p>No resume uploaded by student.</p>
                                            <p className="text-xs mt-1">You may want to request the student to upload their resume.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollArea>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            onClick={() => selectedApp && handleAction(selectedApp.id, "REJECTED")}
                            disabled={!!processing}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 flex-1 sm:flex-none"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                        </Button>
                        <Button
                            onClick={() => selectedApp && handleAction(selectedApp.id, "ACCEPTED")}
                            disabled={!!processing}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white flex-1 sm:flex-none"
                        >
                            {processing === selectedApp?.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Check className="mr-2 h-4 w-4" />
                            Approve Application
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
