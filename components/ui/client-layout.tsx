"use client";

import { NavBarDemo } from "@/components/ui/tubelight-navbar-demo";
import { PageTransition } from "@/components/ui/page-transition";
import { ModernWhatsAppToggle } from "@/components/ui/modern-whatsapp-toggle";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBarDemo />
      <PageTransition>
        {children}
      </PageTransition>
      <ModernWhatsAppToggle />
    </>
  );
}

