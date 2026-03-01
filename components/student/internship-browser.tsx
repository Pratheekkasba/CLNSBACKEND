"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Filter, Building2, CheckCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InternshipPosting } from "@prisma/client";
import { applyForInternship } from "@/app/actions/student";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface InternshipBrowserProps {
    internships: (InternshipPosting & { _count: { applications: number } })[];
    appliedIds: string[];
}

export function InternshipBrowser({ internships, appliedIds }: InternshipBrowserProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [applying, setApplying] = useState<string | null>(null);
    const [localApplied, setLocalApplied] = useState<Set<string>>(new Set(appliedIds));

    // Dialog State
    const [selectedJob, setSelectedJob] = useState<InternshipPosting | null>(null);
    const [coverNote, setCoverNote] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filterTypes = ["All", "In-Office", "Remote", "Hybrid"];

    const filteredInternships = internships.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType && selectedType !== "All" ? job.type === selectedType : true;
        return matchesSearch && matchesType;
    });

    const openApplyDialog = (job: InternshipPosting) => {
        setSelectedJob(job);
        setCoverNote("");
        setIsDialogOpen(true);
    };

    const handleApply = async () => {
        if (!selectedJob) return;

        setApplying(selectedJob.id);
        try {
            const result = await applyForInternship(selectedJob.id, coverNote);
            if (result.success) {
                toast.success("Application submitted successfully!");
                setLocalApplied(prev => new Set(prev).add(selectedJob.id));
                setIsDialogOpen(false);
            } else {
                toast.error(result.error || "Failed to apply");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setApplying(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header & Search */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Find Internships</h2>
                    <p className="text-slate-400">Discover opportunities with top firms and advocates.</p>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search by role, firm, or skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-teal-500"
                        />
                    </div>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                            <Filter className="h-4 w-4 text-slate-500" />
                            <span className="text-sm font-medium text-slate-400">Filters:</span>
                        </div>
                        {filterTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type === "All" ? null : type)}
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${(selectedType === type || (type === "All" && !selectedType))
                                    ? "border-teal-500 bg-teal-500/10 text-teal-400"
                                    : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Internship Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredInternships.length === 0 && (
                    <div className="col-span-full text-center py-10 text-slate-500">
                        No internships found matching your criteria.
                    </div>
                )}

                {filteredInternships.map((job, i) => {
                    const isApplied = localApplied.has(job.id);
                    return (
                        <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-teal-500/30 hover:bg-white/10"
                        >
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex gap-3">
                                        <div className="h-10 w-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center text-white font-bold text-lg">
                                            {job.company[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white group-hover:text-teal-400 transition-colors line-clamp-1">{job.title}</h3>
                                            <p className="text-sm text-slate-400 line-clamp-1">{job.company}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-2 mb-6">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <Briefcase className="h-3.5 w-3.5" />
                                        {job.type}
                                    </div>
                                    <p className="text-xs text-slate-500 line-clamp-2">{job.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                                <span className="text-[10px] text-slate-500">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                                {isApplied ? (
                                    <Button disabled size="sm" className="h-8 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                                        <CheckCircle className="mr-2 h-3 w-3" />
                                        Applied
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => openApplyDialog(job)}
                                        size="sm"
                                        className="h-8 bg-teal-600/10 text-teal-400 hover:bg-teal-600 hover:text-white border border-teal-600/20"
                                    >
                                        Apply Now
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Application Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px] bg-[#020817] border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Share a brief note with {selectedJob?.company} about why you're a good fit.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="coverNote" className="text-slate-300">Cover Note (Optional)</Label>
                            <Textarea
                                id="coverNote"
                                placeholder="I have experience in..."
                                className="bg-white/5 border-white/10 text-white h-32"
                                value={coverNote}
                                onChange={(e) => setCoverNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-white/10 text-slate-300 hover:text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleApply}
                            disabled={applying === selectedJob?.id}
                            className="bg-teal-600 hover:bg-teal-500 text-white"
                        >
                            {applying === selectedJob?.id && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                            Submit Application
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
