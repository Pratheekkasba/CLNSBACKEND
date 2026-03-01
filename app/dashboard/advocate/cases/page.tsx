"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchAdvocateCases, fetchClientsForSelect } from "@/app/actions/advocate";
import { format } from "date-fns";
import { Scale, MoreHorizontal, Search, Calendar, Eye, Edit, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateCaseDialog } from "@/components/advocate/create-case-dialog";
import { CaseDetailsDialog } from "@/components/advocate/case-details-dialog";
import { UpdateCaseStatusDialog } from "@/components/advocate/update-case-status-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export default function AdvocateCasesPage() {
    const [cases, setCases] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [statusDialogOpen, setStatusDialogOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState<any>(null);

    // Fetch data on mount
    useEffect(() => {
        async function loadData() {
            try {
                const [casesData, clientsData] = await Promise.all([
                    fetchAdvocateCases(),
                    fetchClientsForSelect()
                ]);
                setCases(casesData);
                setClients(clientsData);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    // Filter cases based on search term
    const filteredCases = useMemo(() => {
        if (!searchTerm.trim()) return cases;
        const term = searchTerm.toLowerCase();
        return cases.filter((c) =>
            c.title.toLowerCase().includes(term) ||
            c.client?.name?.toLowerCase().includes(term) ||
            c.type?.toLowerCase().includes(term) ||
            c.id.toLowerCase().includes(term)
        );
    }, [cases, searchTerm]);

    const handleViewDetails = (caseId: string) => {
        setSelectedCaseId(caseId);
        setDetailsOpen(true);
    };

    const handleUpdateStatus = (caseItem: any) => {
        setSelectedCase(caseItem);
        setStatusDialogOpen(true);
    };

    const handleContactClient = (clientEmail: string | null) => {
        if (!clientEmail) {
            toast.error("No email available for this client");
            return;
        }
        window.location.href = `mailto:${clientEmail}`;
        toast.success(`Opened mail client for ${clientEmail}`);
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <div className="text-slate-400">Loading cases...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Case Management</h2>
                    <p className="text-slate-400">Track active cases assigned to you.</p>
                </div>
                <CreateCaseDialog clients={clients} />
            </div>

            {/* Search Filter */}
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-slate-500 h-9"
                    />
                </div>
            </div>

            {filteredCases.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5 text-slate-400">
                    <Scale className="h-10 w-10 mb-3 opacity-50" />
                    <p>You have no active cases assigned.</p>
                    <p className="text-sm mt-1">Cases assigned to you by administrators will appear here.</p>
                </div>
            ) : (
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Case Details</th>
                                    <th className="px-6 py-4 font-medium">Client</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Next Hearing</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredCases.map((c) => (
                                    <tr key={c.id} className="group hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-white">{c.title}</span>
                                                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-slate-300 border border-white/10">
                                                        {c.id.substring(0, 8).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                                    <span className="opacity-70">
                                                        Created: {format(c.createdAt, "MMM d, yyyy")}
                                                    </span>
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                                                    {c.client.name ? c.client.name[0] : "C"}
                                                </div>
                                                <span className="text-white">{c.client.name || "Unknown Client"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${c.status === "OPEN" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                c.status === "CLOSED" ? "bg-slate-500/10 text-slate-400 border-slate-500/20" :
                                                    "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                                }`}>
                                                {c.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {c.hearings && c.hearings.length > 0 ? (
                                                <div className="flex items-center gap-2 text-slate-300">
                                                    <Calendar className="h-3.5 w-3.5 text-blue-400" />
                                                    {format(c.hearings[0].date, "MMM d")}
                                                </div>
                                            ) : (
                                                <span className="text-slate-500 italic">No hearings</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 bg-[#0f172a] border-white/10 text-slate-300">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem 
                                                        className="hover:bg-white/10 hover:text-white cursor-pointer"
                                                        onClick={() => handleViewDetails(c.id)}
                                                    >
                                                        <Eye className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        className="hover:bg-white/10 hover:text-white cursor-pointer"
                                                        onClick={() => handleUpdateStatus(c)}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Update Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem 
                                                        className="hover:bg-white/10 hover:text-white cursor-pointer"
                                                        onClick={() => handleContactClient(c.client?.email)}
                                                    >
                                                        <Mail className="mr-2 h-4 w-4" />
                                                        Contact Client
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Case Details Dialog */}
            {selectedCaseId && (
                <CaseDetailsDialog
                    caseId={selectedCaseId}
                    open={detailsOpen}
                    onOpenChange={setDetailsOpen}
                />
            )}

            {/* Update Status Dialog */}
            {selectedCase && (
                <UpdateCaseStatusDialog
                    caseId={selectedCase.id}
                    currentStatus={selectedCase.status}
                    open={statusDialogOpen}
                    onOpenChange={(open) => {
                        setStatusDialogOpen(open);
                        if (!open) setSelectedCase(null);
                    }}
                />
            )}
        </div>
    );
}
