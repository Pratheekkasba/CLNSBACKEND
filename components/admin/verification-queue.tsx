"use client";

import { useState } from "react";
import { approveVerification, rejectVerification } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X } from "lucide-react";

interface VerificationRequest {
    id: string;
    user: {
        name: string | null;
        email: string;
    };
    status: string;
    createdAt: Date;
}

export function VerificationQueue({ requests }: { requests: VerificationRequest[] }) {
    const [loading, setLoading] = useState<string | null>(null);

    const handleApprove = async (id: string) => {
        setLoading(id);
        await approveVerification(id);
        setLoading(null);
    };

    const handleReject = async (id: string) => {
        setLoading(id);
        await rejectVerification(id);
        setLoading(null);
    };

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-white">Verification Queue</h3>
            <div className="space-y-4">
                {requests.length === 0 ? (
                    <div className="py-8 text-center text-slate-500">
                        No pending verifications.
                    </div>
                ) : (
                    requests.map((req) => (
                        <div key={req.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                            <div>
                                <p className="font-medium text-white">{req.user.name || "Unknown"}</p>
                                <p className="text-xs text-slate-400">{req.user.email}</p>
                                <p className="mt-1 text-xs text-slate-500">Requested {new Date(req.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    variant="default"
                                    className="bg-emerald-600 hover:bg-emerald-500"
                                    onClick={() => handleApprove(req.id)}
                                    disabled={!!loading}
                                >
                                    {loading === req.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(req.id)}
                                    disabled={!!loading}
                                >
                                    {loading === req.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
