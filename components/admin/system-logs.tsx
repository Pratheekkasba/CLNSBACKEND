"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

interface SystemLog {
    id: string;
    action: string;
    description: string;
    createdAt: Date;
}

export function SystemLogs({ logs }: { logs: SystemLog[] }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="mb-4 text-lg font-semibold text-white">System Logs</h3>
            <ScrollArea className="h-[300px] w-full pr-4">
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div key={log.id} className="flex flex-col gap-1 border-b border-white/5 pb-2 text-sm last:border-0 last:pb-0">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-purple-400">{log.action}</span>
                                <span className="text-xs text-slate-500">{formatDistanceToNow(log.createdAt, { addSuffix: true })}</span>
                            </div>
                            <p className="text-slate-300">{log.description}</p>
                        </div>
                    ))}
                    {logs.length === 0 && (
                        <div className="py-8 text-center text-slate-500">
                            No logs recorded yet.
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
}
