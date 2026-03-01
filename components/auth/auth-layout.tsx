"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="flex min-h-screen w-full bg-[#020817] text-white overflow-hidden">
            {/* Left Side - Branding / Visuals */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center p-12 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/video-hero/image_for_supremcort.jpg?v=2"
                        alt="Auth Background"
                        fill
                        className="object-cover opacity-30 mix-blend-overlay"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020817] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/50 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-lg space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <Image src="/clns-logo.png" alt="CLNS Logo" width={60} height={60} className="w-12 h-12 object-contain" />
                        <span className="text-3xl font-bold tracking-tighter">CLNS</span>
                    </motion.div>

                    <motion.blockquote
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <p className="text-2xl font-medium leading-relaxed text-slate-200">
                            "The centralized platform seamlessly connecting clients, students, and advocates for a faster, transparent justice system."
                        </p>
                        <footer className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
                            The CLNS Vision
                        </footer>
                    </motion.blockquote>
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
                <Link href="/" className="absolute top-8 right-8 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    Back to Home
                </Link>

                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
                        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
                    </div>

                    {children}

                    <div className="text-center text-sm text-slate-500">
                        By clicking continue, you agree to our{" "}
                        <Link href="/terms" className="underline underline-offset-4 hover:text-white">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
                            Privacy Policy
                        </Link>
                        .
                    </div>
                </div>
            </div>
        </div>
    );
}
