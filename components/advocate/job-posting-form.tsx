"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createInternship, updateInternship } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { InternshipPosting } from "@prisma/client";

interface JobPostingFormProps {
    initialData?: InternshipPosting;
    isEditing?: boolean;
}

export default function JobPostingForm({ initialData, isEditing = false }: JobPostingFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        const data = {
            title: formData.get("title") as string,
            company: formData.get("company") as string,
            location: formData.get("location") as string,
            description: formData.get("description") as string,
            type: formData.get("type") as string,
            stipend: formData.get("stipend") as string,
            duration: formData.get("duration") as string,
            deadline: formData.get("deadline") ? new Date(formData.get("deadline") as string) : undefined,
        };

        try {
            let result;
            if (isEditing && initialData) {
                result = await updateInternship(initialData.id, data);
            } else {
                result = await createInternship(data);
            }

            if (result.success) {
                toast.success(isEditing ? "Internship updated successfully!" : "Internship posted successfully!");
                router.push("/dashboard/advocate/internships");
                router.refresh();
            } else {
                toast.error(result.error || "Failed to save internship");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    // Format date for default value (YYYY-MM-DD)
    const defaultDeadline = initialData?.deadline
        ? new Date(initialData.deadline).toISOString().split('T')[0]
        : "";

    return (
        <Card className="max-w-2xl mx-auto border-white/10 bg-white/5">
            <CardHeader>
                <CardTitle>{isEditing ? "Edit Internship" : "Post a New Internship"}</CardTitle>
                <CardDescription>
                    {isEditing ? "Update details for this position." : "Find the best legal talent for your firm."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={initialData?.title}
                                placeholder="e.g. Legal Intern"
                                required
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Firm/Company Name</Label>
                            <Input
                                id="company"
                                name="company"
                                defaultValue={initialData?.company}
                                placeholder="e.g. Sharma Associates"
                                required
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                defaultValue={initialData?.location}
                                placeholder="e.g. New Delhi / Remote"
                                required
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Work Type</Label>
                            <Select name="type" required defaultValue={initialData?.type}>
                                <SelectTrigger className="bg-black/20 border-white/10">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Remote">Remote</SelectItem>
                                    <SelectItem value="On-site">On-site</SelectItem>
                                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="stipend">Stipend (Optional)</Label>
                            <Input
                                id="stipend"
                                name="stipend"
                                defaultValue={initialData?.stipend || ""}
                                placeholder="e.g. ₹5000/month"
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (Optional)</Label>
                            <Input
                                id="duration"
                                name="duration"
                                defaultValue={initialData?.duration || ""}
                                placeholder="e.g. 3 Months"
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="deadline">Deadline</Label>
                            <Input
                                id="deadline"
                                name="deadline"
                                type="date"
                                defaultValue={defaultDeadline}
                                className="bg-black/20 border-white/10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={initialData?.description}
                            placeholder="Describe roles, responsibilities, and requirements..."
                            required
                            className="min-h-[150px] bg-black/20 border-white/10"
                        />
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEditing ? "Update Internship" : "Post Internship"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
