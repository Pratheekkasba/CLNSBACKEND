"use client";

import { useState } from "react";
import { updateCaseStatus } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface UpdateCaseStatusDialogProps {
    caseId: string;
    currentStatus: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function UpdateCaseStatusDialog({
    caseId,
    currentStatus,
    open,
    onOpenChange,
}: UpdateCaseStatusDialogProps) {
    const [status, setStatus] = useState<string>(currentStatus);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!status || status === currentStatus) {
            onOpenChange(false);
            return;
        }

        setLoading(true);
        try {
            const result = await updateCaseStatus(caseId, status as "OPEN" | "CLOSED" | "PENDING");
            if (result.success) {
                toast.success("Case status updated successfully");
                onOpenChange(false);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update status");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] bg-[#0f172a] border border-slate-800 text-white shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">Update Case Status</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Change the status of this case
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div>
                        <label className="text-sm text-slate-300 mb-2 block">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#0f172a] border-slate-800 text-white">
                                <SelectItem value="OPEN">Open</SelectItem>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="CLOSED">Closed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={loading}
                        className="border-slate-800 text-slate-300 hover:bg-slate-900"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || status === currentStatus}
                        className="bg-blue-600 hover:bg-blue-500 text-white"
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Update Status
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
