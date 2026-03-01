"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCase } from "@/app/actions/advocate";
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
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    type: z.string().min(1, "Type is required"),
    description: z.string().optional(),
    clientId: z.string().min(1, "Client is required"),
});

interface CreateCaseDialogProps {
    clients: {
        id: string;
        name: string | null;
        email: string;
    }[];
}

export function CreateCaseDialog({ clients }: CreateCaseDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            type: "Civil",
            description: "",
            clientId: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const result = await createCase(values);
            if (result.success) {
                toast.success("Case created successfully");
                setOpen(false);
                form.reset();
                router.refresh(); // Refresh the page to show the new case
            } else {
                toast.error(result.error || "Failed to create case");
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
                <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    <Plus className="mr-2 h-4 w-4" /> New Case
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-[#0f172a] border border-slate-800 text-white shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-white">Create New Case</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Add a new active case to your dashboard.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Case Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Smith vs. Jones" {...field} className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#0f172a] border-slate-800 text-white">
                                                <SelectItem value="Civil">Civil</SelectItem>
                                                <SelectItem value="Criminal">Criminal</SelectItem>
                                                <SelectItem value="Corporate">Corporate</SelectItem>
                                                <SelectItem value="Family">Family</SelectItem>
                                                <SelectItem value="Property">Property</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="clientId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-slate-300">Client</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="bg-slate-900 border-slate-800 text-white">
                                                    <SelectValue placeholder="Select client" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="bg-[#0f172a] border-slate-800 text-white max-h-[200px]">
                                                {clients.length > 0 ? (
                                                    clients.map((client) => (
                                                        <SelectItem key={client.id} value={client.id}>
                                                            {client.name || client.email}
                                                        </SelectItem>
                                                    ))
                                                ) : (
                                                    <div className="p-2 text-sm text-slate-500 text-center">No clients found</div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-slate-300">Description (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Brief details about the case..."
                                            className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 min-h-[80px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 text-white">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Create Case
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
