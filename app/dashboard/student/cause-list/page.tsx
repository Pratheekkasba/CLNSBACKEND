"use client";

import { motion } from "framer-motion";
import { Search, Calendar, MapPin, Eye, BookOpen, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const causeList = [
    {
        id: 1,
        court: "High Court of Delhi",
        room: "Court No. 4",
        judge: "Hon'ble Mr. Justice S. Sharma",
        item: "12",
        title: "Rajesh Kumar vs. State of NCT",
        type: "Criminal Appeal",
        stage: "Final Hearing",
        time: "10:30 AM",
    },
    {
        id: 2,
        court: "District Court, Saket",
        room: "Room 202",
        judge: "Ms. A. Gupta, DJ",
        item: "4",
        title: "Tech Solutions Inc. vs. BuildWell Pvt Ltd.",
        type: "Civil Suit",
        stage: "Evidence",
        time: "11:15 AM",
    },
    {
        id: 3,
        court: "Supreme Court of India",
        room: "Court No. 1",
        judge: "Hon'ble CJI",
        item: "1",
        title: "In Re: Environmental Compliance",
        type: "PIL",
        stage: "Admission",
        time: "10:00 AM",
    },
];

export default function CauseListPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Daily Cause List</h2>
                    <p className="text-slate-400">Observe real court proceedings to enhance your learning.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-white/10 text-slate-400 hover:text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        Select Date
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                        placeholder="Search by Court, Judge, or Case Type..."
                        className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500"
                    />
                </div>
            </div>


            {/* List */}
            <div className="space-y-4">
                {causeList.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex flex-col md:flex-row items-start md:items-center gap-6 rounded-xl border border-white/5 bg-white/5 p-4 hover:border-teal-500/20 hover:bg-white/10 transition-all"
                    >
                        <div className="flex flex-col items-center justify-center h-16 w-16 shrink-0 rounded-lg bg-slate-800 border border-white/5 text-slate-300">
                            <span className="text-xs uppercase font-bold text-slate-500">Item</span>
                            <span className="text-2xl font-bold text-white">{item.item}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                    {item.type}
                                </span>
                                <span className="text-xs text-slate-500">• {item.stage}</span>
                            </div>
                            <h3 className="text-lg font-medium text-white mb-1 truncate">{item.title}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3" />
                                    {item.court}, {item.room}
                                </span>
                                <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {item.judge}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                            <div className="flex items-center gap-1.5 text-white font-mono text-sm">
                                <Clock className="h-4 w-4 text-teal-400" />
                                {item.time}
                            </div>
                            <Button size="sm" variant="outline" className="w-full md:w-auto border-white/10 hover:bg-white/10 text-slate-300 hover:text-white">
                                <Eye className="mr-2 h-3.5 w-3.5" />
                                Observe
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
