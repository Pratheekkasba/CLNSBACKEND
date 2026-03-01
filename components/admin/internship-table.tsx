"use client";

import { InternshipPosting } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

type PostingWithCount = InternshipPosting & {
    _count: {
        applications: number;
    };
};

export function InternshipTable({ postings }: { postings: PostingWithCount[] }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Internship Postings</h3>
                <p className="text-sm text-slate-400">Current openings and application stats.</p>
            </div>
            <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-slate-400 uppercase text-xs font-medium">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Company</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Type</th>
                        <th className="px-6 py-4 text-center">Applications</th>
                        <th className="px-6 py-4">Posted Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {postings.map((p) => (
                        <tr key={p.id} className="group hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">{p.title}</td>
                            <td className="px-6 py-4 text-slate-300">{p.company}</td>
                            <td className="px-6 py-4 text-slate-400">{p.location}</td>
                            <td className="px-6 py-4">
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20">
                                    {p.type}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">
                                    {p._count.applications}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-500 text-xs">
                                {new Date(p.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    {postings.length === 0 && (
                        <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">
                                No internship postings found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
