"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { User, Mail, GraduationCap, Calendar } from "lucide-react";

interface MenteeListProps {
    mentees: {
        id: string;
        name: string | null;
        email: string;
        college: string | null;
        bio: string | null;
        startedAt: Date;
    }[];
}

export function MenteeList({ mentees }: MenteeListProps) {
    if (mentees.length === 0) {
        return (
            <div className="text-center py-10 text-slate-400">
                You don't have any active mentees yet.
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mentees.map((student) => (
                <Card key={student.id} className="bg-white/5 border-white/10 text-white overflow-hidden group hover:border-white/20 transition-all">
                    <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border border-white/10">
                                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.email}`} />
                                <AvatarFallback className="bg-slate-700">{student.name?.[0] || "S"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{student.name || "Unknown Student"}</h3>
                                <p className="text-xs text-slate-400 capitalize">Student</p>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-slate-300">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-purple-400" />
                                <span className="truncate">{student.college || "No college listed"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-blue-400" />
                                <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-emerald-400" />
                                <span>Mentored for {formatDistanceToNow(new Date(student.startedAt))}</span>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 mt-auto border-t border-white/5 flex gap-2">
                        <Button
                            variant="outline"
                            className="w-full h-8 text-xs border-white/10 hover:bg-white/5 hover:text-white"
                            onClick={() => window.open(`/dashboard/advocate/student/${student.id}`, "_blank")}
                        >
                            View Profile
                        </Button>
                        <Button
                            className="w-full h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                            onClick={() => window.location.href = `mailto:${student.email}?subject=Mentorship%20Update`}
                        >
                            <Mail className="mr-1.5 h-3 w-3" />
                            Message
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
