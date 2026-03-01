"use client";

import { useSession, signOut } from "next-auth/react";
import { User as UserIcon, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function DashboardHeader() {
    const { data: session, update: updateSession } = useSession();
    const router = useRouter();
    const user = session?.user;

    // Refresh session when component mounts or when navigating
    useEffect(() => {
        const handleFocus = () => {
            updateSession();
        };
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, [updateSession]);

    const getInitials = (name?: string | null) => {
        if (!name) return "U";
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-white/10 bg-[#020817]/80 backdrop-blur-md px-6 transition-all">
            <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Search and Notification removed */}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8 border border-white/10">
                                    <AvatarImage 
                                        src={user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.email || 'user'}`} 
                                        alt={user?.name || ""} 
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                                        {getInitials(user?.name)}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-[#0B1120] border-white/10 text-slate-300" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none text-white">{user?.name || "User"}</p>
                                    <p className="text-xs leading-none text-slate-400">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem className="focus:bg-white/5 cursor-pointer" onClick={() => router.push(`/dashboard/${user?.role?.toLowerCase() || 'student'}/settings`)}>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-white/5 cursor-pointer text-red-400 focus:text-red-400" onClick={() => signOut({ callbackUrl: "/login" })}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
