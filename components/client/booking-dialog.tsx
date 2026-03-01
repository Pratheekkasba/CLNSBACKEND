"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { bookConsultation } from "@/app/actions/client";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Calendar, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    type: z.string().optional(),
});

interface BookingDialogProps {
    advocateId: string;
    advocateName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ advocateId, advocateName, open, onOpenChange }: BookingDialogProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            type: "Consultation",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const result = await bookConsultation(advocateId, {
                title: values.title,
                description: values.description,
                type: values.type,
            });

            if (result.success) {
                toast.success(`Consultation booked successfully with ${advocateName}!`);
                form.reset();
                onOpenChange(false);
                router.refresh();
                // Navigate to cases page
                router.push("/dashboard/client/cases");
            } else {
                toast.error(result.error || "Failed to book consultation");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-slate-900 border border-slate-700 text-white">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-emerald-400" />
                        Book Consultation
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Request a consultation with {advocateName}. This will create a new case.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Case Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Property Dispute Consultation"
                                            className="bg-white/5 border-white/10 text-white"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Case Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                                <SelectValue placeholder="Select case type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            <SelectItem value="Consultation">Consultation</SelectItem>
                                            <SelectItem value="Criminal">Criminal</SelectItem>
                                            <SelectItem value="Civil">Civil</SelectItem>
                                            <SelectItem value="Family">Family</SelectItem>
                                            <SelectItem value="Property">Property</SelectItem>
                                            <SelectItem value="Corporate">Corporate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your legal issue or consultation needs..."
                                            className="bg-white/5 border-white/10 text-white min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-white/10 text-slate-300 hover:bg-white/10"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white"
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <FileText className="mr-2 h-4 w-4" />
                                Book Consultation
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
