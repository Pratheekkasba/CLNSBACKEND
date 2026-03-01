"use client";

import { motion } from "framer-motion";
import { Check, X, FileText, ExternalLink, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const verificationRequests = [
    {
        id: 1,
        name: "Adv. Suresh Raina",
        email: "suresh@chamber.com",
        docType: "Bar Council ID",
        submitted: "2 hours ago",
        status: "Pending",
    },
    {
        id: 2,
        name: "Ms. Anita Roy",
        email: "anita.legal@gmail.com",
        docType: "LL.B Degree Certificate",
        submitted: "5 hours ago",
        status: "Pending",
    },
    {
        id: 3,
        name: "Karan Johar",
        email: "karan@lawfirm.com",
        docType: "Identity Proof (Aadhar)",
        submitted: "1 day ago",
        status: "Pending",
    },
];

export default function VerificationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Verification Requests</h2>
                    <p className="text-slate-400">Review and approve advocate credentials.</p>
                </div>
                <div className="flex gap-3">
                    <span className="text-sm font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full flex items-center">
                        <ShieldAlert className="mr-2 h-4 w-4" /> 3 Pending
                    </span>
                </div>
            </div>

            <div className="grid gap-4">
                {verificationRequests.map((req, i) => (
                    <motion.div
                        key={req.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col md:flex-row items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-6 hover:border-purple-500/30 transition-all"
                    >
                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2">
                                <h3 className="text-lg font-semibold text-white">{req.name}</h3>
                                <span className="hidden md:inline text-slate-600">•</span>
                                <span className="text-sm text-slate-400">{req.email}</span>
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-4">
                                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                                    <FileText className="h-4 w-4 text-purple-400" />
                                    <span className="text-sm text-slate-300">{req.docType}</span>
                                </div>
                                <Button variant="link" className="text-purple-400 h-auto p-0 text-xs">
                                    View Document <ExternalLink className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                            <p className="text-xs text-slate-500">Submitted {req.submitted}</p>
                        </div>

                        <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 w-full md:w-auto justify-center">
                            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2 h-9 w-28">
                                <Check className="h-4 w-4" /> Approve
                            </Button>
                            <Button variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40 gap-2 h-9 w-28">
                                <X className="h-4 w-4" /> Reject
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
