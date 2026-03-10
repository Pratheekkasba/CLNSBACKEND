"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MessageSquare, Scale, BadgeCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingDialog } from "./booking-dialog";

interface Advocate {
    id: string;
    name: string;
    email: string;
    specialization: string;
    bio: string;
    verified: boolean;
    imageUrl?: string | null;
}

interface FindLawyerContentProps {
    initialAdvocates: Advocate[];
}

export function FindLawyerContent({ initialAdvocates }: FindLawyerContentProps) {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
    const [selectedAdvocate, setSelectedAdvocate] = useState<{ id: string; name: string } | null>(null);
    const router = useRouter();

    const filteredAdvocates = useMemo(() => {
        let filtered = initialAdvocates;

        // Filter by search term
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(adv =>
                adv.name.toLowerCase().includes(term) ||
                adv.specialization.toLowerCase().includes(term) ||
                adv.bio.toLowerCase().includes(term)
            );
        }

        // Filter by specialization (if not "All")
        if (selectedFilter !== "All") {
            filtered = filtered.filter(adv =>
                adv.specialization.toLowerCase().includes(selectedFilter.toLowerCase())
            );
        }

        return filtered;
    }, [initialAdvocates, searchTerm, selectedFilter]);

    const handleBookNow = (advocateId: string, advocateName: string) => {
        setSelectedAdvocate({ id: advocateId, name: advocateName });
        setBookingDialogOpen(true);
    };

    const handleChat = (advocateEmail: string, advocateName: string) => {
        // Open email client for now, or navigate to messages
        window.location.href = `mailto:${advocateEmail}?subject=Consultation Request`;
        toast.success(`Opening email client to contact ${advocateName}`);
    };

    const getInitials = (name: string) => {
        return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
    };

    const getColorClass = (index: number) => {
        const colors = ["bg-blue-600", "bg-purple-600", "bg-teal-600", "bg-emerald-600", "bg-indigo-600", "bg-pink-600"];
        return colors[index % colors.length];
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold tracking-tight text-white">Find a Lawyer</h2>
                <p className="text-slate-400">Connect with top-rated legal experts for your case.</p>
            </div>

            {/* Search & Filters */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search by name, specialization, or expertise..."
                            className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-slate-500 h-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                    <span className="text-xs font-medium text-slate-500 flex items-center mr-2">
                        <Filter className="h-3 w-3 mr-1" /> Filters:
                    </span>
                    {["All", "Criminal", "Family", "Property", "Corporate", "Civil"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedFilter === filter
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Grid */}
            {filteredAdvocates.length === 0 ? (
                <div className="p-12 text-center border border-white/10 rounded-xl bg-white/5 text-slate-400">
                    <p className="text-lg mb-2">No advocates found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                    {filteredAdvocates.map((advocate, i) => (
                        <motion.div
                            key={advocate.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col sm:flex-row gap-5 rounded-xl border border-white/10 bg-white/5 p-5 hover:border-emerald-500/30 hover:bg-white/10 transition-all"
                        >
                            <Avatar className="h-24 w-24 shrink-0 border border-white/10">
                                <AvatarImage src={advocate.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${advocate.email}`} />
                                <AvatarFallback className={`${getColorClass(i)} text-white text-xl font-bold`}>
                                    {getInitials(advocate.name)}
                                </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-white text-lg group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                                            {advocate.name}
                                            {advocate.verified && (
                                                <BadgeCheck className="h-4 w-4 text-blue-400" aria-label="Verified Advocate" />
                                            )}
                                        </h3>
                                        <p className="text-sm text-slate-400 flex items-center gap-1">
                                            <Scale className="h-3.5 w-3.5" />
                                            {advocate.specialization}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-300 line-clamp-2">
                                    {advocate.bio}
                                </p>
                            </div>

                            <div className="flex flex-row sm:flex-col justify-between sm:justify-center gap-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-4 min-w-[120px]">
                                <div className="text-center mb-1 hidden sm:block">
                                    <p className="text-xs text-slate-400">Available</p>
                                    <p className="text-sm font-medium text-emerald-400">For Consultation</p>
                                </div>
                                <Button
                                    onClick={() => handleBookNow(advocate.id, advocate.name)}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs h-9"
                                >
                                    Book Now
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleChat(advocate.email, advocate.name)}
                                    className="w-full border-white/10 hover:bg-white/10 text-slate-300 hover:text-white text-xs h-9"
                                >
                                    <MessageSquare className="h-3.5 w-3.5 mr-2" />
                                    Contact
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Booking Dialog */}
            {selectedAdvocate && (
                <BookingDialog
                    advocateId={selectedAdvocate.id}
                    advocateName={selectedAdvocate.name}
                    open={bookingDialogOpen}
                    onOpenChange={setBookingDialogOpen}
                />
            )}
        </div>
    );
}
