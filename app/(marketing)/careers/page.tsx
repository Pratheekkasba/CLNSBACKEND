"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code, Scale, Shield, X, Send, MessageCircle } from "lucide-react";
import { Footerdemo } from "@/components/ui/footer-section";

const jobRoles = [
  {
    id: 1,
    title: "Legal Research",
    icon: Scale,
    description:
      "Conduct in-depth legal research, analyze case law, draft legal opinions, and support litigation teams with comprehensive documentation and precedent analysis.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-blue-500/20",
  },
  {
    id: 2,
    title: "Contract Management & Compliance",
    icon: Scale,
    description:
      "Review and draft commercial agreements, track key contractual obligations, and support clients in meeting regulatory and policy compliance requirements.",
    gradient: "from-sky-500/20 via-blue-500/10 to-indigo-500/20",
  },
  {
    id: 3,
    title: "Litigation & Dispute Resolution",
    icon: Scale,
    description:
      "Assist in case preparation, drafting pleadings, coordinating with counsel, and managing documentation for litigation and alternative dispute resolution matters across courts and tribunals.",
    gradient: "from-purple-500/20 via-pink-500/10 to-rose-500/20",
  },
  {
    id: 4,
    title: "Content & Marketing",
    icon: Shield,
    description:
      "Create compelling content, manage social media presence, develop marketing campaigns, and build brand awareness for CLNS across digital platforms.",
    gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
  },
];

const jobFormLinks: Record<number, string> = {
  1: "https://forms.gle/SsZ619VPE8rihii46", // Legal Research
  2: "https://forms.gle/uSH68PtiQ4XPSFEv9", // Contract Management & Compliance
  3: "https://forms.gle/qJsiqouVLMTUdD3F6", // Litigation & Dispute Resolution
  4: "https://forms.gle/CRHFjCrL5avDDcydA", // Content & Marketing
};

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (roleId: number) => {
    setSelectedRole(roleId);
    setSubmitted(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSelectedRole(null);
      setSubmitted(false);
    }, 2000);
  };

  const selectedJob = jobRoles.find((job) => job.id === selectedRole);

  return (
    <main className="relative min-h-screen bg-[#020712] text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative isolate flex min-h-[50vh] items-center justify-center overflow-hidden px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-teal-950/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_70%)] blur-[100px]" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Build the Future of Legal Tech
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.6)]"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Join CLNS and be part of a team transforming how legal services are delivered. We're looking for passionate individuals ready to make an impact.
          </motion.p>
        </div>
      </section>

      {/* Job Roles Grid */}
      <section className="relative px-6 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#010308] via-[#030a15] to-[#010205]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Current Opportunities</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {jobRoles.map((job, index) => {
              const Icon = job.icon;
              const formUrl = jobFormLinks[job.id];
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 hover:border-teal-400/40 hover:shadow-[0_40px_100px_rgba(34,211,238,0.2)]"
                >
                  {/* Gradient Background */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`absolute inset-0 bg-gradient-to-br ${job.gradient} bg-[length:200%_200%] opacity-60`}
                  />

                  {/* Glow on hover */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-teal-500/10 via-transparent to-blue-500/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
                        <Icon className="h-6 w-6 text-teal-300" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{job.title}</h3>
                    </div>

                    <p className="mb-8 text-white/60 leading-relaxed">{job.description}</p>

                    {formUrl ? (
                      <a
                        href={formUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all hover:bg-[#1d4ed8] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020712]"
                      >
                        Apply Now
                      </a>
                    ) : (
                      <button
                        onClick={() => handleApply(job.id)}
                        className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-8 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all hover:bg-[#1d4ed8] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 focus-visible:ring-offset-[#020712]"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Modal */}
      <AnimatePresence>
        {selectedRole !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0a1628] p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            >
              <button
                onClick={() => setSelectedRole(null)}
                className="absolute right-4 top-4 rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {!submitted ? (
                <>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Apply for {selectedJob?.title}
                  </h3>
                  <p className="mb-6 text-white/60">
                    Fill out the form below and we'll get back to you soon.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-teal-400/50 focus:bg-white/10"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-teal-400/50 focus:bg-white/10"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white/80">
                        Why do you want to join CLNS?
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition-colors focus:border-teal-400/50 focus:bg-white/10 resize-none"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-8 py-3 text-base font-semibold text-white shadow-[0_10px_30px_rgba(37,99,235,0.4)] transition-all hover:bg-[#1d4ed8] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
                    >
                      Submit Application
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-500/20"
                  >
                    <svg className="h-8 w-8 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Application Submitted!</h3>
                  <p className="mt-2 text-white/60">We'll be in touch soon.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footerdemo />
    </main>
  );
}



