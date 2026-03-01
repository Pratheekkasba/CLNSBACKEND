"use client";

import { motion } from "framer-motion";
import { Folder, FileText, Upload, Lock, MoreVertical, Search, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const files = [
    { id: 1, name: "Court_Order_Oct24.pdf", size: "2.4 MB", type: "PDF", date: "24 Oct 2024", category: "Court Orders" },
    { id: 2, name: "Property_Deed_Scan.jpg", size: "4.1 MB", type: "Image", date: "15 Oct 2024", category: "Evidence" },
    { id: 3, name: "Aadhar_Card_Verified.pdf", size: "1.2 MB", type: "PDF", date: "10 Sep 2024", category: "Personal ID" },
    { id: 4, name: "Legal_Notice_Draft_v2.docx", size: "800 KB", type: "DOCX", date: "12 Oct 2024", category: "Drafts" },
];

const categories = ["All Files", "Court Orders", "Evidence", "Personal ID", "Drafts"];

export default function DocumentVaultPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Lock className="h-6 w-6 text-emerald-400" />
                        Document Vault
                    </h2>
                    <p className="text-slate-400">Securely store and manage your legal documents.</p>
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload New
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Categories */}
                <div className="w-full md:w-64 space-y-2">
                    {categories.map((cat, i) => (
                        <button
                            key={cat}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-3 ${i === 0
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <Folder className="h-4 w-4" />
                            {cat}
                        </button>
                    ))}

                    <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <HardDrive className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase">Storage</span>
                        </div>
                        <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden mb-2">
                            <div className="h-full w-[45%] bg-emerald-500" />
                        </div>
                        <p className="text-xs text-slate-500">2.4 GB of 5 GB used</p>
                    </div>
                </div>

                {/* File Cloud */}
                <div className="flex-1 rounded-xl border border-white/10 bg-white/5 min-h-[500px] flex flex-col">
                    <div className="p-4 border-b border-white/10 flex items-center justify-between gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Search files..."
                                className="pl-9 bg-black/20 border-white/10 text-white placeholder:text-slate-500 h-9"
                            />
                        </div>
                        <div className="flex gap-2">
                            {/* List/Grid Toggle placeholders */}
                        </div>
                    </div>

                    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {files.map((file, i) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group relative p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-900/30 flex items-center justify-center text-emerald-400">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <button className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <MoreVertical className="h-4 w-4" />
                                    </button>
                                </div>
                                <h4 className="text-sm font-medium text-white truncate mb-1" title={file.name}>{file.name}</h4>
                                <div className="flex justify-between text-xs text-slate-500">
                                    <span>{file.size}</span>
                                    <span>{file.date}</span>
                                </div>
                            </motion.div>
                        ))}

                        {/* Add File Placeholder */}
                        <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:bg-emerald-500/20">
                                <Upload className="h-5 w-5 text-slate-400 group-hover:text-emerald-400" />
                            </div>
                            <span className="text-sm font-medium text-slate-400 group-hover:text-white">Upload File</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
