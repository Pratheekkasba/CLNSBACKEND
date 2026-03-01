import { getStudentApplications } from "@/app/actions/student";
import { getUserProfile } from "@/app/actions/user";
import { ApplicationList } from "@/components/student/application-list";
import { FileText, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
    const [applications, userProfile] = await Promise.all([
        getStudentApplications(),
        getUserProfile()
    ]);

    // Extract filename from resumeUrl
    // If it's a base64 data URL, use a default name; otherwise extract from URL
    const getResumeFileName = (url: string | null | undefined): string | null => {
        if (!url) return null;
        
        // Check if it's a base64 data URL
        if (url.startsWith('data:')) {
            // Extract MIME type to determine file extension
            const mimeMatch = url.match(/data:([^;]+)/);
            if (mimeMatch) {
                const mimeType = mimeMatch[1];
                if (mimeType.includes('pdf')) return 'Resume.pdf';
                if (mimeType.includes('word') || mimeType.includes('document')) return 'Resume.docx';
            }
            return 'Resume.pdf'; // Default fallback
        }
        
        // Regular URL - extract filename
        const fileName = url.split('/').pop() || 'Resume.pdf';
        // Remove query parameters if any
        return fileName.split('?')[0];
    };

    const resumeFileName = getResumeFileName(userProfile?.resumeUrl);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">My Applications</h2>
                    <p className="text-slate-400">Track status of your submitted applications.</p>
                </div>
                {userProfile?.resumeUrl ? (
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-white/10 max-w-md">
                        <FileText className="h-4 w-4 text-teal-400 flex-shrink-0" />
                        <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-xs text-slate-400">Active Resume</span>
                            <span className="text-xs font-semibold text-white truncate" title={resumeFileName || 'Resume'}>
                                {resumeFileName || 'Resume.pdf'}
                            </span>
                        </div>
                        <Button 
                            size="icon" 
                            variant="ghost" 
                            className="h-6 w-6 flex-shrink-0 text-slate-400 hover:text-white"
                            asChild
                        >
                            <a href={userProfile.resumeUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="h-3 w-3" />
                            </a>
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-lg border border-dashed border-white/10">
                        <Upload className="h-4 w-4 text-slate-500" />
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400">No Resume Uploaded</span>
                            <span className="text-xs text-slate-500">Upload in Settings</span>
                        </div>
                    </div>
                )}
            </div>

            <ApplicationList applications={applications} />
        </div>
    );
}
