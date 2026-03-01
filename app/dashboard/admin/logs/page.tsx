"use client";

import { motion } from "framer-motion";
import { Activity, AlertCircle, Info, CheckCircle, Terminal } from "lucide-react";

const logs = [
    { id: 1, event: "User Login Success", user: "rahul@law.com", ip: "192.168.1.1", time: "Just now", type: "info" },
    { id: 2, event: "New Registration", user: "new.client@gmail.com", ip: "10.0.0.42", time: "5 mins ago", type: "success" },
    { id: 3, event: "Payment Failed", user: "vikram@chamber.com", ip: "172.16.0.1", time: "1 hour ago", type: "error" },
    { id: 4, event: "System Backup Completed", user: "System", ip: "localhost", time: "3 hours ago", type: "system" },
    { id: 5, event: "Verification Rejected", user: "Admin", ip: "192.168.1.10", time: "5 hours ago", type: "warning" },
];

export default function SystemLogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">System Logs</h2>
                    <p className="text-slate-400">Real-time audit trail of platform activities.</p>
                </div>
                <div className="flex gap-2 font-mono text-xs text-slate-500">
                    <span className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Live</span>
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#020817] p-4 font-mono text-sm overflow-hidden shadow-inner">
                <div className="space-y-1">
                    {logs.map((log, i) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group flex items-start gap-4 p-2 hover:bg-white/5 rounded transition-colors"
                        >
                            <div className="shrink-0 mt-0.5">
                                {log.type === "info" && <Info className="h-4 w-4 text-blue-400" />}
                                {log.type === "success" && <CheckCircle className="h-4 w-4 text-emerald-400" />}
                                {log.type === "error" && <AlertCircle className="h-4 w-4 text-red-400" />}
                                {log.type === "warning" && <AlertCircle className="h-4 w-4 text-amber-400" />}
                                {log.type === "system" && <Terminal className="h-4 w-4 text-purple-400" />}
                            </div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-2">
                                <div className="md:col-span-2 text-slate-500 text-xs pt-0.5">{log.time}</div>
                                <div className={`md:col-span-4 font-semibold ${log.type === "error" ? "text-red-300" : "text-slate-300"
                                    }`}>{log.event}</div>
                                <div className="md:col-span-4 text-slate-400 text-xs pt-0.5">User: {log.user}</div>
                                <div className="md:col-span-2 text-slate-600 text-xs text-right pt-0.5">{log.ip}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
