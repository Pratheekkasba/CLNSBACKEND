import { fetchAdvocateInternships, fetchPendingApplications, fetchAcceptedApplications } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Users, FileText, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationReviewList } from "@/components/advocate/application-review-list";
import { HiredInternList } from "@/components/advocate/hired-intern-list";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InternshipPostingCard from "@/components/advocate/internship-posting-card";

export const dynamic = "force-dynamic";

export default async function InternshipManagementPage() {
    const [internships, applications, hiredInterns] = await Promise.all([
        fetchAdvocateInternships(),
        fetchPendingApplications(),
        fetchAcceptedApplications()
    ]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Internship Management</h2>
                    <p className="text-slate-400">Manage your postings and review student applications.</p>
                </div>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Link href="/dashboard/advocate/internships/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Internship
                    </Link>
                </Button>
            </div>

            <Tabs defaultValue="postings" className="space-y-4">
                <TabsList className="bg-white/5 border border-white/10">
                    <TabsTrigger value="postings" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                        <FileText className="mr-2 h-4 w-4" />
                        My Postings
                    </TabsTrigger>
                    <TabsTrigger value="applications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                        <Users className="mr-2 h-4 w-4" />
                        Applications
                        {applications.length > 0 && (
                            <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-blue-500 text-white text-[10px]">
                                {applications.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="hired" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Hired / Active
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="postings" className="space-y-4">
                    {internships.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                            <p className="text-slate-400">You haven't posted any internships yet.</p>
                            <Button asChild variant="link" className="text-emerald-400">
                                <Link href="/dashboard/advocate/internships/create">Create your first posting</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {internships.map((posting) => (
                                <InternshipPostingCard key={posting.id} posting={posting} />
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="applications">
                    <ApplicationReviewList applications={applications as any} />
                </TabsContent>

                <TabsContent value="hired">
                    <HiredInternList applications={hiredInterns as any} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
