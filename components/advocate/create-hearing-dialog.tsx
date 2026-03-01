"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createHearing } from "@/app/actions/advocate";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Calendar } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    caseId: z.string().min(1, "Case is required"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    title: z.string().min(2, "Purpose/Title is required"),
    court: z.string().optional(),
});

interface CreateHearingDialogProps {
    cases: {
        id: string;
        title: string;
    }[];
}

export function CreateHearingDialog({ cases }: CreateHearingDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            caseId: "",
            date: "",
            time: "",
            title: "",
            court: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);

        // Combine date and time
        const combinedDate = new Date(`${values.date}T${values.time}`);

        try {
            const result = await createHearing({
                caseId: values.caseId,
                date: combinedDate,
                title: values.title,
                court: values.court,
            });

            if (result.success) {
                toast.success("Hearing scheduled successfully");
                setOpen(false);
                form.reset();
                router.refresh();
            } else {
                toast.error(result.error || "Failed to schedule hearing");
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                    <Plus className="mr-2 h-4 w-4" /> Schedule Hearing
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-[#0f172a] border border-slate-800 text-white shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">Schedule Hearing</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Add a new court appearance or hearing.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="caseId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Case</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                                <SelectValue placeholder="Select case" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-[#0f172a] border-slate-800 text-white max-h-[200px]">
                                            {cases.length > 0 ? (
                                                cases.map((c) => (
                                                    <SelectItem key={c.id} value={c.id}>
                                                        {c.title}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <div className="p-2 text-sm text-slate-500 text-center">No cases found</div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Schedule
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
