"use client";

import { motion } from "framer-motion";
import { ShieldAlert, CheckCircle, MoreVertical, Eye, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface ClientCaseListProps {
    initialCases: any[]; // Replacing with precise type later if needed
}

export function ClientCaseList({ initialCases }: ClientCaseListProps) {
    const router = useRouter();

    const handleViewDetails = (id: string) => {
        // Navigate to dynamic route
        router.push(`/dashboard/client/cases/${id}`);
    };

    const handleContactLawyer = (email: string | null) => {
        if (!email) {
            toast.error("No email available for this advocate");
            return;
        }
        window.location.href = `mailto:${email}`;
        toast.success(`Opened mail client for ${email}`);
    };

    if (initialCases.length === 0) {
        return (
            <div className="p-12 text-center border border-white/10 rounded-xl bg-white/5 text-slate-400">
                No active cases found via database integration.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {initialCases.map((c, i) => (
                <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                >
                    <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                                    <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                                        {c.id.slice(0, 8).toUpperCase()}
                                    </span>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-[#0f172a] border-white/10 text-white">
                                        <DropdownMenuItem onClick={() => handleViewDetails(c.id)} className="hover:bg-white/10 cursor-pointer">
                                            <Eye className="mr-2 h-4 w-4 text-slate-400" />
                                            View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleContactLawyer(c.lawyerEmail)} className="hover:bg-white/10 cursor-pointer">
                                            <MessageSquare className="mr-2 h-4 w-4 text-blue-400" />
                                            Contact Lawyer
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className="text-sm text-slate-400 flex items-center gap-2">
                                <ShieldAlert className="h-4 w-4" />
                                Status: <span className={c.status === "OPEN" ? "text-emerald-400" : "text-slate-300"}>{c.status}</span>
                            </p>
                        </div>
                        <div className="text-left md:text-right hidden md:block">
                            <div className="text-sm text-slate-400">Assigned Advocate</div>
                            <div className="font-medium text-emerald-400">{c.lawyer}</div>
                            {c.nextHearing && (
                                <div className="mt-1 text-xs text-amber-400 bg-amber-500/10 px-2 py-1 rounded inline-block">
                                    Next Hearing: {format(new Date(c.nextHearing), "PPP")}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
