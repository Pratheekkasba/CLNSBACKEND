import { fetchMentorshipRequests, fetchMentees } from "@/app/actions/advocate";
import MentorshipManager from "@/components/advocate/mentorship-manager";

export const dynamic = "force-dynamic";

export default async function MentorshipRequestsPage() {
    const [requests, mentees] = await Promise.all([
        fetchMentorshipRequests(),
        fetchMentees()
    ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Mentorship Program</h2>
                    <p className="text-slate-400">Manage your student connections and guidance requests.</p>
                </div>
            </div>

            <MentorshipManager requests={requests} mentees={mentees} />
        </div>
    );
}
