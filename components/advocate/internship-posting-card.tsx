"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { InternshipPosting } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { toggleInternshipStatus } from "@/app/actions/advocate";
import { Edit, Eye, EyeOff, Loader2 } from "lucide-react";

interface InternshipPostingCardProps {
    posting: InternshipPosting & { _count: { applications: number } };
}

export default function InternshipPostingCard({ posting }: InternshipPostingCardProps) {
    const [status, setStatus] = useState<string>(posting.status || "OPEN");
    const [toggling, setToggling] = useState(false);

    const handleToggleStatus = async () => {
        setToggling(true);
        const newStatus = status === "OPEN" ? "CLOSED" : "OPEN";

        try {
            const result = await toggleInternshipStatus(posting.id, newStatus as any);
            if (result.success) {
                setStatus(newStatus);
                toast.success(`Internship ${newStatus === "OPEN" ? "opened" : "closed"} successfully`);
            } else {
                toast.error(result.error);
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setToggling(false);
        }
    };

    return (
        <Card className={`bg-white/5 border-white/10 overflow-hidden flex flex-col ${status === "CLOSED" ? "opacity-75" : ""}`}>
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-white truncate text-lg">{posting.title}</CardTitle>
                    {status === "CLOSED" && (
                        <Badge variant="secondary" className="bg-red-500/10 text-red-400 border-red-500/20 shrink-0">Closed</Badge>
                    )}
                </div>
                <CardDescription className="text-slate-400 truncate">{posting.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Location</span>
                    <span className="text-slate-300 truncate max-w-[120px]">{posting.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Type</span>
                    <Badge variant="outline" className="border-white/10 text-slate-300">{posting.type}</Badge>
                </div>
                {/* <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Created</span>
                    <span className="text-slate-400">{format(new Date(posting.createdAt), "MMM d")}</span>
                </div> */}

                <div className="pt-2 border-t border-white/5 mt-auto">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500">Applicants</span>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                            {posting._count.applications} Pending
                        </Badge>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="bg-white/5 border-t border-white/10 py-3 px-4 flex justify-between items-center gap-2">
                <Button variant="outline" size="sm" asChild className="h-8 border-white/10 hover:bg-white/10 text-slate-300">
                    <Link href={`/dashboard/advocate/internships/${posting.id}/edit`}>
                        <Edit className="h-3.5 w-3.5 mr-2" />
                        Edit
                    </Link>
                </Button>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">
                        {status === "OPEN" ? "Active" : "Closed"}
                    </span>
                    <Switch
                        checked={status === "OPEN"}
                        onCheckedChange={handleToggleStatus}
                        disabled={toggling}
                        className="scale-75"
                    />
                </div>
            </CardFooter>
        </Card>
    );
}
