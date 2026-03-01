"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, Save, FileText, Upload, X, Download } from "lucide-react";
import { getUserProfile, updateUserProfile, uploadResume, uploadProfilePhoto } from "@/app/actions/user";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProfileFormProps {
    role: "student" | "client" | "advocate" | "admin";
}

export function ProfileForm({ role }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();
    const { update: updateSession } = useSession();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        college: "",
        barId: ""
    });
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [resumeFileName, setResumeFileName] = useState<string | null>(null);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingPhoto, setUploadingPhoto] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const user = await getUserProfile();
                if (user) {
                    const [first, ...last] = (user.name || "").split(" ");
                    setFormData({
                        firstName: first || "",
                        lastName: last.join(" ") || "",
                        email: user.email,
                        bio: user.bio || "",
                        college: user.college || "",
                        barId: user.barId || ""
                    });
                    // Set avatar URL - use uploaded image or fallback to dicebear
                    if (user.imageUrl) {
                        setAvatarUrl(user.imageUrl);
                    } else {
                        setAvatarUrl(`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`);
                    }
                    if (user.resumeUrl) {
                        setResumeUrl(user.resumeUrl);
                        // Extract filename from URL or use default
                        if (user.resumeUrl.startsWith("data:")) {
                            // Extract MIME type to determine file extension
                            const mimeMatch = user.resumeUrl.match(/data:([^;]+)/);
                            if (mimeMatch) {
                                const mimeType = mimeMatch[1];
                                if (mimeType.includes('pdf')) {
                                    setResumeFileName("Resume.pdf");
                                } else if (mimeType.includes('word') || mimeType.includes('document')) {
                                    setResumeFileName("Resume.docx");
                                } else {
                                    setResumeFileName("Resume.pdf");
                                }
                            } else {
                                setResumeFileName("Resume.pdf");
                            }
                        } else {
                            const fileName = user.resumeUrl.split('/').pop() || "Resume.pdf";
                            setResumeFileName(fileName.split('?')[0]); // Remove query params
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setFetching(false);
            }
        }
        loadProfile();
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await updateUserProfile({
                ...formData,
                resumeUrl: resumeUrl || undefined
            });
            if (res.success) {
                toast.success("Profile updated successfully");
                // Update the session to reflect the new name
                await updateSession();
                router.refresh();
            } else {
                toast.error(res.error || "Failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only PDF and Word documents (.pdf, .doc, .docx) are allowed");
            return;
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setUploadingResume(true);
        try {
            const formData = new FormData();
            formData.append("resume", file);

            const result = await uploadResume(formData);
            if (result.success) {
                setResumeUrl(result.resumeUrl || null);
                setResumeFileName(file.name);
                toast.success("Resume uploaded successfully");
                await updateSession();
                router.refresh();
            } else {
                toast.error(result.error || "Failed to upload resume");
            }
        } catch (error) {
            toast.error("An error occurred while uploading resume");
        } finally {
            setUploadingResume(false);
            // Reset input
            e.target.value = "";
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Only image files (JPEG, PNG, WebP, GIF) are allowed");
            return;
        }

        // Validate file size (max 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            toast.error("Image size must be less than 2MB");
            return;
        }

        setUploadingPhoto(true);
        try {
            const formData = new FormData();
            formData.append("photo", file);

            const result = await uploadProfilePhoto(formData);
            if (result.success) {
                setAvatarUrl(result.imageUrl || null);
                toast.success("Profile photo uploaded successfully");
                await updateSession();
                router.refresh();
            } else {
                toast.error(result.error || "Failed to upload photo");
            }
        } catch (error) {
            toast.error("An error occurred while uploading photo");
        } finally {
            setUploadingPhoto(false);
            // Reset input
            e.target.value = "";
        }
    };

    const handleRemoveResume = async () => {
        if (!confirm("Are you sure you want to remove your resume?")) return;
        
        setLoading(true);
        try {
            const res = await updateUserProfile({
                ...formData,
                resumeUrl: ""
            });
            if (res.success) {
                setResumeUrl(null);
                setResumeFileName(null);
                toast.success("Resume removed successfully");
                await updateSession();
                router.refresh();
            } else {
                toast.error(res.error || "Failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin text-white" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <Avatar className="h-24 w-24 border border-white/10">
                        <AvatarImage src={avatarUrl || ""} />
                        <AvatarFallback className="bg-slate-700 text-white text-2xl">
                            {formData.firstName?.[0]}
                        </AvatarFallback>
                    </Avatar>
                    <label className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-500 shadow-lg cursor-pointer">
                        {uploadingPhoto ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Camera className="h-4 w-4" />
                        )}
                        <input
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                            className="hidden"
                            onChange={handlePhotoUpload}
                            disabled={uploadingPhoto}
                        />
                    </label>
                </div>
                <div>
                    <h4 className="text-base font-semibold text-white">Profile Photo</h4>
                    <p className="text-sm text-slate-400">Update your account picture.</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                    <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                    <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    disabled
                    className="bg-black/20 border-white/10 text-slate-400 cursor-not-allowed"
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="bio" className="text-slate-300">Bio</Label>
                <Input
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us a little about yourself"
                    className="bg-white/5 border-white/10 text-white h-20"
                />
            </div>

            {/* Role Specific Fields */}
            {role === "student" && (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="college" className="text-slate-300">College / University</Label>
                        <Input
                            id="college"
                            value={formData.college}
                            onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                            placeholder="National Law School..."
                            className="bg-white/5 border-white/10 text-white"
                        />
                    </div>

                    {/* Resume Upload Section */}
                    <div className="grid gap-2">
                        <Label className="text-slate-300">Resume / CV</Label>
                        {resumeUrl ? (
                            <div className="flex items-center gap-3 p-4 rounded-lg border border-white/10 bg-white/5">
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="h-10 w-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                                        <FileText className="h-5 w-5 text-teal-400" />
                                    </div>
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <p className="text-sm font-medium text-white truncate" title={resumeFileName || "Resume.pdf"}>
                                            {resumeFileName || "Resume.pdf"}
                                        </p>
                                        <p className="text-xs text-slate-400">Resume uploaded</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="border-teal-500/20 text-teal-400 hover:bg-teal-500/10"
                                        asChild
                                    >
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="h-4 w-4 mr-1" />
                                            View
                                        </a>
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                                        onClick={handleRemoveResume}
                                        disabled={loading}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <label
                                    htmlFor="resume-upload"
                                    className="flex flex-col items-center justify-center p-6 rounded-lg border-2 border-dashed border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all cursor-pointer group"
                                >
                                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:bg-teal-500/20">
                                        {uploadingResume ? (
                                            <Loader2 className="h-5 w-5 text-teal-400 animate-spin" />
                                        ) : (
                                            <Upload className="h-5 w-5 text-slate-400 group-hover:text-teal-400" />
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-slate-300 group-hover:text-white">
                                        {uploadingResume ? "Uploading..." : "Upload Resume / CV"}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">PDF or Word document (Max 5MB)</p>
                                </label>
                                <input
                                    id="resume-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    className="hidden"
                                    onChange={handleResumeUpload}
                                    disabled={uploadingResume}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}

            {role === "advocate" && (
                <div className="grid gap-2">
                    <Label htmlFor="barId" className="text-slate-300">Bar Council ID</Label>
                    <Input
                        id="barId"
                        value={formData.barId}
                        onChange={(e) => setFormData({ ...formData, barId: e.target.value })}
                        placeholder="MAH/1234/2020"
                        className="bg-white/5 border-white/10 text-white"
                    />
                </div>
            )}

            <div className="flex justify-end pt-4">
                <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
