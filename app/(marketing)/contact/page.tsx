"use client";

import { Footerdemo } from "@/components/ui/footer-section";
import { ContactPage } from "@/components/ui/contact-page";

export default function ContactPageRoute() {
  return (
    <main className="relative min-h-screen bg-[#020712] text-white">
      <ContactPage />
      <Footerdemo />
    </main>
  );
}

