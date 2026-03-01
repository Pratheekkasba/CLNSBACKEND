import { fetchMentees } from "@/app/actions/advocate";
import { MenteeList } from "@/components/advocate/mentee-list";

export const dynamic = "force-dynamic";

export default async function MyStudentsPage() {
    const mentees = await fetchMentees();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-white">My Stats & Mentees</h2>
                <p className="text-slate-400">Track and manage your active student mentorships.</p>
            </div>

            <MenteeList mentees={mentees as any} />
        </div>
    );
}
