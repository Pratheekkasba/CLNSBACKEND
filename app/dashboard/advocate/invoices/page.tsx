"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
    { id: "INV-2024-001", client: "Rahul Verma", date: "24 Oct 2024", amount: "₹5,000", status: "Paid" },
    { id: "INV-2024-002", client: "TechStart India", date: "20 Oct 2024", amount: "₹15,000", status: "Pending" },
    { id: "INV-2024-003", client: "Vikram Singh", date: "15 Oct 2024", amount: "₹2,500", status: "Paid" },
];

export default function InvoicesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Invoices & Billing</h2>
                    <p className="text-slate-400">Generate invoices and track payments.</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Generate Invoice
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-sm font-medium text-slate-400">Total Revenue (Oct)</p>
                    <p className="text-3xl font-bold text-white mt-2">₹22,500</p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-sm font-medium text-slate-400">Pending Payments</p>
                    <p className="text-3xl font-bold text-amber-500 mt-2">₹15,000</p>
                </div>
                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                    <p className="text-sm font-medium text-slate-400">Invoices Generated</p>
                    <p className="text-3xl font-bold text-blue-400 mt-2">12</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-sm"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4 font-medium">Invoice ID</th>
                                <th className="px-6 py-4 font-medium">Client</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {invoices.map((inv) => (
                                <tr key={inv.id} className="group hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {inv.id}
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {inv.client}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {inv.date}
                                    </td>
                                    <td className="px-6 py-4 text-white font-mono">
                                        {inv.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                                                "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-white">
                                            <Download className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}
