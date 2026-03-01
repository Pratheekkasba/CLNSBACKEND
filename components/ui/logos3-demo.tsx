"use client";

import { Logos3 } from "@/components/ui/logos3";

const demoData = {
  heading: "Trusted by these institutions",
  logos: [
    {
      id: "logo-1",
      description: "Supreme Court",
      image: "https://images.unsplash.com/photo-1524230568792-281cb63f202a?w=600&auto=format&fit=crop",
      className: "h-16 w-16 rounded-full object-cover",
    },
    {
      id: "logo-2",
      description: "Law Schools",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop",
      className: "h-16 w-16 rounded-full object-cover",
    },
    {
      id: "logo-3",
      description: "High Courts",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&auto=format&fit=crop",
      className: "h-16 w-16 rounded-full object-cover",
    },
    {
      id: "logo-4",
      description: "Bar Councils",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop",
      className: "h-16 w-16 rounded-full object-cover",
    },
    {
      id: "logo-5",
      description: "Corporate Legal",
      image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop",
      className: "h-16 w-16 rounded-full object-cover",
    },
    {
      id: "logo-6",
      description: "Policy Labs",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&auto=format&fit=crop",
      className: "h-16 w-16 rounded-full object-cover",
    },
  ],
};

export function Logos3Demo() {
  return <Logos3 {...demoData} />;
}


