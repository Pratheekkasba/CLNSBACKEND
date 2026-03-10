import { fetchCaseDetails } from "@/app/actions/client";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, FileText, Gavel, Mail, Scale, ShieldAlert, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default async function ClientCaseDetailsPage({ params }: { params: { id: string } }) {
    const caseItem = await fetchCaseDetails(params.id);

    if (!caseItem) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/client/cases">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">{caseItem.title}</h2>
                    <p className="text-slate-400 flex items-center gap-2 text-sm mt-1">
                        <ShieldAlert className="h-4 w-4" />
                        Case ID: <span className="font-mono text-slate-300">{caseItem.id.toUpperCase()}</span>
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                    {/* Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Scale className="h-5 w-5 text-emerald-400" />
                                Case Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                <span className="text-slate-400">Current Status</span>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${caseItem.status === "OPEN" ? "bg-emerald-500/10 text-emerald-400" :
                                    caseItem.status === "CLOSED" ? "bg-slate-500/10 text-slate-400" :
                                        "bg-blue-500/10 text-blue-400"
                                    }`}>
                                    {caseItem.status}
                                </span>
                            </div>
                            <div className="mt-4 text-sm text-slate-500">
                                Last updated: {format(new Date(caseItem.updatedAt), "PPP p")}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Timeline / Hearings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-400" />
                                Hearing History
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {caseItem.hearings.length > 0 ? (
                                <div className="space-y-4">
                                    {caseItem.hearings.map((hearing) => (
                                        <div key={hearing.id} className="flex gap-4 relative">
                                            {/* Simple timeline visual */}
                                            <div className="w-12 text-xs text-slate-500 pt-1 text-right shrink-0">
                                                {format(new Date(hearing.date), "MMM d")}
                                            </div>
                                            <div className="w-px bg-white/10 relative">
                                                <div className="absolute top-1.5 -left-1 w-2 h-2 rounded-full bg-blue-500" />
                                            </div>
                                            <div className="pb-6">
                                                <p className="font-medium text-white">{hearing.title || "Hearing"}</p>
                                                <p className="text-sm text-slate-400 mt-1">
                                                    Scheduled
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-400 text-sm">No hearings recorded yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Advocate Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Gavel className="h-5 w-5 text-purple-400" />
                                Your Advocate
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {caseItem.advocate ? (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
                                            {caseItem.advocate.name?.[0] || "A"}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white">{caseItem.advocate.name}</p>
                                            <p className="text-xs text-slate-400">Assigned Legal Counsel</p>
                                        </div>
                                    </div>
                                    {caseItem.advocate.email && (
                                        <Button variant="outline" className="w-full justify-start text-slate-300 border-white/10 hover:bg-white/5" asChild>
                                            <a href={`mailto:${caseItem.advocate.email}`}>
                                                <Mail className="mr-2 h-4 w-4" />
                                                Email Advocate
                                            </a>
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <p className="text-slate-400 text-sm">No advocate assigned yet.</p>
                            )}
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
}
