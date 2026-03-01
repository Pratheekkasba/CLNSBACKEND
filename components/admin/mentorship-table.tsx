"use client";

import { Mentorship, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MentorshipWithRelations = Mentorship & {
    mentor: User;
    student: User;
    _count: {
        mentorshipSessions: number;
    };
};

export function MentorshipTable({ mentorships }: { mentorships: MentorshipWithRelations[] }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Mentorship Programs</h3>
                <p className="text-sm text-slate-400">Active mentorship pairs and session activity.</p>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-slate-400 uppercase text-xs font-medium">
                    <tr>
                        <th className="px-6 py-4">Mentor</th>
                        <th className="px-6 py-4">Student</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-center">Sessions</th>
                        <th className="px-6 py-4">Start Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {mentorships.map((m) => (
                        <tr key={m.id} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${m.mentor.email}`} />
                                        <AvatarFallback className="bg-slate-800 text-xs text-slate-400">M</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-white text-sm">{m.mentor.name || "Unknown"}</div>
                                        <div className="text-xs text-slate-500">{m.mentor.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${m.student.email}`} />
                                        <AvatarFallback className="bg-slate-800 text-xs text-slate-400">S</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-white text-sm">{m.student.name || "Unknown"}</div>
                                        <div className="text-xs text-slate-500">{m.student.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${m.status === "ACTIVE"
                                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                        : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                    }`}>
                                    {m.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="text-slate-300 font-mono">{m._count.mentorshipSessions}</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-xs">
                                {new Date(m.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    {mentorships.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                                No active mentorships found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
