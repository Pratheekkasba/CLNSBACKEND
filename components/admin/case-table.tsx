"use client";

import { Badge } from "@/components/ui/badge";
import { Case, User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Extend Case type to include relations
type CaseWithRelations = Case & {
    client: User;
    advocate: User | null;
};

export function CaseTable({ cases }: { cases: CaseWithRelations[] }) {

    const getStatusColor = (status: string) => {
        switch (status) {
            case "OPEN": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "CLOSED": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
            case "PENDING": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Case Management</h3>
                <p className="text-sm text-slate-400">Overview of all legal cases on the platform.</p>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-slate-400 uppercase text-xs font-medium">
                    <tr>
                        <th className="px-6 py-4">Case Title</th>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Advocate</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Created</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {cases.map((c) => (
                        <tr key={c.id} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{c.title}</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 border border-white/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.client.email}`} />
                                        <AvatarFallback className="bg-slate-800 text-[10px] text-slate-400">CL</AvatarFallback>
                                    </Avatar>
                                    <span className="text-slate-300">{c.client.name || c.client.email}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {c.advocate ? (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 border border-white/10">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${c.advocate.email}`} />
                                            <AvatarFallback className="bg-slate-800 text-[10px] text-slate-400">AD</AvatarFallback>
                                        </Avatar>
                                        <span className="text-slate-300">{c.advocate.name || c.advocate.email}</span>
                                    </div>
                                ) : (
                                    <span className="text-slate-500 italic">Unassigned</span>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(c.status)}`}>
                                    {c.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-xs">
                                {new Date(c.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    {cases.length === 0 && (
                        <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500">
                                No cases found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
