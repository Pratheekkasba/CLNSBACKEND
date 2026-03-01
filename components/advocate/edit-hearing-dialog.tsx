"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateHearing, fetchHearingDetails } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2, Edit } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

const formSchema = z.object({
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    title: z.string().min(2, "Purpose/Title is required"),
    court: z.string().optional(),
});

interface EditHearingDialogProps {
    hearingId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditHearingDialog({ hearingId, open, onOpenChange }: EditHearingDialogProps) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: "",
            time: "",
            title: "",
            court: "",
        },
    });

    // Fetch hearing details when dialog opens
    useEffect(() => {
        if (open && hearingId) {
            setFetching(true);
            fetchHearingDetails(hearingId).then((hearing) => {
                if (hearing) {
                    const hearingDate = new Date(hearing.date);
                    const dateStr = format(hearingDate, "yyyy-MM-dd");
                    const timeStr = format(hearingDate, "HH:mm");
                    
                    form.reset({
                        date: dateStr,
                        time: timeStr,
                        title: hearing.title,
                        court: hearing.court || "",
                    });
                }
                setFetching(false);
            });
        }
    }, [open, hearingId, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        // Combine date and time
        const combinedDate = new Date(`${values.date}T${values.time}`);

        try {
            const result = await updateHearing(hearingId, {
                date: combinedDate,
                title: values.title,
                court: values.court,
            });

            if (result.success) {
                toast.success("Hearing updated successfully");
                onOpenChange(false);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update hearing");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    const onInvalid = (errors: any) => {
        console.error("Form errors:", errors);
        toast.error("Please fill in all required fields.");
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-[#0f172a] border border-slate-800 text-white shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                        <Edit className="h-5 w-5" />
                        Edit Hearing
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Update hearing details and schedule.
                    </DialogDescription>
                </DialogHeader>
                {fetching ? (
                    <div className="py-8 text-center text-slate-400">Loading hearing details...</div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" className="bg-slate-900 border-slate-800 text-white" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-300">Time</FormLabel>
                                            <FormControl>
                                                <Input type="time" className="bg-slate-900 border-slate-800 text-white" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Purpose / Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Preliminary Hearing" className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="court"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Court (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. High Court, Room 404" className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    disabled={loading}
                                    className="border-slate-800 text-slate-300 hover:bg-slate-900"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Update Hearing
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
