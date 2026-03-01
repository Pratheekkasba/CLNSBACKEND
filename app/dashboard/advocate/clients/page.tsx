import { fetchAdvocateClients } from "@/app/actions/advocate";
import { Mail, Phone, Clock, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function ClientEnquiriesPage() {
    const clients = await fetchAdvocateClients();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Client Enquiries</h2>
                <p className="text-slate-400">Manage communications with your active clients.</p>
            </div>

            {clients.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5 text-slate-400">
                    <p>No active client enquiries found.</p>
                    <p className="text-sm">Clients assigned to your cases will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clients.map((client) => (
                        <Card key={client.id} className="bg-white/5 border-white/10 overflow-hidden hover:border-blue-500/30 transition-colors">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border border-white/10">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${client.email}`} />
                                        <AvatarFallback className="bg-slate-800 text-slate-400">{client.name?.[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold text-white">{client.name}</h3>
                                        <p className="text-xs text-slate-400">{client.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-slate-400">
                                        <span>Active Cases</span>
                                        <span className="text-white">{client.activeCases}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400">
                                        <span>Last Active</span>
                                        <span className="text-white">{new Date(client.lastActive).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white h-9">
                                        <MessageSquare className="mr-2 h-4 w-4" /> Message
                                    </Button>
                                    <Button variant="outline" className="h-9 w-9 p-0 border-white/10 text-slate-400 hover:text-white hover:bg-white/10">
                                        <Mail className="h-4 w-4" />
                                    </Button>
                                    {/* Phone support if added to schema later */}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
