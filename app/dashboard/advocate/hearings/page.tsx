"use client";

import { useState, useEffect } from "react";
import { fetchAdvocateHearings, fetchAdvocateCases, deleteHearing } from "@/app/actions/advocate";
import { format } from "date-fns";
import { Calendar, MapPin, User, Clock, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { CreateHearingDialog } from "@/components/advocate/create-hearing-dialog";
import { EditHearingDialog } from "@/components/advocate/edit-hearing-dialog";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AdvocateHearingsPage() {
    const [hearings, setHearings] = useState<any[]>([]);
    const [cases, setCases] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedHearingId, setSelectedHearingId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function loadData() {
            try {
                const [hearingsData, casesData] = await Promise.all([
                    fetchAdvocateHearings(),
                    fetchAdvocateCases()
                ]);
                setHearings(hearingsData);
                setCases(casesData);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const handleEdit = (hearingId: string) => {
        setSelectedHearingId(hearingId);
        setEditDialogOpen(true);
    };

    const handleDelete = async (hearingId: string) => {
        if (!confirm("Are you sure you want to delete this hearing?")) {
            return;
        }

        try {
            const result = await deleteHearing(hearingId);
            if (result.success) {
                toast.success("Hearing deleted successfully");
                router.refresh();
                // Reload data
                const [hearingsData] = await Promise.all([
                    fetchAdvocateHearings()
                ]);
                setHearings(hearingsData);
            } else {
                toast.error(result.error || "Failed to delete hearing");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-center py-12">
                    <div className="text-slate-400">Loading hearings...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Upcoming Hearings</h2>
                    <p className="text-slate-400">Schedule of court appearances for your active cases.</p>
                </div>
                <CreateHearingDialog cases={cases} />
            </div>

            {hearings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5 text-slate-400">
                    <Calendar className="h-10 w-10 mb-3 opacity-50" />
                    <p>No upcoming hearings scheduled.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {hearings.map((hearing) => (
                        <div key={hearing.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-black/20 border border-white/10">
                                <span className="text-xs text-slate-500 uppercase">{format(hearing.date, "MMM")}</span>
                                <span className="text-xl font-bold text-white">{format(hearing.date, "dd")}</span>
                            </div>

                            <div className="flex-1 space-y-1">
                                <h3 className="font-semibold text-white">{hearing.title}</h3>
                                <p className="text-sm text-slate-400">Case: {hearing.case.title}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex flex-col gap-2 text-sm text-slate-400 md:items-end">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-emerald-500" />
                                        {format(hearing.date, "h:mm a")}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-blue-500" />
                                        {hearing.court || "TBD"}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-purple-500" />
                                        {hearing.case.client.name}
                                    </div>
                                </div>

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
                                            onClick={() => handleEdit(hearing.id)}
                                        >
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit Hearing
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-white/10" />
                                        <DropdownMenuItem 
                                            className="hover:bg-white/10 hover:text-red-400 cursor-pointer text-red-400"
                                            onClick={() => handleDelete(hearing.id)}
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete Hearing
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit Hearing Dialog */}
            {selectedHearingId && (
                <EditHearingDialog
                    hearingId={selectedHearingId}
                    open={editDialogOpen}
                    onOpenChange={(open) => {
                        setEditDialogOpen(open);
                        if (!open) setSelectedHearingId(null);
                    }}
                />
            )}
        </div>
    );
}
