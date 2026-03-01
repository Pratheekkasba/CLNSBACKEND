"use client";

import { InternshipApplication, InternshipPosting } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Building, Calendar, Clock } from "lucide-react";

interface ApplicationListProps {
    applications: (InternshipApplication & { posting: InternshipPosting })[];
}

export function ApplicationList({ applications }: ApplicationListProps) {
    if (applications.length === 0) {
        return (
            <div className="text-center py-8 bg-white/5 rounded-lg border border-white/10">
                <p className="text-slate-400">You haven't applied to any internships yet.</p>
            </div>
        );
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "ACCEPTED": return "text-emerald-400 border-emerald-400/20 bg-emerald-400/10";
            case "REJECTED": return "text-red-400 border-red-400/20 bg-red-400/10";
            default: return "text-amber-400 border-amber-400/20 bg-amber-400/10";
        }
    };

    return (
        <div className="space-y-4">
            {applications.map((app) => (
                <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10 gap-4 transition-colors hover:bg-white/10">
                    <div className="space-y-1">
                        <h4 className="font-medium text-white">{app.posting.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {app.posting.company}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Applied {formatDistanceToNow(new Date(app.createdAt), { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className={getStatusColor(app.status)}>
                            {app.status}
                        </Badge>
                    </div>
                </div>
            ))}
        </div>
    );
}
