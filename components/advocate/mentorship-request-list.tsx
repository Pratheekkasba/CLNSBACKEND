"use client";

import { useState } from "react";
import { updateMentorshipStatus } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, X, Loader2, GraduationCap, Mail } from "lucide-react";
import { Mentorship } from "@prisma/client";

type MentorshipWithStudent = Mentorship & {
    student: {
        id: string;
        name: string | null;
        email: string;
        college?: string | null;
        bio?: string | null;
    };
};

interface MentorshipRequestListProps {
    requests: MentorshipWithStudent[];
}

export function MentorshipRequestList({ requests }: MentorshipRequestListProps) {
    const [processing, setProcessing] = useState<string | null>(null);

    const handleAction = async (id: string, status: "ACTIVE" | "REJECTED") => {
        setProcessing(id);
        try {
            // "ACTIVE" = Accepted for Mentorship
            const result = await updateMentorshipStatus(id, status);
            if (result.success) {
                const action = status === "ACTIVE" ? "accepted" : "declined";
                toast.success(`Mentorship request ${action}`);
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setProcessing(null);
        }
    };

    if (requests.length === 0) {
        return (
            <div className="text-center py-10 text-slate-400">
                No pending mentorship requests.
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {requests.map((req) => (
                <Card key={req.id} className="bg-white/5 border-white/10 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <span className="truncate">{req.student.name || "Unknown Student"}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <GraduationCap className="h-4 w-4" />
                            {req.student.college || "No college listed"}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <Mail className="h-4 w-4" />
                            {req.student.email}
                        </div>
                        {req.student.bio && (
                            <p className="text-sm text-slate-300 italic">"{req.student.bio}"</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button
                            onClick={() => handleAction(req.id, "REJECTED")}
                            disabled={processing === req.id}
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 h-8"
                        >
                            <X className="mr-2 h-3 w-3" />
                            Decline
                        </Button>
                        <Button
                            onClick={() => handleAction(req.id, "ACTIVE")}
                            disabled={processing === req.id}
                            className="bg-blue-600 hover:bg-blue-500 text-white h-8"
                        >
                            {processing === req.id && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                            <Check className="mr-2 h-3 w-3" />
                            Accept
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
