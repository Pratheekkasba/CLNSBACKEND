"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Clock, Video, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestMentorship } from "@/app/actions/student";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MentorBrowserProps {
    mentors: any[]; // using any for now to speed up, ideally User type
    myMentors?: any[]; // The active/pending mentors for the current student
}

export function MentorBrowser({ mentors, myMentors }: MentorBrowserProps) {
    const [requesting, setRequesting] = useState<string | null>(null);
    const [requested, setRequested] = useState<Set<string>>(new Set());

    const handleRequest = async (mentorId: string) => {
        setRequesting(mentorId);
        try {
            const result = await requestMentorship(mentorId);
            if (result.success) {
                toast.success("Mentorship requested successfully!");
                setRequested(prev => new Set(prev).add(mentorId));
            } else {
                toast.error(result.error || "Failed to request");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setRequesting(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Find a Mentor</h2>
                    <p className="text-slate-400">Connect with experienced professionals for guidance.</p>
                </div>
            </div>

            <Tabs defaultValue="find" className="space-y-6">
                <TabsList className="bg-black/20 border border-white/10">
                    <TabsTrigger value="find" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                        Find a Mentor
                    </TabsTrigger>
                    <TabsTrigger value="my-mentors" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        My Mentors
                        {myMentors && myMentors.length > 0 && (
                            <span className="ml-2 bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                {myMentors.length}
                            </span>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="find" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {mentors.map((mentor, i) => (
                            <motion.div
                                key={mentor.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <Avatar className="h-14 w-14 border border-white/10">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${mentor.email}`} />
                                            <AvatarFallback className="bg-slate-700 text-white">
                                                {mentor.name?.[0] || "M"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">{mentor.name}</h4>
                                            <p className="text-sm text-slate-400">{mentor.role}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-300 line-clamp-3 min-h-[3rem]">
                                    {mentor.bio || "Experienced legal professional helping students navigate their careers."}
                                </p>

                                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                                        <Clock className="h-3 w-3" />
                                        Available
                                    </div>
                                    <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded">
                                        <Video className="h-3 w-3" />
                                        Video Call
                                    </div>
                                </div>

                                <div className="pt-2 mt-auto">
                                    {requested.has(mentor.id) ? (
                                        <Button disabled className="w-full bg-emerald-500/20 text-emerald-400">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            Requested
                                        </Button>
                                    ) : (
                                        <Button
                                            onClick={() => handleRequest(mentor.id)}
                                            disabled={requesting === mentor.id}
                                            className="w-full bg-teal-600 hover:bg-teal-500 text-white"
                                        >
                                            {requesting === mentor.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Request Mentorship <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="my-mentors" className="space-y-6">
                    {(!myMentors || myMentors.length === 0) ? (
                        <div className="text-center py-12 border border-white/10 rounded-xl bg-white/5 text-slate-400">
                            <p>You don't have any active mentors yet.</p>
                            <p className="text-sm mt-1">Go to the 'Find a Mentor' tab to request mentorship.</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {myMentors.map((mentorship, i) => (
                                <motion.div
                                    key={mentorship.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex flex-col gap-4 p-6 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4 items-center">
                                            <Avatar className="h-14 w-14 border border-white/10">
                                                <AvatarImage src={mentorship.mentor.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${mentorship.mentor.email}`} />
                                                <AvatarFallback className="bg-slate-700 text-white">
                                                    {mentorship.mentor.name?.[0] || "M"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                                                    {mentorship.mentor.name}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    {mentorship.status === "ACTIVE" ? (
                                                        <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Active</span>
                                                    ) : mentorship.status === "PENDING" ? (
                                                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/20">Pending</span>
                                                    ) : mentorship.status === "COMPLETED" ? (
                                                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Completed</span>
                                                    ) : (
                                                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/20">Declined</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 mt-auto flex gap-2">
                                        <Button
                                            disabled={mentorship.status !== "ACTIVE"}
                                            className="w-full text-xs bg-purple-600 hover:bg-purple-500 text-white"
                                            onClick={() => window.location.href = `mailto:${mentorship.mentor.email}?subject=Mentorship%20Question`}
                                        >
                                            Message
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
