"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [emailSent, setEmailSent] = React.useState(false);
    const router = useRouter();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        const target = event.target as typeof event.target & {
            email: { value: string };
        };

        try {
            // TODO: Implement actual password reset email sending
            // For now, show success message
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            setEmailSent(true);
            toast.success("Password reset link sent to your email!");
        } catch (err) {
            toast.error("Failed to send reset email. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    if (emailSent) {
        return (
            <div className="flex min-h-screen w-full bg-[#020817] text-white overflow-hidden">
                <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
                    <div className="w-full max-w-md space-y-8">
                        <div className="text-center space-y-4">
                            <div className="mx-auto h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Mail className="h-8 w-8 text-green-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Check your email</h1>
                                <p className="text-slate-400 mt-2">
                                    We've sent a password reset link to your email address.
                                </p>
                            </div>
                            <div className="pt-4">
                                <Link href="/login">
                                    <Button variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10">
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Login
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-[#020817] text-white overflow-hidden">
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Forgot Password?</h1>
                        <p className="text-slate-400">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={onSubmit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                        <Input
                                            id="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            autoCorrect="off"
                                            required
                                            disabled={isLoading}
                                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                        />
                                    </div>
                                </div>
                                <Button disabled={isLoading} className="bg-blue-600 hover:bg-blue-500 text-white mt-2">
                                    {isLoading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Send Reset Link
                                </Button>
                            </div>
                        </form>

                        <div className="text-center text-sm">
                            <Link href="/login" className="text-blue-400 hover:text-blue-300">
                                <ArrowLeft className="inline mr-1 h-3 w-3" />
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
