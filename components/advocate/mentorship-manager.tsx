"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MentorshipRequestList } from "@/components/advocate/mentorship-request-list";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MessageSquare, Calendar, MoreHorizontal, CheckCircle, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { updateMentorshipStatus } from "@/app/actions/advocate";
import { toast } from "sonner";

interface MentorshipManagerProps {
    requests: any[]; // Using any to avoid strict type duplication for now, but usually should import types
    mentees: any[];
}

export default function MentorshipManager({ requests, mentees }: MentorshipManagerProps) {
    const [completingId, setCompletingId] = useState<string | null>(null);

    const handleComplete = async (mentorshipId: string) => {
        setCompletingId(mentorshipId);
        try {
            const result = await updateMentorshipStatus(mentorshipId, "COMPLETED");
            if (result.success) {
                toast.success("Mentorship marked as completed");
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setCompletingId(null);
        }
    };

    return (
        <Tabs defaultValue="requests" className="space-y-6">
            <TabsList className="bg-black/20 border border-white/10">
                <TabsTrigger value="requests" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                    Pending Requests
                    {requests.length > 0 && (
                        <span className="ml-2 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                            {requests.length}
                        </span>
                    )}
                </TabsTrigger>
                <TabsTrigger value="mentees" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                    Active Mentees
                    <span className="ml-2 bg-emerald-500/20 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                        {mentees.length}
                    </span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="requests" className="space-y-4">
                <MentorshipRequestList requests={requests} />
            </TabsContent>

            <TabsContent value="mentees" className="space-y-4">
                {mentees.length === 0 ? (
                    <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5 text-slate-400">
                        <p>You don't have any active students yet.</p>
                        <p className="text-sm mt-1">Accept requests to start mentoring.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {mentees.map((student) => (
                            <Card key={student.mentorshipId} className="bg-white/5 border-white/10 overflow-hidden group hover:border-emerald-500/30 transition-colors">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Avatar className="h-12 w-12 border border-white/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.email}`} />
                                        <AvatarFallback className="bg-slate-800 text-slate-400">
                                            {student.name?.[0] || "S"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 overflow-hidden">
                                        <CardTitle className="text-base font-semibold text-white truncate">
                                            {student.name}
                                        </CardTitle>
                                        <p className="text-xs text-slate-400 truncate">{student.email}</p>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10" disabled={completingId === student.mentorshipId}>
                                                {completingId === student.mentorshipId ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <MoreHorizontal className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 bg-slate-900 border-white/10 text-white">
                                            <DropdownMenuItem
                                                className="cursor-pointer focus:bg-emerald-500/20 focus:text-emerald-400"
                                                onClick={() => handleComplete(student.mentorshipId)}
                                            >
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Mark as Completed
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent className="space-y-4 text-sm">
                                    <div className="flex items-center justify-between text-slate-400">
                                        <span>Student Status</span>
                                        <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/10">
                                            Active
                                        </Badge>
                                    </div>
                                    <div className="text-xs text-slate-500 flex items-center gap-2">
                                        <Calendar className="h-3 w-3" />
                                        Started {format(new Date(student.startedAt), "MMM d, yyyy")}
                                    </div>
                                </CardContent>
                                <CardFooter className="bg-black/20 p-4 flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="w-full h-8 text-xs border-white/10 hover:bg-white/5 hover:text-white"
                                        onClick={() => {
                                            if (student.resumeUrl) {
                                                window.open(student.resumeUrl, "_blank");
                                            } else {
                                                alert("This student has not uploaded a resume yet.");
                                            }
                                        }}
                                    >
                                        View Resume
                                    </Button>
                                    <Button
                                        className="w-full h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white"
                                        onClick={() => window.location.href = `mailto:${student.email}?subject=Mentorship%20Update`}
                                    >
                                        <MessageSquare className="mr-1.5 h-3 w-3" />
                                        Message
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}
