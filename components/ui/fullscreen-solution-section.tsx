"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type PersonaId = "clients" | "students" | "advocates" | "startups" | "msme";

const personaData: Record<
  PersonaId,
  {
    label: string;
    heading: React.ReactNode;
    features: { title: string; description: string }[];
  }
> = {
  clients: {
    label: "For Clients",
    heading: <>A Tailored Solution for Everyone</>,
    features: [
      {
        title: "Affordable Legal Support",
        description: "Predictable pricing, ₹1 consultations, and curated advocate pools for every matter.",
      },
      {
        title: "Case Tracking",
        description: "Unified timelines, document vaults, and smart reminders across every jurisdiction.",
      },
      {
        title: "Real-Time Assistance",
        description: "Secure chat, escalation desk, and courtroom readiness kits whenever you need them.",
      },
      {
        title: "Personalized Dashboard",
        description: "One space for briefs, payments, and outcomes securely synced across your devices.",
      },
    ],
  },
  students: {
    label: "For Students",
    heading: <>Tools Built for Learning and Growth</>,
    features: [
      {
        title: "Mentorship & Learning",
        description: "Mentor-assisted doubt clearing and subsidized consultation credits for projects.",
      },
      {
        title: "Case Research & Analysis",
        description: "Follow live matters, dissect judgments, and build research notebooks in one click.",
      },
      {
        title: "Internship Support",
        description: "Expert helplines, mock court workflows, and instant notifications for internships.",
      },
      {
        title: "Learning Dashboard",
        description: "Skill maps, internship trackers, and certification paths curated for your goals.",
      },
    ],
  },
  advocates: {
    label: "For Advocates",
    heading: <>Streamlined Practice Management</>,
    features: [
      {
        title: "Client Acquisition",
        description: "Client-ready pricing templates and trust-led onboarding to grow your practice.",
      },
      {
        title: "Case Management System",
        description: "Automated diary sync, cause-list alerts, and evidence vaults in a single window.",
      },
      {
        title: "Practice Support Tools",
        description: "Remote paralegal pods, emergency documentation support, and live chat escalation.",
      },
      {
        title: "Practice Analytics",
        description: "Pipeline analytics, billing health, and team assignments surfaced proactively.",
      },
    ],
  },
  startups: {
    label: "For Startups",
    heading: <>Fast Legal Support for Early-Stage Founders</>,
    features: [
      {
        title: "Fast Registration Support",
        description: "Quick company registration, documentation, and compliance setup for your startup.",
      },
      {
        title: "Compliance Documentation",
        description: "Streamlined compliance processes and documentation support for early-stage businesses.",
      },
      {
        title: "Government Benefits Access",
        description: "Navigate and access government schemes, subsidies, and startup-friendly benefits.",
      },
      {
        title: "Startup-Friendly Pricing",
        description: "Affordable legal packages designed specifically for early-stage founders and startups.",
      },
    ],
  },
  msme: {
    label: "For MSME",
    heading: <>Complete MSME Registration & Support</>,
    features: [
      {
        title: "MSME Registration",
        description: "Quick MSME registration with complete documentation support and guidance.",
      },
      {
        title: "Compliance Assistance",
        description: "Ongoing compliance support and certificate handling for MSME businesses.",
      },
      {
        title: "Subsidies & Credit Support",
        description: "Advisory services to leverage government subsidies, credit support, and benefits.",
      },
      {
        title: "Certificate Handling",
        description: "Complete certificate procurement and management for MSME registration.",
      },
    ],
  },
};

const personaOrder: PersonaId[] = ["clients", "students", "advocates", "startups", "msme"];

export function FullscreenSolutionSection() {
  const [activePersona, setActivePersona] = useState<PersonaId>("clients");
  const activeData = personaData[activePersona];

  const tabs = useMemo(
    () =>
      personaOrder.map((id) => ({
        id,
        label: personaData[id].label,
      })),
    []
  );

  return (
    <section className="relative bg-[#030914] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_70%)]" />

      <div className="relative z-10 mx-auto flex max-w-[1350px] flex-col gap-12 px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {tabs.map((tab) => {
            const isActive = tab.id === activePersona;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePersona(tab.id)}
                className={cn(
                  "relative pb-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/40 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030914]",
                  isActive ? "text-white" : "hover:text-white/70"
                )}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="persona-tab-highlight"
                    className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                    transition={{ type: "spring", stiffness: 250, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
            className="space-y-10"
          >
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{activeData.label}</p>
              <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">{activeData.heading}</h2>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5/10 p-1 shadow-[0_30px_90px_rgba(6,18,36,0.55)] backdrop-blur">
              <div className="rounded-[24px] border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-6 shadow-[0_0_45px_rgba(255,255,255,0.08)]">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {activeData.features.map((feature) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
                      className="group rounded-2xl border border-white/10 bg-white/5/10 p-5 text-left shadow-[0_0_25px_rgba(255,255,255,0.05)] backdrop-blur-lg transition-all duration-200 ease-out hover:scale-[1.02] hover:border-white/20 hover:bg-white/10"
                    >
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}


