import { fetchInternships, getStudentApplications } from "@/app/actions/student";
import { InternshipBrowser } from "@/components/student/internship-browser";

export const dynamic = "force-dynamic";

export default async function InternshipsPage() {
    const [internships, applications] = await Promise.all([
        fetchInternships(),
        getStudentApplications()
    ]);

    const appliedIds = applications.map(app => app.postingId);

    return (
        <InternshipBrowser internships={internships} appliedIds={appliedIds} />
    );
}
