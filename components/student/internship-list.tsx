"use client";

import { useState } from "react";
import { InternshipPosting } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { applyForInternship } from "@/app/actions/student";
import { toast } from "sonner";
import { Loader2, MapPin, Building, Briefcase, CheckCircle } from "lucide-react";

interface InternshipListProps {
    internships: (InternshipPosting & { _count: { applications: number } })[];
    appliedIds: string[]; // IDs of postings the student has already applied to
}

export function InternshipList({ internships, appliedIds }: InternshipListProps) {
    const [applying, setApplying] = useState<string | null>(null);
    const [localApplied, setLocalApplied] = useState<Set<string>>(new Set(appliedIds));

    const handleApply = async (id: string) => {
        setApplying(id);
        try {
            const result = await applyForInternship(id);
            if (result.success) {
                toast.success("Application submitted successfully!");
                setLocalApplied(prev => new Set(prev).add(id));
            } else {
                toast.error(result.error || "Failed to apply");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setApplying(null);
        }
    };

    if (internships.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-slate-400 mb-4">No internship postings available at the moment.</p>
                <p className="text-sm text-slate-500">Check back later for new opportunities.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {internships.map((posting) => {
                const isApplied = localApplied.has(posting.id);

                return (
                    <Card key={posting.id} className="bg-white/5 border-white/10 text-white flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-semibold text-white mb-1">{posting.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 text-slate-400">
                                        <Building className="h-3 w-3" />
                                        {posting.company}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                    {posting.type}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                                <MapPin className="h-3 w-3" />
                                {posting.location}
                            </div>
                            <p className="text-sm text-slate-300 line-clamp-3">
                                {posting.description}
                            </p>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-white/10 flex justify-between items-center">
                            <div className="text-xs text-slate-500">
                                {posting._count.applications} Applicants
                            </div>
                            {isApplied ? (
                                <Button disabled variant="secondary" className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Applied
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => handleApply(posting.id)}
                                    disabled={applying === posting.id}
                                    className="bg-purple-600 hover:bg-purple-500 text-white"
                                >
                                    {applying === posting.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Apply Now
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
