import { fetchMentors, fetchMyMentors } from "@/app/actions/student";
import { MentorBrowser } from "@/components/student/mentor-browser";

export const dynamic = "force-dynamic";

export default async function MentorshipPage() {
    const mentors = await fetchMentors();
    const myMentors = await fetchMyMentors();

    return (
        <MentorBrowser mentors={mentors} myMentors={myMentors} />
    );
}
