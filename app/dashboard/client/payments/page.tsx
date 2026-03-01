"use client";

import { motion } from "framer-motion";
import { CreditCard, Download, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
    { id: "INV-001", description: "Consultation Fee - Adv. Rajesh", amount: "₹1,500", date: "24 Oct 2024", status: "Paid" },
    { id: "INV-002", description: "Drafting Charges", amount: "₹5,000", date: "20 Oct 2024", status: "Paid" },
    { id: "INV-003", description: "Retainer Fee - Nov", amount: "₹10,000", date: "Due 30 Oct", status: "Pending" },
];

export default function PaymentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Payments & Invoices</h2>
                    <p className="text-slate-400">Manage your transactions and download receipts.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Card Mockup */}
                <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                    <div className="relative z-10 flex flex-col justify-between h-40">
                        <div className="flex justify-between items-start">
                            <CreditCard className="h-8 w-8" />
                            <span className="text-lg font-bold italic tracking-widest opacity-80">VISA</span>
                        </div>
                        <div>
                            <p className="font-mono text-xl tracking-widest mb-1">•••• •••• •••• 4242</p>
                            <div className="flex justify-between text-xs opacity-80">
                                <span>Rahul Verma</span>
                                <span>Exp: 12/28</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-6">Transaction History</h3>
                    <div className="space-y-4">
                        {invoices.map((inv, i) => (
                            <div key={inv.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${inv.status === "Paid" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
                                        {inv.status === "Paid" ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-white">{inv.description}</p>
                                        <p className="text-xs text-slate-400">{inv.id} • {inv.date}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-white">{inv.amount}</p>
                                    {inv.status === "Pending" && <button className="text-xs text-emerald-400 hover:underline">Pay Now</button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
