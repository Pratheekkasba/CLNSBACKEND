"use client";

import { useEffect, useState } from "react";
import { fetchCaseDetails } from "@/app/actions/advocate";
import { format } from "date-fns";
import { Calendar, FileText, Mail, User, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CaseDetailsDialogProps {
    caseId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CaseDetailsDialog({ caseId, open, onOpenChange }: CaseDetailsDialogProps) {
    const [caseData, setCaseData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && caseId) {
            setLoading(true);
            fetchCaseDetails(caseId).then((data) => {
                setCaseData(data);
                setLoading(false);
            });
        }
    }, [open, caseId]);

    if (!caseData && !loading) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-[#0f172a] border border-slate-800 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-white flex items-center justify-between">
                        <span>Case Details</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-slate-400 hover:text-white"
                            onClick={() => onOpenChange(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        View comprehensive information about this case
                    </DialogDescription>
                </DialogHeader>

                {loading ? (
                    <div className="py-8 text-center text-slate-400">Loading case details...</div>
                ) : caseData ? (
                    <div className="space-y-6 mt-4">
                        {/* Case Title & Status */}
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">{caseData.title}</h3>
                            <div className="flex items-center gap-2">
                                <Badge
                                    className={
                                        caseData.status === "OPEN"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : caseData.status === "CLOSED"
                                            ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                    }
                                >
                                    {caseData.status}
                                </Badge>
                                <span className="text-xs text-slate-400">
                                    Case ID: {caseData.id.substring(0, 8).toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Case Type */}
                        <div>
                            <label className="text-xs text-slate-400 uppercase tracking-wider">Type</label>
                            <p className="text-white mt-1">{caseData.type || "General"}</p>
                        </div>

                        {/* Description */}
                        {caseData.description && (
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <FileText className="h-3 w-3" />
                                    Description
                                </label>
                                <p className="text-slate-300 mt-1 whitespace-pre-wrap">{caseData.description}</p>
                            </div>
                        )}

                        {/* Client Information */}
                        <div className="border-t border-white/10 pt-4">
                            <label className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                                <User className="h-3 w-3" />
                                Client Information
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                                    {caseData.client?.name?.[0] || "C"}
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-medium">{caseData.client?.name || "Unknown Client"}</p>
                                    {caseData.client?.email && (
                                        <a
                                            href={`mailto:${caseData.client.email}`}
                                            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1"
                                        >
                                            <Mail className="h-3 w-3" />
                                            {caseData.client.email}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Hearings */}
                        <div className="border-t border-white/10 pt-4">
                            <label className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                                <Calendar className="h-3 w-3" />
                                Hearings ({caseData.hearings?.length || 0})
                            </label>
                            {caseData.hearings && caseData.hearings.length > 0 ? (
                                <div className="space-y-2">
                                    {caseData.hearings.map((hearing: any) => (
                                        <div
                                            key={hearing.id}
                                            className="p-3 rounded-lg bg-white/5 border border-white/10"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-white font-medium">{hearing.title}</p>
                                                    {hearing.court && (
                                                        <p className="text-xs text-slate-400 mt-1">Court: {hearing.court}</p>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-slate-300">
                                                        {format(new Date(hearing.date), "MMM d, yyyy")}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {format(new Date(hearing.date), "h:mm a")}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">No hearings scheduled</p>
                            )}
                        </div>

                        {/* Dates */}
                        <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-wider">Created</label>
                                <p className="text-slate-300 mt-1">
                                    {format(new Date(caseData.createdAt), "MMM d, yyyy")}
                                </p>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase tracking-wider">Last Updated</label>
                                <p className="text-slate-300 mt-1">
                                    {format(new Date(caseData.updatedAt), "MMM d, yyyy")}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center text-slate-400">Case not found</div>
                )}
            </DialogContent>
        </Dialog>
    );
}
