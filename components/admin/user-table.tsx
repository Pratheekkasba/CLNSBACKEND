"use client";

import { useState } from "react";
import { updateUserStatus, updateUserRole } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, MoreHorizontal, Download, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    status: string;
    createdAt: Date;
}

export function UserTable({ users }: { users: User[] }) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [loading, setLoading] = useState<string | null>(null);

    const filteredUsers = users.filter((user) => {
        const matchesSearch = (user.name?.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()));
        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleStatusChange = async (userId: string, newStatus: string) => {
        setLoading(userId);
        await updateUserStatus(userId, newStatus as any);
        setLoading(null);
    };

    const handleRoleChange = async (userId: string, newRole: string) => {
        setLoading(userId);
        await updateUserRole(userId, newRole as any);
        setLoading(null);
    };

    const getInitials = (name: string | null) => {
        if (!name) return "U";
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const getRoleBadgeVariant = (role: string) => {
        switch (role) {
            case "ADMIN": return "destructive"; // or a custom purple
            case "ADVOCATE": return "info";
            case "CLIENT": return "success";
            case "STUDENT": return "warning"; // or teal
            default: return "secondary";
        }
    };

    const statusColors: Record<string, string> = {
        ACTIVE: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        PENDING: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        SUSPENDED: "bg-red-500/10 text-red-500 border-red-500/20",
        VERIFIED: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };

    const handleExportCSV = () => {
        const headers = ["ID", "Name", "Email", "Role", "Status", "Joined Date"];
        const rows = filteredUsers.map(u => [
            u.id,
            u.name || "",
            u.email,
            u.role,
            u.status,
            new Date(u.createdAt).toISOString()
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 space-y-1">
                    <h2 className="text-xl font-semibold text-white">User Management</h2>
                    <p className="text-sm text-slate-400">View and manage all registered users on the platform.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExportCSV} className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5">
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                    </Button>
                    <AddUserDialog />
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between bg-white/5 p-2 rounded-lg border border-white/10">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                        placeholder="Search users by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 shadow-none border-transparent max-w-full"
                    />
                </div>
                <div className="flex p-1 bg-black/20 rounded-md overflow-x-auto">
                    {["ALL", "ADVOCATE", "CLIENT", "STUDENT"].map((role) => (
                        <button
                            key={role}
                            onClick={() => setRoleFilter(role)}
                            className={cn(
                                "px-4 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap",
                                roleFilter === role
                                    ? "bg-purple-600/20 text-purple-400"
                                    : "text-slate-400 hover:text-white"
                            )}
                        >
                            {role === "ALL" ? "All" : role.charAt(0) + role.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-slate-400 uppercase text-xs font-medium">
                        <tr>
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Joined Date</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-white/10">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} />
                                            <AvatarFallback className="bg-slate-800 text-slate-400">{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium text-white">{user.name || "Unknown User"}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge variant={getRoleBadgeVariant(user.role)}>
                                        {user.role}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                                        statusColors[user.status] || "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                    )}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500 text-xs">
                                    {new Date(user.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10">
                                                {loading === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-4 w-4" />}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-40 bg-slate-900 border-white/10 text-slate-300">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-white/10" />
                                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer" onClick={() => handleStatusChange(user.id, "ACTIVE")}>
                                                Set Active
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer" onClick={() => handleStatusChange(user.id, "SUSPENDED")}>
                                                Suspend User
                                            </DropdownMenuItem>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger className="hover:bg-white/5 cursor-pointer">
                                                    Change Role
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent className="bg-slate-900 border-white/10 text-slate-300">
                                                    <DropdownMenuRadioGroup value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                                                        <DropdownMenuRadioItem value="ADMIN" className="hover:bg-white/5 cursor-pointer">Admin</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="ADVOCATE" className="hover:bg-white/5 cursor-pointer">Advocate</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="CLIENT" className="hover:bg-white/5 cursor-pointer">Client</DropdownMenuRadioItem>
                                                        <DropdownMenuRadioItem value="STUDENT" className="hover:bg-white/5 cursor-pointer">Student</DropdownMenuRadioItem>
                                                    </DropdownMenuRadioGroup>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                            <DropdownMenuSeparator className="bg-white/10" />
                                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer text-red-500 focus:text-red-500" onClick={() => handleStatusChange(user.id, "REJECTED")}>
                                                Reject User
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-500">
                                    No users found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createUser } from "@/app/actions/admin";
import { toast } from "sonner"; // Assuming sonner is available

function AddUserDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "STUDENT",
        password: "password123"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await createUser(formData as any);
            if (result.success) {
                toast.success("User created successfully");
                setOpen(false);
                setFormData({ name: "", email: "", role: "STUDENT", password: "password123" });
            } else {
                toast.error(result.error || "Failed to create user");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-500 text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-900 border border-slate-700 shadow-2xl shadow-black/50 text-white sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Create a new user manually. They will be active immediately.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right text-slate-400">Name</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="col-span-3 bg-white/5 border-white/10 text-white"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right text-slate-400">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="col-span-3 bg-white/5 border-white/10 text-white"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right text-slate-400">Role</Label>
                        <Select onValueChange={(value) => setFormData({ ...formData, role: value })} defaultValue="STUDENT">
                            <SelectTrigger className="col-span-3 bg-white/5 border-white/10 text-white">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-white/10 text-slate-300">
                                <SelectItem value="STUDENT">Student</SelectItem>
                                <SelectItem value="CLIENT">Client</SelectItem>
                                <SelectItem value="ADVOCATE">Advocate</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right text-slate-400">Password</Label>
                        <Input
                            id="password"
                            type="text"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="col-span-3 bg-white/5 border-white/10 text-white"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading} className="bg-purple-600 hover:bg-purple-500">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Create User
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
