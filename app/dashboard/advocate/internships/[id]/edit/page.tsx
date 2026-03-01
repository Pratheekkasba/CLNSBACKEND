import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import JobPostingForm from "@/components/advocate/job-posting-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditInternshipPageProps {
    params: {
        id: string;
    };
}

export default async function EditInternshipPage({ params }: EditInternshipPageProps) {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "ADVOCATE") {
        redirect("/dashboard/advocate");
    }

    const internship = await db.internshipPosting.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!internship) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
                <h2 className="text-xl font-semibold mb-2">Internship Not Found</h2>
                <p className="mb-4">The internship posting you are trying to edit does not exist.</p>
                <Button asChild variant="outline" className="border-white/10 hover:bg-white/5">
                    <Link href="/dashboard/advocate/internships">Back to Internships</Link>
                </Button>
            </div>
        );
    }

    if (internship.authorId !== session.user.id) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
                <h2 className="text-xl font-semibold mb-2">Unauthorized</h2>
                <p className="mb-4">You do not have permission to edit this internship posting.</p>
                <Button asChild variant="outline" className="border-white/10 hover:bg-white/5">
                    <Link href="/dashboard/advocate/internships">Back to Internships</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-white/10">
                    <Link href="/dashboard/advocate/internships">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <h2 className="text-2xl font-bold tracking-tight text-white">Edit Internship</h2>
            </div>

            <JobPostingForm initialData={internship} isEditing={true} />
        </div>
    );
}
